# ear.dev — Brand redesign spec

**Date:** 2026-09-14
**Owner:** Emmanuel Agüero Rojas
**Status:** Implemented
**Supersedes:** `2026-07-05-portfolio-single-page-design.md` (visual identity section)

## Purpose

Align the portfolio with the ear.dev personal brand (Figma `xWlfAe3Ck5NBVVoN2SaW0r`)
and reposition Emmanuel as a founder/builder for a global audience, while keeping the
existing Next.js + Tailwind + bilingual content architecture.

## Positioning

Founder & engineer who builds products (Cavos, Framezz, ear.dev, SpaceXAI ambassador).
Hiring/CV is secondary: no "available for full-time" language anywhere. Primary CTA is
"book a call"; the CV is a tertiary link in the nav and the Talk section.

## Voice

- First person, lowercase, short sentences ending in a period ("hola. soy emmanuel.").
- One marker highlight per idea, on the word that carries it.
- Display copy is lowercase, including product names. Dense CV bullets (experience)
  keep sentence case and proper nouns for readability.
- English default (global audience); Spanish via toggle or `?lang=es`.

## Tokens (`app/globals.css`)

| Token | Value | Use |
|-------|-------|-----|
| `--color-paper` | `#ffffff` | background (light-only, no dark mode) |
| `--color-ink` | `#000000` | text |
| `--color-hl-blue` | `rgba(74,144,226,.5)` | default marker (`.hl`) |
| `--color-hl-red` | `rgba(226,74,77,.5)` | tension / problem marker (`.hl-red`) |
| `--color-accent` | `#ec6d25` | single emphasis word as colored text (`.hl-accent`) |
| `--font-sans` | Inter 400/500/600 | everything |
| `--font-mono` | JetBrains Mono 400/500 | labels, dates, metrics, stack only |
| `--tracking-brand` | `-0.04em` | display headings |
| `--text-display` | `clamp(2.75rem, 1.25rem + 7vw, 8.5rem)` | hero h1, talk h2 |
| `--text-title` | `clamp(2rem, 1rem + 4.5vw, 5.25rem)` | section intros, case names |
| `--text-lead` | `clamp(1.25rem, 1rem + 1.4vw, 2rem)` | leads, now items |

GitHub green scale stays the only other color, confined to the contribution grid.

## Do not

- No cards with shadows, no gradients, no border radius above 4px.
- No uppercase display text (mono labels are the only uppercase).
- No terminal affordances (`>_`, `// heading`, `[ button ]`, blinking cursor).
- No dark mode, no 3D/WebGL, no smooth-scroll library, no heavy custom cursor.
- No photo in the hero; the avatar is the face of the brand.

## Layout

- Left-weighted content; right-hand whitespace is intentional.
- `components/Section.tsx`: hairline top border, sticky mono label
  (`01 — now`) on the left, content on the right, `max-w-[1440px]`.
- Section order: hero → now → about → work (+ experiments) → proof of work (GitHub)
  → story (experience) → craft (skills) → education → talk → footer.

## Avatar

`public/brand/avatar-{smile,calm,serious,tired,logo}.webp` (transparent, 800×800, face
centered with a 6% margin), exported from the Figma brandbook. `components/Avatar.tsx`
only exports the versioned paths (`?v=N`, bump when artwork changes). `avatar-logo` is
used for the nav mark, favicon, apple-icon, OG image and the intro; the other
expressions are kept for posts/future use. There is no floating corner avatar on the
site (removed by request).

## Motion (GSAP 3.15 + `@gsap/react`)

- `lib/gsap.ts` registers `ScrollTrigger`, `SplitText`, `useGSAP` once.
- Hero: line split with masks, `yPercent: 110 → 0`, stagger 0.09; marker draws in
  after the text; lead and CTAs follow. Waits for the intro event on first visit.
  Headings are keyed by language because SplitText rewrites their DOM.
- `components/MotionRoot.tsx`: scroll reveals for `[data-reveal]` (opacity + 24px)
  and marker draw-in (`background-size 0% → 100%`) for `.hl[data-draw]`, `once: true`,
  re-run on language change. Sections with `data-motion-own` (hero) are skipped.
- Nav hides on scroll down, returns on scroll up; blurred paper background once scrolled.
- Magnetic hover (`lib/useMagnetic.ts`, ±6px, pointer: fine only) on primary CTAs.
- Intro (`components/Loader.tsx`): ~0.6s avatar + wordmark, once per session
  (`sessionStorage`), gated by an inline script that sets `html.intro` before paint.
- `prefers-reduced-motion: reduce` disables all of the above; content is always in the
  SSR HTML and only hidden when `html.js` is present, so no-JS renders fully.

## SEO

`metadataBase` from `NEXT_PUBLIC_SITE_URL`, `alternates.languages` (en, es via
`?lang=es`), OpenGraph profile + Twitter large card, dynamic `app/opengraph-image.tsx`,
`app/sitemap.ts`, `app/robots.ts`, JSON-LD `Person` in `app/layout.tsx`.

## Out of scope

Dark mode, blog/CMS, additional routes, contact form backend, domain change.
