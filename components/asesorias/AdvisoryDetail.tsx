"use client";

import { useEffect, type ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import { LanguageProvider, useLang, useLinkWithLang, type Lang } from "@/lib/i18n";
import {
  asesoriasUi,
  advisoryCopy,
  landingCopy,
  landingWhatsappMessage,
  whatsappUrl,
  type Advisory,
} from "@/lib/asesorias";
import { trackMeta } from "@/lib/metaPixel";
import SiteChrome from "../SiteChrome";

const LANDING_SLUG = "el-empleado-que-no-se-cansa";
const LANDING_VIDEO = "/asesorias/el-empleado-que-no-se-cansa.mp4";
const LANDING_POSTER = "/asesorias/el-empleado-que-no-se-cansa-poster.jpg";
const PORTRAIT = "/asesorias/emmanuel-asesoria.jpg";

function WhatsAppButton({ href, label }: { href: string; label: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="btn btn-primary w-full"
      onClick={() => trackMeta("Contact")}
    >
      {label}
    </a>
  );
}

function Block({
  index,
  label,
  children,
  className = "mt-12 border-t border-ink/10 pt-12 sm:mt-16 sm:pt-16",
}: {
  index: string;
  label: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section className={className}>
      <div className="grid gap-y-6 md:grid-cols-[minmax(9rem,12rem)_minmax(0,1fr)] md:gap-x-12">
        <h2 className="mono-label">
          <span aria-hidden className="text-ink/35">
            {index}
          </span>
          <span aria-hidden className="mx-2 text-ink/25">
            —
          </span>
          {label}
        </h2>
        {children}
      </div>
    </section>
  );
}

function BulletList({ items, loose = false }: { items: string[]; loose?: boolean }) {
  return (
    <ul
      className={`text-lg leading-snug text-ink/80 sm:text-xl ${loose ? "space-y-4" : "space-y-3"}`}
    >
      {items.map((item) => (
        <li key={item} className="flex gap-3">
          <span aria-hidden className="mt-2 h-1 w-1 shrink-0 rounded-full bg-ink/40" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

function DetailInner({
  advisory,
  showBackLink,
}: {
  advisory: Advisory;
  showBackLink: boolean;
}) {
  const { lang } = useLang();
  const linkWithLang = useLinkWithLang();
  const ui = asesoriasUi[lang];
  const copy = advisoryCopy(advisory, lang);
  const landing = landingCopy[lang];
  const isLanding = advisory.slug === LANDING_SLUG;
  const message = isLanding ? landingWhatsappMessage(lang) : copy.whatsappMessage;
  const wa = whatsappUrl(message);

  useEffect(() => {
    if (!isLanding) return;
    trackMeta("ViewContent");
  }, [isLanding]);

  return (
    <div className="min-h-dvh bg-paper text-ink">
      <SiteChrome />
      <main className="shell pb-24 pt-28 sm:pb-32 sm:pt-32">
        {showBackLink ? (
          <Link
            href={linkWithLang("/asesorias")}
            className="link-grow mono-label inline-flex min-h-11 items-center text-ink/55 transition-colors hover:text-ink"
          >
            ← {ui.backToList}
          </Link>
        ) : null}

        <p className={`mono-label ${showBackLink ? "mt-5 sm:mt-8" : ""}`}>{copy.serviceLabel}</p>
        <h1 className="mt-3 max-w-[16ch] text-display font-medium tracking-brand text-balance sm:mt-4">
          {copy.title}
        </h1>
        <p className="mt-3 max-w-[36ch] text-lead text-ink/80 text-balance sm:mt-4">
          {isLanding ? landing.promise : copy.tagline}
        </p>

        <div className="mt-5 w-full max-w-sm">
          <WhatsAppButton href={wa} label={copy.whatsappCta} />
        </div>

        {isLanding && (
          <div className="mx-auto mt-8 w-[min(100%,calc(58svh*9/16))]">
            <video
              className="aspect-[9/16] h-auto w-full max-h-[58svh] rounded-[4px] bg-ink object-contain"
              width={720}
              height={1280}
              controls
              playsInline
              preload="metadata"
              poster={LANDING_POSTER}
              aria-label={copy.title}
            >
              <source src={LANDING_VIDEO} type="video/mp4" />
              {lang === "en"
                ? "Your browser can't play this video."
                : "Tu navegador no reproduce este video."}
            </video>
          </div>
        )}

        <Block
          index="00"
          label={copy.hookLabel}
          className="mt-12 border-t border-ink/10 pt-12 sm:mt-16 sm:pt-16"
        >
          <div className="max-w-[48ch]">
            <h2 className="text-title font-medium tracking-tight-brand text-balance">
              {copy.hookTitle}
            </h2>
            <p className="mt-4 text-lg leading-snug text-ink/70 sm:text-xl">{copy.hookBody}</p>
          </div>
        </Block>

        <Block index="01" label={copy.aboutHeading}>
          <BulletList items={copy.about} />
        </Block>

        <Block index="02" label={copy.deliverablesHeading}>
          <BulletList items={copy.deliverables} loose />
        </Block>

        {isLanding && (
          <Block index="03" label={landing.examplesHeading}>
            <BulletList items={landing.examples} />
          </Block>
        )}

        {isLanding && (
          <Block index="04" label={landing.bioHeading}>
            <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:gap-6">
              <div className="relative h-40 w-40 shrink-0 overflow-hidden rounded-[4px] sm:h-48 sm:w-48">
                <Image
                  src={PORTRAIT}
                  alt="Emmanuel Agüero Rojas"
                  fill
                  sizes="(min-width: 640px) 192px, 160px"
                  className="object-cover object-top"
                />
              </div>
              <p className="max-w-[42ch] text-lg leading-snug text-ink/80 sm:text-xl">{landing.bio}</p>
            </div>
          </Block>
        )}

        <Block index={isLanding ? "05" : "03"} label={copy.logisticsHeading}>
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
        </Block>

        {isLanding && (
          <Block index="06" label={landing.faqHeading}>
            <div className="max-w-[48ch] divide-y divide-ink/10 border-y border-ink/10">
              {landing.faq.map((item) => (
                <details key={item.question} className="group py-4">
                  <summary className="cursor-pointer marker:text-ink/40">
                    <h3 className="inline text-lg font-medium leading-snug text-ink">
                      {item.question}
                    </h3>
                  </summary>
                  <p className="mt-2 text-lg leading-snug text-ink/70">{item.answer}</p>
                </details>
              ))}
            </div>
          </Block>
        )}

        <section className="mt-12 border-t border-ink/10 pt-12 sm:mt-16 sm:pt-16">
          <div className="w-full max-w-sm">
            <WhatsAppButton href={wa} label={copy.whatsappCta} />
          </div>
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
  showBackLink = false,
}: {
  advisory: Advisory;
  lang?: Lang;
  /** Shown only when another advisory exists to return to. */
  showBackLink?: boolean;
}) {
  return (
    <LanguageProvider initialLang={lang}>
      <DetailInner advisory={advisory} showBackLink={showBackLink} />
    </LanguageProvider>
  );
}
