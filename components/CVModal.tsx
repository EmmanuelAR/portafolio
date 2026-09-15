"use client";

import { useEffect, useRef, useState } from "react";
import { useLang } from "@/lib/i18n";
import { content, LINKS } from "@/lib/content";

export default function CVModal() {
  const { lang } = useLang();
  const c = content[lang];
  const [open, setOpen] = useState(false);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const openHandler = () => setOpen(true);
    const keyHandler = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("open-cv", openHandler);
    window.addEventListener("keydown", keyHandler);
    return () => {
      window.removeEventListener("open-cv", openHandler);
      window.removeEventListener("keydown", keyHandler);
    };
  }, []);

  useEffect(() => {
    if (open) {
      closeButtonRef.current?.focus();
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  if (!open) return null;

  return (
    <div role="dialog" aria-modal="true" aria-label={c.cta.cv} className="fixed inset-0 z-50 flex flex-col bg-paper">
      <div className="flex flex-col gap-3 border-b border-ink/10 px-5 py-3 pt-[max(0.75rem,env(safe-area-inset-top))] sm:flex-row sm:items-center sm:justify-between sm:px-8 lg:px-12">
        <span className="text-sm font-medium tracking-tight-brand">{c.cta.cv}</span>
        <div className="flex gap-2">
          <a href={LINKS.cv} download className="btn btn-secondary flex-1 px-4 py-2 text-sm sm:flex-none">
            {c.cta.download}
          </a>
          <button
            ref={closeButtonRef}
            onClick={() => setOpen(false)}
            aria-label={c.cta.close}
            className="btn btn-primary flex-1 px-4 py-2 text-sm sm:flex-none"
          >
            {c.cta.close} <span aria-hidden>esc</span>
          </button>
        </div>
      </div>
      <iframe src={LINKS.cv} title="CV" className="w-full flex-1" />
    </div>
  );
}
