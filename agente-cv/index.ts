#!/usr/bin/env node
import { createInterface } from "node:readline/promises";
import { stdin, stdout } from "node:process";
import { ConversationMemory } from "./agent/memory.ts";
import { runAgentLoop, OrchestratorError } from "./agent/orchestrator.ts";
import { createOpenAiChatCompletion } from "./agent/llm_client.ts";
import { SYSTEM_PROMPT } from "./agent/prompts.ts";

async function main(): Promise<void> {
  const args = process.argv.slice(2);
  const onceIdx = args.indexOf("--once");
  const memory = new ConversationMemory(SYSTEM_PROMPT);

  let chatCompletion: ReturnType<typeof createOpenAiChatCompletion>;
  try {
    chatCompletion = createOpenAiChatCompletion();
  } catch (err) {
    console.error(`❌ ${(err as Error).message}`);
    process.exitCode = 1;
    return;
  }

  if (onceIdx !== -1) {
    // Modo no interactivo: --once "pregunta". Útil para scripting/tests manuales.
    const pregunta = args[onceIdx + 1];
    if (!pregunta) {
      console.error("Uso: npm start -- --once \"tu pregunta\"");
      process.exitCode = 1;
      return;
    }
    await responder(memory, pregunta, chatCompletion);
    return;
  }

  console.log("Agente de portfolio de Danilo Cabezas. Preguntá lo que quieras (Ctrl+C para salir).\n");
  const rl = createInterface({ input: stdin, output: stdout });
  try {
    // eslint-disable-next-line no-constant-condition
    while (true) {
      const pregunta = await rl.question("> ");
      if (!pregunta.trim()) continue;
      await responder(memory, pregunta, chatCompletion);
    }
  } finally {
    rl.close();
  }
}

async function responder(
  memory: ConversationMemory,
  pregunta: string,
  chatCompletion: ReturnType<typeof createOpenAiChatCompletion>,
): Promise<void> {
  try {
    const respuesta = await runAgentLoop(memory, pregunta, chatCompletion);
    console.log(`\n${respuesta}\n`);
  } catch (err) {
    if (err instanceof OrchestratorError) {
      console.error(`⚠️  ${err.message}`);
    } else {
      console.error(`❌ Error inesperado: ${(err as Error).message}`);
    }
  }
}

main();
