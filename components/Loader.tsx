"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { BRAND } from "@/lib/content";
import { AVATARS } from "./Avatar";

export const INTRO_KEY = "ear-intro-seen";
export const INTRO_EVENT = "ear-intro-done";

/**
 * 600ms brand intro, first visit per session only. The `html.intro` class is
 * set by an inline script in layout.tsx before paint, so there is no flash on
 * repeat visits. Fires `INTRO_EVENT` when it finishes so the hero can sequence.
 */
export default function Loader() {
  const root = useRef<HTMLDivElement>(null);
  const [gone, setGone] = useState(false);

  useGSAP(
    () => {
      const html = document.documentElement;
      const shouldPlay =
        html.classList.contains("intro") &&
        !window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      if (!shouldPlay) {
        html.classList.remove("intro");
        setGone(true);
        window.dispatchEvent(new CustomEvent(INTRO_EVENT));
        return;
      }

      sessionStorage.setItem(INTRO_KEY, "1");
      const tl = gsap.timeline({
        defaults: { ease: "power3.out" },
        onComplete: () => {
          html.classList.remove("intro");
          setGone(true);
          window.dispatchEvent(new CustomEvent(INTRO_EVENT));
        },
      });
      tl.from("[data-intro-face]", { scale: 0.85, autoAlpha: 0, duration: 0.45 })
        .from("[data-intro-word]", { y: 14, autoAlpha: 0, duration: 0.4 }, "-=0.25")
        .to(root.current, { autoAlpha: 0, duration: 0.35, ease: "power2.inOut" }, "+=0.25");
    },
    { scope: root }
  );

  if (gone) return null;

  return (
    <div
      ref={root}
      aria-hidden
      className="intro-screen fixed inset-0 z-[60] hidden flex-col items-center justify-center gap-4 bg-paper"
    >
      <div data-intro-face className="relative h-28 w-28 sm:h-36 sm:w-36">
        <Image src={AVATARS.logo} alt="" fill unoptimized priority className="object-contain" />
      </div>
      <p data-intro-word className="text-2xl font-medium tracking-brand sm:text-3xl">
        {BRAND}
      </p>
    </div>
  );
}
