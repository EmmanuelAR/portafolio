import Home from "@/components/Home";
import { getContributions } from "@/lib/github";
import type { Metadata } from "next";
import { SITE_DESCRIPTION, SITE_TITLE, SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: SITE_TITLE,
  description: SITE_DESCRIPTION,
  alternates: {
    canonical: "/portafolio",
    languages: {
      en: "/portafolio",
      es: "/portafolio?lang=es",
      "x-default": "/portafolio",
    },
  },
  openGraph: {
    url: `${SITE_URL}/portafolio`,
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
  },
};

export default async function PortafolioPage() {
  const contributions = await getContributions("EmmanuelAR");
  return <Home contributions={contributions} />;
}
