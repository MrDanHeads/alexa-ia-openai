export type Role = "system" | "user" | "assistant" | "tool";

export interface ChatMessage {
  role: Role;
  content: string | null;
  tool_call_id?: string;
  tool_calls?: unknown;
  name?: string;
}

/**
 * Memoria de conversación en memoria de proceso (no persiste entre corridas
 * del CLI). Para este caso de uso — Q&A sobre un documento estático — no hace
 * falta memoria persistente entre sesiones; si en el futuro se necesita
 * (seguir una conversación entre corridas), acá es donde se agregaría lectura
 * y escritura a un archivo local (ver nota en el README).
 */
export class ConversationMemory {
  private messages: ChatMessage[] = [];

  constructor(systemPrompt: string) {
    this.messages.push({ role: "system", content: systemPrompt });
  }

  add(message: ChatMessage): void {
    this.messages.push(message);
  }

  getAll(): ChatMessage[] {
    return [...this.messages];
  }

  reset(systemPrompt: string): void {
    this.messages = [{ role: "system", content: systemPrompt }];
  }
}
