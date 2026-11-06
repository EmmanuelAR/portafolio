import type { Metadata } from "next";
import type { Lang } from "./i18n";
import { SITE_NAME, SITE_URL } from "./site";

export type PageSearchParams = Promise<
  Record<string, string | string[] | undefined>
>;

/** Active lang from `?lang=`. Spanish is the default when absent or not `en`. */
export function langFromSearchParams(
  sp: Record<string, string | string[] | undefined> | undefined
): Lang {
  const raw = sp?.lang;
  const v = Array.isArray(raw) ? raw[0] : raw;
  return v === "en" ? "en" : "es";
}

/** hreflang: Spanish is the bare path; English uses `?lang=en`. */
export function pageAlternates(path: string): Metadata["alternates"] {
  const en = path.includes("?") ? `${path}&lang=en` : `${path}?lang=en`;
  return {
    canonical: path,
    languages: {
      es: path,
      en,
      "x-default": path,
    },
  };
}

export function localizedPageMeta({
  path,
  lang,
  title,
  description,
}: {
  path: string;
  lang: Lang;
  title: string;
  description: string;
}): Metadata {
  const url = path === "/" ? `${SITE_URL}/` : `${SITE_URL}${path}`;
  return {
    title,
    description,
    alternates: pageAlternates(path),
    openGraph: {
      url,
      siteName: SITE_NAME,
      title,
      description,
      locale: lang === "es" ? "es_CR" : "en_US",
    },
    twitter: {
      title,
      description,
    },
  };
}

export const hubMeta: Record<Lang, { title: string; description: string }> = {
  es: {
    title: `Emmanuel Agüero Rojas · ${SITE_NAME}`,
    description:
      "Founder & software engineer. Asesorías para emprendedores, o el portafolio — elegí un camino.",
  },
  en: {
    title: `Emmanuel Agüero Rojas · ${SITE_NAME}`,
    description:
      "Founder & software engineer. Advisories for founders, or the portfolio — pick a path.",
  },
};

export const portafolioMeta: Record<Lang, { title: string; description: string }> = {
  es: {
    title: `emmanuel agüero — founder & software engineer · ${SITE_NAME}`,
    description:
      "construyo productos desde costa rica para el mundo. cofundador de cavos (wallets invisibles) y framezz (fotos de carrera con selfie), build ambassador en la spacexsi community, backend engineer en fintech.",
  },
  en: {
    title: `emmanuel agüero — founder & software engineer · ${SITE_NAME}`,
    description:
      "i build products from costa rica for the world. co-founder of cavos (invisible wallets) and framezz (selfie-search race photos), build ambassador in the spacexsi community, backend engineer in fintech.",
  },
};

export const asesoriasCatalogMeta: Record<
  Lang,
  { title: string; description: string }
> = {
  es: {
    title: `Asesorías · ${SITE_NAME}`,
    description:
      "Asesorías de automatización para emprendedores — sesiones prácticas para diagnosticar, automatizar y salir con un mapa claro.",
  },
  en: {
    title: `Advisories · ${SITE_NAME}`,
    description:
      "Automation advisories for founders — practical sessions to diagnose, automate, and leave with a clear next map.",
  },
};
