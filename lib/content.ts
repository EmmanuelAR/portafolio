import type { Lang } from "./i18n";

/**
 * Inline highlight markup used across copy, rendered by <Marked />:
 *   ==word==          blue marker (brand default)
 *   ==red:word==      red marker (tension / problem)
 *   ==accent:word==   orange text (single emphasis word)
 */

export interface Job {
  role: string;
  org: string;
  url: string;
  period: string;
  kind: "founder" | "employee";
  stats?: string[];
  bullets: string[];
  logo?: string;
}
export interface Project {
  name: string;
  stack: string;
  blurb: string;
  url?: string;
}
export interface Venture {
  name: string;
  url: string;
  tagline: string;
  blurb: string;
  stats: string[];
  tech: string;
  logo: string;
  featured?: boolean;
}
export interface NowItem {
  status: string;
  text: string;
  url?: string;
}
export interface SkillGroup {
  label: string;
  items: string[];
}
export interface SiteContent {
  nav: { about: string; work: string; talk: string; cv: string; menu: string; close: string };
  hero: {
    greeting: string;
    headline: string;
    lead: string;
    location: string;
    cta: { primary: string; secondary: string };
  };
  now: { heading: string; items: NowItem[] };
  about: { heading: string; paragraphs: string[] };
  github: {
    heading: string;
    unavailable: string;
    contributions: string;
    commits: string;
    prs: string;
    streak: (n: number) => string;
    topLangs: string;
  };
  work: {
    heading: string;
    intro: string;
    experimentsHeading: string;
    ventures: Venture[];
    projects: Project[];
  };
  experience: { heading: string; intro: string; jobs: Job[] };
  roleTags: { founder: string; employee: string };
  skills: { heading: string; groups: SkillGroup[] };
  education: {
    heading: string;
    certificationsHeading: string;
    moreCertsLabel: string;
    credentialLabel: string;
  };
  talk: {
    heading: string;
    body: string;
    socialsLabel: string;
  };
  cta: { cv: string; book: string; email: string; download: string; close: string };
  footer: { tagline: string };
}

export interface Credential {
  title: string;
  org: string;
  period: string;
  url?: string;
  secondary?: boolean;
}

export const NAME = "Emmanuel Agüero Rojas";
export const BRAND = "ear.dev";
export const X_HANDLE = "EmmanuelDevCr";
// Your PUBLIC Cal.com booking link, e.g. "emmanuel-aguero" or "emmanuel-aguero/30min".
// Leave empty to hide the "Book a call" button.
export const CAL_LINK = "emmanuel-aguero-rojas-qgavpz/15min";

export const LINKS = {
  github: "https://github.com/EmmanuelAR",
  linkedin: "https://linkedin.com/in/emmanuelaguerorojas",
  instagram: "https://www.instagram.com/ear__rae/",
  x: `https://x.com/${X_HANDLE}`,
  telegram: "https://t.me/EmmanuelDevCr",
  whatsapp: "https://wa.me/50684339541",
  email: "emmanuelaguerorojas@gmail.com",
  cv: "/EmmanuelAguero_CV_2026.pdf",
};

export const SOCIALS: { label: string; href: string }[] = [
  { label: "github", href: LINKS.github },
  { label: "linkedin", href: LINKS.linkedin },
  { label: "x", href: LINKS.x },
  { label: "instagram", href: LINKS.instagram },
];

const SKILL_GROUPS_EN: SkillGroup[] = [
  { label: "languages", items: ["TypeScript", "JavaScript", "Java", "Python", "C++", "SQL", "Cairo", "Solidity"] },
  { label: "backend", items: ["Spring Boot", "Node.js", "REST APIs", "PostgreSQL", "MongoDB", "Supabase"] },
  { label: "web", items: ["Next.js", "React"] },
  { label: "cloud & delivery", items: ["AWS", "Azure", "CI/CD", "Git"] },
  { label: "onchain", items: ["Starknet", "Ethereum", "Account abstraction"] },
];
const SKILL_GROUPS_ES: SkillGroup[] = [
  { label: "lenguajes", items: SKILL_GROUPS_EN[0].items },
  { label: "backend", items: SKILL_GROUPS_EN[1].items },
  { label: "web", items: SKILL_GROUPS_EN[2].items },
  { label: "cloud & entrega", items: SKILL_GROUPS_EN[3].items },
  { label: "onchain", items: SKILL_GROUPS_EN[4].items },
];

