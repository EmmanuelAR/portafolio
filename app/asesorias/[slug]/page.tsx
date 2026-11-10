import type { Metadata } from "next";
import { notFound } from "next/navigation";
import AdvisoryDetail from "@/components/asesorias/AdvisoryDetail";
import { advisorySlugs, getAdvisory } from "@/lib/asesorias";
import { NAME } from "@/lib/content";
import { SITE_NAME, SITE_URL } from "@/lib/site";
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

function serviceJsonLd(slug: string) {
  if (slug !== "el-empleado-que-no-se-cansa") return null;
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "El empleado que no se cansa",
    description:
      "Sesión de asesoría de aproximadamente 90 minutos para emprendedores: diagnóstico del negocio, una tarea automatizada en vivo con Grok Bot, prompts listos para copiar, las 3 tareas siguientes por automatizar, y 7 días de disponibilidad para resolver dudas.",
    provider: {
      "@type": "Person",
      name: NAME,
    },
    areaServed: {
      "@type": "Country",
      name: "Costa Rica",
    },
    url: `${SITE_URL}/asesorias/el-empleado-que-no-se-cansa`,
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
  const jsonLd = serviceJsonLd(slug);
  return (
    <>
      {jsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      )}
      <AdvisoryDetail advisory={advisory} />
    </>
  );
}
