"use client";

import Image from "next/image";
import { useLanguage } from "@/i18n/LanguageProvider";
import { AgentFlowCanvas } from "./AgentFlowCanvas";
import { CV_URL, CV_DOWNLOAD_FILENAME } from "@/lib/constants";

export function Hero() {
  const { t, lang } = useLanguage();

  return (
    <section id="inicio" className="relative overflow-hidden pt-16 pb-20 sm:pt-24 sm:pb-24">
      <AgentFlowCanvas />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-[1]"
        style={{ backgroundImage: "linear-gradient(180deg, transparent 55%, var(--color-navy-deeper) 100%)" }}
      />

      <div className="relative z-[2] mx-auto grid max-w-6xl grid-cols-1 items-center gap-10 px-5 md:grid-cols-[1.15fr_.85fr] md:gap-14">
        <div>
          <p className="flex items-center gap-2.5 font-mono text-xs tracking-[0.14em] text-sky uppercase before:content-[''] before:h-px before:w-3.5 before:bg-mint">
            {t.hero.eyebrow}
          </p>
          <h1 className="mt-3 text-[2.1rem] leading-[1.14] font-semibold text-balance sm:text-5xl" style={{ fontFamily: "var(--font-display)" }}>
            {t.hero.titleBefore}
            <em className="text-mint not-italic">{t.hero.titleEmphasis}</em>
            {t.hero.titleAfter}
          </h1>
          <p className="mt-4 max-w-[46ch] text-[1.06rem] text-paper-dim">{t.hero.sub}</p>

          <div className="mt-7 flex flex-wrap gap-3">
            <a
              href="#contacto"
              className="rounded-[3px] border border-accent bg-accent px-5 py-3 text-sm font-semibold text-ink transition-transform hover:-translate-y-px hover:border-mint hover:bg-mint"
            >
              {t.cta.book}
            </a>
            <a
              href={CV_URL[lang]}
              download={CV_DOWNLOAD_FILENAME[lang]}
              className="rounded-[3px] border border-sky px-5 py-3 text-sm font-semibold text-mint transition-colors hover:border-mint hover:bg-mint/5"
            >
              {t.cta.cv}
            </a>
          </div>

          <dl className="mt-9 flex flex-wrap gap-x-6 gap-y-2.5 font-mono text-xs text-sky">
            {t.hero.metrics.map((m) => (
              <div key={m.label}>
                <dt className="font-body text-sm font-bold text-paper">{m.value}</dt>
                <dd>{m.label}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="order-first justify-self-center md:order-none">
          <div className="relative h-[min(280px,60vw)] w-[min(280px,60vw)] before:content-[''] before:absolute before:-inset-3.5 before:rounded-full before:border before:border-dashed before:border-hairline-strong">
            <div className="relative h-full w-full overflow-hidden rounded-full border-[1.5px] border-sky">
              <Image
                src="/images/danilo-cabezas.jpg"
                alt={t.hero.portraitAlt}
                fill
                sizes="280px"
                className="object-cover"
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
