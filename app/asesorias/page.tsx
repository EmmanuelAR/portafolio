import type { Metadata } from "next";
import AdvisoryList from "@/components/asesorias/AdvisoryList";
import {
  asesoriasCatalogMeta,
  langFromSearchParams,
  localizedPageMeta,
  pageImageAlt,
  type PageSearchParams,
} from "@/lib/meta";

export async function generateMetadata({
  searchParams,
}: {
  searchParams: PageSearchParams;
}): Promise<Metadata> {
  const lang = langFromSearchParams(await searchParams);
  const { title, description } = asesoriasCatalogMeta[lang];
  return localizedPageMeta({
    path: "/asesorias",
    lang,
    title,
    description,
    imageAlt: pageImageAlt.asesorias[lang],
  });
}

export default async function AsesoriasPage({
  searchParams,
}: {
  searchParams: PageSearchParams;
}) {
  const lang = langFromSearchParams(await searchParams);
  return <AdvisoryList lang={lang} />;
}
