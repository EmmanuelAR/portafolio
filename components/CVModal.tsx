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
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex flex-col bg-white"
    >
      <div className="flex items-center justify-between border-b border-black px-4 py-3">
        <span className="text-sm font-bold">{c.hero.cta.cv}</span>
        <div className="flex gap-3 text-sm">
          <a
            href={LINKS.cv}
            download
            className="border border-black px-3 py-1 hover:bg-black hover:text-white"
          >
            {lang === "en" ? "Download" : "Descargar"}
          </a>
          <button
            ref={closeButtonRef}
            onClick={() => setOpen(false)}
            aria-label="Close CV"
            className="border border-black px-3 py-1 hover:bg-black hover:text-white"
          >
            ✕
          </button>
        </div>
      </div>
      <iframe src={LINKS.cv} title="CV" className="flex-1 w-full" />
    </div>
  );
}
