import { describe, it, expect } from "vitest";
import { run } from "../tools/read_cv.ts";

// Estos tests leen los PDFs reales ya versionados en web/public/documents —
// no hay red ni credenciales involucradas, es solo parseo de un archivo local.
describe("tool leer_cv", () => {
  it("extrae texto del CV en español y lo envuelve como bloque de datos", async () => {
    const resultado = await run({ idioma: "es" });
    expect(resultado).toContain("INICIO DATOS EXTERNOS");
    expect(resultado).toContain("FIN DATOS EXTERNOS");
    expect(resultado).toContain("--- CV (ES) ---");
    expect(resultado.length).toBeGreaterThan(100);
  });

  it("extrae texto del CV en inglés", async () => {
    const resultado = await run({ idioma: "en" });
    expect(resultado).toContain("--- CV (EN) ---");
    expect(resultado.length).toBeGreaterThan(100);
  });

  it("por defecto (sin idioma) devuelve ambos", async () => {
    const resultado = await run({});
    expect(resultado).toContain("--- CV (ES) ---");
    expect(resultado).toContain("--- CV (EN) ---");
  });

  it("lanza un error claro si el idioma no es válido", async () => {
    // @ts-expect-error probamos un valor inválido a propósito
    await expect(run({ idioma: "fr" })).rejects.toThrow(/idioma inválido/);
  });
});
