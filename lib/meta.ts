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
 * hreflang and self-referencing canonical.
 * Spanish is the bare path; English uses `?lang=en`.
 * Each language's canonical points to itself.
 */
export function pageAlternates(path: string, lang: Lang): Metadata["alternates"] {
  const en = path.includes("?") ? `${path}&lang=en` : `${path}?lang=en`;
  const canonical = lang === "en" ? en : path;
  return {
    canonical,
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
  const basePath = path === "/" ? `${SITE_URL}/` : `${SITE_URL}${path}`;
  const enPath = path === "/" ? `${SITE_URL}/?lang=en` : `${SITE_URL}${path}?lang=en`;
  const url = lang === "en" ? enPath : basePath;
  return {
    title,
    description,
    alternates: pageAlternates(path, lang),
    openGraph: {
      url,
      siteName: SITE_NAME,
      title,
      description,
      locale: lang === "es" ? "es_CR" : "en_US",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
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
    title: `emmanuel agüero — fundador e ingeniero de software · ${SITE_NAME}`,
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
