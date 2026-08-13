"use client";

import { useLanguage } from "@/i18n/LanguageProvider";
import { MailIcon, PhoneIcon, LinkedInIcon } from "./icons";
import { EMAIL, PHONE_DISPLAY, PHONE_HREF, LINKEDIN_URL, LINKEDIN_DISPLAY } from "@/lib/constants";

const fieldClasses =
  "rounded-[3px] border border-hairline-strong bg-navy-deep/50 px-3 py-2.5 text-[0.95rem] text-paper placeholder:text-paper-dim/50";
const labelClasses = "flex flex-col gap-1.5 font-mono text-xs tracking-[0.04em] text-paper-dim uppercase";

export function Contact() {
  const { t } = useLanguage();

  return (
    <section id="contacto" className="border-t border-hairline py-16 sm:py-24">
      <div className="mx-auto max-w-6xl px-5">
        <div className="mb-10 sm:mb-12">
          <p className="font-mono text-xs tracking-[0.14em] text-sky uppercase">{t.contact.eyebrow}</p>
          <h2
            className="mt-2 text-2xl font-semibold text-balance sm:text-4xl"
            style={{ fontFamily: "var(--font-display)" }}
          >
            {t.contact.title}
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-8 sm:gap-14 md:grid-cols-[1.1fr_.9fr]">
          <form
            className="flex flex-col gap-3.5"
            onSubmit={(e) => {
              e.preventDefault();
            }}
          >
            <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-2">
              <label className={labelClasses}>
                {t.contact.labels.name}
                <input type="text" required className={fieldClasses} />
              </label>
              <label className={labelClasses}>
                {t.contact.labels.email}
                <input type="email" required className={fieldClasses} />
              </label>
            </div>
            <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-2">
              <label className={labelClasses}>
                {t.contact.labels.company}
                <input type="text" className={fieldClasses} />
              </label>
              <label className={labelClasses}>
                {t.contact.labels.service}
                <select className={fieldClasses}>
                  {t.contact.serviceOptions.map((opt) => (
                    <option key={opt}>{opt}</option>
                  ))}
                </select>
              </label>
            </div>
            <label className={labelClasses}>
              {t.contact.labels.message}
              <textarea required rows={4} className={`${fieldClasses} resize-y`} />
            </label>
            <button
              type="submit"
              className="mt-1 self-start rounded-[3px] border border-accent bg-accent px-5 py-3 text-sm font-semibold text-ink transition-transform hover:-translate-y-px hover:border-mint hover:bg-mint"
            >
              {t.contact.send}
            </button>
          </form>

          <div className="flex flex-col gap-3.5">
            <a
              href={`mailto:${EMAIL}`}
              className="flex items-center gap-3 rounded-[3px] border border-hairline-strong px-4 py-3.5 text-[0.92rem] transition-colors hover:border-mint"
            >
              <MailIcon className="h-5 w-5 shrink-0 text-sky" />
              {EMAIL}
            </a>
            <a
              href={PHONE_HREF}
              className="flex items-center gap-3 rounded-[3px] border border-hairline-strong px-4 py-3.5 text-[0.92rem] transition-colors hover:border-mint"
            >
              <PhoneIcon className="h-5 w-5 shrink-0 text-sky" />
              {PHONE_DISPLAY}
            </a>
            <a
              href={LINKEDIN_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 rounded-[3px] border border-hairline-strong px-4 py-3.5 text-[0.92rem] transition-colors hover:border-mint"
            >
              <LinkedInIcon className="h-5 w-5 shrink-0 text-sky" />
              {LINKEDIN_DISPLAY}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