/** Flat list, kept for tests and JSON-LD. */
export const SKILLS = SKILL_GROUPS_EN.flatMap((g) => g.items);

// Most-used languages shown under the GitHub grid when the API has no data.
export const TOP_LANGUAGES = ["TypeScript", "Cairo", "Solidity", "Java", "Python"];

// Most recent first.
export const EDUCATION: Credential[] = [
  {
    title: "Blockchain, Solidity y Gobernanza con Optimism",
    org: "Universidad CENFOTEC",
    period: "Aug 2024",
    url: "https://www.acreditta.com/credential/4c527060-23eb-469c-95c5-3fbafe604e97",
  },
  {
    title: "B.Eng., Systems Engineering",
    org: "Universidad Nacional, Costa Rica",
    period: "Feb 2018 – Nov 2022",
  },
];

// Most recent first.
export const CERTIFICATIONS: Credential[] = [
  {
    title: "Scrum Fundamentals Certified (SFC)",
    org: "SCRUMstudy",
    period: "May 2022",
    url: "https://www.scrumstudy.com/certification/verify?type=SFC&number=918103",
  },
  {
    title: "Introduction to Data Science",
    org: "Cisco",
    period: "Oct 2023",
    url: "https://www.credly.com/badges/390a35e6-a130-441f-a19b-c4dc2be7faa2/linked_in_profile",
    secondary: true,
  },
  {
    title: "Python Essentials 1",
    org: "Cisco",
    period: "Sep 2023",
    url: "https://www.credly.com/badges/ab001455-5d5d-4e28-81c5-eb41ea549d81/linked_in_profile",
    secondary: true,
  },
  {
    title: "Postman Student Expert",
    org: "Canvas Credentials (Badgr)",
    period: "May 2022",
    url: "https://badges.parchment.com/public/assertions/TDAAH0Q3Ru2vGOYqaUptkA",
    secondary: true,
  },
];

