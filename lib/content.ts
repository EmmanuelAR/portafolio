import type { Lang } from "./i18n";

export interface Job {
  role: string;
  org: string;
  url: string;
  period: string;
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
}
export interface SiteContent {
  nav: { about: string; work: string; projects: string; contact: string };
  hero: {
    role: string;
    summary: string;
    location: string;
    cta: { cv: string; github: string; linkedin: string; x: string };
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
  xHeading: string;
  xPending: string;
  contact: { heading: string; email: string; phone: string };
}

export const NAME = "Emmanuel Agüero Rojas";
export const X_HANDLE = "EmmanuelDevCr";

export const LINKS = {
  github: "https://github.com/EmmanuelAR",
  linkedin: "https://linkedin.com/in/emmanuelaguerorojas",
  email: "emmanuelaguerorojas@gmail.com",
  cv: "/EmmanuelAguero_CV_2026.pdf",
};

export const SKILLS = [
  "Java", "TypeScript", "JavaScript", "Python", "C++", "SQL", "Cairo", "Solidity",
  "Spring Boot", "Node.js", "Next.js", "React", "PostgreSQL", "REST APIs",
  "AWS", "Azure", "Supabase", "MongoDB", "Git", "CI/CD", "Starknet", "Ethereum",
];

export const content: Record<Lang, SiteContent> = {
  en: {
    nav: { about: "about", work: "work", projects: "projects", contact: "contact" },
    hero: {
      role: "Software Engineer — Backend & Full-Stack · Blockchain / Web3",
      summary:
        "Backend and full-stack engineer with 3+ years shipping production systems in fintech and Web3.",
      location: "Alajuela, Costa Rica · GMT-6 · Remote-eligible",
      cta: { cv: "View CV", github: "GitHub", linkedin: "LinkedIn", x: "X" },
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
        bullets: [
          "Co-founded Framezz, a selfie-search photo platform for event photography (endurance races, marathons) with IVA-compliant invoicing for Costa Rica.",
          "Built the platform end-to-end with Next.js and TypeScript, backed by AWS (S3-driven storage and delivery) that indexes and serves photos from live events.",
          "Live at Ironman 70.3 CapCana, Disney Princess Half Marathon (Orlando), BMW Lindora Run, and Clásica Palmarín MTB; technical lead.",
        ],
      },
    ],
    venturesHeading: "// ventures",
    ventures: [
      { name: "Cavos", url: "https://cavos.xyz/", blurb: "Embedded-wallet infrastructure for Starknet." },
      { name: "Studio Framezz", url: "https://studioframezz.com/en", blurb: "Selfie-search photo platform for events." },
    ],
    projectsHeading: "// projects",
    projects: [
      { name: "Lumos", stack: "Next.js · Cairo", blurb: "CLMM liquidity manager — impermanent-loss estimation, full-range vs. concentrated simulations, automated position optimization." },
      { name: "Go Stark Me", stack: "Next.js · Cairo", blurb: "Decentralized fundraising on Starknet using Cairo smart contracts for low-cost, non-technical-friendly Web3 donations." },
    ],
    skillsHeading: "// skills",
    xHeading: "// on X",
    xPending: "X feed coming soon — follow me on X.",
    contact: { heading: "// contact", email: "emmanuelaguerorojas@gmail.com", phone: "+506 8433-9541" },
  },
  es: {
    nav: { about: "sobre-mí", work: "trabajo", projects: "proyectos", contact: "contacto" },
    hero: {
      role: "Ingeniero de Software — Backend & Full-Stack · Blockchain / Web3",
      summary:
        "Ingeniero backend y full-stack con más de 3 años entregando sistemas en producción en fintech y Web3.",
      location: "Alajuela, Costa Rica · GMT-6 · Disponible en remoto",
      cta: { cv: "Ver CV", github: "GitHub", linkedin: "LinkedIn", x: "X" },
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
        bullets: [
          "Cofundé Framezz, plataforma de fotos con búsqueda por selfie para eventos (carreras de resistencia, maratones) con facturación conforme al IVA para Costa Rica.",
          "Construí la plataforma de punta a punta con Next.js y TypeScript, sobre AWS (almacenamiento y entrega con S3) que indexa y sirve fotos de eventos en vivo.",
          "En vivo en Ironman 70.3 CapCana, Disney Princess Half Marathon (Orlando), BMW Lindora Run y Clásica Palmarín MTB; líder técnico.",
        ],
      },
    ],
    venturesHeading: "// emprendimientos",
    ventures: [
      { name: "Cavos", url: "https://cavos.xyz/", blurb: "Infraestructura de wallets embebidas para Starknet." },
      { name: "Studio Framezz", url: "https://studioframezz.com/en", blurb: "Plataforma de fotos con búsqueda por selfie para eventos." },
    ],
    projectsHeading: "// proyectos",
    projects: [
      { name: "Lumos", stack: "Next.js · Cairo", blurb: "Gestor de liquidez CLMM — estimación de pérdida impermanente, simulaciones de rango completo vs. concentrado y optimización automática de posiciones." },
      { name: "Go Stark Me", stack: "Next.js · Cairo", blurb: "Recaudación descentralizada en Starknet con contratos Cairo para donaciones Web3 de bajo costo y amigables para no técnicos." },
    ],
    skillsHeading: "// habilidades",
    xHeading: "// en X",
    xPending: "El feed de X llegará pronto — sígueme en X.",
    contact: { heading: "// contacto", email: "emmanuelaguerorojas@gmail.com", phone: "+506 8433-9541" },
  },
};
