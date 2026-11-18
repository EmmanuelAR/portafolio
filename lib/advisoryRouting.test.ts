import sitemap from "@/app/sitemap";
import nextConfig from "../next.config";
import { getAdvisories } from "./asesorias";
import { NAME } from "./content";
import { asesoriasCatalogMeta } from "./meta";
import { SITE_NAME, SITE_URL } from "./site";
import {
  advisoryCanonicalPath,
  asesoriasIndexMeta,
  detailRedirectLocation,
  routeAdvisories,
  searchFromRecord,
} from "./advisoryRouting";

const one = [{ slug: "alpha" }];
const two = [{ slug: "alpha" }, { slug: "beta" }];

test("one service renders on /asesorias and permanently redirects its detail url", () => {
  expect(routeAdvisories(one)).toEqual({
    index: "landing",
    detailPaths: [],
    showBackLink: false,
    redirects: [{ source: "/asesorias/alpha", destination: "/asesorias", permanent: true }],
  });
  expect(detailRedirectLocation(one, "alpha", "")).toBe("/asesorias");
  expect(detailRedirectLocation(one, "alpha", "?lang=en")).toBe("/asesorias?lang=en");
  expect(detailRedirectLocation(one, "alpha", "?lang=en&utm_source=ig&fbclid=abc")).toBe(
    "/asesorias?lang=en&utm_source=ig&fbclid=abc"
  );
  expect(detailRedirectLocation(one, "otra", "?lang=en")).toBeNull();
  expect(advisoryCanonicalPath(one, "alpha")).toBe("/asesorias");
  expect(searchFromRecord({ lang: "en", utm_source: "ig", fbclid: "abc" })).toBe(
    "?lang=en&utm_source=ig&fbclid=abc"
  );
});

test("two or more services keep the catalog, detail pages, and back link", () => {
  expect(routeAdvisories(two)).toEqual({
    index: "catalog",
    detailPaths: ["/asesorias/alpha", "/asesorias/beta"],
    showBackLink: true,
    redirects: [],
  });
  expect(detailRedirectLocation(two, "alpha", "?lang=en")).toBeNull();
  expect(detailRedirectLocation(two, "beta", "")).toBeNull();
  expect(advisoryCanonicalPath(two, "alpha")).toBe("/asesorias/alpha");
  expect(advisoryCanonicalPath(two, "beta")).toBe("/asesorias/beta");
});

test("index metadata uses the sole service in each language and the catalog when there are more", () => {
  const services = [
    {
      slug: "alpha",
      es: { title: "Alfa", metaDescription: "Descripción alfa" },
      en: { title: "Alpha", metaDescription: "Alpha description" },
    },
    {
      slug: "beta",
      es: { title: "Beta", metaDescription: "Descripción beta" },
      en: { title: "Beta", metaDescription: "Beta description" },
    },
  ];

  expect(asesoriasIndexMeta([services[0]], "es")).toEqual({
    title: `Alfa · ${SITE_NAME}`,
    description: "Descripción alfa",
    imageAlt: `Alfa — ${NAME}`,
  });
  expect(asesoriasIndexMeta([services[0]], "en")).toEqual({
    title: `Alpha · ${SITE_NAME}`,
    description: "Alpha description",
    imageAlt: `Alpha — ${NAME}`,
  });
  expect(asesoriasIndexMeta(services, "es")).toEqual({
    title: asesoriasCatalogMeta.es.title,
    description: asesoriasCatalogMeta.es.description,
    imageAlt: "Asesoría de automatización con IA — Emmanuel Agüero Rojas",
  });
  expect(asesoriasIndexMeta(services, "en").title).toBe(asesoriasCatalogMeta.en.title);
  expect(asesoriasIndexMeta(services, "en").description).toBe(asesoriasCatalogMeta.en.description);
});

test("the published catalog is one service, so sitemap and redirects omit the detail url", async () => {
  const published = getAdvisories();
  expect(published).toHaveLength(1);
  const slug = published[0].slug;
  expect(detailRedirectLocation(published, slug, "?lang=en")).toBe("/asesorias?lang=en");
  expect(routeAdvisories(published).detailPaths).toEqual([]);

  const urls = sitemap().map((item) => item.url);
  expect(urls).toContain(`${SITE_URL}/asesorias`);
  expect(urls.some((url) => url.includes(`/asesorias/${slug}`))).toBe(false);

  const redirects = await nextConfig.redirects?.();
  expect(redirects).toEqual([
    { source: `/asesorias/${slug}`, destination: "/asesorias", permanent: true },
  ]);
});
