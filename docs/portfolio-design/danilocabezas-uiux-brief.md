# danilocabezas.com — Arquitectura UI/UX & Brief de Diseño

**Cliente:** Danilo Cabezas — Ingeniero de Sistemas Senior / CTO / Consultor en IA & Ciencia de Datos
**Proyecto:** Sitio web personal & portafolio de consultoría
**Fecha:** 2026-08-13
**Autor:** Diseño UI/UX (propuesta v1)

Paleta de marca aplicada en toda la propuesta:

| Token | Uso | Hex |
|---|---|---|
| Primario (Dark Navy) | Fondos, estructura | `#003785` |
| Secundario (Corporate Blue) | Cards, contenedores | `#1465BB` |
| Acento (Vibrant Blue) | CTAs, botones principales | `#2196F3` |
| Muted (Sky Blue) | Hover, bordes, badges | `#81C9FA` |
| Highlight (Cyan Mentha) | Textos clave sobre fondo oscuro | `#B9FFFF` |

---

## 1. Sitemap y estructura de navegación

**Recomendación de arquitectura:** sitio de **una sola página (scroll largo con anclas)** para el MVP — es el estándar para marca personal ejecutiva de alto impacto (carga rápida, narrativa continua, fácil de mantener), con 2 páginas utilitarias satélite y una Fase 2 opcional. *(Confirmar en RFI-2 más abajo si prefieres multi-página.)*

```
danilocabezas.com                                   [Home — one-page scroll]
│
├── #inicio          Hero — propuesta de valor + CTAs
├── #servicios        Portafolio de Servicios de Consultoría
│    ├── IA & Automatización con Agentes (N8N, OpenAI, Copilot Studio)
│    ├── Business Intelligence & Analytics (Power BI, Python, SQL)
│    └── Infraestructura TI & Gestión ERP (Dynamics 365 BC, AWS, Seguridad)
├── #stack            Stack Técnico & Certificaciones (grid interactivo)
├── #sobre-mi          Sobre Mí & Trayectoria (bio, hitos, métricas)
├── #contacto          Contacto directo, formulario y redes
│
├── /cv-danilo-cabezas.pdf     → descarga directa (no indexada, sin nav propia)
├── /privacidad                 → Política de Privacidad (requerida: el chatbot
│                                  y el formulario capturan datos personales)
│
└── Fase 2 (fuera del MVP, no bloquea el lanzamiento)
     ├── /insights o /blog      → artículos técnicos (SEO + autoridad de marca)
     └── /casos-de-exito        → casos de estudio ampliados por cliente
```

**Header / navegación principal (sticky, aparece al hacer scroll):**

```
[DC]  Danilo Cabezas     Inicio · Servicios · Stack · Sobre mí · Contacto     [Agendar Consultoría]
```

- Fondo: Dark Navy `#003785` con blur al hacer sticky.
- Link activo (scroll-spy): subrayado o texto en Cyan Mentha `#B9FFFF`.
- CTA principal siempre visible: botón sólido Vibrant Blue `#2196F3`.
- Elemento flotante persistente en todas las secciones: **widget de chatbot** (bottom-right).

---

## 2. Wireframes por sección (texto/ASCII)

> Leyenda: `[ Botón ]` = CTA · `▢` = placeholder de imagen/foto · `┈┈` = elemento opcional/futuro · `●` = bullet de contenido real

### 2.1 Header / Navegación

```
┌──────────────────────────────────────────────────────────────────────┐
│ [DC]  Danilo Cabezas    Inicio  Servicios  Stack  Sobre mí  Contacto  │
│                                                [ Agendar Consultoría ]│
└──────────────────────────────────────────────────────────────────────┘
```

### 2.2 Hero

