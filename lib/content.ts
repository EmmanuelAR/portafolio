import type { Lang } from "./i18n";

export interface Job {
  role: string;
  org: string;
  url: string;
  period: string;
  kind: "founder" | "employee";
  bullets: string[];
}
export interface Project {
  name: string;
  stack: string;
  blurb: string;
}
export interface Venture {
  name: string;
  url: string;
  blurb: string;
  highlight: string;
  tech: string;
  logo: string;
  featured?: boolean;
}
export interface SiteContent {
  nav: { about: string; work: string; projects: string; contact: string };
  hero: {
    role: string;
    summary: string;
    location: string;
    cta: { cv: string; github: string; linkedin: string; x: string; book: string; email: string };
  };
  about: { heading: string; body: string };
  githubHeading: string;
  experienceHeading: string;
  jobs: Job[];
  venturesHeading: string;
  ventures: Venture[];
  projectsHeading: string;
  projects: Project[];
  skillsHeading: string;
  educationHeading: string;
  certificationsHeading: string;
  moreCertsLabel: string;
  topLangsLabel: string;
  githubStats: { commits: string; prs: string };
  roleTags: { founder: string; employee: string };
  cta2: { heading: string; subtext: string };
  xHeading: string;
  xPending: string;
  contact: { heading: string; email: string; phone: string };
}

export interface Credential {
  title: string;
  org: string;
  period: string;
  url?: string;
  secondary?: boolean;
}

export const NAME = "Emmanuel Agüero Rojas";
export const X_HANDLE = "EmmanuelDevCr";
// Your PUBLIC Cal.com booking link, e.g. "emmanuel-aguero" or "emmanuel-aguero/30min".
// Leave empty to hide the "Book a call" button.
export const CAL_LINK = "emmanuel-aguero-rojas-qgavpz/15min";

export const LINKS = {
  github: "https://github.com/EmmanuelAR",
  linkedin: "https://linkedin.com/in/emmanuelaguerorojas",
  instagram: "https://www.instagram.com/ear__rae/",
  telegram: "https://t.me/EmmanuelDevCr",
  whatsapp: "https://wa.me/50684339541",
  email: "emmanuelaguerorojas@gmail.com",
  cv: "/EmmanuelAguero_CV_2026.pdf",
};

export const SKILLS = [
  "Java", "TypeScript", "JavaScript", "Python", "C++", "SQL", "Cairo", "Solidity",
  "Spring Boot", "Node.js", "Next.js", "React", "PostgreSQL", "REST APIs",
  "AWS", "Azure", "Supabase", "MongoDB", "Git", "CI/CD", "Starknet", "Ethereum",
];

