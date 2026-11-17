import type { Metadata } from "next";
import Home from "@/components/Home";
import { getContributions } from "@/lib/github";
import {
  langFromSearchParams,
  localizedPageMeta,
  pageImageAlt,
  portafolioMeta,
  type PageSearchParams,
} from "@/lib/meta";

export async function generateMetadata({
  searchParams,
}: {
  searchParams: PageSearchParams;
}): Promise<Metadata> {
  const lang = langFromSearchParams(await searchParams);
  const { title, description } = portafolioMeta[lang];
  return localizedPageMeta({
    path: "/portafolio",
    lang,
    title,
    description,
    imageAlt: pageImageAlt.portafolio[lang],
  });
}

export default async function PortafolioPage({
  searchParams,
}: {
  searchParams: PageSearchParams;
}) {
  const lang = langFromSearchParams(await searchParams);
  const contributions = await getContributions("EmmanuelAR");
  return <Home contributions={contributions} lang={lang} />;
}