export const content: Record<Lang, SiteContent> = {
  en: {
    nav: { about: "about", work: "work", talk: "talk", cv: "cv", menu: "menu", close: "close" },
    hero: {
      greeting: "hi. i'm emmanuel.",
      headline: "i build ==products.== cavos, framezz.",
      lead: "two companies, live. by day i run onboarding for a fintech moving ==~$95m a month==.",
      location: "alajuela, costa rica · gmt-6",
      cta: { primary: "book a call", secondary: "see the work" },
    },
    now: {
      heading: "now",
      items: [
        {
          status: "shipping",
          text: "==cavos== — invisible wallets for crypto apps. live on starknet and ethereum.",
          url: "https://cavos.xyz/",
        },
        {
          status: "live",
          text: "==framezz== — selfie-search photos for races. 40k+ photos, 12+ events.",
          url: "https://studioframezz.com/en",
        },
        {
          status: "ambassador",
          text: "==spacexai== — a community of people building software with ai.",
        },
        {
          status: "next",
          text: "==ear.dev== — a space to talk tech without anyone selling you a course.",
        },
      ],
    },
    about: {
      heading: "about",
      paragraphs: [
        "i'm from costa rica. i make software and gather people who do too.",
        "intern → sde iii at snap. three promotions, two companies on the side. sometimes you have to hit esc and ==accent:restart==.",
      ],
    },
    github: {
      heading: "proof of work",
      unavailable: "contribution data unavailable right now.",
      contributions: "contributions in the last year",
      commits: "commits",
      prs: "pull requests",
      streak: (n) => `${n}-day streak`,
      topLangs: "most used",
    },
    work: {
      heading: "work",
      intro: "",
      experimentsHeading: "experiments",
      ventures: [
        {
          name: "cavos",
          url: "https://cavos.xyz/",
          tagline: "==invisible wallets== for crypto apps.",
          blurb: "google or apple login into a self-custodial wallet. no seed phrase. live on starknet and ethereum.",
          stats: ["live on starknet + ethereum", "$25k pre-seed"],
          tech: "account abstraction",
          logo: "/images/cavos.png",
          featured: true,
        },
        {
          name: "framezz",
          url: "https://studioframezz.com/en",
          tagline: "==selfie-search== for race photos.",
          blurb: "take a selfie, get your race photos. live at ironman 70.3 and the disney half.",
          stats: ["40k+ photos", "12+ events", "ironman 70.3"],
          tech: "next.js · aws",
          logo: "/images/framezz.png",
        },
      ],
      projects: [
        {
          name: "lumos",
          stack: "next.js · cairo",
          blurb: "clmm liquidity manager — impermanent-loss estimates and position simulations.",
        },
        {
          name: "go stark me",
          stack: "next.js · cairo",
          blurb: "fundraising on starknet for people who don't want a wallet lecture.",
        },
      ],
    },
    experience: {
      heading: "story",
      intro: "intern → sde iii → co-founder.",
      jobs: [
        {
          role: "community ambassador",
          org: "SpaceXAI",
          url: "",
          period: "2026 —",
          kind: "employee",
          bullets: [],
        },
        {
          role: "sde iii, onboarding",
          org: "Snap Finance",
          url: "",
          period: "2023 —",
          kind: "employee",
          stats: ["~$95m/mo", "intern → sde iii"],
          bullets: [],
        },
        {
          role: "co-founder",
          org: "Cavos",
          url: "https://cavos.xyz/",
          logo: "/images/cavos.png",
          period: "2025 —",
          kind: "founder",
          stats: ["$25k pre-seed", "starknet + ethereum"],
          bullets: [],
        },
        {
          role: "co-founder",
          org: "Studio Framezz",
          url: "https://studioframezz.com/en",
          logo: "/images/framezz.png",
          period: "2025 —",
          kind: "founder",
          stats: ["40k+ photos", "12+ events"],
          bullets: [],
        },
      ],
    },
    roleTags: { founder: "co-founder", employee: "team" },
    skills: { heading: "craft", groups: SKILL_GROUPS_EN },
    education: {
      heading: "education",
      certificationsHeading: "certifications",
      moreCertsLabel: "more certifications",
      credentialLabel: "credential",
    },
    talk: {
      heading: "if you're building something, ==accent:let's talk==.",
      body: "founders, engineers, communities — i answer fast.",
      socialsLabel: "elsewhere",
    },
    cta: { cv: "view cv", book: "book a call", email: "email me", download: "download", close: "close" },
    footer: { tagline: "ear.dev · alajuela, costa rica" },
  },
  es: {
    nav: { about: "sobre mí", work: "trabajo", talk: "hablemos", cv: "cv", menu: "menú", close: "cerrar" },
    hero: {
      greeting: "hola. soy emmanuel.",
      headline: "construyo ==productos.== cavos, framezz.",
      lead: "dos empresas, en vivo. de día llevo el onboarding de una fintech que mueve ==~$95m al mes==.",
      location: "alajuela, costa rica · gmt-6",
      cta: { primary: "agendar llamada", secondary: "ver el trabajo" },
    },
    now: {
      heading: "ahora",
      items: [
        {
          status: "shipping",
          text: "==cavos== — wallets invisibles para apps cripto. en vivo en starknet y ethereum.",
          url: "https://cavos.xyz/",
        },
        {
          status: "en vivo",
          text: "==framezz== — tus fotos de carrera con una selfie. 40k+ fotos, 12+ eventos.",
          url: "https://studioframezz.com/en",
        },
        {
          status: "ambassador",
          text: "==spacexai== — comunidad de gente que construye software con ai.",
        },
        {
          status: "lo que sigue",
          text: "==ear.dev== — un espacio para hablar de tech sin que te vendan un curso.",
        },
      ],
    },
    about: {
      heading: "sobre mí",
      paragraphs: [
        "soy de costa rica. hago software y junto gente que también.",
        "intern → sde iii en snap. tres promociones, dos empresas en paralelo. a veces hay que apretar esc y ==accent:reiniciar==.",
      ],
    },
    github: {
      heading: "prueba de trabajo",
      unavailable: "datos de contribuciones no disponibles por ahora.",
      contributions: "contribuciones en el último año",
      commits: "commits",
      prs: "pull requests",
      streak: (n) => `racha de ${n} días`,
      topLangs: "más usados",
    },
    work: {
      heading: "trabajo",
      intro: "",
      experimentsHeading: "experimentos",
      ventures: [
        {
          name: "cavos",
          url: "https://cavos.xyz/",
          tagline: "==wallets invisibles== para apps cripto.",
          blurb: "login de google o apple a una wallet auto-custodiada. sin frase semilla. en vivo en starknet y ethereum.",
          stats: ["en vivo en starknet + ethereum", "$25k pre-seed"],
          tech: "account abstraction",
          logo: "/images/cavos.png",
          featured: true,
        },
        {
          name: "framezz",
          url: "https://studioframezz.com/en",
          tagline: "==búsqueda por selfie== para fotos de carrera.",
          blurb: "una selfie y salen tus fotos. en vivo en ironman 70.3 y en la disney half.",
          stats: ["40k+ fotos", "12+ eventos", "ironman 70.3"],
          tech: "next.js · aws",
          logo: "/images/framezz.png",
        },
      ],
      projects: [
        {
          name: "lumos",
          stack: "next.js · cairo",
          blurb: "gestor de liquidez clmm — pérdida impermanente y simulaciones de posición.",
        },
        {
          name: "go stark me",
          stack: "next.js · cairo",
          blurb: "recaudación en starknet para quien no quiere una clase de wallets.",
        },
      ],
    },
    experience: {
      heading: "historia",
      intro: "intern → sde iii → cofundador.",
      jobs: [
        {
          role: "community ambassador",
          org: "SpaceXAI",
          url: "",
          period: "2026 —",
          kind: "employee",
          bullets: [],
        },
        {
          role: "sde iii, onboarding",
          org: "Snap Finance",
          url: "",
          period: "2023 —",
          kind: "employee",
          stats: ["~$95m/mes", "intern → sde iii"],
          bullets: [],
        },
        {
          role: "cofundador",
          org: "Cavos",
          url: "https://cavos.xyz/",
          logo: "/images/cavos.png",
          period: "2025 —",
          kind: "founder",
          stats: ["$25k pre-seed", "starknet + ethereum"],
          bullets: [],
        },
        {
          role: "cofundador",
          org: "Studio Framezz",
          url: "https://studioframezz.com/en",
          logo: "/images/framezz.png",
          period: "2025 —",
          kind: "founder",
          stats: ["40k+ fotos", "12+ eventos"],
          bullets: [],
        },
      ],
    },
    roleTags: { founder: "cofundador", employee: "equipo" },
    skills: { heading: "oficio", groups: SKILL_GROUPS_ES },
    education: {
      heading: "educación",
      certificationsHeading: "certificaciones",
      moreCertsLabel: "más certificaciones",
      credentialLabel: "credencial",
    },
    talk: {
      heading: "si estás construyendo algo, ==accent:hablemos==.",
      body: "founders, ingenieros, comunidades — respondo rápido.",
      socialsLabel: "también en",
    },
    cta: { cv: "ver cv", book: "agendar llamada", email: "escríbeme", download: "descargar", close: "cerrar" },
    footer: { tagline: "ear.dev · alajuela, costa rica" },
  },
};
