"use client";

import { useLanguage } from "@/i18n/LanguageProvider";

export function Stack() {
  const { t } = useLanguage();

  return (
    <section id="stack" className="border-t border-hairline py-16 sm:py-24">
      <div className="mx-auto max-w-6xl px-5">
        <div className="mb-10 flex flex-wrap items-end justify-between gap-5 sm:mb-12">
          <div>
            <p className="font-mono text-xs tracking-[0.14em] text-sky uppercase">{t.stack.eyebrow}</p>
            <h2
              className="mt-2 text-2xl font-semibold text-balance sm:text-4xl"
              style={{ fontFamily: "var(--font-display)" }}
            >
              {t.stack.title}
            </h2>
          </div>
          <p className="max-w-[52ch] text-sm text-paper-dim">{t.stack.lede}</p>
        </div>

        <div className="flex flex-col gap-7">
          {t.stack.categories.map((cat) => (
            <div key={cat.label}>
              <p className="mb-2.5 font-mono text-xs tracking-[0.08em] text-sky uppercase">{cat.label}</p>
              <div className="flex flex-wrap gap-2.5">
                {cat.items.map((item) => (
                  <span
                    key={item}
                    className="flex items-center gap-1.5 rounded-[3px] border border-hairline-strong px-3 py-1.5 font-mono text-sm transition-colors hover:border-mint hover:bg-mint/5 before:content-[''] before:h-1.5 before:w-1.5 before:rounded-full before:bg-accent"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 border-t border-dashed border-hairline pt-7">
          <p className="mb-2.5 font-mono text-xs tracking-[0.08em] text-sky uppercase">{t.stack.certsLabel}</p>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {t.stack.certs.map((cert) => (
              <div
                key={cert}
                className="flex items-center gap-2.5 rounded-[3px] border border-hairline px-3 py-2.5 text-sm"
              >
                <span
                  className="h-4 w-4 shrink-0 bg-mint"
                  style={{ clipPath: "polygon(50% 0%,100% 25%,100% 75%,50% 100%,0% 75%,0% 25%)" }}
                />
                {cert}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
