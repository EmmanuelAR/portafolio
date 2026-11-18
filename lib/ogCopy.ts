import type { Lang } from "./i18n";

export type OgLine = { text: string; highlight?: string };

export type OgCard = {
  lines: OgLine[];
  footer: string;
};

export function ogCard(kind: "home" | "portafolio" | "asesorias", lang: Lang): OgCard {
  if (kind === "home") {
    return lang === "en"
      ? {
          lines: [
            { text: "hi. i'm emmanuel." },
            { text: "i build products.", highlight: "products." },
          ],
          footer: "cavos · framezz · costa rica",
        }
      : {
          lines: [
            { text: "hola. soy emmanuel." },
            { text: "construyo productos.", highlight: "productos." },
          ],
          footer: "cavos · framezz · costa rica",
        };
  }

  if (kind === "portafolio") {
    return lang === "en"
      ? {
          lines: [
            { text: "founder &" },
            { text: "software engineer", highlight: "engineer" },
          ],
          footer: "portfolio · cavos · framezz",
        }
      : {
          lines: [
            { text: "fundador e" },
            { text: "ingeniero de software", highlight: "software" },
          ],
          footer: "portafolio · cavos · framezz",
        };
  }

  return lang === "en"
    ? {
        lines: [
          { text: "Your business needs" },
          { text: "one more employee." },
          { text: "One who doesn't" },
          { text: "get tired.", highlight: "tired." },
        ],
        footer: "ai automation consulting",
      }
    : {
        lines: [
          { text: "Tu negocio necesita" },
          { text: "un empleado más." },
          { text: "Que no se canse.", highlight: "canse." },
        ],
        footer: "asesorías de automatización con ia",
      };
}

export function landingOgLines(lang: Lang): {
  titleLines: string[];
  tagline: string;
  footer: string;
} {
  if (lang === "en") {
    return {
      titleLines: ["The employee", "who never gets tired"],
      tagline: "Automation advisory for founders",
      footer: "90 minutes · ai automation",
    };
  }
  return {
    titleLines: ["El empleado", "que no se cansa"],
    tagline: "Asesoría de automatización para emprendedores",
    footer: "90 minutos · automatización con ia",
  };
}
