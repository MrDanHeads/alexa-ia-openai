"use client";

import { useEffect, useRef, useState } from "react";
import { useLanguage } from "@/i18n/LanguageProvider";
import { chatFlows, type ChatOption, type ChatStateId } from "@/i18n/chatFlow";
import { EMAIL, CV_URL, CV_DOWNLOAD_FILENAME, WHATSAPP_NUMBER, LINKEDIN_URL } from "@/lib/constants";
import type { Lang } from "@/i18n/translations";

interface LogEntry {
  from: "bot" | "user";
  text: string;
}

const WHATSAPP_MESSAGE: Record<Lang, string> = {
  es: "Hola Danilo, vengo desde tu sitio web y quiero conversar sobre...",
  en: "Hi Danilo, I'm reaching out from your website and would like to talk about...",
};

/** Resolves an option's side effect into real anchor props, or null for a plain button. */
function linkPropsFor(action: ChatOption["action"], lang: Lang) {
  switch (action) {
    case "mailto":
      return { href: `mailto:${EMAIL}` };
    case "download":
      return { href: CV_URL[lang], download: CV_DOWNLOAD_FILENAME[lang] };
    case "whatsapp":
      return {
        href: `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MESSAGE[lang])}`,
        target: "_blank",
        rel: "noopener noreferrer",
      };
    case "linkedin":
      return { href: LINKEDIN_URL, target: "_blank", rel: "noopener noreferrer" };
    default:
      return null;
  }
}

export function ChatWidget() {
  const { lang, t } = useLanguage();
  const [open, setOpen] = useState(false);
  // The transcript is derived from this path of visited states plus the
  // label chosen at each step, rather than accumulated via an effect —
  // it's the single source of truth and re-localizes cleanly on language switch.
  const [path, setPath] = useState<ChatStateId[]>(["start"]);
  const [choices, setChoices] = useState<string[]>([]);
  const bodyRef = useRef<HTMLDivElement>(null);

  const flow = chatFlows[lang];
  const stateId = path[path.length - 1];
  const node = flow[stateId];

  const log: LogEntry[] = [];
  path.forEach((id, i) => {
    log.push({ from: "bot", text: flow[id].message });
    if (choices[i] !== undefined) log.push({ from: "user", text: choices[i] });
  });

  useEffect(() => {
    bodyRef.current?.scrollTo({ top: bodyRef.current.scrollHeight });
  }, [log.length]);

  function choose(label: string, next: ChatStateId) {
    setPath((prev) => [...prev, next]);
    setChoices((prev) => [...prev, label]);
  }

  function reset() {
    setPath(["start"]);
    setChoices([]);
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-expanded={open}
        aria-controls="chat-panel"
        className="fixed right-4 bottom-4 z-40 flex items-center gap-2.5 rounded-full border border-mint bg-accent px-4.5 py-3 text-sm font-bold text-ink shadow-[0_8px_28px_rgba(0,10,30,.45)] sm:right-7 sm:bottom-7"
      >
        <span className="h-2 w-2 animate-pulse rounded-full bg-ink motion-reduce:animate-none" />
        <span className="hidden sm:inline">{t.chat.launcher}</span>
      </button>

      {open && (
        <div
          id="chat-panel"
          role="dialog"
          aria-label={t.chat.who}
          className="fixed right-4 bottom-20 z-40 flex max-h-[70vh] w-[min(340px,calc(100vw-2rem))] flex-col rounded-[3px] border border-hairline-strong bg-navy-deep shadow-[0_20px_60px_rgba(0,8,26,.55)] sm:right-7 sm:bottom-24"
        >
          <div className="flex items-center justify-between border-b border-hairline px-3.5 py-3">
            <div className="flex items-center gap-2.5 text-sm font-bold">
              <span
                className="flex h-6.5 w-6.5 items-center justify-center rounded-full border border-sky bg-blue text-xs text-mint"
                style={{ fontFamily: "var(--font-display)" }}
              >
                DC
              </span>
              {t.chat.who}
            </div>
            <button type="button" onClick={() => setOpen(false)} aria-label="Cerrar" className="text-lg text-paper-dim">
              ×
            </button>
          </div>

          <div ref={bodyRef} className="flex flex-1 flex-col gap-2.5 overflow-y-auto p-3.5 text-sm">
            {log.map((entry, i) => (
              <div
                key={i}
                className={`max-w-[88%] rounded-[3px] border border-hairline px-2.5 py-2 whitespace-pre-line ${
                  entry.from === "user" ? "self-end bg-accent/35" : "self-start bg-blue/40"
                }`}
              >
                {entry.text}
              </div>
            ))}
            <div className="flex flex-col gap-2">
              {node.options.map((opt) => {
                const linkProps = linkPropsFor(opt.action, lang);
                const className =
                  "rounded-[3px] border border-sky px-2.5 py-2 text-left text-sm transition-colors hover:border-mint hover:bg-mint/5";
                return linkProps ? (
                  <a
                    key={opt.label}
                    {...linkProps}
                    onClick={() => choose(opt.label, opt.next)}
                    className={className}
                  >
                    {opt.label}
                  </a>
                ) : (
                  <button
                    key={opt.label}
                    type="button"
                    onClick={() => choose(opt.label, opt.next)}
                    className={className}
                  >
                    {opt.label}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="flex items-center justify-between border-t border-dashed border-hairline px-2.5 py-2">
            <span className="font-mono text-[0.6rem] text-paper-dim">{t.chat.poweredBy}</span>
            <button type="button" onClick={reset} className="font-mono text-[0.68rem] text-sky underline">
              {t.chat.reset}
            </button>
          </div>
        </div>
      )}
    </>
  );
}