```
┌────────────────────────────────────────────────────────────────────┐
│ Badge:  "CTO & Consultor en IA · +15 años liderando TI"             │
│                                                                      │
│ H1:  Transformo operaciones de TI en ventaja competitiva            │
│      con Inteligencia Artificial                                    │
│                                                                      │
│ Sub: Ingeniero de Sistemas Senior especializado en automatización    │
│      con agentes de IA, Business Intelligence y arquitectura         │
│      ERP / Cloud.                                                   │
│                                                                      │
│ [ Agendar Consultoría ]     [ Descargar CV ↓ ]                       │
│                                                                      │
│ ● +15 años exp.  ● Dynamics 365 BC  ● AWS  ● OpenAI  ● Power BI     │
│                                                        ▢ Retrato     │
│                                                          profesional │
└────────────────────────────────────────────────────────────────────┘
```

### 2.3 Portafolio de Servicios (3 cards)

```
┌───────────────────────┐ ┌───────────────────────┐ ┌───────────────────────┐
│ IA & Automatización    │ │ Business Intelligence │ │ Infraestructura TI    │
│ con Agentes            │ │ & Analytics            │ │ & Gestión ERP          │
│                        │ │                        │ │                        │
│ ● N8N — orquestación   │ │ ● Power BI — dashboards│ │ ● Dynamics 365 BC      │
│ ● OpenAI — LLMs        │ │ ● Python — modelos     │ │ ● AWS — arquitectura   │
│ ● Copilot Studio       │ │ ● SQL — data pipelines │ │ ● Seguridad (Fortinet) │
│ ● ElevenLabs — voz     │ │                        │ │                        │
│                        │ │                        │ │                        │
│ [ Más info → ]         │ │ [ Más info → ]         │ │ [ Más info → ]         │
└───────────────────────┘ └───────────────────────┘ └───────────────────────┘
```
- Hover: borde `#81C9FA`, elevación de card sobre fondo `#1465BB`.
- Cada card abre detalle (acordeón o modal) con caso de uso concreto + CTA "Agendar sobre este servicio" → precarga el chatbot en la rama correspondiente.

### 2.4 Stack Técnico & Certificaciones (grid interactivo)

```
┌────────────────────────────────────────────────────────────────────┐
│  Lenguajes & Data     Automatización & IA     Cloud & Seguridad     │
│  [Python] [SQL]       [N8N] [OpenAI]          [AWS] [Fortinet]      │
│  [Power BI]           [Copilot Studio]        [Dynamics 365 BC]     │
│                        [ElevenLabs]                                 │
│                                                                      │
│  Certificaciones y cursos (badges con ícono + año)                  │
│  ⬡ Copilot Studio  ⬡ SQL Total  ⬡ N8N Agentes de IA                 │
│  ⬡ Power BI Total  ⬡ Python for Data Science                        │
│  ⬡ Marketing Digital 360  ⬡ Adobe Creative Suite                    │
└────────────────────────────────────────────────────────────────────┘
```
- Cada badge = tooltip on hover con descripción corta; click abre credencial/certificado si existe (ej. LinkedIn Learning, Microsoft Learn).
- Badge activo: fondo `#81C9FA` sobre navy, texto `#003785`.

### 2.5 Sobre Mí & Trayectoria

```
┌────────────────────────────────────────────────────────────────────┐
│  ▢ Foto            Sobre Mí                                        │
│                     Párrafo de posicionamiento (2-3 líneas, tono    │
│                     ejecutivo/estratégico).                         │
│                                                                      │
│  Métricas:  [15+ años]  [X proyectos]  [X equipos liderados]        │
│                                                                      │
│  Línea de tiempo (horizontal, scroll en mobile):                    │
│  ●───────────●───────────●───────────●───────────●                  │
│  Ing. Sistemas  Maestría    Diplomado    Hito        Hito           │
│  (U. Politécnica (UNIR -    IA (UDLA)    profesional  profesional   │
│   Salesiana)     Diseño                  1            2              │
│                  Gráfico                                            │
│                  Digital)                                           │
└────────────────────────────────────────────────────────────────────┘
```

