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

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("en");

  useEffect(() => {
    // SSR-safe: default to "en" on server/first render, then hydrate the saved
    // preference on mount. This one-time sync is intentional.
    const saved = localStorage.getItem("portfolio-lang");
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (saved === "en" || saved === "es") setLangState(saved);
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  const setLang = (l: Lang) => {
    setLangState(l);
    localStorage.setItem("portfolio-lang", l);
  };

  const toggle = () => setLang(lang === "en" ? "es" : "en");

  return <Ctx.Provider value={{ lang, setLang, toggle }}>{children}</Ctx.Provider>;
}

export function useLang(): LangCtx {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useLang must be used within LanguageProvider");
  return ctx;
}
