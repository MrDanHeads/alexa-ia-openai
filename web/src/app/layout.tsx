import type { Metadata } from "next";
import { LanguageProvider } from "@/i18n/LanguageProvider";
import "./globals.css";

export const metadata: Metadata = {
  title: "Danilo Cabezas — CTO & Consultor en IA",
  description:
    "Ingeniero de Sistemas Senior / CTO / Consultor en Inteligencia Artificial y Ciencia de Datos. Automatización con agentes, Business Intelligence y arquitectura ERP/Cloud.",
  metadataBase: new URL("https://danilocabezas.com"),
  openGraph: {
    title: "Danilo Cabezas — CTO & Consultor en IA",
    description:
      "Ingeniero de Sistemas Senior especializado en automatización con agentes de IA, Business Intelligence y arquitectura ERP/Cloud.",
    url: "https://danilocabezas.com",
    siteName: "Danilo Cabezas",
    locale: "es_EC",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className="h-full antialiased">
      <body className="flex min-h-full flex-col">
        <LanguageProvider>{children}</LanguageProvider>
      </body>
    </html>
  );
}
