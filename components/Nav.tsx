"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { useLang } from "@/lib/i18n";
import { content, BRAND } from "@/lib/content";
import { gsap, ScrollTrigger, useGSAP, MOTION_OK } from "@/lib/gsap";
import { AVATARS } from "./Avatar";

function openCv() {
  window.dispatchEvent(new CustomEvent("open-cv"));
}

export default function Nav() {
  const { lang, toggle } = useLang();
  const c = content[lang];
  const root = useRef<HTMLElement>(null);
  const [open, setOpen] = useState(false);

  useGSAP(
    () => {
      const el = root.current;
      if (!el) return;
      const mm = gsap.matchMedia();
      // Hide-on-scroll only on desktop — the mobile bar is the only chrome.
      mm.add(`${MOTION_OK} and (min-width: 640px)`, () => {
        const hide = gsap.to(el, { yPercent: -100, duration: 0.35, ease: "power2.inOut", paused: true });
        ScrollTrigger.create({
          start: 80,
          end: "max",
          onUpdate: (self) => {
            if (self.direction === 1) hide.play();
            else hide.reverse();
          },
          onLeaveBack: () => hide.reverse(),
        });
        ScrollTrigger.create({
          start: 24,
          end: "max",
          toggleClass: { targets: el, className: "is-scrolled" },
        });
      });
      mm.add(`${MOTION_OK} and (max-width: 639px)`, () => {
        ScrollTrigger.create({
          start: 24,
          end: "max",
          toggleClass: { targets: el, className: "is-scrolled" },
        });
      });
    },
    { scope: root }
  );

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
  const link =
    "link-grow inline-flex min-h-11 items-center text-sm text-ink/70 transition-colors hover:text-ink";

  const links = (
    <>
      <a href="#about" className={link} onClick={close}>
        {c.nav.about}
      </a>
      <a href="#work" className={link} onClick={close}>
        {c.nav.work}
      </a>
      <a href="#talk" className={link} onClick={close}>
        {c.nav.talk}
      </a>
      <button onClick={() => { close(); openCv(); }} className={`${link} cursor-pointer`}>
        {c.nav.cv}
      </button>
    </>
  );

  return (
    <nav
      ref={root}
      className={`group/nav fixed inset-x-0 top-0 z-40 transition-[background-color,border-color] duration-300 [&.is-scrolled]:border-b [&.is-scrolled]:border-ink/10 [&.is-scrolled]:bg-paper/85 [&.is-scrolled]:backdrop-blur-md ${open ? "bottom-0 flex flex-col bg-paper" : "bg-paper/0"}`}
    >
      <div className="shell flex items-center justify-between pt-[max(0.75rem,env(safe-area-inset-top))] pb-3">
        <a href="#top" aria-label={`${BRAND} — home`} className="flex min-h-11 items-center gap-2.5" onClick={close}>
          <span className="relative block h-7 w-7">
            <Image src={AVATARS.logo} alt="" fill unoptimized className="object-contain" priority />
          </span>
          <span className="text-[17px] font-medium tracking-brand">{BRAND}</span>
        </a>

        <div className="flex items-center gap-1 sm:gap-6">
          <div className="hidden items-center gap-6 sm:flex">{links}</div>
          <button
            onClick={toggle}
            aria-label="Toggle language"
            className="inline-flex h-11 min-w-11 items-center justify-center font-mono text-xs tracking-[0.12em] text-ink/70 transition-colors hover:text-ink"
          >
            <span className={lang === "en" ? "text-ink" : ""}>en</span>
            <span className="mx-1 text-ink/30">/</span>
            <span className={lang === "es" ? "text-ink" : ""}>es</span>
          </button>
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
          <a href="#about" className="flex min-h-14 items-center text-3xl font-medium tracking-tight-brand" onClick={close}>
            {c.nav.about}
          </a>
          <a href="#work" className="flex min-h-14 items-center text-3xl font-medium tracking-tight-brand" onClick={close}>
            {c.nav.work}
          </a>
          <a href="#talk" className="flex min-h-14 items-center text-3xl font-medium tracking-tight-brand" onClick={close}>
            {c.nav.talk}
          </a>
          <button
            onClick={() => { close(); openCv(); }}
            className="flex min-h-14 items-center text-left text-3xl font-medium tracking-tight-brand"
          >
            {c.nav.cv}
          </button>
        </div>
      </div>
    </nav>
  );
}
