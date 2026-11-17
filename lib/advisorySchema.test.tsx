import { render } from "@testing-library/react";
import AdvisoryJsonLd from "@/components/asesorias/AdvisoryJsonLd";
import { faqPageJsonLd, serviceJsonLd } from "./advisorySchema";
import { landingCopy } from "./asesorias";
import { SITE_URL } from "./site";

const SLUG = "el-empleado-que-no-se-cansa";

test("spanish service json-ld stays the detalle summary and has no price", () => {
  const data = serviceJsonLd(SLUG, "es");
  expect(data).toMatchObject({
    "@context": "https://schema.org",
    "@type": "Service",
    name: "El empleado que no se cansa",
    serviceType: "Asesoría de automatización con inteligencia artificial",
    description:
      "Sesión de asesoría de aproximadamente 90 minutos para emprendedores: diagnóstico del negocio, una tarea automatizada en vivo con Grok Bot, prompts listos para copiar, las 3 tareas siguientes por automatizar, y 7 días de disponibilidad para resolver dudas.",
    url: `${SITE_URL}/asesorias/${SLUG}`,
  });
  expect(JSON.stringify(data)).not.toMatch(/offers|price|USD|₡|\$\s?\d/i);
});

test("english service json-ld is the english session and url", () => {
  expect(serviceJsonLd(SLUG, "en")).toMatchObject({
    "@type": "Service",
    name: "The employee who never gets tired",
    serviceType: "AI automation advisory",
    description:
      "About a 90-minute advisory session for entrepreneurs: business diagnosis, one task automated live with Grok Bot, ready-to-copy prompts, the next 3 tasks to automate, and 7 days of availability for questions.",
    url: `${SITE_URL}/asesorias/${SLUG}?lang=en`,
  });
  expect(JSON.stringify(serviceJsonLd(SLUG, "en"))).not.toMatch(/offers|priceCurrency|\$\s?\d/);
});

test("faq page json-ld copies the visible questions for each language", () => {
  for (const lang of ["es", "en"] as const) {
    const data = faqPageJsonLd(SLUG, lang);
    expect(data).toMatchObject({
      "@context": "https://schema.org",
      "@type": "FAQPage",
    });
    expect(data?.mainEntity).toHaveLength(3);
    expect(data?.mainEntity).toEqual(
      landingCopy[lang].faq.map((item) => ({
        "@type": "Question",
        name: item.question,
        acceptedAnswer: { "@type": "Answer", text: item.answer },
      }))
    );
  }
  expect(faqPageJsonLd("otra", "es")).toBeNull();
});

test("landing scripts embed parseable json-ld for the active language", () => {
  const view = render(<AdvisoryJsonLd slug={SLUG} lang="en" />);
  const scripts = view.container.querySelectorAll('script[type="application/ld+json"]');
  expect(scripts).toHaveLength(2);
  const parsed = [...scripts].map((node) => JSON.parse(node.innerHTML));
  expect(parsed.map((block) => block["@type"])).toEqual(["Service", "FAQPage"]);
  expect(parsed[0].name).toBe("The employee who never gets tired");
  expect(parsed[1].mainEntity).toHaveLength(3);
  expect(parsed[1].mainEntity[2].name).toBe("Is the Grok Bot subscription included?");
  expect(parsed[1].mainEntity[2].acceptedAnswer.text).toBe(
    "No, it's paid separately, directly to the tool."
  );
  view.unmount();

  const es = render(<AdvisoryJsonLd slug={SLUG} lang="es" />);
  const esBlocks = [...es.container.querySelectorAll('script[type="application/ld+json"]')].map(
    (node) => JSON.parse(node.innerHTML)
  );
  expect(esBlocks[0].name).toBe("El empleado que no se cansa");
  expect(esBlocks[0].url).toBe(`${SITE_URL}/asesorias/${SLUG}`);
  expect(esBlocks[1].mainEntity[1].acceptedAnswer.text).toBe(
    "Tu computadora y una cuenta de Grok Bot. Si no la tenés, te ayudo a crearla antes de la sesión."
  );
});
