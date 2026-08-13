import type { Lang } from "./translations";

export type ChatStateId =
  | "start"
  | "area"
  | "services"
  | "slots"
  | "confirmed"
  | "noslot"
  | "cv"
  | "cvsent"
  | "direct"
  | "email";

export interface ChatOption {
  label: string;
  next: ChatStateId;
  /** Side effect to run when this option is chosen, in addition to the state transition. */
  action?: "mailto";
}

export interface ChatNode {
  message: string;
  options: ChatOption[];
}

export type ChatFlow = Record<ChatStateId, ChatNode>;

export const chatFlows: Record<Lang, ChatFlow> = {
  es: {
    start: {
      message: "¡Hola! 👋 Soy el asistente virtual de Danilo. ¿En qué puedo ayudarte hoy?",
      options: [
        { label: "📅 Agendar consultoría", next: "area" },
        { label: "🧩 Conocer servicios", next: "services" },
        { label: "📄 Descargar CV", next: "cv" },
        { label: "💬 Hablar con Danilo", next: "direct" },
      ],
    },
    area: {
      message: "Perfecto. ¿Sobre qué área necesitas asesoría?",
      options: [
        { label: "IA & Automatización", next: "slots" },
        { label: "BI & Analytics", next: "slots" },
        { label: "TI & ERP", next: "slots" },
        { label: "No estoy seguro", next: "slots" },
      ],
    },
    services: {
      message: "Estos son mis tres frentes de trabajo:",
      options: [
        { label: "IA & Automatización — quiero esto", next: "slots" },
        { label: "BI & Analytics — quiero esto", next: "slots" },
        { label: "TI & ERP — quiero esto", next: "slots" },
        { label: "Volver al menú", next: "start" },
      ],
    },
    slots: {
      message:
        "Te muestro los horarios disponibles (Cal.com):\n▤ Martes 10:00  ▤ Miércoles 15:00  ▤ Jueves 09:30",
      options: [
        { label: "Confirmar martes 10:00", next: "confirmed" },
        { label: "Ningún horario me sirve", next: "noslot" },
      ],
    },
    confirmed: {
      message:
        "¡Listo! ✅ Tu reunión quedó agendada. Te llegará la confirmación por correo. ¿Quieres que te envíe también el CV?",
      options: [
        { label: "Sí, enviar CV", next: "cvsent" },
        { label: "No, gracias", next: "start" },
      ],
    },
    noslot: {
      message:
        "Sin problema. Déjame tu correo y Danilo coordinará contigo directamente. (demo — captura de email)",
      options: [{ label: "Volver al menú", next: "start" }],
    },
    cv: {
      message:
        "Aquí tienes mi CV 📄 (archivo pendiente de adjuntar en esta demo). ¿Quieres que también te lo envíe por correo?",
      options: [
        { label: "Sí, enviarlo", next: "cvsent" },
        { label: "Agendar una llamada", next: "area" },
        { label: "No, gracias", next: "start" },
      ],
    },
    cvsent: {
      message: "Perfecto, quedó registrado. ¡Gracias por escribir! 🙌",
      options: [{ label: "Volver al menú", next: "start" }],
    },
    direct: {
      message: "Puedes escribirle directo a Danilo por:",
      options: [
        { label: "✉ Email", next: "email", action: "mailto" },
        { label: "💬 WhatsApp", next: "start" },
        { label: "in LinkedIn", next: "start" },
      ],
    },
    email: {
      message: "Abriendo tu cliente de correo hacia dxcabezasg@gmail.com…",
      options: [{ label: "Volver al menú", next: "start" }],
    },
  },
  en: {
    start: {
      message: "Hi! 👋 I'm Danilo's virtual assistant. How can I help you today?",
      options: [
        { label: "📅 Book a consultation", next: "area" },
        { label: "🧩 See services", next: "services" },
        { label: "📄 Download CV", next: "cv" },
        { label: "💬 Talk to Danilo", next: "direct" },
      ],
    },
    area: {
      message: "Great. Which area do you need advice on?",
      options: [
        { label: "AI & Automation", next: "slots" },
        { label: "BI & Analytics", next: "slots" },
        { label: "IT & ERP", next: "slots" },
        { label: "Not sure", next: "slots" },
      ],
    },
    services: {
      message: "Here are my three focus areas:",
      options: [
        { label: "AI & Automation — I want this", next: "slots" },
        { label: "BI & Analytics — I want this", next: "slots" },
        { label: "IT & ERP — I want this", next: "slots" },
        { label: "Back to menu", next: "start" },
      ],
    },
    slots: {
      message: "Here are the open slots (Cal.com):\n▤ Tue 10:00  ▤ Wed 15:00  ▤ Thu 09:30",
      options: [
        { label: "Confirm Tue 10:00", next: "confirmed" },
        { label: "None of these work", next: "noslot" },
      ],
    },
    confirmed: {
      message:
        "Done! ✅ Your meeting is booked. You'll get a confirmation by email. Want me to send the CV too?",
      options: [
        { label: "Yes, send CV", next: "cvsent" },
        { label: "No, thanks", next: "start" },
      ],
    },
    noslot: {
      message: "No problem. Leave your email and Danilo will coordinate directly. (demo — email capture)",
      options: [{ label: "Back to menu", next: "start" }],
    },
    cv: {
      message: "Here's my CV 📄 (file pending upload in this demo). Want it emailed to you as well?",
      options: [
        { label: "Yes, email it", next: "cvsent" },
        { label: "Book a call", next: "area" },
        { label: "No, thanks", next: "start" },
      ],
    },
    cvsent: {
      message: "Got it, all set. Thanks for reaching out! 🙌",
      options: [{ label: "Back to menu", next: "start" }],
    },
    direct: {
      message: "You can reach Danilo directly via:",
      options: [
        { label: "✉ Email", next: "email", action: "mailto" },
        { label: "💬 WhatsApp", next: "start" },
        { label: "in LinkedIn", next: "start" },
      ],
    },
    email: {
      message: "Opening your mail client to dxcabezasg@gmail.com…",
      options: [{ label: "Back to menu", next: "start" }],
    },
  },
};
