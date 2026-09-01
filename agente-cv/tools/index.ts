import * as readCv from "./read_cv.ts";

export interface ToolEntry {
  schema: { type: "function"; function: { name: string; description: string; parameters: unknown } };
  run: (args: Record<string, unknown>) => Promise<string>;
}

// Registro central de herramientas disponibles para el agente. Agregar una
// tool nueva es: crear el archivo en tools/, y sumarla acá.
export const TOOLS: Record<string, ToolEntry> = {
  leer_cv: {
    schema: readCv.TOOL_SCHEMA,
    run: (args) => readCv.run(args as { idioma?: readCv.Idioma }),
  },
};

export const TOOL_SCHEMAS = Object.values(TOOLS).map((t) => t.schema);
