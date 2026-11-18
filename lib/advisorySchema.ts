import type { Lang } from "./i18n";
import { getAdvisories, landingCopy } from "./asesorias";
import { advisoryCanonicalPath } from "./advisoryRouting";
import { NAME } from "./content";
import { pageUrl } from "./meta";
import { SITE_URL } from "./site";

const LANDING_SLUG = "el-empleado-que-no-se-cansa";

const serviceCopy = {
  es: {
    name: "El empleado que no se cansa",
    serviceType: "Asesoría de automatización con inteligencia artificial",
    description:
      "Sesión de asesoría de aproximadamente 90 minutos para emprendedores: diagnóstico del negocio, una tarea automatizada en vivo con Grok Bot, prompts listos para copiar, las 3 tareas siguientes por automatizar, y 7 días de disponibilidad para resolver dudas.",
  },
  en: {
    name: "The employee who never gets tired",
    serviceType: "AI automation advisory",
    description:
      "About a 90-minute advisory session for entrepreneurs: business diagnosis, one task automated live with Grok Bot, ready-to-copy prompts, the next 3 tasks to automate, and 7 days of availability for questions.",
  },
} as const;

export function serviceJsonLd(
  slug: string,
  lang: Lang,
  advisories: readonly { slug: string }[] = getAdvisories()
) {
  if (slug !== LANDING_SLUG) return null;
  const copy = serviceCopy[lang];
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: copy.name,
    serviceType: copy.serviceType,
    description: copy.description,
    provider: {
      "@type": "Person",
      name: NAME,
      url: SITE_URL,
    },
    areaServed: {
      "@type": "Country",
      name: "Costa Rica",
    },
    url: pageUrl(advisoryCanonicalPath(advisories, slug), lang),
  };
}

export function faqPageJsonLd(slug: string, lang: Lang) {
  if (slug !== LANDING_SLUG) return null;
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: landingCopy[lang].faq.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}
