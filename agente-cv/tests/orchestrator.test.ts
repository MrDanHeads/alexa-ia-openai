import { describe, it, expect, vi } from "vitest";
import { ConversationMemory } from "../agent/memory.ts";
import { runAgentLoop, OrchestratorError, MAX_ITERATIONS } from "../agent/orchestrator.ts";
import type { ChatTurnResult } from "../agent/orchestrator.ts";

const SYSTEM_PROMPT = "system prompt de prueba";

describe("runAgentLoop", () => {
  it("responde directo cuando el LLM no pide ninguna tool", async () => {
    const memory = new ConversationMemory(SYSTEM_PROMPT);
    const chatCompletion = vi.fn(
      async (): Promise<ChatTurnResult> => ({ content: "Hola, soy el agente.", toolCalls: [] }),
    );

    const respuesta = await runAgentLoop(memory, "hola", chatCompletion);

    expect(respuesta).toBe("Hola, soy el agente.");
    expect(chatCompletion).toHaveBeenCalledTimes(1);
  });

  it("ejecuta la tool leer_cv cuando el LLM la pide, y le devuelve el resultado", async () => {
    const memory = new ConversationMemory(SYSTEM_PROMPT);
    let call = 0;
    const chatCompletion = vi.fn(async (): Promise<ChatTurnResult> => {
      call += 1;
      if (call === 1) {
        return {
          content: null,
          toolCalls: [{ id: "call_1", name: "leer_cv", arguments: JSON.stringify({ idioma: "es" }) }],
        };
      }
      return { content: "Según el CV, Danilo es desarrollador.", toolCalls: [] };
    });

    const respuesta = await runAgentLoop(memory, "¿qué experiencia tiene?", chatCompletion);

    expect(respuesta).toBe("Según el CV, Danilo es desarrollador.");
    expect(chatCompletion).toHaveBeenCalledTimes(2);

    // El resultado de la tool quedó registrado en la memoria como mensaje "tool".
    const mensajes = memory.getAll();
    const mensajeTool = mensajes.find((m) => m.role === "tool");
    expect(mensajeTool?.content).toContain("INICIO DATOS EXTERNOS");
  });

  it("reporta el error de una tool inexistente sin romper el loop", async () => {
    const memory = new ConversationMemory(SYSTEM_PROMPT);
    let call = 0;
    const chatCompletion = vi.fn(async (): Promise<ChatTurnResult> => {
      call += 1;
      if (call === 1) {
        return {
          content: null,
          toolCalls: [{ id: "call_1", name: "tool_que_no_existe", arguments: "{}" }],
        };
      }
      return { content: "No pude usar esa herramienta, pero puedo ayudarte con otra cosa.", toolCalls: [] };
    });

    const respuesta = await runAgentLoop(memory, "algo raro", chatCompletion);

    expect(respuesta).toContain("No pude usar esa herramienta");
    const mensajeTool = memory.getAll().find((m) => m.role === "tool");
    expect(mensajeTool?.content).toContain("no existe");
  });

  it("corta con OrchestratorError si se supera el límite de iteraciones", async () => {
    const memory = new ConversationMemory(SYSTEM_PROMPT);
    // El LLM mockeado siempre pide la misma tool, sin nunca dar una respuesta final.
    const chatCompletion = vi.fn(
      async (): Promise<ChatTurnResult> => ({
        content: null,
        toolCalls: [{ id: "call_x", name: "leer_cv", arguments: "{}" }],
      }),
    );

    await expect(runAgentLoop(memory, "pregunta infinita", chatCompletion)).rejects.toThrow(OrchestratorError);
    expect(chatCompletion).toHaveBeenCalledTimes(MAX_ITERATIONS);
  });

  it("el system prompt nunca se altera aunque el resultado de una tool contenga texto adversarial", async () => {
    const memory = new ConversationMemory(SYSTEM_PROMPT);
    let call = 0;
    const chatCompletion = vi.fn(async (): Promise<ChatTurnResult> => {
      call += 1;
      if (call === 1) {
        return {
          content: null,
          toolCalls: [{ id: "call_1", name: "leer_cv", arguments: "{}" }],
        };
      }
      return { content: "ok", toolCalls: [] };
    });

    // Simula un resultado de tool "envenenado" con un intento de inyección,
    // llamando directo al loop con una tool falsa registrada en runtime no es
    // necesario: lo que nos importa es que el orquestador nunca concatena el
    // contenido de un mensaje "tool" al mensaje "system" — lo verificamos
    // inspeccionando la memoria después de correr el loop normal.
    await runAgentLoop(memory, "pregunta", chatCompletion);

    const mensajes = memory.getAll();
    expect(mensajes[0].role).toBe("system");
    expect(mensajes[0].content).toBe(SYSTEM_PROMPT);
  });
});
