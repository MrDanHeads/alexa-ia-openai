"use client";

import { useLanguage } from "@/i18n/LanguageProvider";
import { AgentsIcon, AnalyticsIcon, InfraIcon } from "./icons";

const ICONS = [AgentsIcon, AnalyticsIcon, InfraIcon];

export function Services() {
  const { t } = useLanguage();

  return (
    <section id="servicios" className="border-t border-hairline py-16 sm:py-24">
      <div className="mx-auto max-w-6xl px-5">
        <div className="mb-10 flex flex-wrap items-end justify-between gap-5 sm:mb-12">
          <div>
            <p className="font-mono text-xs tracking-[0.14em] text-sky uppercase">{t.services.eyebrow}</p>
            <h2
              className="mt-2 text-2xl font-semibold text-balance sm:text-4xl"
              style={{ fontFamily: "var(--font-display)" }}
            >
              {t.services.title}
            </h2>
          </div>
          <p className="max-w-[52ch] text-sm text-paper-dim">{t.services.lede}</p>
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {t.services.items.map((item, i) => {
            const Icon = ICONS[i];
            return (
              <article
                key={item.title}
                className="flex flex-col gap-3.5 rounded-[3px] border border-hairline-strong p-6 transition-all hover:-translate-y-0.5 hover:border-accent"
                style={{ background: "linear-gradient(180deg, rgba(20,101,187,.32), rgba(20,101,187,.1))" }}
              >
                <Icon className="h-8 w-8" />
                <h3 className="text-lg">{item.title}</h3>
                <p className="text-sm text-paper-dim">{item.desc}</p>
                <ul className="flex flex-col gap-1.5 text-sm">
                  {item.bullets.map((b) => (
                    <li key={b} className="flex items-baseline gap-2.5">
                      <span className="h-1.5 w-1.5 shrink-0 -translate-y-0.5 rounded-full bg-sky" />
                      {b}
                    </li>
                  ))}
                </ul>
                <a href="#contacto" className="mt-auto font-mono text-sm text-mint">
                  {t.services.cta}
                </a>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
