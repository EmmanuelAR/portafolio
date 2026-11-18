import sitemap from "@/app/sitemap";
import { localizedPageMeta, pageAlternates, pageUrl, personJsonLd, portafolioMeta } from "./meta";
import { SITE_URL } from "./site";

test("spanish portfolio title says fundador e ingeniero de software", () => {
  expect(portafolioMeta.es.title).toContain("fundador e ingeniero de software");
  expect(portafolioMeta.es.title.toLowerCase()).not.toContain("founder");
  expect(portafolioMeta.en.title.toLowerCase()).toContain("founder & software engineer");
});

test("portfolio descriptions are the short founder lines and the spanish title is at most 60 characters", () => {
  expect(portafolioMeta.es.title).toBe(
    "emmanuel agüero — fundador e ingeniero de software"
  );
  expect(portafolioMeta.es.title.length).toBeLessThanOrEqual(60);
  expect(portafolioMeta.es.title).toContain("fundador e ingeniero de software");
  expect(portafolioMeta.es.description).toBe(
    "Construyo productos desde Costa Rica para el mundo. Cofundador de Cavos (wallets invisibles) y Framezz (fotos de carrera con selfie); backend engineer en fintech."
  );
  expect(portafolioMeta.en.description).toBe(
    "I build products from Costa Rica for the world. Co-founder of Cavos (invisible wallets) and Framezz (selfie-search race photos); backend engineer in fintech."
  );
  expect(portafolioMeta.es.description.toLowerCase()).not.toMatch(/spacex/);
  expect(portafolioMeta.en.description.toLowerCase()).not.toMatch(/spacex/);
});

test("home canonical, hreflang, and sitemap use the same url without a trailing slash", () => {
  expect(pageUrl("/", "es")).toBe(`${SITE_URL}`);
  expect(pageUrl("/", "en")).toBe(`${SITE_URL}/?lang=en`);
  expect(pageUrl("/portafolio", "en")).toBe(`${SITE_URL}/portafolio?lang=en`);

  const es = pageAlternates("/", "es");
  const en = pageAlternates("/", "en");
  expect(es?.canonical).toBe(`${SITE_URL}`);
  expect(en?.canonical).toBe(`${SITE_URL}/?lang=en`);
  expect(es?.languages).toMatchObject({
    es: `${SITE_URL}`,
    en: `${SITE_URL}/?lang=en`,
    "x-default": `${SITE_URL}`,
  });
  expect(en?.languages).toEqual(es?.languages);

  const home = sitemap()[0];
  expect(home.url).toBe(`${SITE_URL}`);
  expect(home.alternates?.languages?.es).toBe(`${SITE_URL}`);
  expect(home.alternates?.languages?.en).toBe(`${SITE_URL}/?lang=en`);
});

test("each page points og and twitter images at the language-specific 1200x630 asset", () => {
  const es = localizedPageMeta({
    path: "/portafolio",
    lang: "es",
    title: "t",
    description: "d",
    imageAlt: "emmanuel agüero — fundador e ingeniero de software",
  });
  const en = localizedPageMeta({
    path: "/",
    lang: "en",
    title: "t",
    description: "d",
    imageAlt: "Emmanuel Agüero Rojas — founder & software engineer",
  });
  const landing = localizedPageMeta({
    path: "/asesorias/el-empleado-que-no-se-cansa",
    lang: "en",
    title: "t",
    description: "d",
    imageAlt: "The employee who never gets tired — Emmanuel Agüero Rojas",
  });

  expect(es.openGraph?.images).toEqual([
    {
      url: `${SITE_URL}/portafolio/opengraph-image`,
      width: 1200,
      height: 630,
      alt: "emmanuel agüero — fundador e ingeniero de software",
    },
  ]);
  expect(es.twitter).toMatchObject({
    card: "summary_large_image",
    images: {
      url: `${SITE_URL}/portafolio/opengraph-image`,
      alt: "emmanuel agüero — fundador e ingeniero de software",
      width: 1200,
      height: 630,
    },
  });
  expect(en.openGraph?.url).toBe(`${SITE_URL}/?lang=en`);
  const enImages = en.openGraph?.images;
  expect(enImages).toEqual([
    {
      url: `${SITE_URL}/opengraph-image?lang=en`,
      width: 1200,
      height: 630,
      alt: "Emmanuel Agüero Rojas — founder & software engineer",
    },
  ]);
  expect(landing.openGraph?.images).toEqual([
    {
      url: `${SITE_URL}/asesorias/el-empleado-que-no-se-cansa/opengraph-image?lang=en`,
      width: 1200,
      height: 630,
      alt: "The employee who never gets tired — Emmanuel Agüero Rojas",
    },
  ]);
  expect(landing.twitter).toMatchObject({
    images: {
      url: `${SITE_URL}/asesorias/el-empleado-que-no-se-cansa/opengraph-image?lang=en`,
      alt: "The employee who never gets tired — Emmanuel Agüero Rojas",
    },
  });
});

test("person metadata uses a spanish role when the page is spanish", () => {
  expect(personJsonLd("es").jobTitle).toBe("Fundador e ingeniero de software");
  expect(personJsonLd("es").jobTitle.toLowerCase()).not.toContain("founder");
  expect(personJsonLd("en").jobTitle).toBe("Founder & Software Engineer");
  expect(personJsonLd("es").description).toBe(portafolioMeta.es.description);
  expect(personJsonLd("en").description).toBe(portafolioMeta.en.description);
  expect(personJsonLd("es").sameAs).toContain("https://www.instagram.com/ear.dev/");
  expect(personJsonLd("en").sameAs).toContain("https://www.instagram.com/ear.dev/");
  expect(JSON.stringify(personJsonLd("es"))).not.toContain("ear__rae");
  expect(JSON.stringify(personJsonLd("en"))).not.toContain("ear__rae");
});
