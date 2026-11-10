import type { Metadata } from "next";
import AdvisoryList from "@/components/asesorias/AdvisoryList";
import {
  asesoriasCatalogMeta,
  langFromSearchParams,
  localizedPageMeta,
  type PageSearchParams,
} from "@/lib/meta";

export async function generateMetadata({
  searchParams,
}: {
  searchParams: PageSearchParams;
}): Promise<Metadata> {
  const lang = langFromSearchParams(await searchParams);
  const { title, description } = asesoriasCatalogMeta[lang];
  return localizedPageMeta({ path: "/asesorias", lang, title, description });
}

export default async function AsesoriasPage({
  searchParams,
}: {
  searchParams: PageSearchParams;
}) {
  const lang = langFromSearchParams(await searchParams);
  return <AdvisoryList lang={lang} />;
}
