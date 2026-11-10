"use client";

import Link from "next/link";
import { LanguageProvider, useLang, useLinkWithLang, type Lang } from "@/lib/i18n";
import { asesoriasUi, getAdvisories, advisoryCopy, whatsappUrl } from "@/lib/asesorias";
import SiteChrome from "../SiteChrome";

function ListInner() {
  const { lang } = useLang();
  const linkWithLang = useLinkWithLang();
  const ui = asesoriasUi[lang];
  const advisories = getAdvisories();
  const firstAdvisory = advisories[0];
  const firstCopy = firstAdvisory ? advisoryCopy(firstAdvisory, lang) : null;
  const wa = firstCopy ? whatsappUrl(firstCopy.whatsappMessage) : "#";

  return (
    <div className="min-h-dvh bg-paper text-ink">
      <SiteChrome crossHref="/portafolio" />
      <main className="shell pb-20 pt-28 sm:pb-28 sm:pt-32">
        <section>
          <h1 className="max-w-[18ch] text-display font-medium tracking-brand text-balance">
            {ui.heroHeading}
          </h1>
          <p className="mt-6 max-w-[48ch] text-lead text-ink/70 text-balance">
            {ui.heroSubtitle}
          </p>
        </section>

        <section className="mt-16 border-t border-ink/10 pt-12 sm:mt-20 sm:pt-16">
          <h2 className="max-w-[28ch] text-title font-medium tracking-tight-brand text-balance">
            {ui.painHeading}
          </h2>
          <p className="mt-6 max-w-[52ch] text-lg leading-relaxed text-ink/70 sm:text-xl">
            {ui.painIntro}
          </p>
          <ul className="mt-8 space-y-4 text-lg leading-relaxed text-ink/80 sm:text-xl">
            {ui.painBullets.map((bullet) => (
              <li key={bullet} className="flex gap-3">
                <span
                  aria-hidden
                  className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-ink/40"
                />
                <span>{bullet}</span>
              </li>
            ))}
          </ul>
          <p className="mt-8 max-w-[52ch] text-lg font-medium leading-relaxed text-ink sm:text-xl">
            {ui.painClosing}
          </p>
        </section>

        <section className="mt-16 border-t border-ink/10 pt-12 sm:mt-20 sm:pt-16">
          <p className="max-w-[56ch] text-lg leading-relaxed text-ink/80 sm:text-xl">
            {ui.solutionText}
          </p>
          <div className="mt-10">
            <a
              href={wa}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary"
            >
              {ui.ctaButton}
            </a>
          </div>
        </section>

        {advisories.length > 0 && (
          <section className="mt-16 border-t border-ink/10 pt-12 sm:mt-20 sm:pt-16">
            <ul>
              {advisories.map((advisory) => {
                const copy = advisoryCopy(advisory, lang);
                return (
                  <li key={advisory.slug} className="border-b border-ink/10 last:border-b-0">
                    <Link
                      href={linkWithLang(`/asesorias/${advisory.slug}`)}
                      className="group grid gap-3 py-8 transition-colors hover:bg-ink/[0.02] sm:grid-cols-[minmax(0,1fr)_auto] sm:items-end sm:gap-8 sm:py-10"
                    >
                      <div>
                        <p className="mono-label">{copy.serviceLabel}</p>
                        <h3 className="mt-3 text-title font-medium tracking-tight-brand text-balance">
                          <span className="link-grow">{copy.title}</span>
                        </h3>
                        <p className="mt-3 max-w-[40ch] text-base text-ink/60 sm:text-lg">
                          {copy.hookShort}
                        </p>
                      </div>
                      <p className="mono-label sm:text-right">{copy.duration}</p>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </section>
        )}
      </main>
    </div>
  );
}

export default function AdvisoryList({ lang }: { lang?: Lang }) {
  return (
    <LanguageProvider initialLang={lang}>
      <ListInner />
    </LanguageProvider>
  );
}
