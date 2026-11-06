import type { Lang } from "./i18n";
import { LINKS } from "./content";

export interface AdvisoryCopy {
  title: string;
  tagline: string;
  /** SEO / Open Graph description (not shown on the page body). */
  metaDescription: string;
  /** Short pain-point line for the catalog card subtitle. */
  hookShort: string;
  hookLabel: string;
  hookTitle: string;
  hookBody: string;
  serviceLabel: string;
  aboutHeading: string;
  about: string[];
  deliverablesHeading: string;
  deliverables: string[];
  logisticsHeading: string;
  durationLabel: string;
  duration: string;
  scheduleLabel: string;
  schedule: string;
  paymentLabel: string;
  payment: string;
  disclaimers: string[];
  whatsappCta: string;
  whatsappMessage: string;
}

export interface Advisory {
  slug: string;
  en: AdvisoryCopy;
  es: AdvisoryCopy;
}

export const asesoriasUi: Record<
  Lang,
  {
    catalogHeading: string;
    catalogIntro: string;
    portfolioLink: string;
    advisoriesLink: string;
    backToList: string;
  }
> = {
  en: {
    catalogHeading: "advisories",
    catalogIntro: "practical sessions for founders who want to automate real work.",
    portfolioLink: "portfolio",
    advisoriesLink: "advisories",
    backToList: "all advisories",
  },
  es: {
    catalogHeading: "asesorías",
    catalogIntro: "sesiones prácticas para emprendedores que quieren automatizar trabajo real.",
    portfolioLink: "portafolio",
    advisoriesLink: "asesorías",
    backToList: "todas las asesorías",
  },
};

const empleadoQueNoSeCansa: Advisory = {
  slug: "el-empleado-que-no-se-cansa",
  es: {
    title: "El empleado que no se cansa",
    tagline: "Asesoría de automatización para emprendedores",
    metaDescription:
      "¿Seguís respondiendo mensajes, cotizaciones y recordatorios a mano? En 90 minutos dejamos tu primera tarea automatizada con Grok Bot.",
    hookShort:
      "¿Seguís respondiendo los mismos mensajes, cotizaciones y recordatorios a mano?",
    hookLabel: "El problema",
    hookTitle:
      "¿Seguís respondiendo los mismos mensajes, cotizaciones y recordatorios a mano?",
    hookBody:
      "Cada hora que se te va en tareas repetitivas es una hora que no le dedicás a vender ni a crecer. En 90 minutos dejamos funcionando tu primera tarea automatizada para que la haga Grok Bot, no vos.",
    serviceLabel: "Servicio",
    aboutHeading: "De qué trata",
    about: [
      "Diagnóstico de tu negocio",
      "Configuración y automatización en vivo de una tarea real",
      "Mapa de otras tareas que podés delegar",
      "Preguntas",
    ],
    deliverablesHeading: "Qué te vas a llevar",
    deliverables: [
      "Estrategia clara y tu tarea principal funcionando en Grok Bot, lista para ir refinándola (el refinamiento es parte normal del proceso)",
      "Prompts prehechos para tu negocio, listos para copiar y adaptar",
      "Lista de 3 tareas siguientes por automatizar, con orden y pasos",
      "Disponibilidad de 7 días para resolver tus dudas",
    ],
    logisticsHeading: "Detalle",
    durationLabel: "Duración",
    duration: "90 minutos (aprox.)",
    scheduleLabel: "Horario",
    schedule: "A coordinar",
    paymentLabel: "Pago",
    payment: "Pago único · SINPE Móvil o transferencia",
    disclaimers: [
      "Servicio independiente. No es un servicio oficial ni está afiliado a ninguna empresa.",
      "La suscripción a Grok Bot es un pago mensual aparte, que se paga directamente a la herramienta, y no está incluida en esta propuesta.",
      "No se procesan datos sensibles ni información financiera confidencial durante la sesión. El criterio contable o legal corresponde a un profesional.",
    ],
    whatsappCta: "Escribime por WhatsApp",
    whatsappMessage:
      "Hola Emmanuel, me interesa la asesoría «El empleado que no se cansa». ¿Me compartís disponibilidad y detalles?",
  },
  en: {
    title: "The employee who never gets tired",
    tagline: "Automation advisory for founders",
    metaDescription:
      "Still answering messages, quotes, and reminders by hand? In 90 minutes we set up your first automated task with Grok Bot.",
    hookShort: "Still answering the same messages, quotes, and reminders by hand?",
    hookLabel: "The problem",
    hookTitle: "Still answering the same messages, quotes, and reminders by hand?",
    hookBody:
      "Every hour spent on repetitive tasks is an hour you're not selling or growing. In 90 minutes we set up your first automated task so Grok Bot does it, not you.",
    serviceLabel: "Service",
    aboutHeading: "What it's about",
    about: [
      "A diagnosis of your business",
      "Live setup and automation of one real task",
      "A map of other tasks you can hand off",
      "Q&A",
    ],
    deliverablesHeading: "What you leave with",
    deliverables: [
      "A clear strategy and your main task running in Grok Bot, ready to refine (refinement is a normal part of the process)",
      "Ready-made prompts for your business, ready to copy and adapt",
      "A list of the next 3 tasks to automate, with order and steps",
      "7 days of availability to answer your questions",
    ],
    logisticsHeading: "Details",
    durationLabel: "Duration",
    duration: "About 90 minutes",
    scheduleLabel: "Schedule",
    schedule: "To be coordinated",
    paymentLabel: "Payment",
    payment: "One-time payment · SINPE Móvil or bank transfer",
    disclaimers: [
      "Independent service. Not an official service and not affiliated with any company.",
      "A Grok Bot subscription is a separate monthly fee paid directly to the tool and is not included in this offer.",
      "No sensitive data or confidential financial information is processed during the session. Accounting or legal judgment belongs to a professional.",
    ],
    whatsappCta: "Message me on WhatsApp",
    whatsappMessage:
      "Hi Emmanuel — I'm interested in the advisory «The employee who never gets tired». Can you share availability and details?",
  },
};

const ADVISORIES: Advisory[] = [empleadoQueNoSeCansa];

export function getAdvisories(): Advisory[] {
  return ADVISORIES;
}

export function getAdvisory(slug: string): Advisory | undefined {
  return ADVISORIES.find((a) => a.slug === slug);
}

export function advisorySlugs(): string[] {
  return ADVISORIES.map((a) => a.slug);
}

export function advisoryCopy(advisory: Advisory, lang: Lang): AdvisoryCopy {
  return advisory[lang];
}

/** Build a wa.me URL with a prefilled message. */
export function whatsappUrl(message: string): string {
  const base = LINKS.whatsapp.replace(/\/$/, "");
  return `${base}?text=${encodeURIComponent(message)}`;
}
