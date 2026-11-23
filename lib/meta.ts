import type { Metadata } from "next";
import { LINKS, NAME, X_HANDLE } from "./content";
import type { Lang } from "./i18n";
import { SITE_NAME, SITE_TITLE, SITE_URL } from "./site";

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

/**
 * Absolute page URL. Spanish is the bare path. Home has no trailing slash,
 * matching the canonical Next emits for `/`. English home keeps the slash
 * before the query (`/?lang=en`), which is the form the metadata resolver writes.
 */
export function pageUrl(path: string, lang: Lang): string {
  if (path === "/") {
    return lang === "en" ? `${SITE_URL}/?lang=en` : SITE_URL;
  }
  const base = `${SITE_URL}${path}`;
  return lang === "en" ? `${base}?lang=en` : base;
}

/** hreflang and self-referencing canonical. Each language points at itself. */
export function pageAlternates(path: string, lang: Lang): Metadata["alternates"] {
  const es = pageUrl(path, "es");
  const en = pageUrl(path, "en");
  return {
    canonical: lang === "en" ? en : es,
    languages: {
      es,
      en,
      "x-default": es,
    },
  };
}

function ogImageUrl(path: string, lang: Lang): string {
  const base = path === "/" ? `${SITE_URL}/opengraph-image` : `${SITE_URL}${path}/opengraph-image`;
  return lang === "en" ? `${base}?lang=en` : base;
}

export function localizedPageMeta({
  path,
  lang,
  title,
  description,
  imageAlt,
}: {
  path: string;
  lang: Lang;
  title: string;
  description: string;
  imageAlt: string;
}): Metadata {
  const image = {
    url: ogImageUrl(path, lang),
    width: 1200,
    height: 630,
    alt: imageAlt,
  };
  return {
    title,
    description,
    alternates: pageAlternates(path, lang),
    openGraph: {
      url: pageUrl(path, lang),
      siteName: SITE_NAME,
      title,
      description,
      locale: lang === "es" ? "es_CR" : "en_US",
      images: [image],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: image,
    },
  };
}

/** Structured data shared by every page. Role copy follows the active language. */
export function personJsonLd(lang: Lang) {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: NAME,
    alternateName: "emmanuel agüero",
    url: SITE_URL,
    image: `${SITE_URL}/brand/avatar-logo.png`,
    jobTitle:
      lang === "en" ? "Founder & Software Engineer" : "Fundador e ingeniero de software",
    description: portafolioMeta[lang].description,
    email: `mailto:${LINKS.email}`,
    nationality: { "@type": "Country", name: "Costa Rica" },
    address: {
      "@type": "PostalAddress",
      addressLocality: "Alajuela",
      addressCountry: "CR",
    },
    sameAs: [
      LINKS.github,
      LINKS.linkedin,
      LINKS.instagram,
      `https://x.com/${X_HANDLE}`,
    ],
    worksFor: [
      { "@type": "Organization", name: "Cavos", url: "https://cavos.xyz/" },
      { "@type": "Organization", name: "Studio Framezz", url: "https://studioframezz.com/en" },
      { "@type": "Organization", name: "Snap Finance" },
    ],
    alumniOf: [
      { "@type": "CollegeOrUniversity", name: "Universidad Nacional, Costa Rica" },
      { "@type": "CollegeOrUniversity", name: "Universidad CENFOTEC" },
    ],
    knowsAbout: [
      "Backend engineering",
      "Fintech",
      "Web3",
      "Starknet",
      "Account abstraction",
      "Next.js",
      "AWS",
    ],
  };
}

export const hubMeta: Record<Lang, { title: string; description: string }> = {
  es: {
    title: "Emmanuel Agüero Rojas — fundador e ingeniero de software",
    description:
      "Fundador e ingeniero de software. Asesorías para emprendedores, o el portafolio — elegí un camino.",
  },
  en: {
    title: SITE_TITLE,
    description:
      "Founder & software engineer. Advisories for founders, or the portfolio — pick a path.",
  },
};

export const portafolioMeta: Record<Lang, { title: string; description: string }> = {
  es: {
    title: "emmanuel agüero — fundador e ingeniero de software",
    description:
      "Construyo productos desde Costa Rica para el mundo. Cofundador de Cavos (wallets invisibles) y Framezz (fotos de carrera con selfie); backend engineer en fintech.",
  },
  en: {
    title: `emmanuel agüero — founder & software engineer · ${SITE_NAME}`,
    description:
      "I build products from Costa Rica for the world. Co-founder of Cavos (invisible wallets) and Framezz (selfie-search race photos); backend engineer in fintech.",
  },
};

/** Alt text for the generated Open Graph images, in the page language. */
export const pageImageAlt: Record<"home" | "portafolio" | "asesorias", Record<Lang, string>> = {
  home: {
    es: "Emmanuel Agüero Rojas — fundador e ingeniero de software",
    en: "Emmanuel Agüero Rojas — founder & software engineer",
  },
  portafolio: {
    es: "emmanuel agüero — fundador e ingeniero de software",
    en: "emmanuel agüero — founder & software engineer",
  },
  asesorias: {
    es: "Asesoría de automatización con IA — Emmanuel Agüero Rojas",
    en: "AI automation consulting — Emmanuel Agüero Rojas",
  },
};

/**
 * Replaces the root layout keywords on `/asesorias` only.
 * One string, not an array: Next joins keyword arrays with "," and would drop
 * the spaces in this value.
 */
export const asesoriasPageKeywords =
  "asesoría automatización, Grok Bot, emprendedores Costa Rica";

export const asesoriasCatalogMeta: Record<
  Lang,
  { title: string; description: string }
> = {
  es: {
    title: "Asesoría de automatización con IA para emprendedores en Costa Rica",
    description:
      "¿Sin tiempo para redes, con las cuentas enredadas o el inventario a mano? En una sesión de 90 minutos armamos tu primer «empleado» con IA que te quita esas tareas.",
  },
  en: {
    title: "AI Automation Advisory for Entrepreneurs in Costa Rica",
    description:
      "No time for social media, finances tangled, or inventory tracked by hand? In a 90-minute session we build your first AI 'employee' that takes those tasks off your plate.",
  },
};
