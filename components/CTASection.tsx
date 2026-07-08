"use client";

import { useLang } from "@/lib/i18n";
import { content, LINKS } from "@/lib/content";
import BookCall from "./BookCall";

function openCv() {
  window.dispatchEvent(new CustomEvent("open-cv"));
}

export default function CTASection() {
  const { lang } = useLang();
  const c = content[lang];
  const primary =
    "shrink-0 border border-black bg-black px-5 py-2.5 text-center text-sm font-bold text-white hover:bg-white hover:text-black transition-colors";
  return (
    <section className="border-b border-black px-4 py-16 sm:px-8">
      <h2 className="text-lg font-bold">{c.cta2.heading}</h2>
      <p className="mt-4 max-w-2xl text-sm text-black/80 sm:text-base">
        {c.cta2.subtext}
      </p>
      <div className="mt-8 flex flex-wrap gap-3">
        <button onClick={openCv} className={primary}>
          [ {c.hero.cta.cv} ]
        </button>
        <BookCall className={primary} />
        <a href={`mailto:${LINKS.email}`} className={primary}>
          [ {c.hero.cta.email} ]
        </a>
      </div>
    </section>
  );
}
