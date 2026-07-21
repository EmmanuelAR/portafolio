import type { Lang } from "./i18n";

export interface StatItem {
  value: string;
  label: string;
}
export interface Job {
  role: string;
  org: string;
  url: string;
  period: string;
  kind: "founder" | "employee";
  stats?: string[];
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
  stats: string[];
  tech: string;
  logo: string;
  featured?: boolean;
}
export interface SiteContent {
  nav: { about: string; work: string; projects: string; contact: string };
  hero: {
    role: string;
    availability: string;
    summary: string;
    location: string;
    stats: StatItem[];
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
      availability: "Available for full-time",
      summary:
        "I own a Snap Finance onboarding backend gating ~$95M/month in application volume — from design through on-call. On the side, I've co-founded and shipped two products, Cavos and Framezz, which keep my Web3 and end-to-end delivery sharp. Looking for a full-time backend or full-stack role.",
      location: "Alajuela, Costa Rica · GMT-6 · Remote-eligible",
      stats: [
        { value: "~$95M/mo", label: "application volume gated" },
        { value: "70% ↓", label: "onboarding drop-off" },
        { value: "3+ yrs", label: "production fintech / Web3" },
      ],
      cta: { cv: "View CV", github: "GitHub", linkedin: "LinkedIn", x: "X", book: "Book a call", email: "Email" },
    },
    about: {
      heading: "// about",
      body:
        "Backend and full-stack engineer with 3+ years shipping production systems in fintech and Web3. I own a Snap Finance onboarding backend gating ~$95M/month in application volume, and I've co-founded two companies on the side: Cavos (embedded-wallet infrastructure for Starknet) and Framezz (selfie-search photo platform for event photography). Comfortable owning a service from design through on-call — and equally comfortable pitching investors.",
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
        stats: ["~$95M/mo volume", "70% ↓ drop-off", "Intern → SDE II in 2 yrs"],
        bullets: [
          "Own the onboarding backend that gates new-user revenue — ~$95M/month in application volume — across design, delivery, and on-call incident response for production traffic.",
          "Cut onboarding drop-off by 70% by diagnosing recurring failures to root cause and shipping targeted backend fixes.",
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
        stats: ["Account abstraction", "Live: Starknet + Ethereum", "$25K pre-seed (side)"],
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
        stats: ["40K+ photos", "12+ live events", "AWS S3 pipeline"],
        bullets: [
          "Co-founded Framezz, a selfie-search photo platform for event photography with IVA-compliant invoicing for Costa Rica — ~$2K in revenue within the first two months in production.",
          "Built the platform end-to-end with Next.js and TypeScript on an AWS S3 storage and delivery pipeline that indexes and serves 40K+ photos across 12+ live races (~3K per event).",
          "Live at Ironman 70.3 CapCana (Dominican Republic), Disney Princess Half Marathon (Orlando), BMW Lindora Run, and Clásica Palmarín MTB; on-site technical lead.",
        ],
      },
    ],
    venturesHeading: "// ventures",
    ventures: [
      {
        name: "Cavos",
        url: "https://cavos.xyz/",
        blurb:
          "Invisible wallets for crypto apps. Users onboard into self-custodial smart accounts with just a Google or Apple login — no seed phrase, no browser extension. Under the hood it's account abstraction: the social login provisions and controls an on-chain smart account, so wallet UX disappears for the end user. Live on Ethereum mainnet and Starknet, including the production integration with Jokers of Neon.",
        stats: ["Account abstraction", "Live on Starknet + Ethereum", "$25K pre-seed (side)"],
        tech: "Next.js · React · Solidity · Cairo",
        logo: "/images/cavos.png",
        featured: true,
      },
      {
        name: "Studio Framezz",
        url: "https://studioframezz.com/en",
        blurb:
          "Selfie-search photo platform for endurance races and marathons, with IVA-compliant e-invoicing for Costa Rica. An AWS pipeline (S3 storage + image processing) indexes and serves 40K+ photos across 12+ live events — search your face, get your race photos in seconds.",
        stats: ["40K+ photos", "12+ live events", "AWS S3 pipeline"],
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
        "I'm actively looking for a full-time backend or full-stack role (remote-friendly, GMT-6). If your team is hiring, grab 15 minutes below or send my CV — I'll get back to you fast.",
    },
    xHeading: "// on X",
    xPending: "X feed coming soon — follow me on X.",
    contact: { heading: "// contact", email: "emmanuelaguerorojas@gmail.com", phone: "+506 8433-9541" },
  },
  es: {
    nav: { about: "sobre-mí", work: "trabajo", projects: "proyectos", contact: "contacto" },
    hero: {
      role: "Ingeniero de Software Backend & Full-Stack · Blockchain / Web3",
      availability: "Disponible para full-time",
      summary:
        "Soy dueño de un backend de onboarding en Snap Finance que habilita ~$95M/mes en volumen de solicitudes — desde el diseño hasta el on-call. En paralelo, cofundé y entregué dos productos, Cavos y Framezz, que mantienen afiladas mis habilidades de Web3 y entrega de punta a punta. Busco un puesto full-time backend o full-stack.",
      location: "Alajuela, Costa Rica · GMT-6 · Disponible en remoto",
      stats: [
        { value: "~$95M/mes", label: "volumen de solicitudes" },
        { value: "70% ↓", label: "abandono en onboarding" },
        { value: "3+ años", label: "producción fintech / Web3" },
      ],
      cta: { cv: "Ver CV", github: "GitHub", linkedin: "LinkedIn", x: "X", book: "Agendar llamada", email: "Email" },
    },
    about: {
      heading: "// sobre mí",
      body:
        "Ingeniero de software backend y full-stack con 3+ años entregando sistemas en producción en fintech y Web3. Soy dueño de un backend de onboarding en Snap Finance que habilita ~$95M/mes en volumen de solicitudes, y en paralelo cofundé dos empresas: Cavos (infraestructura de wallets embebidas para Starknet) y Framezz (plataforma de fotos con búsqueda por selfie para eventos). Me manejo bien tanto diseñando y operando un servicio de punta a punta como presentándolo ante inversionistas.",
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
        stats: ["~$95M/mes volumen", "70% ↓ abandono", "Intern → SDE II en 2 años"],
        bullets: [
          "Responsable del backend de onboarding que habilita los ingresos de nuevos usuarios — ~$95M/mes en volumen de solicitudes — en diseño, entrega y respuesta a incidentes on-call en producción.",
          "Reduje el abandono en el onboarding en un 70% diagnosticando fallas recurrentes hasta su causa raíz y entregando correcciones de backend puntuales.",
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
        stats: ["Account abstraction", "En vivo: Starknet + Ethereum", "$25K pre-seed (side)"],
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
        stats: ["40K+ fotos", "12+ eventos en vivo", "pipeline AWS S3"],
        bullets: [
          "Cofundé Framezz, plataforma de fotos con búsqueda por selfie para eventos con facturación conforme al IVA para Costa Rica — ~$2K en ingresos dentro de los primeros dos meses en producción.",
          "Construí la plataforma de punta a punta con Next.js y TypeScript sobre un pipeline de almacenamiento y entrega en AWS S3 que indexa y sirve 40K+ fotos en 12+ carreras en vivo (~3K por evento).",
          "En vivo en Ironman 70.3 CapCana (República Dominicana), Disney Princess Half Marathon (Orlando), BMW Lindora Run y Clásica Palmarín MTB; líder técnico en sitio.",
        ],
      },
    ],
    venturesHeading: "// emprendimientos",
    ventures: [
      {
        name: "Cavos",
        url: "https://cavos.xyz/",
        blurb:
          "Wallets invisibles para apps cripto. Los usuarios entran a cuentas inteligentes auto-custodiadas con solo un login de Google o Apple — sin frase semilla, sin extensión de navegador. Por debajo es account abstraction: el login social provisiona y controla una smart account on-chain, así la UX de wallet desaparece para el usuario final. En vivo en Ethereum mainnet y Starknet, con la integración en producción con Jokers of Neon.",
        stats: ["Account abstraction", "En vivo en Starknet + Ethereum", "$25K pre-seed (side)"],
        tech: "Next.js · React · Solidity · Cairo",
        logo: "/images/cavos.png",
        featured: true,
      },
      {
        name: "Studio Framezz",
        url: "https://studioframezz.com/en",
        blurb:
          "Plataforma de fotos con búsqueda por selfie para carreras de resistencia y maratones, con factura electrónica (IVA) para Costa Rica. Un pipeline en AWS (almacenamiento S3 + procesamiento de imágenes) indexa y sirve 40K+ fotos en 12+ eventos en vivo — busca tu cara y obtén tus fotos de la carrera en segundos.",
        stats: ["40K+ fotos", "12+ eventos en vivo", "pipeline AWS S3"],
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
        "Estoy buscando activamente un puesto full-time backend o full-stack (remote-friendly, GMT-6). Si tu equipo está contratando, aparta 15 minutos abajo o envía mi CV — te respondo rápido.",
    },
    xHeading: "// en X",
    xPending: "El feed de X llegará pronto — sígueme en X.",
    contact: { heading: "// contacto", email: "emmanuelaguerorojas@gmail.com", phone: "+506 8433-9541" },
  },
};
