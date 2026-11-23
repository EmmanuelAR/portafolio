import type { Metadata } from "next";
import AsesoriasIndex from "@/components/asesorias/AsesoriasIndex";
import { getAdvisories } from "@/lib/asesorias";
import { asesoriasIndexMeta } from "@/lib/advisoryRouting";
import {
  asesoriasPageKeywords,
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
  const meta = asesoriasIndexMeta(getAdvisories(), lang);
  return {
    ...localizedPageMeta({
      path: "/asesorias",
      lang,
      title: meta.title,
      description: meta.description,
      imageAlt: meta.imageAlt,
    }),
    // absolute ignores a parent title.template. The layout has none today;
    // this keeps the landing title from gaining a second suffix later.
    title: { absolute: meta.title },
    keywords: asesoriasPageKeywords,
  };
}

export default async function AsesoriasPage({
  searchParams,
}: {
  searchParams: PageSearchParams;
}) {
  const lang = langFromSearchParams(await searchParams);
  return <AsesoriasIndex lang={lang} advisories={getAdvisories()} />;
}
