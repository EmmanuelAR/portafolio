import type { Metadata } from "next";
import { notFound, permanentRedirect } from "next/navigation";
import AdvisoryDetail from "@/components/asesorias/AdvisoryDetail";
import AdvisoryJsonLd from "@/components/asesorias/AdvisoryJsonLd";
import { advisorySlugs, getAdvisories, getAdvisory } from "@/lib/asesorias";
import {
  advisoryCanonicalPath,
  detailRedirectLocation,
  routeAdvisories,
  searchFromRecord,
} from "@/lib/advisoryRouting";
import { NAME } from "@/lib/content";
import { SITE_NAME } from "@/lib/site";
import {
  langFromSearchParams,
  localizedPageMeta,
  type PageSearchParams,
} from "@/lib/meta";

export function generateStaticParams() {
  return advisorySlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams: PageSearchParams;
}): Promise<Metadata> {
  const [{ slug }, resolvedSearch] = await Promise.all([params, searchParams]);
  const advisory = getAdvisory(slug);
  if (!advisory) return {};

  const lang = langFromSearchParams(resolvedSearch);
  const copy = advisory[lang];
  return localizedPageMeta({
    path: advisoryCanonicalPath(getAdvisories(), slug),
    lang,
    title: `${copy.title} · ${SITE_NAME}`,
    description: copy.metaDescription,
    imageAlt: `${copy.title} — ${NAME}`,
  });
}

export default async function AdvisoryPage({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams: PageSearchParams;
}) {
  const advisories = getAdvisories();
  const [{ slug }, resolvedSearch] = await Promise.all([params, searchParams]);
  const target = detailRedirectLocation(advisories, slug, searchFromRecord(resolvedSearch));
  if (target) permanentRedirect(target);

  const advisory = getAdvisory(slug);
  if (!advisory) notFound();
  const lang = langFromSearchParams(resolvedSearch);
  return (
    <>
      <AdvisoryJsonLd slug={slug} lang={lang} />
      <AdvisoryDetail
        advisory={advisory}
        lang={lang}
        showBackLink={routeAdvisories(advisories).showBackLink}
      />
    </>
  );
}
