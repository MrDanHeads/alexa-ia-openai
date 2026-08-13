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
cp .env.example .env.local   # y completa N8N_CONTACT_WEBHOOK_URL
npm run dev                    # http://localhost:3000
npm run build                    # build de producción
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
    api/contact/route.ts # POST — valida y reenvia el formulario a n8n
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

1. **Integración real del chatbot** con Typebot + Cal.com (hoy es una demo de
   la lógica de árbol, sin backend) — el agendamiento (`slots`/`confirmed`) es
   simulado; email, WhatsApp, LinkedIn, la descarga del CV y el formulario de
   contacto sí son reales.
2. **Configurar `N8N_CONTACT_WEBHOOK_URL` en el entorno de producción** (ver
   abajo) — sin esa variable, el formulario de contacto responde con un error
   claro en vez de fallar en silencio.

## Formulario de contacto → n8n

`Contact.tsx` es un formulario controlado que hace `POST` a
`src/app/api/contact/route.ts` (Route Handler propio, no expuesto al
cliente), el cual valida los campos server-side y reenvía el payload a un
**Webhook de n8n**.

1. En n8n, crea un workflow con un nodo **Webhook** (método `POST`) como
   trigger, y copia su URL de producción.
2. Configura `N8N_CONTACT_WEBHOOK_URL` con esa URL — copia `.env.example` a
   `.env.local` en desarrollo, o defínela como variable de entorno en tu
   plataforma de hosting (Vercel, etc.) para producción.
3. El nodo Webhook de n8n recibe este JSON; a partir de ahí puedes ramificar
   a email (ej. nodo Gmail/SMTP a `dxcabezasg@gmail.com`), a un CRM ligero
   (Notion/Airtable) o a donde prefieras:

   ```json
   {
     "name": "string",
     "email": "string",
     "company": "string | null",
     "service": "string | null",
     "message": "string",
     "lang": "es" | "en",
     "source": "danilocabezas.com",
     "submittedAt": "2026-08-13T20:44:00.000Z"
   }
   ```

4. El formulario incluye un **honeypot** (`website`, visualmente oculto):
   si llega lleno, la ruta responde éxito falso y **no** reenvía nada a
   n8n — filtra bots simples sin que el usuario real lo note.
5. Si `N8N_CONTACT_WEBHOOK_URL` no está definida, o n8n no responde,
   `Contact.tsx` muestra el mensaje de error localizado (`t.contact.error`)
   sugiriendo escribir directo al correo.

## Contacto y assets reales

Centralizados en `src/lib/constants.ts` (email, teléfono, LinkedIn, CV) para
que Header/Hero/Contact/ChatWidget lean de una sola fuente:

- `public/images/danilo-cabezas.jpg` — foto de perfil (`Hero.tsx`, `About.tsx`).
- `public/documents/cv-danilo-cabezas-{es,en}.pdf` — CV descargable por idioma
  (botón del hero y rama "Descargar CV" del chatbot, ambos vía
  `CV_URL[lang]`). Versión de una página, sin referencias personales de
  terceros — apta para publicarse en un sitio público.
- Teléfono, LinkedIn y WhatsApp (`wa.me`) — usados en `Contact.tsx` y en la
  rama "Hablar con Danilo" del `ChatWidget`.
