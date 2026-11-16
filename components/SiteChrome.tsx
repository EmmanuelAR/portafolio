"use client";

import Image from "next/image";
import Link from "next/link";
import { useLinkWithLang } from "@/lib/i18n";
import { BRAND } from "@/lib/content";
import { AVATARS } from "./Avatar";
import HeaderBar from "./HeaderBar";

/**
 * Chrome for asesorías pages: brand → hub, path links, lang toggle.
 */
export default function SiteChrome() {
  const linkWithLang = useLinkWithLang();

  return (
    <HeaderBar
      brand={
        <Link href={linkWithLang("/")} aria-label={`${BRAND} — home`} className="flex min-h-11 items-center gap-2.5">
          <span className="relative block h-7 w-7 shrink-0">
            <Image src={AVATARS.logo} alt={BRAND} fill unoptimized className="object-contain" priority />
          </span>
          <span className="whitespace-nowrap text-[17px] font-medium tracking-brand">{BRAND}</span>
        </Link>
      }
    />
  );
}
