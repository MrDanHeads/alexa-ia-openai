# danilocabezas.com

Sitio personal / portafolio de consultoría de Danilo Cabezas. Next.js 16 (App
Router) + TypeScript + Tailwind CSS v4, sin dependencias externas de fuentes
o imágenes (todo corre 100% self-contained).

Construido sobre la arquitectura definida en `../docs/portfolio-design/`:
sitemap, wireframes y lógica del chatbot (`danilocabezas-uiux-brief.md`) y el
mockup de alta fidelidad (`danilocabezas-hifi-mockup.html`).

## Desarrollo

```bash
npm install
npm run dev       # http://localhost:3000
npm run build     # build de producción
npm run lint
```

## Estructura

```
src/
  app/
    layout.tsx        # metadata + LanguageProvider
    page.tsx           # ensambla las secciones del one-page
    icon.tsx            # favicon generado (navy + "DC")
    globals.css          # tokens Tailwind (paleta de marca, tipografías)
  components/
    Header.tsx           # nav sticky, scroll-spy, toggle ES/EN, menú móvil
    Hero.tsx + AgentFlowCanvas.tsx   # hero + diagrama de flujo animado en canvas
    Services.tsx           # 3 pilares de consultoría
    Stack.tsx                # stack técnico & certificaciones
    About.tsx                  # trayectoria + timeline
    Contact.tsx                  # formulario + contacto directo
    Footer.tsx
    ChatWidget.tsx               # widget flotante con la lógica de árbol del chatbot
    icons.tsx                      # iconos inline (svg)
  i18n/
    translations.ts                # diccionario ES/EN
    chatFlow.ts                      # árbol de conversación del chatbot (ES/EN)
    LanguageProvider.tsx               # contexto de idioma, persistido en localStorage
```

## Decisiones de arquitectura (confirmadas)

- **One-page scroll** con anclas (`#inicio #servicios #stack #sobre-mi #contacto`).
- **Bilingüe ES/EN** desde el lanzamiento — toggle en el header, sin subruta `/en`.
- **Chatbot de agendamiento**: el árbol de conversación (`i18n/chatFlow.ts`) está
  implementado como demo funcional en el cliente. Para producción, sustituir por
  la integración real **Typebot + Cal.com** (ver brief) — Typebot puede
  reutilizar directamente esta misma estructura de nodos/opciones como guion
  de su flujo, y N8N se encarga del webhook de reserva → confirmación → CRM.

## Pendiente antes de publicar

1. **CV en inglés** — hoy solo existe la versión en español
   (`public/documents/cv-danilo-cabezas-es.pdf`); el botón "Download CV" en
   inglés descarga el mismo PDF en español hasta que exista una versión EN.
2. **Integración real del chatbot** con Typebot + Cal.com (hoy es una demo de
   la lógica de árbol, sin backend) — el agendamiento (`slots`/`confirmed`) es
   simulado; email, WhatsApp, LinkedIn y la descarga del CV sí son reales.
3. **Formulario de contacto** — hoy no envía datos a ningún lado
   (`onSubmit` con `preventDefault`); falta conectar a un endpoint, servicio de
   formularios o el propio flujo de N8N.

## Contacto y assets reales

Centralizados en `src/lib/constants.ts` (email, teléfono, LinkedIn, CV) para
que Header/Hero/Contact/ChatWidget lean de una sola fuente:

- `public/images/danilo-cabezas.jpg` — foto de perfil (`Hero.tsx`, `About.tsx`).
- `public/documents/cv-danilo-cabezas-es.pdf` — CV descargable (botón del hero
  y rama "Descargar CV" del chatbot). Versión de **2 páginas, sin la página de
  referencias personales** del CV original (nombres y celulares de terceros) —
  no apta para publicarse tal cual en un sitio público.
- Teléfono, LinkedIn y WhatsApp (`wa.me`) — usados en `Contact.tsx` y en la
  rama "Hablar con Danilo" del `ChatWidget`.
