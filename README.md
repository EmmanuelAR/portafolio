# ear.dev — Emmanuel Agüero

Single-page personal site for Emmanuel Agüero Rojas (founder & software engineer).
Next.js 16 (App Router) + React 19 + TypeScript + Tailwind 4 + GSAP. Bilingual EN/ES,
real GitHub contribution grid, embedded CV, Cal.com booking.

Brand system (Inter, marker highlights, line-art avatar) is documented in
`docs/superpowers/specs/2026-09-14-brand-redesign.md`.

## Develop

    npm install
    npm run dev

## Test

    npm test

## Build

    npm run build

## Configuration

- `GITHUB_TOKEN` (optional, `.env`): enables the GraphQL API so the grid includes
  private contributions, commit/PR stats and top languages. Without it the public
  jogruber API is used.
- `NEXT_PUBLIC_SITE_URL` (optional): canonical origin used for `metadataBase`,
  sitemap, robots and JSON-LD. Defaults to `https://ear.dev`.
- `CAL_LINK` in `lib/content.ts`: public Cal.com booking slug. Empty hides the button.
- `NEXT_PUBLIC_META_PIXEL_ID` (optional): numeric Meta Pixel id. When it is set, the
  site loads the pixel and sends PageView (including after client navigations). The
  advisory landing also sends ViewContent, and each WhatsApp button sends Contact.
  Leave it empty to load nothing. The id is never hardcoded; change it in the
  environment and rebuild.

## Content

All copy lives in `lib/content.ts` as `content[lang]`. Inline highlights use
`==word==` (blue), `==red:word==` (red) and `==accent:word==` (orange text),
rendered by `components/Marked.tsx`.

## Language

Spanish by default on a bare URL. `?lang=en` selects English. The choice lives in
the URL; browser language is ignored.

## Deploy

Deploys to Vercel from the `main` branch.
