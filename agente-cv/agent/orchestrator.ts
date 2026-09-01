import { ConversationMemory, type ChatMessage } from "./memory.ts";
import { TOOLS, TOOL_SCHEMAS } from "../tools/index.ts";

export class OrchestratorError extends Error {}

/** Resultado de un solo turno de chat del LLM, desacoplado del SDK real. */
export interface ChatTurnResult {
  content: string | null;
  toolCalls: Array<{ id: string; name: string; arguments: string }>;
}

/**
 * Firma inyectable de la llamada al LLM. La implementación real (OpenAI Chat
 * Completions con `tools=`) vive en agent/llm_client.ts — acá solo se declara
 * la interfaz para que el loop sea testeable sin red ni credenciales reales.
 */
export type ChatCompletionFn = (messages: ChatMessage[], toolSchemas: unknown[]) => Promise<ChatTurnResult>;

const MAX_ITERATIONS = 6;
// Ninguna tool de este agente escribe/envía nada (es de solo lectura), pero se
// deja el límite declarado explícitamente por si en el futuro se agrega una
// tool que sí tenga efectos secundarios — ver sección de Seguridad de la skill.
const MAX_ACCIONES_IRREVERSIBLES_POR_EJECUCION = 0;

/**
 * El Agentic Loop explícito: Carga de Contexto -> Analizar y Planear ->
 * Ejecutar Herramienta -> Evaluar Resultado -> ¿Finalizado?. Con límite duro
 * de iteraciones para que un ciclo mal cortado nunca corra indefinidamente.
 */
export async function runAgentLoop(
  memory: ConversationMemory,
  userMessage: string,
  chatCompletion: ChatCompletionFn,
): Promise<string> {
  memory.add({ role: "user", content: userMessage });

  for (let iteration = 1; iteration <= MAX_ITERATIONS; iteration++) {
    const result = await chatCompletion(memory.getAll(), TOOL_SCHEMAS);

    if (result.toolCalls.length === 0) {
      const respuesta = result.content ?? "";
      memory.add({ role: "assistant", content: respuesta });
      return respuesta;
    }

    memory.add({
      role: "assistant",
      content: result.content,
      tool_calls: result.toolCalls.map((tc) => ({
        id: tc.id,
        type: "function",
        function: { name: tc.name, arguments: tc.arguments },
      })),
    });

    for (const toolCall of result.toolCalls) {
      const tool = TOOLS[toolCall.name];
      let toolOutput: string;

      if (!tool) {
        toolOutput = `Error: la herramienta '${toolCall.name}' no existe.`;
      } else {
        try {
          const args = toolCall.arguments ? JSON.parse(toolCall.arguments) : {};
          toolOutput = await tool.run(args);
        } catch (err) {
          // Protocolo de manejo de errores (A.3): nunca fallar en silencio —
          // el error se reporta al LLM para que se lo explique al usuario.
          toolOutput = `Error ejecutando '${toolCall.name}': ${(err as Error).message}`;
        }
      }

      memory.add({ role: "tool", tool_call_id: toolCall.id, content: toolOutput });
    }
  }

  throw new OrchestratorError(
    `Se alcanzó el máximo de iteraciones (${MAX_ITERATIONS}) sin llegar a una respuesta final.`,
  );
}

export { MAX_ITERATIONS, MAX_ACCIONES_IRREVERSIBLES_POR_EJECUCION };
