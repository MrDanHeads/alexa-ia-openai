"use client";

import { useLanguage } from "@/i18n/LanguageProvider";

export function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="border-t border-hairline py-6">
      <div className="mx-auto flex max-w-6xl flex-wrap justify-between gap-2.5 px-5 font-mono text-xs text-paper-dim">
        <span>{t.footer.rights}</span>
        <a href="#" className="hover:text-paper">
          {t.footer.privacy}
        </a>
      </div>
    </footer>
  );
}
