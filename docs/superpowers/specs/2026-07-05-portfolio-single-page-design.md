# Portfolio — Emmanuel Agüero (single-page) — Design Spec

**Date:** 2026-07-05
**Owner:** Emmanuel Agüero Rojas
**Status:** Approved — ready for implementation plan

## Purpose

A single-page personal portfolio that serves as Emmanuel's primary presentation
card ("carta de presentación") as a Software Engineer (Backend / Full-Stack ·
Blockchain / Web3). It must communicate seniority and seriousness, embed his CV,
surface his ventures and social presence, and be trivially shareable.

## Visual identity (the "vibe")

- **Background:** pure white (`#ffffff`). **Text:** black (`#000000`). Maximum
  contrast, serious tone.
- **Typography:** monospace / typewriter feel. Primary font is a self-hosted
  monospace (JetBrains Mono, with Courier Prime as an alternative) loaded via
  `next/font` for fast, layout-shift-free rendering.
- **Terminal/code detailing:** `>_` prompts, dividers rendered as ASCII-style
  rules, a blinking cursor in the hero. Restrained, not gimmicky.
- **Accent color:** single accent only — GitHub contribution green for the grid;
  everything else stays black/white.
- **Mode:** light-only (per the explicit white-background / black-text
  requirement). No dark-mode toggle.

## Page structure (single page, vertical scroll)

Sticky top nav (monospace, terminal-menu style) with section links and an
**EN | ES** language toggle on the right.

1. **Hero** — name + role with a blinking typewriter cursor; one-line summary +
   location (Alajuela, CR · GMT-6 · Remote-eligible); primary buttons:
   `[ View CV ]` `[ GitHub ]` `[ LinkedIn ]` `[ X ]`.
2. **About** — photo (`DVC04710.JPG`) + bio drawn from the CV summary.
3. **GitHub** — real contribution grid for `EmmanuelAR` (uiverse
   `unlucky-rattlesnake-65` styling).
4. **Experience** — monospace timeline: Snap Finance (SDE II) · Cavos · Studio
   Framezz, each with CV bullets.
5. **Work / Ventures** — external-link cards (uiverse `bright-chicken-11`
   styling): [cavos.xyz](https://cavos.xyz/) ·
   [studioframezz.com](https://studioframezz.com/en).
6. **Projects** — Lumos (CLMM Liquidity Manager) · Go Stark Me (Fundraising on
   Starknet).
7. **Skills** — monospace chips (Java, TypeScript, Python, C++, SQL, Cairo,
   Solidity, Spring Boot, Node.js, Next.js, React, PostgreSQL, AWS, Azure,
   Supabase, MongoDB, Starknet, Ethereum).
8. **X feed** — live embedded X (Twitter) timeline widget.
9. **Contact / Footer** — email, phone, social links, "built with Next.js".

**Loading:** on entry, a loader animation (chosen from the uiverse references
`black-bullfrog-16` / `quick-chicken-16` / `selfish-bobcat-73` — pick the one
that best fits black/white/mono; keep the others as fallback microinteractions)
before revealing the hero.

## Components & technical pieces

### uiverse components (adapted to React + black/white/mono)
- `unlucky-rattlesnake-65` → GitHub contribution grid (section 3).
- `bright-chicken-11` → work/venture cards and buttons (Cavos, Framezz, CV,
  socials).
- `black-bullfrog-16` / `quick-chicken-16` / `selfish-bobcat-73` → loader (one
  primary; others as fallback/microinteractions).

### CV embed (truly embedded, not just a link)
- Copy `EmmanuelAguero_CV_2026.pdf` into `/public`.
- `[ View CV ]` opens a modal with the PDF embedded (`<iframe>`/`<object>`) plus a
  **Download** button.

### GitHub contribution grid (real data)
- Fetch from the free public API
  `https://github-contributions-api.jogruber.de/v4/EmmanuelAR` (no token
  required), rendered with the uiverse grid styling.
- Fetched server-side in Next.js with daily revalidation
  (`revalidate: 86400`).

### Live X feed
- Official X (Twitter) embedded timeline widget for Emmanuel's handle.
- **Open input required:** X handle not yet provided. Until supplied, the section
  renders a placeholder card linking to X; wire the live widget once the handle
  is known.

### i18n (EN | ES)
- Simple toggle backed by two JSON dictionaries (`en.json` / `es.json`) and a
  React context. No heavy i18n library. Selection persists in `localStorage`.
- Default language: English (matches CV and international audience).

### Photo
- Copy `DVC04710.JPG` into `/public`, served/optimized via `next/image`.

## Stack & deployment

- **Next.js (App Router) + React + TypeScript + Tailwind CSS.**
- `next/font` for the self-hosted monospace.
- **Deploy target:** Vercel (same as Cavos/Framezz), ready for a custom domain
  later.

## Implementation model

Build the UI with **Sonnet** (the `claude` agent, model `sonnet`) for the bulk of
the work — good visual quality at medium token cost per the user's request — with
Opus reviewing the result.

## Content source

All textual content (summary, experience bullets, projects, skills, education,
languages, contact) comes from `EmmanuelAguero_CV_2026.pdf`. Contact details:
- Email: emmanuelaguerorojas@gmail.com
- Phone: +506 8433-9541
- LinkedIn: linkedin.com/in/emmanuelaguerorojas
- GitHub: github.com/EmmanuelAR
- X: _pending handle_

## Open inputs

1. **X (Twitter) handle** — required to wire the live X feed widget. Section
   ships with a placeholder link until provided.

## Out of scope (YAGNI)

- Dark mode.
- CMS / blog backend.
- Multi-page routing.
- Contact form with backend (footer uses `mailto:` link).
