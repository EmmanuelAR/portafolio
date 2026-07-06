# Portfolio Single-Page Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build Emmanuel Agüero's single-page portfolio in Next.js — white background, black text, monospace/typewriter vibe — with embedded CV, real GitHub contribution grid, bilingual EN/ES toggle, ventures, and a live X feed.

**Architecture:** Next.js App Router. `app/page.tsx` is a server component that fetches real GitHub contribution data at build/request time and passes it into a top-level client shell (`components/Home.tsx`) wrapped in a `LanguageProvider`. All copy lives in one bilingual `lib/content.ts` consumed as `content[lang]`; components read the current language from context — there is no `t(key)` indirection. Styling is Tailwind utility classes plus a few custom CSS rules (blinking cursor, loader). Deployed on Vercel.

**Tech Stack:** Next.js 15 (App Router), React 19, TypeScript, Tailwind CSS v4, `next/font/google` (JetBrains Mono), Vitest + React Testing Library + jsdom for tests.

## Global Constraints

- **Colors:** background `#ffffff`, text `#000000`. Single accent = GitHub green for the contribution grid only. No other colors. Light mode only — no dark mode.
- **Font:** monospace everywhere (JetBrains Mono via `next/font/google`, fallback `ui-monospace, "Courier New", monospace`).
- **Single page:** one vertical-scroll route (`/`). No additional routes.
- **Languages:** English (default) and Spanish, switched by an EN | ES toggle; selection persisted in `localStorage` under key `portfolio-lang`.
- **GitHub user:** `EmmanuelAR`. Contributions API: `https://github-contributions-api.jogruber.de/v4/EmmanuelAR` (no token).
- **Node:** v24 / npm 11 (already installed).
- **Deploy target:** Vercel.
- **Assets (copy into `/public`):** `emmanuel.jpg` (from `/Users/emmanuelaguero/Downloads/DVC04710.JPG`), `EmmanuelAguero_CV_2026.pdf` (from `/Users/emmanuelaguero/Documents/EmmanuelAguero_CV_2026.pdf`).
- **X handle:** not yet provided. `X_HANDLE` constant starts as `""`; the X section renders a placeholder link while empty and the live widget once set.
- **Content source of truth:** `EmmanuelAguero_CV_2026.pdf` (all bullets/skills/dates are transcribed in Task 3).

---

### Task 1: Scaffold Next.js app, fonts, base styles, assets

**Files:**
- Create: whole project via `create-next-app` in repo root (keeps existing `README.md`, `.git`, `docs/`).
- Modify: `app/layout.tsx`, `app/globals.css`, `app/page.tsx`
- Create: `public/emmanuel.jpg`, `public/EmmanuelAguero_CV_2026.pdf`

**Interfaces:**
- Produces: a running Next.js app with JetBrains Mono applied globally, white/black base, and assets in `/public`.

- [ ] **Step 1: Scaffold into the current directory**

Run (note the trailing `.` = current dir; answer "yes" to overwriting `README.md` if prompted):

```bash
npx create-next-app@latest . --typescript --tailwind --eslint --app --no-src-dir --import-alias "@/*" --use-npm --no-turbopack
```

Expected: creates `app/`, `package.json`, `tailwind`/`postcss` config, `tsconfig.json`, `node_modules/`.

- [ ] **Step 2: Copy assets into `public/`**

```bash
cp "/Users/emmanuelaguero/Downloads/DVC04710.JPG" public/emmanuel.jpg
cp "/Users/emmanuelaguero/Documents/EmmanuelAguero_CV_2026.pdf" public/EmmanuelAguero_CV_2026.pdf
```

Run: `ls -la public/emmanuel.jpg public/EmmanuelAguero_CV_2026.pdf`
Expected: both files listed, non-zero size.

- [ ] **Step 3: Configure font + metadata in `app/layout.tsx`**

Replace the file with:

```tsx
import type { Metadata } from "next";
import { JetBrains_Mono } from "next/font/google";
import "./globals.css";

const mono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Emmanuel Agüero — Software Engineer",
  description:
    "Backend & Full-Stack Software Engineer · Blockchain / Web3. Snap Finance, Cavos, Studio Framezz.",
  openGraph: {
    title: "Emmanuel Agüero — Software Engineer",
    description: "Backend & Full-Stack · Blockchain / Web3",
    images: ["/emmanuel.jpg"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${mono.variable} font-mono bg-white text-black antialiased`}>
        {children}
      </body>
    </html>
  );
}
```

- [ ] **Step 4: Set base styles in `app/globals.css`**

Replace the file with (Tailwind v4 syntax — if the scaffold produced Tailwind v3, use `@tailwind base;@tailwind components;@tailwind utilities;` instead of the `@import`):

```css
@import "tailwindcss";

@theme {
  --font-mono: var(--font-mono), ui-monospace, "Courier New", monospace;
}

html {
  scroll-behavior: smooth;
}

