"use client";

import Image from "next/image";
import Link from "next/link";
import { useLang, useAlternateUrl, useLinkWithLang } from "@/lib/i18n";
import { BRAND } from "@/lib/content";
import { asesoriasUi } from "@/lib/asesorias";
import { AVATARS } from "./Avatar";

/**
 * Light chrome for hub / asesorías: brand → hub, one cross-link, lang toggle.
 */
export default function SiteChrome({
  crossHref,
  crossLabel,
}: {
  crossHref: string;
  crossLabel?: string;
}) {
  const { lang } = useLang();
  const { esUrl, enUrl } = useAlternateUrl();
  const linkWithLang = useLinkWithLang();
  const ui = asesoriasUi[lang];
  const label =
    crossLabel ??
    (crossHref.startsWith("/portafolio") ? ui.portfolioLink : ui.advisoriesLink);

  return (
    <header className="fixed inset-x-0 top-0 z-40 bg-paper">
      <div className="shell flex items-center justify-between pt-[max(0.75rem,env(safe-area-inset-top))] pb-3">
        <Link href={linkWithLang("/")} aria-label={`${BRAND} — home`} className="flex min-h-11 items-center gap-2.5">
          <span className="relative block h-7 w-7">
            <Image src={AVATARS.logo} alt={BRAND} fill unoptimized className="object-contain" priority />
          </span>
          <span className="text-[17px] font-medium tracking-brand">{BRAND}</span>
        </Link>

        <div className="flex items-center gap-4 sm:gap-6">
          <Link
            href={linkWithLang(crossHref)}
            className="link-grow inline-flex min-h-11 items-center text-sm text-ink/70 transition-colors hover:text-ink"
          >
            {label}
          </Link>
          <nav aria-label="Language" className="inline-flex h-11 min-w-11 items-center justify-center font-mono text-xs tracking-[0.12em]">
            <a
              href={enUrl}
              className={`transition-colors hover:text-ink ${lang === "en" ? "text-ink" : "text-ink/70"}`}
            >
              en
            </a>
            <span className="mx-1 text-ink/30">/</span>
            <a
              href={esUrl}
              className={`transition-colors hover:text-ink ${lang === "es" ? "text-ink" : "text-ink/70"}`}
            >
              es
            </a>
          </nav>
        </div>
      </div>
    </header>
  );
}
