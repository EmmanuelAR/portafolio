"use client";

import Image from "next/image";
import Link from "next/link";
import { useLang, useLinkWithLang } from "@/lib/i18n";
import { BRAND } from "@/lib/content";
import { asesoriasUi } from "@/lib/asesorias";
import { AVATARS } from "./Avatar";
import LanguageSwitch from "./LanguageSwitch";

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
          <LanguageSwitch />
        </div>
      </div>
    </header>
  );
}
