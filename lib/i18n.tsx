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

const STORAGE_KEY = "portfolio-lang";

function isLang(v: unknown): v is Lang {
  return v === "en" || v === "es";
}

/** Browser language → site lang. Only `en*` is English; everything else Spanish. */
export function detectBrowserLang(
  language = typeof navigator !== "undefined" ? navigator.language : "es"
): Lang {
  return language.toLowerCase().startsWith("en") ? "en" : "es";
}

export function LanguageProvider({
  children,
  initialLang = "es",
}: {
  children: ReactNode;
  initialLang?: Lang;
}) {
  const [lang, setLangState] = useState<Lang>(initialLang);

  useEffect(() => {
    const fromUrl = new URLSearchParams(window.location.search).get("lang");
    const saved = localStorage.getItem(STORAGE_KEY);
    const next = isLang(fromUrl)
      ? fromUrl
      : isLang(saved)
        ? saved
        : detectBrowserLang(navigator.language);
    if (next !== lang) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setLangState(next);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  const setLang = (l: Lang) => {
    setLangState(l);
    localStorage.setItem(STORAGE_KEY, l);
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
  const pathname = usePathname();
  const searchParams = useSearchParams();
  
  const esParams = new URLSearchParams(searchParams.toString());
  esParams.delete("lang");
  const esQuery = esParams.toString();
  const esUrl = esQuery ? `${pathname}?${esQuery}` : pathname;
  
  const enParams = new URLSearchParams(searchParams.toString());
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
