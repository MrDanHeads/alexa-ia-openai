export interface ContactSubmission {
  name: string;
  email: string;
  company: string;
  service: string;
  message: string;
  lang: "es" | "en";
  submittedAt: string;
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export function buildContactEmail(sub: ContactSubmission) {
  const subject = `Nuevo contacto desde danilocabezas.com — ${sub.name}${sub.service ? ` (${sub.service})` : ""}`;

  const rows: [string, string][] = [
    ["Nombre", sub.name],
    ["Email", sub.email],
    ["Empresa", sub.company || "—"],
    ["Servicio de interés", sub.service || "—"],
    ["Idioma del sitio", sub.lang === "en" ? "Inglés" : "Español"],
    ["Fecha", sub.submittedAt],
  ];

  const text = [
    "Nuevo mensaje desde el formulario de contacto de danilocabezas.com",
    "",
    ...rows.map(([label, value]) => `${label}: ${value}`),
    "",
    "Mensaje:",
    sub.message,
  ].join("\n");

  const html = `
    <div style="font-family:-apple-system,Segoe UI,Roboto,Helvetica,Arial,sans-serif;color:#0b1b33;">
      <h2 style="margin:0 0 16px;">Nuevo mensaje desde danilocabezas.com</h2>
      <table cellpadding="6" cellspacing="0" style="border-collapse:collapse;">
        ${rows
          .map(
            ([label, value]) => `
          <tr>
            <td style="font-weight:600;vertical-align:top;padding-right:12px;">${escapeHtml(label)}</td>
            <td>${escapeHtml(value)}</td>
          </tr>`
          )
          .join("")}
      </table>
      <p style="font-weight:600;margin:20px 0 4px;">Mensaje:</p>
      <p style="white-space:pre-wrap;margin:0;">${escapeHtml(sub.message)}</p>
    </div>
  `;

  return { subject, text, html };
}