### 2.6 Widget de Chatbot (flotante, persistente)

```
Estado colapsado (todas las páginas, bottom-right):
        ┌─────────────────────────────┐
        │ 💬 ¿Hablamos de tu próximo   │
        │    proyecto?                 │
        └─────────────────────────────┘
                                    ⬤ ← burbuja con ícono, pulso sutil

Estado expandido:
┌───────────────────────────────┐
│ ▢ Avatar   Asistente de Danilo │  ×
│───────────────────────────────│
│ Bot: ¡Hola! 👋 ¿En qué puedo   │
│ ayudarte hoy?                  │
│                                 │
│ [ 📅 Agendar consultoría ]      │
│ [ 🧩 Conocer servicios ]        │
│ [ 📄 Descargar CV ]             │
│ [ 💬 Hablar con Danilo ]        │
│                                 │
│ ┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈ │
│ [ Escribe tu mensaje...    ➤ ] │
└───────────────────────────────┘
```

### 2.7 Contacto & Footer

```
┌────────────────────────────────────────────────────────────────────┐
│  Hablemos de tu proyecto                                            │
│                                                                      │
│  [ Nombre        ]  [ Email           ]                             │
│  [ Empresa (opc.) ] [ Tipo de servicio ▾ ]                          │
│  [ Mensaje                                                     ]    │
│  [ Enviar mensaje → ]                                                │
│                                                                      │
│  o contáctame directo:                                              │
│  ✉ dxcabezasg@gmail.com   in LinkedIn   ☎ Teléfono                  │
└────────────────────────────────────────────────────────────────────┘
┌────────────────────────────────────────────────────────────────────┐
│ Footer: © 2026 Danilo Cabezas · Privacidad · LinkedIn · Email        │
└────────────────────────────────────────────────────────────────────┘
```

---

## 3. Flujo interactivo del Chatbot de Agendamiento (Tree Logic)

**Objetivo del bot:** calificar al visitante y convertirlo en (a) una reunión agendada, (b) un lead con correo capturado, o (c) una descarga de CV con seguimiento.

**Trigger de apertura:** click manual en la burbuja, o auto-apertura suave tras 20–30s de permanencia en la página (una sola vez por sesión, dismissible).

