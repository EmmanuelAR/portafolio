"use client";

import Link from "next/link";
import { LanguageProvider, useLang, type Lang } from "@/lib/i18n";
import {
  asesoriasUi,
  advisoryCopy,
  whatsappUrl,
  type Advisory,
} from "@/lib/asesorias";
import SiteChrome from "../SiteChrome";

function DetailInner({ advisory }: { advisory: Advisory }) {
  const { lang } = useLang();
  const ui = asesoriasUi[lang];
  const copy = advisoryCopy(advisory, lang);
  const wa = whatsappUrl(copy.whatsappMessage);

  return (
    <div className="min-h-dvh bg-paper text-ink">
      <SiteChrome crossHref="/portafolio" />
      <main className="shell pb-24 pt-28 sm:pb-32 sm:pt-32">
        <Link
          href="/asesorias"
          className="link-grow mono-label inline-flex min-h-11 items-center text-ink/55 transition-colors hover:text-ink"
        >
          ← {ui.backToList}
        </Link>

        <p className="mono-label mt-8">{copy.serviceLabel}</p>
        <h1 className="mt-4 max-w-[16ch] text-display font-medium tracking-brand text-balance">
          {copy.title}
        </h1>
        <p className="mt-4 max-w-[36ch] text-lead text-ink/70 text-balance">{copy.tagline}</p>

        <section className="mt-16 border-t border-ink/10 pt-12 sm:mt-20 sm:pt-16">
          <div className="grid gap-y-6 md:grid-cols-[minmax(9rem,12rem)_minmax(0,1fr)] md:gap-x-12">
            <p className="mono-label">
              <span className="text-ink/35">00</span>
              <span className="mx-2 text-ink/25">—</span>
              {copy.hookLabel}
            </p>
            <div className="max-w-[48ch]">
              <h2 className="text-title font-medium tracking-tight-brand text-balance">
                {copy.hookTitle}
              </h2>
              <p className="mt-4 text-lg leading-snug text-ink/70 sm:text-xl">{copy.hookBody}</p>
            </div>
          </div>
        </section>

        <section className="mt-12 border-t border-ink/10 pt-12 sm:mt-16 sm:pt-16">
          <div className="grid gap-y-6 md:grid-cols-[minmax(9rem,12rem)_minmax(0,1fr)] md:gap-x-12">
            <p className="mono-label">
              <span className="text-ink/35">01</span>
              <span className="mx-2 text-ink/25">—</span>
              {copy.aboutHeading}
            </p>
            <ul className="space-y-3 text-lg leading-snug text-ink/80 sm:text-xl">
              {copy.about.map((item) => (
                <li key={item} className="flex gap-3">
                  <span aria-hidden className="mt-2 h-1 w-1 shrink-0 rounded-full bg-ink/40" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="mt-12 border-t border-ink/10 pt-12 sm:mt-16 sm:pt-16">
          <div className="grid gap-y-6 md:grid-cols-[minmax(9rem,12rem)_minmax(0,1fr)] md:gap-x-12">
            <p className="mono-label">
              <span className="text-ink/35">02</span>
              <span className="mx-2 text-ink/25">—</span>
              {copy.deliverablesHeading}
            </p>
            <ul className="space-y-4 text-lg leading-snug text-ink/80 sm:text-xl">
              {copy.deliverables.map((item) => (
                <li key={item} className="flex gap-3">
                  <span aria-hidden className="mt-2 h-1 w-1 shrink-0 rounded-full bg-ink/40" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="mt-12 border-t border-ink/10 pt-12 sm:mt-16 sm:pt-16">
          <div className="grid gap-y-6 md:grid-cols-[minmax(9rem,12rem)_minmax(0,1fr)] md:gap-x-12">
            <p className="mono-label">
              <span className="text-ink/35">03</span>
              <span className="mx-2 text-ink/25">—</span>
              {copy.logisticsHeading}
            </p>
            <dl className="grid gap-6 sm:grid-cols-3">
              <div>
                <dt className="mono-label">{copy.durationLabel}</dt>
                <dd className="mt-2 text-lg text-ink/80">{copy.duration}</dd>
              </div>
              <div>
                <dt className="mono-label">{copy.scheduleLabel}</dt>
                <dd className="mt-2 text-lg text-ink/80">{copy.schedule}</dd>
              </div>
              <div>
                <dt className="mono-label">{copy.paymentLabel}</dt>
                <dd className="mt-2 text-lg text-ink/80">{copy.payment}</dd>
              </div>
            </dl>
          </div>
        </section>

        <section className="mt-12 border-t border-ink/10 pt-12 sm:mt-16 sm:pt-16">
          <a href={wa} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
            {copy.whatsappCta}
          </a>
          <ul className="mt-10 max-w-[52ch] space-y-3 text-sm leading-relaxed text-ink/45">
            {copy.disclaimers.map((line) => (
              <li key={line}>{line}</li>
            ))}
          </ul>
        </section>
      </main>
    </div>
  );
}

export default function AdvisoryDetail({
  advisory,
  lang,
}: {
  advisory: Advisory;
  lang?: Lang;
}) {
  return (
    <LanguageProvider initialLang={lang}>
      <DetailInner advisory={advisory} />
    </LanguageProvider>
  );
}
