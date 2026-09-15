"use client";

import { useRef } from "react";
import { useLang } from "@/lib/i18n";
import { content } from "@/lib/content";
import { gsap, SplitText, useGSAP, MOTION_OK, REDUCED } from "@/lib/gsap";
import { INTRO_EVENT } from "./Loader";
import BookCall from "./BookCall";
import Marked from "./Marked";

export default function Hero() {
  const { lang } = useLang();
  const c = content[lang];
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add(MOTION_OK, () => {
        const heads = gsap.utils.toArray<HTMLElement>("[data-split]");
        const splits = heads.map((h) =>
          SplitText.create(h, { type: "lines", mask: "lines", linesClass: "split-line" })
        );
        const lines = splits.flatMap((s) => s.lines);
        const marks = gsap.utils.toArray<HTMLElement>(".hl[data-draw]");
        const rest = gsap.utils.toArray<HTMLElement>("[data-reveal]");

        const tl = gsap.timeline({ paused: true, defaults: { ease: "power3.out" } });
        tl.set(heads, { autoAlpha: 1 })
          .from(lines, { yPercent: 110, duration: 1.1, stagger: 0.09 })
          .to(marks, { backgroundSize: "100% 100%", duration: 0.7, ease: "power2.inOut" }, "-=0.55")
          .to(rest, { opacity: 1, y: 0, duration: 0.9, stagger: 0.08 }, "-=0.7");

        const play = () => tl.play();
        if (document.documentElement.classList.contains("intro")) {
          window.addEventListener(INTRO_EVENT, play, { once: true });
        } else {
          play();
        }
        return () => {
          window.removeEventListener(INTRO_EVENT, play);
          splits.forEach((s) => s.revert());
        };
      });

      mm.add(REDUCED, () => {
        gsap.set("[data-split], [data-reveal]", { autoAlpha: 1, y: 0 });
        gsap.set(".hl[data-draw]", { backgroundSize: "100% 100%" });
      });
    },
    { scope: root, dependencies: [lang], revertOnUpdate: true }
  );

  return (
    <section
      ref={root}
      data-motion-own
     
      className="relative flex min-h-dvh flex-col justify-end"
    >
      <div className="shell w-full pb-16 pt-32 sm:pb-20 lg:pb-24">
        {/* Keyed by language: SplitText rewrites these nodes, so React must
            re-create them (not patch text) when the copy changes. */}
        <h1
          key={`h1-${lang}`}
          data-split
          className="max-w-[12ch] text-display font-medium tracking-brand text-balance wrap-anywhere [.js_&]:invisible"
        >
          {c.hero.greeting}
        </h1>
        <p
          key={`h2-${lang}`}
          data-split
          className="mt-3 max-w-[22ch] text-title font-medium tracking-tight-brand text-balance wrap-anywhere [.js_&]:invisible sm:mt-5"
        >
          <Marked text={c.hero.headline} />
        </p>

        <div className="mt-10 flex flex-col gap-8 sm:mt-14">
          <p data-reveal className="max-w-[40ch] text-lead text-ink/75">
            <Marked text={c.hero.lead} />
          </p>
          <div data-reveal className="flex w-full max-w-md flex-col gap-3 sm:max-w-none sm:flex-row sm:flex-wrap">
            <BookCall label={c.hero.cta.primary} className="btn btn-primary w-full sm:w-auto" />
            <a href="#work" className="btn btn-secondary w-full sm:w-auto">
              {c.hero.cta.secondary}
              <span aria-hidden>↓</span>
            </a>
          </div>
        </div>

        <p data-reveal className="mono-label mt-14 sm:mt-20">
          {c.hero.location}
        </p>
      </div>
    </section>
  );
}
