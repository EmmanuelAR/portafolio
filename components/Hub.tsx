"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { LanguageProvider, useLang } from "@/lib/i18n";
import { BRAND } from "@/lib/content";
import { hubCopy } from "@/lib/hub";
import { gsap, useGSAP, MOTION_OK, REDUCED } from "@/lib/gsap";
import { AVATARS } from "./Avatar";

function HubInner() {
  const { lang, toggle } = useLang();
  const c = hubCopy[lang];
  const root = useRef<HTMLElement>(null);
  const paths = [c.paths.advisories, c.paths.portfolio];

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        gsap.fromTo(
          "[data-reveal]",
          { opacity: 0, y: 24 },
          { opacity: 1, y: 0, duration: 0.9, stagger: 0.08, ease: "power3.out" }
        );
      });
      mm.add(REDUCED, () => {
        gsap.set("[data-reveal]", { opacity: 1, y: 0 });
      });
    },
    { scope: root, dependencies: [lang], revertOnUpdate: true }
  );

  return (
    <div className="min-h-dvh bg-paper text-ink">
      <header className="fixed inset-x-0 top-0 z-40">
        <div className="shell flex items-center justify-between pt-[max(0.75rem,env(safe-area-inset-top))] pb-3">
          <span className="flex min-h-11 items-center gap-2.5" aria-label={BRAND}>
            <span className="relative block h-7 w-7">
              <Image src={AVATARS.logo} alt="" fill unoptimized className="object-contain" priority />
            </span>
            <span className="text-[17px] font-medium tracking-brand">{BRAND}</span>
          </span>
          <button
            onClick={toggle}
            aria-label="Toggle language"
            className="inline-flex h-11 min-w-11 items-center justify-center font-mono text-xs tracking-[0.12em] text-ink/70 transition-colors hover:text-ink"
          >
            <span className={lang === "en" ? "text-ink" : ""}>en</span>
            <span className="mx-1 text-ink/30">/</span>
            <span className={lang === "es" ? "text-ink" : ""}>es</span>
          </button>
        </div>
      </header>

      <main ref={root} className="shell flex min-h-dvh flex-col justify-end pb-16 pt-28 sm:pb-20 lg:pb-24">
        <p data-reveal className="mono-label">
          {c.role}
        </p>
        <h1
          data-reveal
          className="mt-4 max-w-[18ch] text-display font-medium tracking-brand text-balance wrap-anywhere"
        >
          {c.name}
        </h1>
        <p data-reveal className="mt-4 max-w-[28ch] text-lead text-ink/70 text-balance">
          {c.lead}
        </p>

        <div className="mt-14 grid border-t border-ink/10 sm:mt-16 sm:grid-cols-2">
          {paths.map((path) => (
            <Link
              key={path.href}
              href={path.href}
              data-reveal
              className="group flex flex-col justify-between gap-6 border-b border-ink/10 py-8 transition-colors hover:bg-ink/[0.02] sm:border-b-0 sm:px-8 sm:py-10 sm:first:pl-0 sm:first:border-r sm:last:pr-0"
            >
              <div>
                <p className="mono-label">
                  {path.href === "/asesorias" ? "01" : "02"}
                  <span className="mx-2 text-ink/25">—</span>
                  {path.label}
                </p>
                <p className="mt-4 text-title font-medium tracking-tight-brand text-balance">
                  <span className="link-grow">{path.label}</span>
                </p>
                <p className="mt-3 max-w-[28ch] text-base text-ink/60 sm:text-lg">{path.blurb}</p>
              </div>
              <span
                aria-hidden
                className="font-mono text-sm tracking-[0.12em] text-ink/40 transition-colors group-hover:text-ink"
              >
                →
              </span>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
}

export default function Hub() {
  return (
    <LanguageProvider>
      <HubInner />
    </LanguageProvider>
  );
}
