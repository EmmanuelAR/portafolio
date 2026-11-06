import type { Metadata } from "next";
import AdvisoryList from "@/components/asesorias/AdvisoryList";
import { SITE_NAME, SITE_URL } from "@/lib/site";

const title = `Advisories · ${SITE_NAME}`;
const description =
  "Automation advisories for founders — practical sessions to diagnose, automate, and leave with a clear next map.";

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: "/asesorias",
    languages: {
      en: "/asesorias",
      es: "/asesorias?lang=es",
      "x-default": "/asesorias",
    },
  },
  openGraph: {
    url: `${SITE_URL}/asesorias`,
    title,
    description,
  },
};

export default function AsesoriasPage() {
  return <AdvisoryList />;
}