body {
  background: #ffffff;
  color: #000000;
}

/* Blinking typewriter cursor */
@keyframes blink {
  0%, 49% { opacity: 1; }
  50%, 100% { opacity: 0; }
}
.cursor-blink::after {
  content: "_";
  margin-left: 2px;
  animation: blink 1s steps(1) infinite;
}

/* Loader dots */
@keyframes loaderPulse {
  0%, 80%, 100% { opacity: 0.2; }
  40% { opacity: 1; }
}
```

- [ ] **Step 5: Replace `app/page.tsx` with a placeholder to verify the build**

```tsx
export default function Page() {
  return (
    <main className="min-h-screen flex items-center justify-center">
      <p className="text-lg">&gt;_ portfolio boot ok</p>
    </main>
  );
}
```

- [ ] **Step 6: Run the dev/build check**

Run: `npm run build`
Expected: build completes with no errors; route `/` compiled.

- [ ] **Step 7: Commit**

```bash
git add -A
git commit -m "chore: scaffold Next.js portfolio with mono font and assets"
```

---

### Task 2: Test setup + i18n provider

**Files:**
- Create: `vitest.config.ts`, `vitest.setup.ts`, `lib/i18n.tsx`, `lib/i18n.test.tsx`
- Modify: `package.json` (add `test` script)

**Interfaces:**
- Produces:
  - `type Lang = "en" | "es"`
  - `LanguageProvider({ children }: { children: React.ReactNode })` — React context provider; reads/writes `localStorage["portfolio-lang"]`, defaults to `"en"`.
  - `useLang(): { lang: Lang; setLang: (l: Lang) => void; toggle: () => void }`

- [ ] **Step 1: Install test dependencies**

```bash
npm install -D vitest @vitejs/plugin-react @testing-library/react @testing-library/jest-dom jsdom
```

- [ ] **Step 2: Create `vitest.config.ts`**

```ts
import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import path from "node:path";

export default defineConfig({
  plugins: [react()],
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: ["./vitest.setup.ts"],
  },
  resolve: {
    alias: { "@": path.resolve(__dirname, ".") },
  },
});
```

- [ ] **Step 3: Create `vitest.setup.ts`**

```ts
import "@testing-library/jest-dom/vitest";
```

- [ ] **Step 4: Add the test script to `package.json`**

In the `"scripts"` object add:

```json
"test": "vitest run"
```

- [ ] **Step 5: Write the failing test `lib/i18n.test.tsx`**

```tsx
import { render, screen, act } from "@testing-library/react";
import { LanguageProvider, useLang } from "./i18n";

function Probe() {
  const { lang, toggle } = useLang();
  return (
    <button onClick={toggle} data-testid="probe">
      {lang}
    </button>
  );
}

test("defaults to English and toggles to Spanish", () => {
  localStorage.clear();
  render(
    <LanguageProvider>
      <Probe />
    </LanguageProvider>
  );
  const btn = screen.getByTestId("probe");
  expect(btn).toHaveTextContent("en");
  act(() => btn.click());
  expect(btn).toHaveTextContent("es");
  expect(localStorage.getItem("portfolio-lang")).toBe("es");
});
```

- [ ] **Step 6: Run test to verify it fails**

Run: `npm test`
Expected: FAIL — cannot resolve `./i18n`.

- [ ] **Step 7: Implement `lib/i18n.tsx`**

```tsx
"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

export type Lang = "en" | "es";

interface LangCtx {
  lang: Lang;
  setLang: (l: Lang) => void;
  toggle: () => void;
}

const Ctx = createContext<LangCtx | null>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("en");

  useEffect(() => {
    const saved = localStorage.getItem("portfolio-lang");
    if (saved === "en" || saved === "es") setLangState(saved);
  }, []);

  const setLang = (l: Lang) => {
    setLangState(l);
    localStorage.setItem("portfolio-lang", l);
  };

  const toggle = () => setLang(lang === "en" ? "es" : "en");

  return <Ctx.Provider value={{ lang, setLang, toggle }}>{children}</Ctx.Provider>;
}

