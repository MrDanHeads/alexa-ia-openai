import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { EMAIL } from "@/lib/constants";
import { buildContactEmail } from "@/lib/contactEmail";

export const runtime = "nodejs";

interface ContactPayload {
  name?: unknown;
  email?: unknown;
  company?: unknown;
  service?: unknown;
  message?: unknown;
  lang?: unknown;
  /** Honeypot field: real visitors never see or fill it, so any value means a bot. */
  website?: unknown;
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function badRequest(error: string) {
  return NextResponse.json({ ok: false, error }, { status: 400 });
}

export async function POST(request: Request) {
  let body: ContactPayload;
  try {
    body = await request.json();
  } catch {
    return badRequest("invalid_json");
  }

  // Honeypot: a filled hidden field means a bot filled every input on the
  // form. Reply as if it succeeded so the bot doesn't learn to skip it.
  if (typeof body.website === "string" && body.website.trim() !== "") {
    return NextResponse.json({ ok: true });
  }

  const name = typeof body.name === "string" ? body.name.trim() : "";
  const email = typeof body.email === "string" ? body.email.trim() : "";
  const message = typeof body.message === "string" ? body.message.trim() : "";
  const company = typeof body.company === "string" ? body.company.trim() : "";
  const service = typeof body.service === "string" ? body.service.trim() : "";
  const lang = body.lang === "en" ? "en" : "es";

  if (!name || !email || !message) return badRequest("missing_fields");
  if (!EMAIL_RE.test(email)) return badRequest("invalid_email");
  if (name.length > 200 || email.length > 200 || company.length > 200) {
    return badRequest("field_too_long");
  }
  if (message.length > 5000) return badRequest("field_too_long");

  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS } = process.env;
  if (!SMTP_HOST || !SMTP_PORT || !SMTP_USER || !SMTP_PASS) {
    console.error("SMTP_HOST/SMTP_PORT/SMTP_USER/SMTP_PASS are not fully set — contact form cannot send email.");
    return NextResponse.json({ ok: false, error: "not_configured" }, { status: 503 });
  }

  const port = Number(SMTP_PORT);
  const transporter = nodemailer.createTransport({
    host: SMTP_HOST,
    port,
    secure: process.env.SMTP_SECURE === "true" || port === 465,
    auth: { user: SMTP_USER, pass: SMTP_PASS },
  });

  const submittedAt = new Date().toISOString();
  const { subject, text, html } = buildContactEmail({ name, email, company, service, message, lang, submittedAt });

  try {
    await transporter.sendMail({
      from: `"Sitio web — Danilo Cabezas" <${SMTP_USER}>`,
      to: EMAIL,
      replyTo: email,
      subject,
      text,
      html,
    });
  } catch (err) {
    console.error("Failed to send contact email:", err);
    return NextResponse.json({ ok: false, error: "send_failed" }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