// Most-used languages shown under the GitHub grid. Edit freely.
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
    nav: { about: "about", work: "work", projects: "projects", contact: "contact" },
    hero: {
      role: "Backend & Full-Stack Software Engineer · Blockchain / Web3",
      summary:
        "I own production backends that gate real revenue at Snap Finance — and I co-found startups that ship: Cavos, embedded-wallet infra live on Starknet ($25K pre-seed), and Framezz, live at Ironman and Disney races.",
      location: "Alajuela, Costa Rica · GMT-6 · Remote-eligible",
      cta: { cv: "View CV", github: "GitHub", linkedin: "LinkedIn", x: "X", book: "Book a call", email: "Email" },
    },
    about: {
      heading: "// about",
      body:
        "I own mission-critical onboarding infrastructure at Snap Finance and co-founded two companies: Cavos (embedded-wallet infrastructure for Starknet) and Framezz (selfie-search photo platform for event photography). I'm comfortable owning a service from design through on-call — and equally comfortable pitching investors.",
    },
    githubHeading: "// github",
    experienceHeading: "// experience",
    jobs: [
      {
        role: "Software Development Engineer II",
        org: "Snap Finance",
        url: "",
        period: "Jan 2023 – Present · Alajuela, CR",
        kind: "employee",
        bullets: [
          "Own the end-to-end user onboarding backend that gates new-user revenue — design, delivery, and on-call incident response for production traffic.",
          "Diagnosed recurring onboarding failures to root cause and shipped targeted backend fixes that measurably improved completion reliability.",
          "Build and maintain microservices in Java, Spring Boot, and Node.js on AWS, deployed via CI/CD under Agile sprints.",
          "Promoted Intern → SDE I → SDE II in two years by owning projects end-to-end.",
        ],
      },
      {
        role: "Co-Founder / Software Engineer",
        org: "Cavos",
        url: "https://cavos.xyz/",
        period: "Apr 2025 – Present · Remote",
        kind: "founder",
        bullets: [
          "Co-founded Cavos, embedded-wallet infrastructure for Starknet apps — onboard users into self-custodial smart accounts with a Google or Apple login, no seed phrase.",
          "Architected and shipped the full stack (Next.js, React, Solidity, Cairo) live on Ethereum mainnet and Starknet, including the production integration with Jokers of Neon.",
          "Raised $25K pre-seed and represented Cavos at Devcon Cannes 2025 and Devconnect Argentina 2025.",
        ],
      },
      {
        role: "Co-Founder / Software Engineer",
        org: "Studio Framezz",
        url: "https://studioframezz.com/en",
        period: "May 2025 – Present · Remote",
        kind: "founder",
        bullets: [
          "Co-founded Framezz, a selfie-search photo platform for event photography (endurance races, marathons) with IVA-compliant invoicing for Costa Rica.",
          "Built the platform end-to-end with Next.js and TypeScript, backed by AWS (S3-driven storage and delivery) that indexes and serves photos from live events.",
          "Live at Ironman 70.3 CapCana, Disney Princess Half Marathon (Orlando), BMW Lindora Run, and Clásica Palmarín MTB; technical lead.",
        ],
      },
    ],
    venturesHeading: "// ventures",
    ventures: [
      {
        name: "Cavos",
        url: "https://cavos.xyz/",
        blurb:
          "Embedded-wallet infrastructure for Starknet apps. Onboard users into self-custodial smart accounts with a Google or Apple login — no seed phrase, no extension. Live on Ethereum mainnet and Starknet, including the production integration with Jokers of Neon.",
        highlight: "$25K pre-seed · Live on Starknet mainnet",
        tech: "Next.js · React · Solidity · Cairo",
        logo: "/images/cavos.png",
        featured: true,
      },
      {
        name: "Studio Framezz",
        url: "https://studioframezz.com/en",
        blurb:
          "Selfie-search photo platform for event photography — endurance races and marathons — with IVA-compliant e-invoicing for Costa Rica. Built end-to-end on Next.js and an AWS S3 pipeline that indexes and serves photos from live events.",
        highlight: "4 live events · Ironman & Disney",
        tech: "Next.js · TypeScript · AWS S3",
        logo: "/images/framezz.png",
      },
    ],
    projectsHeading: "// projects",
    projects: [
      { name: "Lumos", stack: "Next.js · Cairo", blurb: "CLMM liquidity manager — impermanent-loss estimation, full-range vs. concentrated simulations, automated position optimization." },
      { name: "Go Stark Me", stack: "Next.js · Cairo", blurb: "Decentralized fundraising on Starknet using Cairo smart contracts for low-cost, non-technical-friendly Web3 donations." },
    ],
    skillsHeading: "// skills",
    educationHeading: "// education",
    certificationsHeading: "// certifications",
    moreCertsLabel: "See more certifications",
    topLangsLabel: "Most used",
    githubStats: { commits: "commits", prs: "PRs" },
    roleTags: { founder: "cofounder", employee: "employee" },
    cta2: {
      heading: "// let's talk",
      subtext:
        "Open to backend & full-stack roles and to Web3 collaborations. Grab 15 minutes or send my CV to your team.",
    },
    xHeading: "// on X",
    xPending: "X feed coming soon — follow me on X.",
    contact: { heading: "// contact", email: "emmanuelaguerorojas@gmail.com", phone: "+506 8433-9541" },
  },
  es: {
    nav: { about: "sobre-mí", work: "trabajo", projects: "proyectos", contact: "contacto" },
    hero: {
      role: "Ingeniero de Software Backend & Full-Stack · Blockchain / Web3",
      summary:
        "Soy dueño de backends en producción que habilitan ingresos reales en Snap Finance — y cofundo startups que entregan: Cavos, infraestructura de wallets embebidas en vivo en Starknet ($25K pre-seed), y Framezz, en vivo en carreras Ironman y Disney.",
      location: "Alajuela, Costa Rica · GMT-6 · Disponible en remoto",
      cta: { cv: "Ver CV", github: "GitHub", linkedin: "LinkedIn", x: "X", book: "Agendar llamada", email: "Email" },
    },
    about: {
      heading: "// sobre mí",
      body:
        "Soy responsable de la infraestructura crítica de onboarding en Snap Finance y cofundé dos empresas: Cavos (infraestructura de wallets embebidas para Starknet) y Framezz (plataforma de fotos con búsqueda por selfie para eventos). Me manejo bien tanto diseñando y operando un servicio de punta a punta como presentándolo ante inversionistas.",
    },
    githubHeading: "// github",
    experienceHeading: "// experiencia",
    jobs: [
      {
        role: "Software Development Engineer II",
        org: "Snap Finance",
        url: "",
        period: "Ene 2023 – Presente · Alajuela, CR",
        kind: "employee",
        bullets: [
          "Responsable del backend de onboarding de usuarios que habilita los ingresos de nuevos usuarios — diseño, entrega y respuesta a incidentes on-call en producción.",
          "Diagnostiqué fallas recurrentes de onboarding hasta su causa raíz y entregué correcciones de backend que mejoraron de forma medible la confiabilidad de finalización.",
          "Construyo y mantengo microservicios en Java, Spring Boot y Node.js sobre AWS, desplegados con CI/CD bajo sprints ágiles.",
          "Ascendido de Intern → SDE I → SDE II en dos años por hacerme cargo de proyectos de punta a punta.",
        ],
      },
      {
        role: "Cofundador / Ingeniero de Software",
        org: "Cavos",
        url: "https://cavos.xyz/",
        period: "Abr 2025 – Presente · Remoto",
        kind: "founder",
        bullets: [
          "Cofundé Cavos, infraestructura de wallets embebidas para apps de Starknet — onboarding a cuentas inteligentes auto-custodiadas con login de Google o Apple, sin frase semilla.",
          "Diseñé y entregué el stack completo (Next.js, React, Solidity, Cairo) en vivo en Ethereum mainnet y Starknet, incluida la integración en producción con Jokers of Neon.",
          "Levanté $25K pre-seed y representé a Cavos en Devcon Cannes 2025 y Devconnect Argentina 2025.",
        ],
      },
      {
        role: "Cofundador / Ingeniero de Software",
        org: "Studio Framezz",
        url: "https://studioframezz.com/en",
        period: "May 2025 – Presente · Remoto",
        kind: "founder",
        bullets: [
          "Cofundé Framezz, plataforma de fotos con búsqueda por selfie para eventos (carreras de resistencia, maratones) con facturación conforme al IVA para Costa Rica.",
          "Construí la plataforma de punta a punta con Next.js y TypeScript, sobre AWS (almacenamiento y entrega con S3) que indexa y sirve fotos de eventos en vivo.",
          "En vivo en Ironman 70.3 CapCana, Disney Princess Half Marathon (Orlando), BMW Lindora Run y Clásica Palmarín MTB; líder técnico.",
        ],
      },
    ],
    venturesHeading: "// emprendimientos",
    ventures: [
      {
        name: "Cavos",
        url: "https://cavos.xyz/",
        blurb:
          "Infraestructura de wallets embebidas para apps de Starknet. Onboarding a cuentas inteligentes auto-custodiadas con login de Google o Apple — sin frase semilla, sin extensión. En vivo en Ethereum mainnet y Starknet, con la integración en producción con Jokers of Neon.",
        highlight: "$25K pre-seed · En vivo en Starknet mainnet",
        tech: "Next.js · React · Solidity · Cairo",
        logo: "/images/cavos.png",
        featured: true,
      },
      {
        name: "Studio Framezz",
        url: "https://studioframezz.com/en",
        blurb:
          "Plataforma de fotos con búsqueda por selfie para eventos deportivos — carreras de resistencia y maratones — con factura electrónica (IVA) para Costa Rica. Construida de punta a punta con Next.js y un pipeline AWS S3 que indexa y sirve fotos de eventos en vivo.",
        highlight: "4 eventos en vivo · Ironman y Disney",
        tech: "Next.js · TypeScript · AWS S3",
        logo: "/images/framezz.png",
      },
    ],
    projectsHeading: "// proyectos",
    projects: [
      { name: "Lumos", stack: "Next.js · Cairo", blurb: "Gestor de liquidez CLMM — estimación de pérdida impermanente, simulaciones de rango completo vs. concentrado y optimización automática de posiciones." },
      { name: "Go Stark Me", stack: "Next.js · Cairo", blurb: "Recaudación descentralizada en Starknet con contratos Cairo para donaciones Web3 de bajo costo y amigables para no técnicos." },
    ],
    skillsHeading: "// habilidades",
    educationHeading: "// educación",
    certificationsHeading: "// certificaciones",
    moreCertsLabel: "Ver más certificaciones",
    topLangsLabel: "Más usados",
    githubStats: { commits: "commits", prs: "PRs" },
    roleTags: { founder: "cofundador", employee: "empleado" },
    cta2: {
      heading: "// hablemos",
      subtext:
        "Abierto a roles backend & full-stack y a colaboraciones Web3. Aparta 15 minutos o envía mi CV a tu equipo.",
    },
    xHeading: "// en X",
    xPending: "El feed de X llegará pronto — sígueme en X.",
    contact: { heading: "// contacto", email: "emmanuelaguerorojas@gmail.com", phone: "+506 8433-9541" },
  },
};
