# Memric — website

Marketing site for **Memric** (institutional judgment memory for investment firms). Single-page, static, content-as-product.

- **Stack:** Astro (static, zero client JS) + Tailwind CSS v4, self-hosted fonts (Inter + IBM Plex Mono).
- **Source of design:** `../memric/docs/superpowers/specs/2026-05-29-memric-website-design.md`.

## Develop
```
npm install
npm run dev      # local dev server
npm run build    # static build to dist/
npm run preview  # serve the build
npm run check    # astro type-check
npm run test     # vitest (component render tests)
```

## Deploy
Deploys as a static site to Vercel. Point the Porkbun `memric.ai` DNS at the Vercel project after reviewing the preview deployment. Do not cut over DNS until the preview is approved.