export function useLang(): LangCtx {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useLang must be used within LanguageProvider");
  return ctx;
}
```

- [ ] **Step 8: Run test to verify it passes**

Run: `npm test`
Expected: PASS.

- [ ] **Step 9: Commit**

```bash
git add -A
git commit -m "feat: add vitest setup and i18n language provider"
```

---

### Task 3: Bilingual content model (`lib/content.ts`)

**Files:**
- Create: `lib/content.ts`, `lib/content.test.ts`

**Interfaces:**
- Consumes: `Lang` from `lib/i18n`.
- Produces:
  - `interface Job { role: string; org: string; url: string; period: string; bullets: string[] }`
  - `interface Project { name: string; stack: string; blurb: string }`
  - `interface Venture { name: string; url: string; blurb: string }`
  - `interface SiteContent { nav: { about: string; work: string; projects: string; contact: string }; hero: { role: string; summary: string; location: string; cta: { cv: string; github: string; linkedin: string; x: string } }; about: { heading: string; body: string }; githubHeading: string; experienceHeading: string; jobs: Job[]; venturesHeading: string; ventures: Venture[]; projectsHeading: string; projects: Project[]; skillsHeading: string; xHeading: string; xPending: string; contact: { heading: string; email: string; phone: string } }`
  - `const NAME = "Emmanuel Agüero Rojas"`
  - `const SKILLS: string[]` (language-neutral)
  - `const LINKS = { github: "https://github.com/EmmanuelAR", linkedin: "https://linkedin.com/in/emmanuelaguerorojas", email: "emmanuelaguerorojas@gmail.com", cv: "/EmmanuelAguero_CV_2026.pdf" }`
  - `const X_HANDLE = ""` (fill when provided)
  - `const content: Record<Lang, SiteContent>`

- [ ] **Step 1: Write the failing test `lib/content.test.ts`**

```ts
import { content, SKILLS, NAME } from "./content";

test("content has both languages with matching job counts", () => {
  expect(NAME).toContain("Emmanuel");
  expect(content.en.jobs.length).toBe(3);
  expect(content.es.jobs.length).toBe(3);
  expect(content.en.jobs[0].org).toBe(content.es.jobs[0].org);
  expect(SKILLS).toContain("Cairo");
  expect(SKILLS).toContain("Solidity");
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm test`
Expected: FAIL — cannot resolve `./content`.

- [ ] **Step 3: Implement `lib/content.ts`**

```ts
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
export const X_HANDLE = ""; // e.g. "emmanuel_ar" — fill when provided

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
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npm test`
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "feat: add bilingual site content model"
```

---

### Task 4: GitHub contributions fetch + transform (`lib/github.ts`)

**Files:**
- Create: `lib/github.ts`, `lib/github.test.ts`

**Interfaces:**
- Produces:
  - `interface ContributionDay { date: string; count: number; level: 0 | 1 | 2 | 3 | 4 }`
  - `interface ContributionData { total: number; weeks: ContributionDay[][] }`
  - `function toWeeks(days: ContributionDay[]): ContributionDay[][]` — pads the first week so column 0 aligns to the first day's weekday, then chunks into 7-day columns.
  - `async function getContributions(username: string): Promise<ContributionData>` — fetches the jogruber v4 API, maps to `ContributionDay[]`, returns `{ total, weeks }`. On fetch failure returns `{ total: 0, weeks: [] }`.

- [ ] **Step 1: Write the failing test `lib/github.test.ts`**

```ts
import { toWeeks, type ContributionDay } from "./github";

test("toWeeks pads to weekday alignment and chunks into 7s", () => {
  // 2026-01-01 is a Thursday (getDay() === 4)
  const days: ContributionDay[] = Array.from({ length: 10 }, (_, i) => ({
    date: `2026-01-${String(i + 1).padStart(2, "0")}`,
    count: i,
    level: 0,
  }));
  const weeks = toWeeks(days);
  // First column padded with 4 leading nulls-as-zero days -> length 7
  expect(weeks[0].length).toBe(7);
  // 4 pad + 10 real = 14 cells -> 2 full weeks
  expect(weeks.length).toBe(2);
  expect(weeks[1].length).toBe(7);
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm test`
Expected: FAIL — cannot resolve `./github`.

- [ ] **Step 3: Implement `lib/github.ts`**

```ts
export interface ContributionDay {
  date: string;
  count: number;
  level: 0 | 1 | 2 | 3 | 4;
}
export interface ContributionData {
  total: number;
  weeks: ContributionDay[][];
}

export function toWeeks(days: ContributionDay[]): ContributionDay[][] {
  if (days.length === 0) return [];
  const first = new Date(days[0].date + "T00:00:00");
  const pad = first.getDay(); // 0=Sun..6=Sat
  const padded: ContributionDay[] = [
    ...Array.from({ length: pad }, (_, i) => ({
      date: `pad-${i}`,
      count: 0,
      level: 0 as const,
    })),
    ...days,
  ];
  const weeks: ContributionDay[][] = [];
  for (let i = 0; i < padded.length; i += 7) {
    weeks.push(padded.slice(i, i + 7));
  }
  return weeks;
}

interface ApiDay {
  date: string;
  count: number;
  level: number;
}
interface ApiResponse {
  total: Record<string, number>;
  contributions: ApiDay[];
}

export async function getContributions(
  username: string
): Promise<ContributionData> {
  try {
    const res = await fetch(
      `https://github-contributions-api.jogruber.de/v4/${username}?y=last`,
      { next: { revalidate: 86400 } }
    );
    if (!res.ok) return { total: 0, weeks: [] };
    const data = (await res.json()) as ApiResponse;
    const days: ContributionDay[] = data.contributions.map((d) => ({
      date: d.date,
      count: d.count,
      level: Math.max(0, Math.min(4, d.level)) as 0 | 1 | 2 | 3 | 4,
    }));
    const total = Object.values(data.total).reduce((a, b) => a + b, 0);
    return { total, weeks: toWeeks(days) };
  } catch {
    return { total: 0, weeks: [] };
  }
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npm test`
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "feat: add github contributions fetch and week-chunking"
```

