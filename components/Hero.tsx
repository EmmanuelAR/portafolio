"use client";

import { useLang } from "@/lib/i18n";
import { content, NAME, LINKS, X_HANDLE } from "@/lib/content";
import BookCall from "./BookCall";

function openCv() {
  window.dispatchEvent(new CustomEvent("open-cv"));
}

export default function Hero() {
  const { lang } = useLang();
  const c = content[lang];
  const primary =
    "shrink-0 border border-black bg-black px-5 py-2.5 text-center text-sm font-bold text-white hover:bg-white hover:text-black transition-colors";
  const secondary =
    "shrink-0 border border-black/30 px-5 py-2.5 text-center text-sm text-black/70 hover:border-black hover:bg-black hover:text-white transition-colors";
  return (
    <section className="border-b border-black px-4 py-20 sm:px-8">
      <h1 className="cursor-blink text-3xl font-bold sm:text-5xl">{NAME}</h1>
      <p className="mt-4 text-base sm:text-lg">{c.hero.role}</p>
      <p className="mt-6 max-w-2xl text-sm text-black/80 sm:text-base">
        {c.hero.summary}
      </p>
      <p className="mt-2 text-xs text-black/60">{c.hero.location}</p>
      <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:flex lg:flex-nowrap lg:items-center">
        <button onClick={openCv} className={primary}>[ {c.hero.cta.cv} ]</button>
        <BookCall className={primary} />
        <a href={LINKS.github} target="_blank" rel="noopener" className={secondary}>[ {c.hero.cta.github} ]</a>
        <a href={LINKS.linkedin} target="_blank" rel="noopener" className={secondary}>[ {c.hero.cta.linkedin} ]</a>
        <a
          href={X_HANDLE ? `https://x.com/${X_HANDLE}` : "https://x.com"}
          target="_blank"
          rel="noopener"
          className={secondary}
        >
          [ {c.hero.cta.x} ]
        </a>
        <a href={LINKS.instagram} target="_blank" rel="noopener" className={secondary}>[ Instagram ]</a>
      </div>
    </section>
  );
}
