import type { Metadata } from "next";
import { notFound } from "next/navigation";
import AdvisoryDetail from "@/components/asesorias/AdvisoryDetail";
import { advisorySlugs, getAdvisory } from "@/lib/asesorias";
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
  const { slug } = await params;
  const advisory = getAdvisory(slug);
  if (!advisory) return {};

  const lang = langFromSearchParams(await searchParams);
  const copy = advisory[lang];
  return localizedPageMeta({
    path: `/asesorias/${slug}`,
    lang,
    title: `${copy.title} · ${SITE_NAME}`,
    description: copy.metaDescription,
  });
}

export default async function AdvisoryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const advisory = getAdvisory(slug);
  if (!advisory) notFound();
  return <AdvisoryDetail advisory={advisory} />;
}