---

### Task 5: Loader, client shell, and sticky nav

**Files:**
- Create: `components/Loader.tsx`, `components/Nav.tsx`, `components/Home.tsx`
- Create: `components/Home.test.tsx`
- Modify: `app/page.tsx`

**Interfaces:**
- Consumes: `LanguageProvider`, `useLang` (Task 2); `content`, `NAME`, `LINKS` (Task 3); `ContributionData` (Task 4).
- Produces:
  - `Loader()` — full-screen white overlay with pulsing `>_ loading` that fades out after ~1.2s.
  - `Nav()` — sticky top bar: `EA·` mark, section anchors (`#about #work #projects #contact`), and an `EN | ES` toggle button bound to `useLang().toggle`.
  - `Home({ contributions }: { contributions: ContributionData })` — client component; wraps everything in `LanguageProvider`, renders `Loader` + `Nav` + a `<main>` that later tasks fill in. For this task `<main>` holds only the `Nav` and a temporary hero placeholder `<section id="about">`.

- [ ] **Step 1: Implement `components/Loader.tsx`**

```tsx
"use client";

import { useEffect, useState } from "react";

export default function Loader() {
  const [gone, setGone] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setGone(true), 1200);
    return () => clearTimeout(t);
  }, []);
  if (gone) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white transition-opacity">
      <p className="text-xl tracking-widest">
        &gt;_ loading
        <span style={{ animation: "loaderPulse 1s infinite" }}>...</span>
      </p>
    </div>
  );
}
```

- [ ] **Step 2: Implement `components/Nav.tsx`**

```tsx
"use client";

import { useLang } from "@/lib/i18n";
import { content } from "@/lib/content";

export default function Nav() {
  const { lang, toggle } = useLang();
  const c = content[lang];
  return (
    <nav className="sticky top-0 z-40 flex items-center justify-between border-b border-black bg-white px-4 py-3 text-sm sm:px-8">
      <a href="#top" className="font-bold">EA·</a>
      <div className="hidden gap-6 sm:flex">
        <a href="#about" className="hover:underline">{c.nav.about}</a>
        <a href="#work" className="hover:underline">{c.nav.work}</a>
        <a href="#projects" className="hover:underline">{c.nav.projects}</a>
        <a href="#contact" className="hover:underline">{c.nav.contact}</a>
      </div>
      <button
        onClick={toggle}
        aria-label="Toggle language"
        className="border border-black px-2 py-1 hover:bg-black hover:text-white"
      >
        {lang === "en" ? "EN | es" : "en | ES"}
      </button>
    </nav>
  );
}
```

- [ ] **Step 3: Implement `components/Home.tsx`**

```tsx
"use client";

import { LanguageProvider } from "@/lib/i18n";
import type { ContributionData } from "@/lib/github";
import Loader from "./Loader";
import Nav from "./Nav";

export default function Home({
  contributions,
}: {
  contributions: ContributionData;
}) {
  return (
    <LanguageProvider>
      <Loader />
      <div id="top">
        <Nav />
        <main>
          <section id="about" className="px-4 py-24 sm:px-8">
            <p>&gt;_ sections mount here</p>
            <p className="text-xs text-black/50">
              {contributions.total} contributions loaded
            </p>
          </section>
        </main>
      </div>
    </LanguageProvider>
  );
}
```

- [ ] **Step 4: Wire `app/page.tsx` to fetch and render `Home`**

```tsx
import Home from "@/components/Home";
import { getContributions } from "@/lib/github";

export default async function Page() {
  const contributions = await getContributions("EmmanuelAR");
  return <Home contributions={contributions} />;
}
```

- [ ] **Step 5: Write the smoke test `components/Home.test.tsx`**

```tsx
import { render, screen } from "@testing-library/react";
import Home from "./Home";

test("renders nav with language toggle", () => {
  render(<Home contributions={{ total: 0, weeks: [] }} />);
  expect(screen.getByLabelText("Toggle language")).toBeInTheDocument();
  expect(screen.getByText("EA·")).toBeInTheDocument();
});
```

- [ ] **Step 6: Run tests**

Run: `npm test`
Expected: PASS.

- [ ] **Step 7: Verify build + manual look**

Run: `npm run build`
Expected: PASS. (Optionally `npm run dev` and confirm loader → nav → toggle switches labels.)

- [ ] **Step 8: Commit**

```bash
git add -A
git commit -m "feat: add loader, sticky nav, and client home shell"
```

