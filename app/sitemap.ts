import type { MetadataRoute } from "next";
import { advisorySlugs } from "@/lib/asesorias";
import { SITE_URL } from "@/lib/site";

function entry(path: string, priority: number): MetadataRoute.Sitemap[number] {
  const url = path === "/" ? `${SITE_URL}/` : `${SITE_URL}${path}`;
  const en = path === "/" ? `${SITE_URL}/?lang=en` : `${SITE_URL}${path}?lang=en`;
  return {
    url,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority,
    alternates: {
      // Spanish is the default (bare URL); English is explicit.
      languages: { es: url, en },
    },
  };
}

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    entry("/", 1),
    entry("/portafolio", 0.9),
    entry("/asesorias", 0.9),
    ...advisorySlugs().map((slug) => entry(`/asesorias/${slug}`, 0.8)),
  ];
}
