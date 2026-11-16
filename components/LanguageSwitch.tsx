"use client";

import { useLang, useAlternateUrl } from "@/lib/i18n";

/**
 * Real links so the choice is in the URL (`?lang=en` or a bare path).
 * Each control fills the 44px bar so a tap on the row hits the link.
 */
export default function LanguageSwitch() {
  const { lang } = useLang();
  const { esUrl, enUrl } = useAlternateUrl();
  const link = "inline-flex h-11 items-center px-1.5 transition-colors hover:text-ink";

  return (
    <nav
      aria-label="Language"
      className="inline-flex h-11 items-center justify-center font-mono text-xs tracking-[0.12em]"
    >
      <a
        href={enUrl}
        className={`${link} ${lang === "en" ? "text-ink" : "text-ink/70"}`}
      >
        en
      </a>
      <span className="mx-0.5 text-ink/30" aria-hidden="true">
        /
      </span>
      <a
        href={esUrl}
        className={`${link} ${lang === "es" ? "text-ink" : "text-ink/70"}`}
      >
        es
      </a>
    </nav>
  );
}
