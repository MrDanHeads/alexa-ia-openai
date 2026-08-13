import type { Lang } from "@/i18n/translations";

/** Real contact details and assets, centralized so every component (header CTA,
 * hero, contact section, chat widget) reads the same source. */
export const EMAIL = "dxcabezasg@gmail.com";

export const PHONE_DISPLAY = "099 7626 521";
export const PHONE_HREF = "tel:+593997626521";
/** wa.me expects the full international number, digits only, no leading "+". */
export const WHATSAPP_NUMBER = "593997626521";

export const LINKEDIN_URL =
  "https://www.linkedin.com/in/danilo-cabezas-gualotu%C3%B1a-a83344b7/";
export const LINKEDIN_DISPLAY = "linkedin.com/in/danilo-cabezas-gualotuña";

export const CV_URL: Record<Lang, string> = {
  es: "/documents/cv-danilo-cabezas-es.pdf",
  en: "/documents/cv-danilo-cabezas-en.pdf",
};
export const CV_DOWNLOAD_FILENAME: Record<Lang, string> = {
  es: "Danilo-Cabezas-CV.pdf",
  en: "Danilo-Cabezas-Resume.pdf",
};
