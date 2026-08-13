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
2. **Configurar `SMTP_HOST`/`SMTP_PORT`/`SMTP_USER`/`SMTP_PASS` en el entorno
   de producción** (ver abajo) — sin esas variables, el formulario de
   contacto responde con un error claro en vez de fallar en silencio.

## Formulario de contacto → email por SMTP

`Contact.tsx` es un formulario controlado que hace `POST` a
`src/app/api/contact/route.ts` (Route Handler propio, no expuesto al
cliente), el cual valida los campos server-side y **envía un correo directo a
`dxcabezasg@gmail.com`** (constante `EMAIL` en `src/lib/constants.ts`) vía
SMTP con `nodemailer` — sin pasar por n8n.

> La integración con n8n (webhook → workflow) queda **pausada por ahora** a
> pedido explícito; el código de esa ruta se reemplazó por el envío directo
> de correo. Si más adelante se retoma, puede convivir con el envío por SMTP
> o reemplazarlo — ver la sección "Formulario de contacto → n8n" en el
> historial de git de este README para la versión anterior.

1. Copia `.env.example` a `.env.local` en desarrollo, o define las variables
   en tu plataforma de hosting (Vercel, etc.) para producción.
2. Camino más rápido — **Gmail App Password** sobre la propia cuenta
   `dxcabezasg@gmail.com`: Google Account → Security → 2-Step Verification →
   App passwords → genera una para "Mail", y úsala como `SMTP_PASS`:
   ```
   SMTP_HOST=smtp.gmail.com
   SMTP_PORT=465
   SMTP_USER=dxcabezasg@gmail.com
   SMTP_PASS=<contraseña de aplicación de 16 caracteres>
   ```
   Cualquier otro proveedor SMTP (Zoho, SES, Postmark, el correo del hosting
   de danilocabezas.com...) funciona igual, solo cambia estas variables.
3. El correo llega con **Reply-To** apuntando al email de quien escribió, así
   que basta con darle "Responder" en Gmail para contestarle directo. Incluye
   nombre, email, empresa, servicio de interés, idioma del sitio y el
   mensaje.
4. El formulario incluye un **honeypot** (`website`, visualmente oculto):
   si llega lleno, la ruta responde éxito falso y **no** envía ningún correo
   — filtra bots simples sin que el usuario real lo note.
5. Si faltan las variables SMTP, o el envío falla (credenciales inválidas,
   proveedor caído), `Contact.tsx` muestra el mensaje de error localizado
   (`t.contact.error`) sugiriendo escribir directo al correo, y conserva lo
   que el usuario escribió (no limpia el formulario en error).

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
