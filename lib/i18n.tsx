"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { usePathname, useSearchParams } from "next/navigation";

export type Lang = "en" | "es";

interface LangCtx {
  lang: Lang;
  setLang: (l: Lang) => void;
  toggle: () => void;
}

const Ctx = createContext<LangCtx | null>(null);

const LEGACY_STORAGE_KEY = "portfolio-lang";

/**
 * English only when the query is exactly `lang=en`.
 * Missing, empty, or any other value is Spanish. Browser language is ignored.
 */
export function langFromSearch(search: string): Lang {
  const value = new URLSearchParams(search).get("lang");
  return value === "en" ? "en" : "es";
}

function currentQuery(
  searchParams: { toString(): string } | null
): string {
  if (searchParams) return searchParams.toString();
  if (typeof window !== "undefined") return window.location.search;
  return "";
}

export function LanguageProvider({
  children,
  initialLang = "es",
}: {
  children: ReactNode;
  initialLang?: Lang;
}) {
  const searchParams = useSearchParams();
  const routerKey = searchParams?.toString() ?? "";
  const [lang, setLangState] = useState<Lang>(initialLang);

  // routerKey / initialLang change when a client navigation keeps this
  // provider mounted. Search params are not part of the Next.js page key.
  useEffect(() => {
    // Drop the old button-toggle preference. It overrode the URL and made
    // "es" snap back to English on the next load.
    try {
      localStorage.removeItem(LEGACY_STORAGE_KEY);
    } catch {
      // Private mode can throw. The URL is still the source of truth.
    }

    const sync = () => {
      const next = langFromSearch(window.location.search);
      setLangState((current) => (current === next ? current : next));
    };
    sync();
    window.addEventListener("popstate", sync);
    window.addEventListener("pageshow", sync);
    return () => {
      window.removeEventListener("popstate", sync);
      window.removeEventListener("pageshow", sync);
    };
  }, [routerKey, initialLang]);

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  const setLang = (next: Lang) => {
    const url = new URL(window.location.href);
    if (next === "en") url.searchParams.set("lang", "en");
    else url.searchParams.delete("lang");
    const nextHref = `${url.pathname}${url.search}${url.hash}`;
    const current = `${window.location.pathname}${window.location.search}${window.location.hash}`;
    if (nextHref === current) return;
    window.history.pushState(null, "", nextHref);
    window.dispatchEvent(new PopStateEvent("popstate"));
  };

  const toggle = () => setLang(lang === "en" ? "es" : "en");

  return <Ctx.Provider value={{ lang, setLang, toggle }}>{children}</Ctx.Provider>;
}

export function useLang(): LangCtx {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useLang must be used within LanguageProvider");
  return ctx;
}

export function useAlternateUrl(): { esUrl: string; enUrl: string } {
  const path = usePathname();
  const pathname =
    path || (typeof window !== "undefined" ? window.location.pathname : "/");
  const searchParams = useSearchParams();

  const esParams = new URLSearchParams(currentQuery(searchParams));
  esParams.delete("lang");
  const esQuery = esParams.toString();
  const esUrl = esQuery ? `${pathname}?${esQuery}` : pathname;

  const enParams = new URLSearchParams(currentQuery(searchParams));
  enParams.set("lang", "en");
  const enUrl = `${pathname}?${enParams.toString()}`;

  return { esUrl, enUrl };
}

export function useLinkWithLang(): (href: string) => string {
  const { lang } = useLang();
  return (href: string) => {
    if (lang !== "en") return href;
    if (href.startsWith("http") || href.startsWith("#")) return href;
    const separator = href.includes("?") ? "&" : "?";
    return `${href}${separator}lang=en`;
  };
}
