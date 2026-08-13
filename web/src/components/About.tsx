"use client";

import { useLanguage } from "@/i18n/LanguageProvider";

export function About() {
  const { t } = useLanguage();

  return (
    <section id="sobre-mi" className="border-t border-hairline py-16 sm:py-24">
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-8 px-5 sm:gap-14 md:grid-cols-[.55fr_1.45fr]">
        <div
          className="flex h-[150px] w-[150px] items-center justify-center rounded-full border-[1.5px] border-sky"
          style={{ background: "radial-gradient(circle at 35% 30%, rgba(20,101,187,.55), rgba(0,32,77,.2))" }}
        >
          <span className="text-4xl text-mint" style={{ fontFamily: "var(--font-display)" }}>
            DC
          </span>
        </div>

        <div>
          <p className="font-mono text-xs tracking-[0.14em] text-sky uppercase">{t.about.eyebrow}</p>
          <h2
            className="mt-2 text-2xl font-semibold text-balance sm:text-4xl"
            style={{ fontFamily: "var(--font-display)" }}
          >
            {t.about.title}
          </h2>
          <p className="mt-4 max-w-[60ch] text-[1rem] text-paper-dim">{t.about.bio}</p>

          <div className="mt-7 flex flex-wrap gap-8">
            {t.about.metrics.map((m) => (
              <div key={m.label}>
                <b className="block text-3xl text-mint" style={{ fontFamily: "var(--font-display)" }}>
                  {m.value}
                </b>
                <span className="font-mono text-[0.68rem] tracking-[0.06em] text-paper-dim uppercase">
                  {m.label}
                </span>
              </div>
            ))}
          </div>

          <div className="mt-9 flex gap-0 overflow-x-auto pb-2.5">
            {t.about.timeline.map((item) => (
              <div key={item.title} className="relative w-[200px] shrink-0 pt-5.5 pr-4.5">
                <span
                  aria-hidden="true"
                  className="absolute top-1.5 left-0 h-[9px] w-[9px] rounded-full bg-mint"
                />
                <span
                  aria-hidden="true"
                  className="absolute top-[22px] right-4.5 left-0 h-px bg-hairline-strong"
                />
                <b className="block text-sm">{item.title}</b>
                <span className="text-sm text-paper-dim">{item.org}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
