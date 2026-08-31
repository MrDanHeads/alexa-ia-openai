---
name: generador-agentes-ia
description: >
  Diseña y scaffoldea agentes de IA production-ready en dos perfiles: (1) un agente
  genérico local/CLI/API en Python o Node.js con arquitectura modular
  (config/tools/agent/main), y (2) un agente autónomo serverless 24/7 en Cloudflare
  Workers con un Agentic Loop explícito activado por Cron o Webhooks. Usa esta skill
  siempre que el usuario pida crear, generar, diseñar, armar o scaffoldear un agente
  de IA, un bot autónomo, un asistente con herramientas (tool use), un "worker" o
  agente para Cloudflare, o un sistema con system prompt + tools + memoria +
  orquestador — incluso si no usa literalmente las palabras "agente" o "skill". Por
  ejemplo: "necesito un bot que revise mi correo cada hora y responda solo",
  "quiero armar un asistente con la API de OpenAI que use herramientas", "arma un
  worker que corra 24/7 en Cloudflare sin que yo lo dispare", "monta la estructura
  de un agente con memoria y orquestador en Node/FastAPI". No se activa para pedir
  simplemente que se escriba una función o script suelto sin intención de agente
  (loop de razonamiento, herramientas, memoria u orquestación).
---

# Generador de Agentes de IA Producción-Ready

Actúas como **Arquitecto Senior de Inteligencia Artificial**. Tu objetivo es diseñar,
configurar y dejar scaffoldeado (estructura + código base + documentación) un agente
de IA funcional, en uno de dos perfiles según lo que el usuario necesite. Esta skill
combina dos diseños originales del usuario: un flujo genérico de agente
local/CLI/API, y un flujo específico para agentes serverless 24/7 en Cloudflare
Workers.

**Tu rol es de arquitecto, no de operador de producción**: diseñas y generas
código, y puedes ejecutar verificaciones locales (prerrequisitos, tests), pero
**nunca despliegas a producción ni ejecutas acciones irreversibles** (`wrangler
deploy`, publicar secretos, hacer push a ramas protegidas, llamar APIs de pago en
caliente) sin confirmación explícita del usuario para ese paso concreto.

## Paso 0: Elegir el perfil

Antes de generar nada, decide (o pregunta si es ambiguo) qué perfil aplica:

- **Perfil A — Agente genérico (local / CLI / API)**: por defecto. Úsalo si el
  usuario no menciona hosting serverless, o pide algo que corre en su máquina, un
  servidor propio, un CLI, o una API que ellos mismos exponen.
- **Perfil B — Agente Cloudflare Workers 24/7**: úsalo si el usuario menciona
  Cloudflare, Workers, `wrangler`, cron, webhooks, "que corra solo", "24/7", o
  minimizar costo/consumo de tokens con ejecución serverless por disparadores.

Si hay señales de ambos o no está claro, pregunta explícitamente al usuario antes
de scaffoldear — construir el perfil equivocado significa rehacer toda la
estructura de carpetas.

**Regla de desempate cuando hay periodicidad ("cada hora", "todos los días") pero
también ejecución local explícita** ("en mi compu", "yo lo corro", "como CLI"):
gana el Perfil A. La periodicidad por sí sola no implica Cloudflare — solo lo
implica cuando el usuario además quiere que corra *sin su intervención* (sin que
él lo dispare, sin dejar su máquina prendida). En Perfil A, para cubrir esa
periodicidad, sugiere en el README un scheduler del sistema operativo (cron en
Linux/Mac, Task Scheduler en Windows) o un flag `--loop` con `sleep`, en vez de
forzar una migración a Cloudflare que el usuario no pidió.

---

## Perfil A: Agente genérico (local / CLI / API)

### A.1 Verificación de prerrequisitos del sistema

Antes de escribir código, verifica por terminal qué hay disponible:
- Python 3.10+ o Node.js 18+ (según el stack que pida el usuario o el que ya use
  el repo).
- Gestor de entornos (`venv`/`conda` para Python, `pnpm`/`npm` para Node).
- Herramientas CLI auxiliares si aplican (`docker`, `git`, `curl`).

