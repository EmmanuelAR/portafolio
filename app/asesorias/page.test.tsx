import { render, screen } from "@testing-library/react";
import AsesoriasIndex from "@/components/asesorias/AsesoriasIndex";
import AsesoriasPage, { generateMetadata } from "./page";
import { getAdvisory, type Advisory } from "@/lib/asesorias";
import { asesoriasPageKeywords } from "@/lib/meta";
import { SITE_NAME, SITE_URL } from "@/lib/site";

const advisory = getAdvisory("el-empleado-que-no-se-cansa")!;

beforeEach(() => {
  window.history.pushState({}, "", "/asesorias");
});

test("a single service renders its landing on /asesorias without the hub", async () => {
  const page = await AsesoriasPage({ searchParams: Promise.resolve({}) });
  render(page);

  expect(
    screen.getByRole("heading", { level: 1, name: "El empleado que no se cansa" })
  ).toBeInTheDocument();
  expect(
    screen.queryByRole("heading", { name: /Tu negocio necesita un empleado más/ })
  ).not.toBeInTheDocument();
  expect(screen.queryByText(/Seamos honestos/)).not.toBeInTheDocument();
  expect(screen.queryByRole("link", { name: /Quiero mi empleado/ })).not.toBeInTheDocument();
  expect(screen.queryByRole("link", { name: /todas las asesorías/i })).not.toBeInTheDocument();
  expect(document.querySelector('a[href="/asesorias/el-empleado-que-no-se-cansa"]')).toBeNull();

  expect(screen.getByText("¿Necesito saber de tecnología?")).toBeInTheDocument();
  const ctas = screen.getAllByRole("link", { name: "Escribime por WhatsApp" });
  expect(ctas).toHaveLength(2);
  expect(screen.getByRole("link", { name: "asesorías" })).toHaveAttribute("href", "/asesorias");

  const scripts = document.querySelectorAll('script[type="application/ld+json"]');
  const types = [...scripts].map((node) => JSON.parse(node.innerHTML)["@type"]);
  expect(types).toEqual(["Service", "FAQPage"]);
  expect(document.body.textContent).not.toMatch(/\$\s?\d|USD|\b₡|colones|spacex/i);
});

test("english /asesorias is the same landing and keeps lang on internal links", async () => {
  window.history.pushState({}, "", "/asesorias?lang=en");
  const page = await AsesoriasPage({ searchParams: Promise.resolve({ lang: "en" }) });
  render(page);

  expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(
    "The employee who never gets tired"
  );
  expect(screen.queryByRole("link", { name: /all consulting/i })).not.toBeInTheDocument();
  expect(screen.getByRole("link", { name: "Consulting" })).toHaveAttribute(
    "href",
    "/asesorias?lang=en"
  );
  expect(screen.getByRole("link", { name: "en" })).toHaveAttribute("href", "/asesorias?lang=en");
  expect(screen.getAllByRole("link", { name: "Message me on WhatsApp" })).toHaveLength(2);
});

test("index switches on the number of services", () => {
  const other: Advisory = {
    ...advisory,
    slug: "otra-asesoria",
    es: { ...advisory.es, title: "Otra asesoría", hookShort: "Otro gancho" },
    en: { ...advisory.en, title: "Another advisory", hookShort: "Another hook" },
  };

  const single = render(<AsesoriasIndex lang="es" advisories={[advisory]} />);
  expect(
    screen.getByRole("heading", { level: 1, name: "El empleado que no se cansa" })
  ).toBeInTheDocument();
  expect(screen.queryByText(/Seamos honestos/)).not.toBeInTheDocument();
  expect(screen.queryByRole("link", { name: /todas las asesorías/i })).not.toBeInTheDocument();
  single.unmount();

  window.history.pushState({}, "", "/asesorias");
  render(<AsesoriasIndex lang="es" advisories={[advisory, other]} />);
  expect(
    screen.getByRole("heading", { level: 1, name: /Tu negocio necesita un empleado más/ })
  ).toBeInTheDocument();
  expect(screen.getByRole("link", { name: /El empleado que no se cansa/ })).toHaveAttribute(
    "href",
    "/asesorias/el-empleado-que-no-se-cansa"
  );
  expect(screen.getByRole("link", { name: /Otra asesoría/ })).toHaveAttribute(
    "href",
    "/asesorias/otra-asesoria"
  );
  expect(screen.queryByText("¿Necesito saber de tecnología?")).not.toBeInTheDocument();
});

test("/asesorias metadata is the landing title, description, canonical, and og image", async () => {
  const es = await generateMetadata({ searchParams: Promise.resolve({}) });
  const en = await generateMetadata({ searchParams: Promise.resolve({ lang: "en" }) });

  expect(advisory.es.metaTitle).toBe(
    "Automatizá tu negocio con IA: asesoría en Costa Rica · Emmanuel Agüero"
  );
  expect(advisory.en.metaTitle).toBe(
    "Automate your business with AI: 90-min session · Emmanuel Agüero"
  );
  expect(es.title).toEqual({ absolute: advisory.es.metaTitle });
  expect(es.description).toBe(advisory.es.metaDescription);
  expect(es.keywords).toBe(asesoriasPageKeywords);
  expect(es.keywords).toBe("asesoría automatización, Grok Bot, emprendedores Costa Rica");
  expect(es.alternates?.canonical).toBe(`${SITE_URL}/asesorias`);
  expect(es.openGraph).toMatchObject({
    url: `${SITE_URL}/asesorias`,
    title: advisory.es.metaTitle,
    description: advisory.es.metaDescription,
  });
  expect(es.twitter).toMatchObject({
    card: "summary_large_image",
    title: advisory.es.metaTitle,
    description: advisory.es.metaDescription,
  });
  expect(es.openGraph?.images).toEqual([
    {
      url: `${SITE_URL}/asesorias/opengraph-image`,
      width: 1200,
      height: 630,
      alt: `${advisory.es.title} — ${SITE_NAME}`,
    },
  ]);

  expect(en.title).toEqual({ absolute: advisory.en.metaTitle });
  expect(en.description).toBe(advisory.en.metaDescription);
  expect(en.keywords).toBe(asesoriasPageKeywords);
  expect(en.alternates?.canonical).toBe(`${SITE_URL}/asesorias?lang=en`);
  expect(en.openGraph).toMatchObject({
    title: advisory.en.metaTitle,
    description: advisory.en.metaDescription,
  });
  expect(en.twitter).toMatchObject({
    title: advisory.en.metaTitle,
    description: advisory.en.metaDescription,
  });
  expect(en.openGraph?.images).toEqual([
    {
      url: `${SITE_URL}/asesorias/opengraph-image?lang=en`,
      width: 1200,
      height: 630,
      alt: `${advisory.en.title} — ${SITE_NAME}`,
    },
  ]);
});
