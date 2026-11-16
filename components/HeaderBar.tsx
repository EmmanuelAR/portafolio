"use client";

import { useEffect, useState, type ReactNode } from "react";
import { content } from "@/lib/content";
import { useLang } from "@/lib/i18n";
import HeaderLinks from "./HeaderLinks";
import LanguageSwitch from "./LanguageSwitch";

/**
 * Right side of the hub and asesorías headers.
 * Desktop shows the path links; narrow screens use the same menu button as the portfolio nav.
 */
export default function HeaderBar({ brand }: { brand: ReactNode }) {
  const { lang } = useLang();
  const c = content[lang];
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  const close = () => setOpen(false);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-40 bg-paper ${open ? "bottom-0 flex flex-col" : ""}`}
    >
      <div className="shell flex items-center justify-between pt-[max(0.75rem,env(safe-area-inset-top))] pb-3">
        {brand}
        <div className="flex items-center gap-1 sm:gap-6">
          <div className="hidden items-center gap-6 sm:flex">
            <HeaderLinks onClick={close} />
          </div>
          <LanguageSwitch />
          <button
            type="button"
            className="inline-flex h-11 w-11 items-center justify-center sm:hidden"
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? c.nav.close : c.nav.menu}
            onClick={() => setOpen((v) => !v)}
          >
            <span className="sr-only">{open ? c.nav.close : c.nav.menu}</span>
            <span aria-hidden className="relative block h-3.5 w-4">
              <span
                className={`absolute left-0 block h-px w-4 bg-ink transition-transform duration-300 ${open ? "top-1.5 rotate-45" : "top-0.5"}`}
              />
              <span
                className={`absolute left-0 top-1.5 block h-px w-4 bg-ink transition-opacity duration-200 ${open ? "opacity-0" : "opacity-100"}`}
              />
              <span
                className={`absolute left-0 block h-px w-4 bg-ink transition-transform duration-300 ${open ? "top-1.5 -rotate-45" : "top-2.5"}`}
              />
            </span>
          </button>
        </div>
      </div>

      <div
        id="mobile-nav"
        hidden={!open}
        className="flex min-h-0 flex-1 flex-col border-t border-ink/10 bg-paper sm:hidden"
      >
        <div className="shell flex flex-1 flex-col justify-center gap-1 pb-[max(2rem,env(safe-area-inset-bottom))] pt-4">
          <HeaderLinks variant="drawer" onClick={close} />
        </div>
      </div>
    </header>
  );
}
