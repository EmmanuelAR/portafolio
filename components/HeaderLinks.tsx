"use client";

import { usePathname } from "next/navigation";
import { content } from "@/lib/content";
import { useLang, useLinkWithLang } from "@/lib/i18n";

export function isHeaderPathActive(pathname: string, href: string): boolean {
  const path = (pathname.split("?")[0] || "/").replace(/\/$/, "") || "/";
  if (href === "/asesorias") {
    return path === "/asesorias" || path.startsWith("/asesorias/");
  }
  return path === href;
}

/**
 * Asesorías / Portafolio anchors shared by every header.
 * Native `<a>` so the href is in the server HTML.
 */
export default function HeaderLinks({
  variant = "bar",
  onClick,
}: {
  variant?: "bar" | "drawer";
  onClick?: () => void;
}) {
  const { lang } = useLang();
  const linkWithLang = useLinkWithLang();
  const routerPath = usePathname();
  const pathname =
    routerPath || (typeof window !== "undefined" ? window.location.pathname : "/");
  const nav = content[lang].nav;

  const items = [
    { href: "/asesorias", label: nav.asesorias },
    { href: "/portafolio", label: nav.portafolio },
  ] as const;

  const base =
    variant === "drawer"
      ? "flex min-h-14 items-center text-3xl font-medium tracking-tight-brand transition-colors hover:text-ink"
      : "link-grow inline-flex min-h-11 items-center text-sm transition-colors hover:text-ink";

  return (
    <>
      {items.map((item) => {
        const active = isHeaderPathActive(pathname, item.href);
        return (
          <a
            key={item.href}
            href={linkWithLang(item.href)}
            aria-current={active ? "page" : undefined}
            onClick={onClick}
            className={`${base} ${active ? "text-ink" : "text-ink/70"}`}
          >
            {item.label}
          </a>
        );
      })}
    </>
  );
}
