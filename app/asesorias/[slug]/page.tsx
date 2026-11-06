import type { Metadata } from "next";
import { notFound } from "next/navigation";
import AdvisoryDetail from "@/components/asesorias/AdvisoryDetail";
import { advisorySlugs, getAdvisory } from "@/lib/asesorias";
import { SITE_NAME, SITE_URL } from "@/lib/site";

export function generateStaticParams() {
  return advisorySlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const advisory = getAdvisory(slug);
  if (!advisory) return {};

  const title = `${advisory.en.title} · ${SITE_NAME}`;
  const description = advisory.en.tagline;
  const path = `/asesorias/${slug}`;

  return {
    title,
    description,
    alternates: {
      canonical: path,
      languages: {
        en: path,
        es: `${path}?lang=es`,
        "x-default": path,
      },
    },
    openGraph: {
      url: `${SITE_URL}${path}`,
      title,
      description,
    },
  };
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