---

### Task 6: Hero + About sections

**Files:**
- Create: `components/Hero.tsx`, `components/About.tsx`
- Modify: `components/Home.tsx`

**Interfaces:**
- Consumes: `useLang`, `content`, `NAME`, `LINKS` (Task 3).
- Produces: `Hero()` and `About()` React components. `Hero` renders name (with `.cursor-blink`), role, summary, location, and CTA buttons (CV button dispatches a `window` custom event `open-cv` — the CV modal in Task 9 listens for it; GitHub/LinkedIn/X are anchor links). `About` renders the photo via `next/image` beside the about body.

- [ ] **Step 1: Implement `components/Hero.tsx`**

```tsx
"use client";

import { useLang } from "@/lib/i18n";
import { content, NAME, LINKS, X_HANDLE } from "@/lib/content";

function openCv() {
  window.dispatchEvent(new CustomEvent("open-cv"));
}

export default function Hero() {
  const { lang } = useLang();
  const c = content[lang];
  const btn =
    "border border-black px-4 py-2 text-sm hover:bg-black hover:text-white transition-colors";
  return (
    <section className="border-b border-black px-4 py-20 sm:px-8">
      <h1 className="cursor-blink text-3xl font-bold sm:text-5xl">{NAME}</h1>
      <p className="mt-4 text-base sm:text-lg">{c.hero.role}</p>
      <p className="mt-6 max-w-2xl text-sm text-black/80 sm:text-base">
        {c.hero.summary}
      </p>
      <p className="mt-2 text-xs text-black/60">{c.hero.location}</p>
      <div className="mt-8 flex flex-wrap gap-3">
        <button onClick={openCv} className={btn}>[ {c.hero.cta.cv} ]</button>
        <a href={LINKS.github} target="_blank" rel="noopener" className={btn}>[ {c.hero.cta.github} ]</a>
        <a href={LINKS.linkedin} target="_blank" rel="noopener" className={btn}>[ {c.hero.cta.linkedin} ]</a>
        <a
          href={X_HANDLE ? `https://x.com/${X_HANDLE}` : "https://x.com"}
          target="_blank"
          rel="noopener"
          className={btn}
        >
          [ {c.hero.cta.x} ]
        </a>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Implement `components/About.tsx`**

```tsx
"use client";

import Image from "next/image";
import { useLang } from "@/lib/i18n";
import { content } from "@/lib/content";

export default function About() {
  const { lang } = useLang();
  const c = content[lang];
  return (
    <section id="about" className="border-b border-black px-4 py-16 sm:px-8">
      <h2 className="mb-8 text-lg font-bold">{c.about.heading}</h2>
      <div className="grid gap-8 md:grid-cols-[280px_1fr] md:items-start">
        <Image
          src="/emmanuel.jpg"
          alt="Emmanuel Agüero"
          width={280}
          height={373}
          className="w-full max-w-[280px] border border-black grayscale"
          priority
        />
        <p className="max-w-2xl text-sm leading-relaxed sm:text-base">
          {c.about.body}
        </p>
      </div>
    </section>
  );
}
```

- [ ] **Step 3: Wire into `components/Home.tsx`**

Replace the `<main>` block (the temporary `<section id="about">`) with:

```tsx
        <main>
          <Hero />
          <About />
        </main>
```

And add imports at the top:

```tsx
import Hero from "./Hero";
import About from "./About";
```

- [ ] **Step 4: Verify build**

Run: `npm run build`
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "feat: add hero and about sections"
```

---

### Task 7: GitHub contribution grid

**Files:**
- Create: `components/GitHubGrid.tsx`
- Modify: `components/Home.tsx`

**Interfaces:**
- Consumes: `ContributionData` (Task 4), `useLang`, `content`, `LINKS`.
- Produces: `GitHubGrid({ data }: { data: ContributionData })` — renders the weeks as columns of 7 cells, colored by `level` using GitHub greens; shows total count and a link to the profile. `Home` passes its `contributions` prop down.

- [ ] **Step 1: Implement `components/GitHubGrid.tsx`**

```tsx
"use client";

import { useLang } from "@/lib/i18n";
import { content, LINKS } from "@/lib/content";
import type { ContributionData } from "@/lib/github";

const LEVELS = ["#ebedf0", "#9be9a8", "#40c463", "#30a14e", "#216e39"];

