"use client";

import { useEffect, useState } from "react";
import { useLanguage } from "@/i18n/LanguageProvider";

const SECTION_IDS = ["inicio", "servicios", "stack", "sobre-mi", "contacto"] as const;

function useScrollSpy() {
  const [active, setActive] = useState<string>("inicio");

  useEffect(() => {
    const targets = SECTION_IDS.map((id) => document.getElementById(id)).filter(
      (el): el is HTMLElement => el !== null
    );
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: "-40% 0px -55% 0px" }
    );
    targets.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return active;
}

export function Header() {
  const { lang, setLang, t } = useLanguage();
  const active = useScrollSpy();
  const [menuOpen, setMenuOpen] = useState(false);

  const navItems = [
    { id: "inicio", label: t.nav.home },
    { id: "servicios", label: t.nav.services },
    { id: "stack", label: t.nav.stack },
    { id: "sobre-mi", label: t.nav.about },
    { id: "contacto", label: t.nav.contact },
  ];

  return (
    <header className="sticky top-0 z-50 border-b border-hairline bg-navy-deep/85 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center gap-4 px-5 py-3.5 sm:gap-8">
        <a href="#inicio" className="flex flex-shrink-0 items-center gap-2.5 font-mono text-sm font-semibold tracking-wide">
          <span className="flex h-7 w-7 items-center justify-center rounded-[3px] border border-mint text-xs text-mint">
            DC
          </span>
          <span className="hidden sm:inline">{t.brand}</span>
        </a>

        <nav className="mr-auto hidden gap-6 text-sm md:flex">
          {navItems.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              className={`border-b-[1.5px] pb-1 transition-colors ${
                active === item.id
                  ? "border-sky text-paper"
                  : "border-transparent text-paper-dim hover:text-paper hover:border-sky"
              }`}
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="ml-auto flex items-center rounded-[3px] border border-hairline-strong font-mono text-xs md:ml-0">
          {(["es", "en"] as const).map((code) => (
            <button
              key={code}
              type="button"
              onClick={() => setLang(code)}
              className={`px-2.5 py-1.5 uppercase ${
                lang === code ? "bg-sky font-bold text-ink" : "text-paper-dim"
              }`}
              aria-pressed={lang === code}
            >
              {code}
            </button>
          ))}
        </div>

        <a
          href="#contacto"
          className="hidden rounded-[3px] border border-accent bg-accent px-4 py-2.5 text-sm font-semibold text-ink transition-transform hover:-translate-y-px hover:border-mint hover:bg-mint md:inline-block"
        >
          {t.cta.book}
        </a>

        <button
          type="button"
          className="rounded-[3px] border border-hairline-strong p-2 text-paper md:hidden"
          aria-label="Abrir menú"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((v) => !v)}
        >
          ☰
        </button>
      </div>

      {menuOpen && (
        <div className="mx-auto flex max-w-6xl flex-col gap-1 px-5 pb-4 md:hidden">
          {navItems.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              onClick={() => setMenuOpen(false)}
              className="border-b border-dashed border-hairline py-2.5 text-sm text-paper-dim"
            >
              {item.label}
            </a>
          ))}
          <a
            href="#contacto"
            onClick={() => setMenuOpen(false)}
            className="mt-2 inline-block rounded-[3px] border border-accent bg-accent px-4 py-2.5 text-center text-sm font-semibold text-ink"
          >
            {t.cta.book}
          </a>
        </div>
      )}
    </header>
  );
}
