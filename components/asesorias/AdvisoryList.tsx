"use client";

import Link from "next/link";
import { LanguageProvider, useLang } from "@/lib/i18n";
import { asesoriasUi, getAdvisories, advisoryCopy } from "@/lib/asesorias";
import SiteChrome from "../SiteChrome";

function ListInner() {
  const { lang } = useLang();
  const ui = asesoriasUi[lang];
  const advisories = getAdvisories();

  return (
    <div className="min-h-dvh bg-paper text-ink">
      <SiteChrome crossHref="/portafolio" />
      <main className="shell pb-20 pt-28 sm:pb-28 sm:pt-32">
        <p className="mono-label">
          <span className="text-ink/35">01</span>
          <span className="mx-2 text-ink/25">—</span>
          {ui.catalogHeading}
        </p>
        <h1 className="mt-4 max-w-[14ch] text-display font-medium tracking-brand text-balance">
          {ui.catalogHeading}
        </h1>
        <p className="mt-4 max-w-[36ch] text-lead text-ink/70 text-balance">{ui.catalogIntro}</p>

        <ul className="mt-14 border-t border-ink/10 sm:mt-16">
          {advisories.map((advisory) => {
            const copy = advisoryCopy(advisory, lang);
            return (
              <li key={advisory.slug} className="border-b border-ink/10">
                <Link
                  href={`/asesorias/${advisory.slug}`}
                  className="group grid gap-3 py-8 transition-colors hover:bg-ink/[0.02] sm:grid-cols-[minmax(0,1fr)_auto] sm:items-end sm:gap-8 sm:py-10"
                >
                  <div>
                    <p className="mono-label">{copy.serviceLabel}</p>
                    <h2 className="mt-3 text-title font-medium tracking-tight-brand text-balance">
                      <span className="link-grow">{copy.title}</span>
                    </h2>
                    <p className="mt-3 max-w-[40ch] text-base text-ink/60 sm:text-lg">{copy.hookShort}</p>
                  </div>
                  <p className="mono-label sm:text-right">{copy.duration}</p>
                </Link>
              </li>
            );
          })}
        </ul>
      </main>
    </div>
  );
}

export default function AdvisoryList() {
  return (
    <LanguageProvider>
      <ListInner />
    </LanguageProvider>
  );
}
