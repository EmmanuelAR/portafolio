"use client";

import Image from "next/image";
import { useLang } from "@/lib/i18n";
import { content } from "@/lib/content";

export default function Nav() {
  const { lang, toggle } = useLang();
  const c = content[lang];
  return (
    <nav className="sticky top-0 z-40 flex items-center justify-between border-b border-black bg-white px-4 py-3 text-sm sm:px-8">
      <a href="#top" aria-label="ear_rae — home">
        <Image
          src="/ear_rae_logo.png"
          alt="ear_rae"
          width={1739}
          height={427}
          priority
          className="h-5 w-auto"
        />
      </a>
      <div className="hidden gap-6 sm:flex">
        <a href="#about" className="hover:underline">{c.nav.about}</a>
        <a href="#work" className="hover:underline">{c.nav.work}</a>
      </div>
      <button
        onClick={toggle}
        aria-label="Toggle language"
        className="border border-black px-2 py-1 hover:bg-black hover:text-white"
      >
        {lang === "en" ? "EN | es" : "en | ES"}
      </button>
    </nav>
  );
}
