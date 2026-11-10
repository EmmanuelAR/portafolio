import type { Lang } from "./i18n";

export const hubCopy: Record<
  Lang,
  {
    name: string;
    role: string;
    lead: string;
    paths: {
      advisories: { label: string; blurb: string; href: string };
      portfolio: { label: string; blurb: string; href: string };
    };
  }
> = {
  en: {
    name: "emmanuel agüero",
    role: "founder & software engineer",
    lead: "pick where you want to go.",
    paths: {
      advisories: {
        label: "advisories",
        blurb: "automation sessions for founders.",
        href: "/asesorias",
      },
      portfolio: {
        label: "portfolio",
        blurb: "work, ventures, and story.",
        href: "/portafolio",
      },
    },
  },
  es: {
    name: "emmanuel agüero",
    role: "fundador e ingeniero de software",
    lead: "elegí a dónde querés ir.",
    paths: {
      advisories: {
        label: "asesorías",
        blurb: "sesiones de automatización para emprendedores.",
        href: "/asesorias",
      },
      portfolio: {
        label: "portafolio",
        blurb: "trabajo, ventures y trayectoria.",
        href: "/portafolio",
      },
    },
  },
};
