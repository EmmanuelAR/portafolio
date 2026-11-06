import type { Metadata } from "next";
import Hub from "@/components/Hub";
import { NAME } from "@/lib/content";
import { SITE_NAME, SITE_URL } from "@/lib/site";

const title = `${NAME} · ${SITE_NAME}`;
const description =
  "Founder & software engineer. Advisories for founders, or the portfolio — pick a path.";

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: "/",
    languages: { en: "/", es: "/?lang=es", "x-default": "/" },
  },
  openGraph: {
    url: SITE_URL,
    title,
    description,
  },
};

export default function Page() {
  return <Hub />;
}
