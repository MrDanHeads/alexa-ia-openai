import OpenAI from "openai";
import type { ChatMessage } from "./memory.ts";
import type { ChatTurnResult } from "./orchestrator.ts";

/**
 * Implementación real de ChatCompletionFn usando la API de tool calling más
 * estable de OpenAI (Chat Completions con `tools=`) — ver skill
 * generador-agentes-ia, sección "Qué API de tool calling usar".
 */
export function createOpenAiChatCompletion(): (
  messages: ChatMessage[],
  toolSchemas: unknown[],
) => Promise<ChatTurnResult> {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    throw new Error(
      "Falta OPENAI_API_KEY. Copiá config/.env.example a .env y completá tu clave real.",
    );
  }
  const model = process.env.OPENAI_MODEL ?? "gpt-4o-mini";
  const client = new OpenAI({ apiKey });

  return async (messages, toolSchemas) => {
    const response = await client.chat.completions.create({
      model,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      messages: messages as any,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      tools: toolSchemas as any,
    });

    const message = response.choices[0]?.message;
    if (!message) {
      throw new Error("Respuesta vacía de OpenAI.");
    }

    return {
      content: message.content ?? null,
      toolCalls: (message.tool_calls ?? []).map((tc) => ({
        id: tc.id,
        name: tc.function.name,
        arguments: tc.function.arguments,
      })),
    };
  };
}
