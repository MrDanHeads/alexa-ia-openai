import { NextResponse } from "next/server";

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

  const webhookUrl = process.env.N8N_CONTACT_WEBHOOK_URL;
  if (!webhookUrl) {
    console.error("N8N_CONTACT_WEBHOOK_URL is not set — contact form cannot forward submissions.");
    return NextResponse.json({ ok: false, error: "not_configured" }, { status: 503 });
  }

  try {
    const upstream = await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name,
        email,
        company: company || null,
        service: service || null,
        message,
        lang,
        source: "danilocabezas.com",
        submittedAt: new Date().toISOString(),
      }),
      // n8n webhooks can be slow to cold-start; don't hang the request forever.
      signal: AbortSignal.timeout(10_000),
    });

    if (!upstream.ok) {
      console.error(`n8n webhook responded with ${upstream.status}`);
      return NextResponse.json({ ok: false, error: "upstream_error" }, { status: 502 });
    }
  } catch (err) {
    console.error("Failed to reach n8n webhook:", err);
    return NextResponse.json({ ok: false, error: "upstream_unreachable" }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
