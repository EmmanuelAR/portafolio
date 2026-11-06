"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

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

export function LanguageProvider({ children }: { children: ReactNode }) {
  // Spanish is the default for SSR / first paint; hydrate from URL, saved
  // preference, or browser language on mount.
  const [lang, setLangState] = useState<Lang>("es");

  useEffect(() => {
    const fromUrl = new URLSearchParams(window.location.search).get("lang");
    const saved = localStorage.getItem(STORAGE_KEY);
    const next = isLang(fromUrl)
      ? fromUrl
      : isLang(saved)
        ? saved
        : detectBrowserLang(navigator.language);
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setLangState(next);
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
