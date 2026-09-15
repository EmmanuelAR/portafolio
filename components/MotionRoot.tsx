"use client";

import { useRef, type ReactNode } from "react";
import { gsap, useGSAP, MOTION_OK, REDUCED } from "@/lib/gsap";
import { useLang } from "@/lib/i18n";

/**
 * Page-level motion: scroll reveals for `[data-reveal]` and marker highlights
 * (`.hl[data-draw]`) drawing in. Re-runs when the language changes because the
 * text nodes (and their marks) are re-created.
 */
export default function MotionRoot({ children }: { children: ReactNode }) {
  const scope = useRef<HTMLDivElement>(null);
  const { lang } = useLang();

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      // Sections that run their own timeline (hero) opt out with data-motion-own.
      const own = (el: HTMLElement) => !el.closest("[data-motion-own]");

      mm.add(MOTION_OK, () => {
        const reveals = gsap.utils.toArray<HTMLElement>("[data-reveal]").filter(own);
        reveals.forEach((el) => {
          const delay = Number(el.dataset.revealDelay ?? 0);
          gsap.to(el, {
            opacity: 1,
            y: 0,
            duration: 1,
            delay,
            ease: "power3.out",
            scrollTrigger: { trigger: el, start: "top 88%", once: true },
          });
        });

        const marks = gsap.utils.toArray<HTMLElement>(".hl[data-draw]").filter(own);
        marks.forEach((el) => {
          gsap.to(el, {
            backgroundSize: "100% 100%",
            duration: 0.7,
            delay: 0.25,
            ease: "power2.inOut",
            scrollTrigger: { trigger: el, start: "top 88%", once: true },
          });
        });
      });

      mm.add(REDUCED, () => {
        gsap.set(gsap.utils.toArray<HTMLElement>("[data-reveal]").filter(own), { opacity: 1, y: 0 });
        gsap.set(gsap.utils.toArray<HTMLElement>(".hl[data-draw]").filter(own), {
          backgroundSize: "100% 100%",
        });
      });
    },
    { scope, dependencies: [lang], revertOnUpdate: true }
  );

  return <div ref={scope}>{children}</div>;
}
