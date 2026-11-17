import type { Metadata } from "next";
import Hub from "@/components/Hub";
import {
  hubMeta,
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
  const { title, description } = hubMeta[lang];
  return localizedPageMeta({
    path: "/",
    lang,
    title,
    description,
    imageAlt: pageImageAlt.home[lang],
  });
}

export default async function Page({
  searchParams,
}: {
  searchParams: PageSearchParams;
}) {
  const lang = langFromSearchParams(await searchParams);
  return <Hub lang={lang} />;
}