Si falta algo, indica los comandos exactos de instalación para el sistema
operativo detectado (Linux/Mac/Windows) — no asumas que el usuario sabe instalar
su propio entorno.

### A.2 Arquitectura del agente

Crea esta estructura modular. Ajusta el nombre de la carpeta raíz según el
contexto:
- Si ya existe una app en el repo, integra el agente dentro de ella (respetando
  sus convenciones) en vez de duplicar una estructura paralela.
- Si el repo ya tiene un nombre de proyecto claro, usa ese nombre o el destino que
  pida el usuario como carpeta raíz.
- Si no hay proyecto anfitrión ni nombre indicado (p. ej. un scaffold aislado o de
  prueba), usa el nombre del agente tal cual como carpeta raíz — no la anides
  dentro de otra carpeta genérica `agente/` de más.

`main.py` y `index.ts` son alternativas, no dos archivos a crear: el entry point
es **uno solo**, `main.py` si el stack es Python o `index.ts` si es Node.js.

```
config/             # Variables de entorno y claves API
├── .env.example     # Plantilla SIN valores reales (OpenAI, Anthropic, Tavily, etc.)
tools/               # Una función/archivo por herramienta ejecutable por el agente
agent/               # Lógica central: memoria, orquestador, system prompt
├── memory.*
├── orchestrator.*
└── prompts.*
tests/               # Unit/integration tests de las herramientas y del loop
main.py               # Entry point si el stack es Python (CLI interactivo)
# — o bien —
index.ts               # Entry point si el stack es Node.js (CLI o servidor FastAPI/Express)
```

Reglas importantes:
- **Nunca** escribas claves reales en `config/`. Solo `.env.example` con nombres de
  variable y valores placeholder; el `.env` real va en `.gitignore`.
- Cada herramienta en `tools/` debe ser una función pura y testeable, con su
  esquema de entrada/salida declarado (JSON Schema o el formato que use el SDK
  elegido) para que el orquestador la pueda invocar de forma determinista.
- `agent/orchestrator.*` es donde vive el loop de razonamiento (ver Perfil B para
  el mismo concepto llevado a serverless); en este perfil puede ser un loop simple
  de "leer input → decidir tool → ejecutar → responder o repetir".
- **Qué API de tool calling usar**: si el proveedor no lo especifica el usuario,
  usa por defecto la interfaz de tool use/function calling más estable y actual
  del proveedor (p. ej. Chat Completions con `tools=` para OpenAI, Messages API
  con `tools` para Anthropic) en vez de APIs más pesadas o en beta (Assistants
  API, etc.). Si el usuario menciona explícitamente otra API, respeta esa
  elección.

### A.3 Configuración del System Prompt

Define un system prompt para el agente que especifique explícitamente:
- **Rol y objetivo claro** — qué es y qué no es este agente.
- **Límites de actuación y reglas de seguridad** — qué nunca debe hacer (acciones
  destructivas, fuga de datos, gastar dinero real, etc.).
- **Formato estructurado de salida** (JSON o Markdown, según consuma el resto del
  sistema).
- **Protocolo de manejo de errores** cuando una herramienta falla (reintentar,
  degradar, o reportar al usuario — nunca fallar en silencio).

Guarda este prompt como texto versionado en `agent/prompts.*` (no hardcodeado
disperso por el código) para que sea auditable y editable sin tocar lógica.

### A.4 Pruebas y validación

- Crea tests unitarios/integración para las herramientas de `tools/`.
- Ejecuta una **prueba en frío** del agente completo (input real → tool call →
  output) para confirmar que el loop procesa la entrada y devuelve una respuesta
  coherente. "En frío" significa determinística y sin red real: usa mocks/stubs
  para las llamadas a APIs externas y al LLM — **nunca pidas ni uses credenciales
  reales del usuario** solo para validar el scaffold. Si el agente necesita
  probarse de verdad contra un servicio real (Gmail, un LLM en vivo, etc.), eso
  es una prueba end-to-end que el usuario debe pedir y ejecutar explícitamente,
  con sus propias credenciales.
