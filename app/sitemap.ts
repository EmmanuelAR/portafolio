import type { MetadataRoute } from "next";
import { routeAdvisories } from "@/lib/advisoryRouting";
import { getAdvisories } from "@/lib/asesorias";
import { pageUrl } from "@/lib/meta";

function entry(path: string, priority: number): MetadataRoute.Sitemap[number] {
  const url = pageUrl(path, "es");
  const en = pageUrl(path, "en");
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
    ...routeAdvisories(getAdvisories()).detailPaths.map((path) => entry(path, 0.8)),
  ];
}
