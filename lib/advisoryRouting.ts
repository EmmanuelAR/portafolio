import { NAME } from "./content";
import type { Lang } from "./i18n";
import { asesoriasCatalogMeta, pageImageAlt } from "./meta";
import { SITE_NAME } from "./site";

export interface AdvisoryRoute {
  /** `/asesorias` shows the only service, or the catalog when there are more. */
  index: "landing" | "catalog";
  /** Detail paths that stay in the sitemap. Empty while a sole service lives at `/asesorias`. */
  detailPaths: string[];
  /** Permanent redirects from a folded detail URL to `/asesorias`. Query strings stay on the request. */
  redirects: { source: string; destination: string; permanent: true }[];
  showBackLink: boolean;
}

type AdvisoryMeta = {
  es: { title: string; metaDescription: string; metaTitle?: string };
  en: { title: string; metaDescription: string; metaTitle?: string };
};

/**
 * One published service owns `/asesorias`. Two or more keep the catalog and
 * their own pages. The slug is data, not a special case.
 */
export function routeAdvisories(advisories: readonly { slug: string }[]): AdvisoryRoute {
  if (advisories.length === 1 && advisories[0]) {
    return {
      index: "landing",
      detailPaths: [],
      showBackLink: false,
      redirects: [
        {
          source: `/asesorias/${advisories[0].slug}`,
          destination: "/asesorias",
          permanent: true,
        },
      ],
    };
  }

  return {
    index: "catalog",
    detailPaths: advisories.map((advisory) => `/asesorias/${advisory.slug}`),
    showBackLink: advisories.length >= 2,
    redirects: [],
  };
}

/** Public path for a service. A sole service is the index; the rest keep their slug. */
export function advisoryCanonicalPath(
  advisories: readonly { slug: string }[],
  slug: string
): string {
  if (advisories.length === 1 && advisories[0]?.slug === slug) return "/asesorias";
  return `/asesorias/${slug}`;
}

/**
 * Redirect target for a detail URL, including the original query string.
 * Null when that slug should render.
 */
export function detailRedirectLocation(
  advisories: readonly { slug: string }[],
  slug: string,
  search: string
): string | null {
  const rule = routeAdvisories(advisories).redirects.find(
    (item) => item.source === `/asesorias/${slug}`
  );
  if (!rule) return null;
  if (!search) return rule.destination;
  const query = search.startsWith("?") ? search : `?${search}`;
  return `${rule.destination}${query}`;
}

/** Rebuild a query string from Next's parsed search params, preserving key order. */
export function searchFromRecord(
  params: Record<string, string | string[] | undefined> | undefined
): string {
  if (!params) return "";
  const search = new URLSearchParams();
  for (const [key, value] of Object.entries(params)) {
    if (typeof value === "string") search.append(key, value);
    else if (Array.isArray(value)) {
      for (const item of value) search.append(key, item);
    }
  }
  const query = search.toString();
  return query ? `?${query}` : "";
}

export function asesoriasIndexMeta(
  advisories: readonly AdvisoryMeta[],
  lang: Lang
): { title: string; description: string; imageAlt: string } {
  if (advisories.length === 1 && advisories[0]) {
    const copy = advisories[0][lang];
    return {
      title: copy.metaTitle ?? `${copy.title} · ${SITE_NAME}`,
      description: copy.metaDescription,
      imageAlt: `${copy.title} — ${NAME}`,
    };
  }

  const catalog = asesoriasCatalogMeta[lang];
  return {
    title: catalog.title,
    description: catalog.description,
    imageAlt: pageImageAlt.asesorias[lang],
  };
}