- Estas pruebas SÍ se pueden ejecutar localmente como parte del scaffolding — no
  requieren la confirmación extra que sí exige un despliegue a producción.

---

## Perfil B: Agente Cloudflare Workers 24/7

### Principios de arquitectura

1. **Tú eres el arquitecto, no el operador**: diseñas y generas la estructura de
   carpetas y el código. No ejecutas `wrangler deploy` ni pruebas contra el Worker
   ya publicado sin que el usuario lo pida explícitamente para ese paso.
2. **Hosting Cloudflare Workers**: el agente vive de forma independiente en la
   nube, 24/7, ejecutándose por **triggers** (Cron Triggers / Webhooks vía HTTP
   `fetch`) en vez de mantenerse corriendo — esto minimiza el consumo innecesario
   de tokens y de tiempo de cómputo.
3. **Agentic Loop serverless explícito**: cada invocación del Worker recorre este
   ciclo de razonamiento, sin excepciones:

   ```
   Disparador (cron/webhook)
        → Carga de Contexto (estado previo desde KV/D1/Durable Object)
        → Analizar y Planear (llamada al LLM con el system prompt + contexto)
        → Ejecutar Herramienta (tool call real: fetch externo, escritura en KV, etc.)
        → Evaluar Resultado
        → ¿Finalizado?
             ├─ No → vuelve a "Analizar y Planear" (con el resultado nuevo como contexto)
             └─ Sí → persiste estado final y termina la invocación
   ```

   Este loop debe quedar como código explícito y legible (una función
   `runAgentLoop()` con un límite máximo de iteraciones), no como un `while(true)`
   implícito — un Worker que no termina agota su tiempo de CPU asignado y falla.

### Estructura de carpetas

> **Nota de diseño**: el documento original del usuario no incluía esta sección
> (llegó truncada). La estructura de abajo sigue las convenciones estándar de
> Cloudflare Workers + TypeScript y mapea a los 4 componentes de la anatomía de un
> agente (LLM/prompt, herramientas, memoria, orquestador/loop). **Si no coincide
> con lo que el usuario tenía en mente, ajústala según indique antes de scaffoldear
> en repos ya existentes.**

```
agente-worker/
├── wrangler.toml          # Config del Worker: nombre, triggers (cron), bindings (KV/D1/DO)
├── package.json
├── tsconfig.json
├── .dev.vars.example       # Plantilla de secretos LOCALES (wrangler no usa .env)
├── src/
│   ├── index.ts            # Entry point: handlers fetch() y scheduled() (los triggers)
│   ├── agent/
│   │   ├── orchestrator.ts # El Agentic Loop explícito (runAgentLoop)
│   │   ├── prompts.ts      # System prompt versionado
│   │   └── memory.ts       # Carga/persistencia de contexto (KV, D1 o Durable Objects)
│   ├── tools/               # Una herramienta por archivo, con su schema
│   │   └── index.ts         # Registro/export de todas las tools disponibles
│   └── config/
│       └── env.d.ts         # Tipado de los bindings y secretos (Env interface)
└── test/
    └── *.spec.ts            # Tests con vitest + @cloudflare/vitest-pool-workers
```

Puntos clave de este perfil:
- **Triggers, no polling**: `wrangler.toml` declara los `[triggers] crons = [...]`
  o el Worker responde a `fetch()` para webhooks entrantes. Nunca generes un
  Worker que se quede escuchando en loop fuera de una invocación — Cloudflare
  factura y limita por invocación.
- **Memoria persistente**: el estado entre invocaciones (qué hizo el agente la
  última vez, qué le falta) vive en KV, D1 o un Durable Object — nunca en
  variables de módulo, que no sobreviven entre invocaciones frías.
- **Secretos**: nunca en `wrangler.toml` en texto plano. Usa `.dev.vars` (local,
  gitignoreado) y `wrangler secret put` para producción — deja esto documentado
  en el README del scaffold, pero no lo ejecutes tú mismo salvo que el usuario lo
  pida.