```
[START] Bot se abre
  "¡Hola! 👋 Soy el asistente virtual de Danilo Cabezas.
   ¿En qué puedo ayudarte hoy?"
  ├─ 1) 📅 Agendar una consultoría
  ├─ 2) 🧩 Conocer los servicios
  ├─ 3) 📄 Descargar CV
  └─ 4) 💬 Hablar directo con Danilo

── RAMA 1: Agendar una consultoría ──────────────────────────────
  Bot: "Perfecto. ¿Sobre qué área necesitas asesoría?"
  ├─ IA & Automatización con Agentes
  ├─ Business Intelligence & Analytics
  ├─ Infraestructura TI & ERP
  └─ No estoy seguro / orientación general
       ↓ (tag de contexto guardado para Danilo)
  Bot: "Elige un horario disponible:"
       → embebe widget de agendamiento (Calendly/Cal.com/Typebot)
       ├─ Reserva confirmada
       │    Bot: "¡Listo! Tu reunión quedó agendada y te llegará
       │    la confirmación por correo. ¿Quieres que te envíe
       │    también el CV o un resumen de servicios?"
       │    ├─ Sí, enviar → [FIN: lead + reunión + CV]
       │    └─ No, gracias → [FIN: reunión agendada]
       └─ Ningún horario funciona
            Bot: "Sin problema. Déjame tu correo y disponibilidad
            preferida, y Danilo coordinará contigo directamente."
            → captura email + texto libre → [FIN: lead calificado]

── RAMA 2: Conocer los servicios ────────────────────────────────
  Bot muestra 3 tarjetas rápidas (quick-replies) con 1 línea c/u:
  ├─ IA & Automatización → "Quiero esto" → entra a RAMA 1 (pre-tag)
  ├─ BI & Analytics       → "Quiero esto" → entra a RAMA 1 (pre-tag)
  └─ TI & ERP             → "Quiero esto" → entra a RAMA 1 (pre-tag)
  (o) "Ver menú principal" → vuelve a [START]

── RAMA 3: Descargar CV ─────────────────────────────────────────
  Bot: dispara descarga del PDF inmediatamente (sin fricción)
  Bot: "Ahí tienes mi CV 📄. ¿Quieres que también te lo envíe
  por correo o que agendemos una llamada?"
  ├─ Enviar por correo → captura email → [FIN: lead + CV enviado]
  ├─ Agendar llamada → entra a RAMA 1
  └─ No, gracias → [FIN: CV descargado]

── RAMA 4: Hablar directo con Danilo ────────────────────────────
  Bot: "Puedes escribirle directamente por:"
  ├─ WhatsApp → abre wa.me con mensaje precargado:
  │    "Hola Danilo, vengo desde tu sitio web y quiero
  │     conversar sobre..."
  ├─ Email → mailto:dxcabezasg@gmail.com con asunto precargado
  └─ LinkedIn → abre perfil en nueva pestaña

── FALLBACK GLOBAL (texto libre en cualquier punto) ─────────────
  Motor de intención por palabras clave:
  "precio/costo" · "agendar/reunión/cita" · "cv/currículum" ·
  "ia/agentes/n8n/openai" · "power bi/datos/sql" · "erp/dynamics/aws"
  → si hay match, enruta a la rama correspondiente
  → si NO hay match:
       Bot: "No estoy seguro de haber entendido 🤔.
       ¿Te conecto directo con Danilo o prefieres ver el menú?"
       ├─ Conectar con Danilo → RAMA 4
       └─ Ver menú → [START]

── SALVAVIDAS DE CONVERSIÓN (exit-intent en el chat) ────────────
  Si el usuario intenta cerrar el chat sin haber convertido:
  Bot: "Antes de irte — ¿te dejo mi correo o prefieres que te
  contacte yo? Solo necesito tu email." (soft-ask, descartable con ×)
```

**Notas de implementación:**
- El motor de agendamiento (Calendly / Cal.com / Typebot) determina si el flujo vive 100% embebido en el chat o abre un modal — ver RFI-1.
- Todo lead capturado (email, tag de interés, rama de origen) debería enviarse por webhook/N8N a `dxcabezasg@gmail.com` y/o a un CRM ligero (Notion, Airtable, HubSpot free).
- Analítica sugerida: evento por cada rama iniciada y cada conversión (agenda / CV / WhatsApp), para saber qué servicio genera más demanda.

---

## 4. RFI — Preguntas abiertas antes de iniciar diseño visual

1. **Herramienta de agendamiento del chatbot:** ¿Calendly embebido (rápido, prediseñado), Typebot (flujo 100% conversacional y personalizable, se integra bien con N8N), o Cal.com (open-source, más control)? Esto define la arquitectura técnica del flujo.
2. **Estructura del sitio:** ¿one-page scroll (recomendado para lanzamiento rápido) o multi-página con URLs propias por sección (mejor para SEO a futuro, más esfuerzo de build)?
3. **Idioma:** ¿el sitio nace bilingüe ES/EN (recomendado si apuntas a clientes internacionales) o solo español para el MVP, con inglés en Fase 2?

## Supuestos hechos para esta v1 (ajustables)
- Arquitectura one-page con anclas + 2 páginas utilitarias (CV, privacidad).
- Chatbot con menú guiado (quick-replies) + fallback de texto libre, no un LLM abierto sin guardrails.
- CTA primario del sitio: "Agendar Consultoría"; CTA secundario: "Descargar CV".