export default function GitHubGrid({ data }: { data: ContributionData }) {
  const { lang } = useLang();
  const c = content[lang];
  return (
    <section className="border-b border-black px-4 py-16 sm:px-8">
      <div className="mb-6 flex items-baseline justify-between">
        <h2 className="text-lg font-bold">{c.githubHeading}</h2>
        <a
          href={LINKS.github}
          target="_blank"
          rel="noopener"
          className="text-xs hover:underline"
        >
          @EmmanuelAR · {data.total} contributions
        </a>
      </div>
      {data.weeks.length === 0 ? (
        <p className="text-xs text-black/50">Contribution data unavailable.</p>
      ) : (
        <div className="overflow-x-auto">
          <div className="flex gap-[3px]">
            {data.weeks.map((week, wi) => (
              <div key={wi} className="flex flex-col gap-[3px]">
                {week.map((day, di) => (
                  <div
                    key={di}
                    title={day.date.startsWith("pad") ? "" : `${day.date}: ${day.count}`}
                    className="h-[11px] w-[11px] border border-black/10"
                    style={{ backgroundColor: LEVELS[day.level] }}
                  />
                ))}
              </div>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
```

- [ ] **Step 2: Wire into `components/Home.tsx`**

Add import:

```tsx
import GitHubGrid from "./GitHubGrid";
```

Add after `<About />`:

```tsx
          <GitHubGrid data={contributions} />
```

- [ ] **Step 3: Verify build + tests**

Run: `npm run build && npm test`
Expected: PASS. (Optionally `npm run dev` to confirm the grid renders with real greens.)

- [ ] **Step 4: Commit**

```bash
git add -A
git commit -m "feat: add real github contribution grid"
```

---

### Task 8: Experience, Projects, Skills sections

**Files:**
- Create: `components/Experience.tsx`, `components/Projects.tsx`, `components/Skills.tsx`
- Modify: `components/Home.tsx`

**Interfaces:**
- Consumes: `useLang`, `content`, `SKILLS`.
- Produces: `Experience()` (mono timeline of `content[lang].jobs`), `Projects()` (cards of `content[lang].projects`), `Skills()` (chips from `SKILLS`).

- [ ] **Step 1: Implement `components/Experience.tsx`**

```tsx
"use client";

import { useLang } from "@/lib/i18n";
import { content } from "@/lib/content";

export default function Experience() {
  const { lang } = useLang();
  const c = content[lang];
  return (
    <section className="border-b border-black px-4 py-16 sm:px-8">
      <h2 className="mb-8 text-lg font-bold">{c.experienceHeading}</h2>
      <div className="space-y-10">
        {c.jobs.map((job, i) => (
          <div key={i} className="border-l-2 border-black pl-4">
            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <h3 className="font-bold">
                {job.role} —{" "}
                {job.url ? (
                  <a href={job.url} target="_blank" rel="noopener" className="underline">
                    {job.org}
                  </a>
                ) : (
                  job.org
                )}
              </h3>
              <span className="text-xs text-black/60">{job.period}</span>
            </div>
            <ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-black/80">
              {job.bullets.map((b, bi) => (
                <li key={bi}>{b}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Implement `components/Projects.tsx`**

```tsx
"use client";

import { useLang } from "@/lib/i18n";
import { content } from "@/lib/content";

export default function Projects() {
  const { lang } = useLang();
  const c = content[lang];
  return (
    <section id="projects" className="border-b border-black px-4 py-16 sm:px-8">
      <h2 className="mb-8 text-lg font-bold">{c.projectsHeading}</h2>
      <div className="grid gap-6 sm:grid-cols-2">
        {c.projects.map((p, i) => (
          <div key={i} className="border border-black p-5">
            <div className="flex items-baseline justify-between">
              <h3 className="font-bold">{p.name}</h3>
              <span className="text-xs text-black/60">{p.stack}</span>
            </div>
            <p className="mt-3 text-sm text-black/80">{p.blurb}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
```

- [ ] **Step 3: Implement `components/Skills.tsx`**

```tsx
"use client";

import { useLang } from "@/lib/i18n";
import { content, SKILLS } from "@/lib/content";

export default function Skills() {
  const { lang } = useLang();
  const c = content[lang];
  return (
    <section className="border-b border-black px-4 py-16 sm:px-8">
      <h2 className="mb-8 text-lg font-bold">{c.skillsHeading}</h2>
      <div className="flex flex-wrap gap-2">
        {SKILLS.map((s) => (
          <span key={s} className="border border-black px-3 py-1 text-xs">
            {s}
          </span>
        ))}
      </div>
    </section>
  );
}
```

- [ ] **Step 4: Wire into `components/Home.tsx`**

Add imports:

```tsx
import Experience from "./Experience";
import Projects from "./Projects";
import Skills from "./Skills";
```

Add after `<GitHubGrid data={contributions} />`:

```tsx
          <Experience />
          <Skills />
          <Projects />
```

- [ ] **Step 5: Verify build**

Run: `npm run build`
Expected: PASS.

- [ ] **Step 6: Commit**

```bash
git add -A
git commit -m "feat: add experience, projects, and skills sections"
```

---

### Task 9: Ventures cards + CV modal

**Files:**
- Create: `components/Ventures.tsx`, `components/CVModal.tsx`
- Modify: `components/Home.tsx`

**Interfaces:**
- Consumes: `useLang`, `content`, `LINKS`.
- Produces:
  - `Ventures()` — `id="work"` section with external-link cards for `content[lang].ventures`.
  - `CVModal()` — client component listening for the `open-cv` window event (dispatched by the Hero CV button); when open, shows a full-screen overlay with the PDF in an `<iframe src="/EmmanuelAguero_CV_2026.pdf">`, a Download link, and a close button (also closes on `Escape`).

- [ ] **Step 1: Implement `components/Ventures.tsx`**

```tsx
"use client";

import { useLang } from "@/lib/i18n";
import { content } from "@/lib/content";

export default function Ventures() {
  const { lang } = useLang();
  const c = content[lang];
  return (
    <section id="work" className="border-b border-black px-4 py-16 sm:px-8">
      <h2 className="mb-8 text-lg font-bold">{c.venturesHeading}</h2>
      <div className="grid gap-6 sm:grid-cols-2">
        {c.ventures.map((v, i) => (
          <a
            key={i}
            href={v.url}
            target="_blank"
            rel="noopener"
            className="group border border-black p-6 transition-colors hover:bg-black hover:text-white"
          >
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold">{v.name}</h3>
              <span aria-hidden>→</span>
            </div>
            <p className="mt-3 text-sm opacity-80">{v.blurb}</p>
            <p className="mt-4 text-xs opacity-60">
              {v.url.replace("https://", "")}
            </p>
          </a>
        ))}
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Implement `components/CVModal.tsx`**

```tsx
"use client";

import { useEffect, useState } from "react";
import { useLang } from "@/lib/i18n";
import { content, LINKS } from "@/lib/content";

export default function CVModal() {
  const { lang } = useLang();
  const c = content[lang];
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const openHandler = () => setOpen(true);
    const keyHandler = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("open-cv", openHandler);
    window.addEventListener("keydown", keyHandler);
    return () => {
      window.removeEventListener("open-cv", openHandler);
      window.removeEventListener("keydown", keyHandler);
    };
  }, []);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-white">
      <div className="flex items-center justify-between border-b border-black px-4 py-3">
        <span className="text-sm font-bold">{c.hero.cta.cv} — {lang === "en" ? "CV" : "CV"}</span>
        <div className="flex gap-3 text-sm">
          <a
            href={LINKS.cv}
            download
            className="border border-black px-3 py-1 hover:bg-black hover:text-white"
          >
            {lang === "en" ? "Download" : "Descargar"}
          </a>
          <button
            onClick={() => setOpen(false)}
            aria-label="Close CV"
            className="border border-black px-3 py-1 hover:bg-black hover:text-white"
          >
            ✕
          </button>
        </div>
      </div>
      <iframe src={LINKS.cv} title="CV" className="flex-1 w-full" />
    </div>
  );
}
```

- [ ] **Step 3: Wire into `components/Home.tsx`**

Add imports:

```tsx
import Ventures from "./Ventures";
import CVModal from "./CVModal";
```

Add `<Ventures />` after `<GitHubGrid data={contributions} />` and before `<Experience />` (so `work` sits above experience). Add `<CVModal />` just inside the `LanguageProvider`, as a sibling after `<Loader />`:

```tsx
      <Loader />
      <CVModal />
```

- [ ] **Step 4: Verify build**

Run: `npm run build`
Expected: PASS. (Optionally `npm run dev`, click `[ View CV ]`, confirm the PDF opens and Escape closes it.)

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "feat: add ventures cards and embedded CV modal"
```

---

### Task 10: X feed + Footer + final assembly

**Files:**
- Create: `components/XFeed.tsx`, `components/Footer.tsx`
- Modify: `components/Home.tsx`

**Interfaces:**
- Consumes: `useLang`, `content`, `LINKS`, `X_HANDLE`.
- Produces:
  - `XFeed()` — if `X_HANDLE` is empty, renders a placeholder card with `content[lang].xPending` and a link to X; if set, injects the X `widgets.js` script and renders the `<a class="twitter-timeline" href="https://twitter.com/${X_HANDLE}">` embed.
  - `Footer()` — `id="contact"`: email (`mailto:`), phone, GitHub/LinkedIn/X links, and a "built with Next.js" line.

- [ ] **Step 1: Implement `components/XFeed.tsx`**

```tsx
"use client";

import { useEffect } from "react";
import { useLang } from "@/lib/i18n";
import { content, X_HANDLE } from "@/lib/content";

export default function XFeed() {
  const { lang } = useLang();
  const c = content[lang];

  useEffect(() => {
    if (!X_HANDLE) return;
    const s = document.createElement("script");
    s.src = "https://platform.twitter.com/widgets.js";
    s.async = true;
    document.body.appendChild(s);
    return () => {
      s.remove();
    };
  }, []);

  return (
    <section className="border-b border-black px-4 py-16 sm:px-8">
      <h2 className="mb-8 text-lg font-bold">{c.xHeading}</h2>
      {X_HANDLE ? (
        <div className="max-w-xl border border-black p-2">
          <a
            className="twitter-timeline"
            data-height="500"
            data-theme="light"
            href={`https://twitter.com/${X_HANDLE}?ref_src=twsrc%5Etfw`}
          >
            @{X_HANDLE}
          </a>
        </div>
      ) : (
        <a
          href="https://x.com"
          target="_blank"
          rel="noopener"
          className="inline-block border border-black p-6 hover:bg-black hover:text-white"
        >
          {c.xPending} →
        </a>
      )}
    </section>
  );
}
```

- [ ] **Step 2: Implement `components/Footer.tsx`**

```tsx
"use client";

import { useLang } from "@/lib/i18n";
import { content, LINKS, X_HANDLE } from "@/lib/content";

export default function Footer() {
  const { lang } = useLang();
  const c = content[lang];
  return (
    <footer id="contact" className="px-4 py-16 sm:px-8">
      <h2 className="mb-8 text-lg font-bold">{c.contact.heading}</h2>
      <div className="flex flex-col gap-2 text-sm">
        <a href={`mailto:${c.contact.email}`} className="hover:underline">
          {c.contact.email}
        </a>
        <span>{c.contact.phone}</span>
        <div className="mt-4 flex flex-wrap gap-4">
          <a href={LINKS.github} target="_blank" rel="noopener" className="hover:underline">GitHub</a>
          <a href={LINKS.linkedin} target="_blank" rel="noopener" className="hover:underline">LinkedIn</a>
          <a href={X_HANDLE ? `https://x.com/${X_HANDLE}` : "https://x.com"} target="_blank" rel="noopener" className="hover:underline">X</a>
        </div>
        <p className="mt-8 text-xs text-black/50">built with Next.js · © 2026 Emmanuel Agüero</p>
      </div>
    </footer>
  );
}
```

- [ ] **Step 3: Wire into `components/Home.tsx`**

Add imports:

```tsx
import XFeed from "./XFeed";
import Footer from "./Footer";
```

Add after `<Projects />`:

```tsx
          <XFeed />
          <Footer />
```

- [ ] **Step 4: Verify build + full test run**

Run: `npm run build && npm test`
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "feat: add X feed placeholder and contact footer"
```

---

### Task 11: Deploy config, README, final verification

**Files:**
- Create: `vercel.json` (optional but explicit)
- Modify: `README.md`
- Modify: `next.config.ts` (allow the CV iframe / no special remote images needed)

**Interfaces:**
- Produces: deploy-ready repo.

- [ ] **Step 1: Confirm `next.config.ts` is minimal**

Ensure it reads (create/replace if needed):

```ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {};

export default nextConfig;
```

- [ ] **Step 2: Write `README.md`**

```markdown
# Emmanuel Agüero — Portfolio

Single-page portfolio. Next.js (App Router) + TypeScript + Tailwind, monospace/typewriter theme, bilingual EN/ES, real GitHub contribution grid, embedded CV, and live X feed.

## Develop

    npm install
    npm run dev

## Test

    npm test

## Build

    npm run build

## Deploy

Deploys to Vercel from the `main` branch. To set the live X feed, set `X_HANDLE` in `lib/content.ts`.
```

- [ ] **Step 3: Full verification**

Run: `npm run build && npm test`
Expected: both PASS, no type errors.

- [ ] **Step 4: Manual review checklist (run `npm run dev`)**

- [ ] Loader shows then fades to the hero.
- [ ] White background, black text, monospace everywhere.
- [ ] EN | ES toggle switches all copy and persists on reload.
- [ ] GitHub grid shows real greens; total count matches profile roughly.
- [ ] `[ View CV ]` opens the embedded PDF; Download works; Escape closes.
- [ ] Ventures cards link to cavos.xyz and studioframezz.com.
- [ ] Photo renders in About.
- [ ] Nav anchors jump to about/work/projects/contact.

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "chore: add deploy config and README"
```

- [ ] **Step 6: (When ready) deploy to Vercel**

Run: `npx vercel --prod` (or connect the GitHub repo in the Vercel dashboard).
Expected: live URL returned.

---

## Notes / open inputs

- **X handle:** set `X_HANDLE` in `lib/content.ts` to enable the live X timeline; until then the X section shows a placeholder link and the X buttons point to `https://x.com`.
- **Loader style:** the plan uses a simple mono `>_ loading...` loader. If you want one of the specific uiverse loaders (`black-bullfrog-16` / `quick-chicken-16` / `selfish-bobcat-73`), swap the markup/CSS inside `components/Loader.tsx` — the mount/unmount logic stays the same.
- **uiverse component styling:** `bright-chicken-11` (ventures/buttons) and `unlucky-rattlesnake-65` (grid) informed the card/grid styling, adapted to the black/white/mono palette. Exact uiverse CSS can be dropped into the corresponding component if a closer match is wanted.
