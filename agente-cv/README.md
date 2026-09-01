# agente-cv

Agente conversacional CLI que responde preguntas sobre el perfil profesional de
Danilo Cabezas usando su CV (`web/public/documents/cv-danilo-cabezas-{es,en}.pdf`)
como fuente de datos, vía tool calling con OpenAI.

Scaffoldeado con la skill `generador-agentes-ia` (Perfil A: agente genérico
local/CLI), incluyendo su sección de Seguridad.

## Instalar

```bash
cd agente-cv
npm install
```

## Configurar secretos

```bash
cp config/.env.example .env
```

Editá `.env` y completá `OPENAI_API_KEY` con tu clave real. `.env` ya está en
`.gitignore` — nunca lo commitees.

La clave solo necesita permiso de uso del endpoint de Chat Completions (no
requiere ningún otro scope), siguiendo el principio de menor privilegio.

## Correr

Modo interactivo:

```bash
npm start
```

Modo de una sola pregunta (útil para probar rápido o scriptear):

```bash
npm start -- --once "¿qué experiencia tiene Danilo con Python?"
```

## Tests

```bash
npm test        # tests unitarios (no requieren OPENAI_API_KEY ni red)
npm run typecheck
```

Los tests de `tools/read_cv.ts` sí leen los PDFs reales del repo (son datos
locales versionados, no una llamada de red) — verifican que el parseo del CV
funciona de verdad. Los tests del orquestador usan un cliente LLM mockeado, sin
llamar a OpenAI ni requerir credenciales.

## Arquitectura

```
config/.env.example   # Plantilla de secretos
tools/read_cv.ts       # Tool: lee y cachea el texto de los PDFs del CV
tools/index.ts          # Registro de tools disponibles
agent/memory.ts          # Historial de conversación (en memoria, por proceso)
agent/orchestrator.ts     # El Agentic Loop (runAgentLoop), máx. 6 iteraciones
agent/prompts.ts           # System prompt versionado
agent/llm_client.ts         # Implementación real de tool calling con OpenAI
index.ts                     # Entry point CLI
tests/                        # Tests unitarios (mocks, sin red ni credenciales)
```

## Decisiones de diseño

- **Sin memoria persistente entre corridas**: cada ejecución del CLI arranca
  una conversación nueva. Para este caso de uso (Q&A sobre un documento
  estático) no hace falta recordar sesiones anteriores; si más adelante se
  necesita, `agent/memory.ts` es el lugar para agregar lectura/escritura a un
  archivo local.
- **El CV se trata como datos, no como instrucciones**: la tool `leer_cv`
  envuelve el texto extraído en un bloque `INICIO/FIN DATOS EXTERNOS`
  explícito, y el system prompt instruye a ignorar cualquier cosa dentro de
  ese bloque que parezca una orden. Cubierto por un test de regresión.
- **Sin despliegue**: este es un CLI local — no hay ningún paso de "producción"
  que ejecutar. Si en el futuro se quiere exponerlo como API (para que el sitio
  web en `web/` le pegue), eso es una extensión posterior, no parte de este
  scaffold.