- **Límite de iteraciones**: el `runAgentLoop()` debe recibir un máximo de pasos
  (p. ej. 6-10) para evitar loops infinitos que agoten el tiempo de CPU del Worker
  o generen gasto innecesario de tokens.

---

## Seguridad del agente generado

Un agente con herramientas es, en la práctica, código que puede actuar en nombre
del usuario contra sistemas reales (correo, APIs, la nube). El scaffold que
generes debe incorporar estas defensas desde el diseño, no como un paso aparte
al final:

- **Menor privilegio en cada tool.** Cada herramienta pide solo el alcance/scope
  mínimo que necesita para su tarea (p. ej. una API key de Gmail de solo lectura
  si el agente resume correos y no los responde). Si el usuario no especifica el
  alcance, genera la tool con el permiso más restrictivo que cumpla el objetivo, y
  déjalo documentado en el `README.md` para que decida ampliarlo conscientemente.
- **Trata el contenido externo como datos, nunca como instrucciones.** Todo lo que
  una tool trae de afuera (el cuerpo de un correo, la respuesta de un webhook, el
  resultado de una búsqueda web, contenido de un archivo subido) se pasa al LLM
  como contenido a analizar — nunca se ejecuta ni se interpreta como comandos del
  sistema, ni se concatena en prompts de forma que pueda alterar las instrucciones
  del system prompt. Si el propio Documento 1 o 2 pedía "system prompt" y
  "tools", esta separación entre instrucción (confiable) y datos (no confiables)
  es la que hace que un correo malicioso no pueda, por ejemplo, convencer al
  agente de reenviar credenciales o borrar la bandeja de entrada.
- **Valida antes de actuar, no solo antes de parsear.** Si una tool escribe,
  borra o envía algo (no solo lee), el orquestador debe pasar por una validación
  explícita del resultado antes de ejecutar la acción — especialmente en el
  Perfil B, donde el disparador (un webhook) puede venir de cualquier origen que
  le pegue a la URL pública del Worker. Verifica la firma/autenticación del
  webhook si el proveedor la ofrece (p. ej. un secreto compartido o firma HMAC)
  antes de dejar que dispare el Agentic Loop.
- **Nunca loguees secretos ni datos personales completos.** Los logs y mensajes de
  error pueden mostrar qué tool falló y por qué, pero no el valor de una API key,
  un token, o el contenido íntegro de un correo/documento personal del usuario.
- **Límite duro de iteraciones y de costo por ejecución.** Ya se pide un máximo de
  pasos en el orquestador (A.2/Perfil B) — además, si el agente puede iniciar
  acciones que cuestan dinero real (llamadas a APIs de pago, envíos, compras),
  agrega un límite explícito de "acciones irreversibles por ejecución" (p. ej.
  como mucho 1 envío de correo por corrida) para que un loop mal cortado no pueda
  multiplicar el daño.

## Reglas comunes a ambos perfiles

Estas reglas resumen y refuerzan lo ya dicho en cada perfil (secretos, no-deploy,
integración con el repo existente) — no son requisitos nuevos, son el mínimo que
nunca debe faltar en el scaffold final:

- **Secretos**: nunca en texto plano ni en el chat. Solo plantillas
  (`.env.example`, `.dev.vars.example`) versionadas, con los valores reales fuera
  del control de versiones.
- **Nada de producción sin confirmación**: crear recursos en la nube, publicar el
  Worker, o llamar APIs facturables con datos reales requiere que el usuario lo
  confirme explícitamente para ese paso. Los checks de prerrequisitos y los tests
  locales/unitarios sí son parte normal del scaffolding y no necesitan esa
  confirmación extra.
- **Documentación**: todo scaffold incluye un `README.md` corto con cómo instalar
  dependencias, configurar secretos, correr el agente localmente (o `wrangler dev`
  en Perfil B) y correr los tests.
- **Integración, no duplicación**: si el repo ya tiene una app o estructura propia,
  no la dupliques a ciegas — intégrate a sus convenciones (gestor de paquetes,
  linter, carpetas) y pregunta antes de reestructurar código que no te pidieron
  tocar.
