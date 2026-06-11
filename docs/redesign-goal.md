# Goal: "Scroll is time. The ledger replays." — Memric experience upgrade

You are working in `memric-web`, the marketing site for Memric (a decision ledger
for investment firms). Your mission is to evolve this site from excellent editorial
craft into an award-contention experience (awwwards SOTD bar) **without sacrificing
one point of buyer trust**. The single design thesis:

> Memric's pitch is a feeling — the vertigo of realizing your firm already made
> this mistake and nobody remembers. The site must *induce* that feeling
> interactively, not just state it in copy. Every motion must be product-true:
> it demonstrates extraction, lineage, retirement, or replay. Zero decoration.

If a proposed effect does not teach the visitor what Memric does, it does not ship.

---

## Context you must internalize first

- Stack: Astro 6 static output, Tailwind CSS v4 (`@theme` tokens in
  `src/styles/global.css`), zero framework runtime, ~5KB total inline JS,
  Vitest container tests per component (`npm test`), `npm run build`,
  `npm run check`. Dev server: `npm run dev`. All currently green — keep them green.
- Design language: editorial paper-and-ink. Paper `#fcfcf8`, ink `#111111`,
  accent red `#d42a1f`, Newsreader display serif, Inter body, IBM Plex Mono
  micro-labels, hairline rules, red stamps. **This language is the differentiation.
  Do not replace it. Deepen it.**
- Narrative: all artifacts tell one fictional story — Meridian Capital's NVDA
  memo (2023-Q3), the prediction that resolved, J. Okafor's buried dissent that
  was vindicated 14 months later, principle PRI-0042 retired after three
  post-mortems, and a live proposal today that echoes the retired assumption.
  This cast and timeline must stay internally consistent everywhere.
- Read before designing: `src/pages/index.astro`, every component it imports,
  `src/styles/global.css`, `src/layouts/BaseLayout.astro` (reveal system),
  `src/pages/meridian-report.astro`.

## Hard constraints (non-negotiable, check every commit against these)

1. **Reduced motion = the current site.** `prefers-reduced-motion: reduce` users
   must get a fully readable, essentially static page — the existing editorial
   layout is the fallback, and it must remain complete (no content that exists
   only mid-animation).
2. **No-JS = readable.** All copy and artifacts render without JavaScript, in a
   sensible static state. Scroll scenes must be progressive enhancement.
3. **Performance budget:** ≤ 100KB gzipped JS total, Lighthouse ≥ 95 on
   Performance / A11y / Best Practices / SEO (mobile, production build).
   Current baseline is 97/100/100 — never regress a11y below current.
4. **The report page (`/meridian-report`) stays calm.** It is the sample
   deliverable a CIO forwards to their IC. View-transition *into* it is in
   scope; animating its internals is not.
5. **Banned (refuse even if they'd look good):** sound on by default, custom
   cursors, preloaders/percentage counters, horizontal-scroll sections, WebGL /
   three.js, scroll hijacking (scrub must respect native scroll velocity),
   anything that delays the hero memo being readable past ~1s.
6. **Copy voice is settled.** Declarative, typed, ledger-like. Do not rewrite
   copy except where a scene requires a caption; match the existing register.
7. Tests, build, and `astro check` pass at every gate. Update tests honestly —
   never weaken an assertion to make a scene pass.

## Approved tech

- CSS scroll-driven animations (`animation-timeline: view()/scroll()`) as first
  choice; GSAP + ScrollTrigger permitted where CSS timelines can't express the
  scene (load GSAP only on `lg`+ and only when motion is allowed). Lenis only
  if scrub smoothness demands it — measure first.
- Astro View Transitions API for the report-thumbnail → report-page expansion.
- Motion tokens FIRST: define `--duration-fast/base/scene` and two easings in
  `@theme`; migrate the existing 8 ad-hoc durations onto them. All new motion
  uses tokens. This is the difference between "designed" and "decorated."

## The scenes (build in this order)

### Phase A — the middle path (ship-worthy on its own)

**Scene 1 — The hero demonstrates forgetting.**
"Your firm remembers every document." stays crisp ink. "It forgets every
judgment." decays on scroll — letters thinning toward `--color-struck`,
strikethrough drawing character-by-character. Acceptance: a first-time visitor
understands the product's reason to exist before reading the subhead; effect
completes within the first ~60vh of scroll; reduced-motion shows the line
fully intact (legibility beats theater); headline remains selectable text
(no canvas/SVG text replacement).

**Scene 2 — The extraction moment (riskiest scene — prototype FIRST).**
The memo sentence "AI-infrastructure margins are structurally durable" lifts
off the raw memo, gets visibly *typed* into a ledger record — owner, confidence,
source span fields populating — and settles into the dark ledger panel.
Acceptance: the existing hover-trace interaction still works after the scene
settles; the scene reads correctly when entered mid-scroll (deep links, refresh);
SR users get equivalent meaning via existing DOM order, no announcement spam.

**Scene 3 — Opening the deliverable.**
The report thumbnail in Engagement expands into `/meridian-report` via view
transition. Acceptance: works in Chrome/Safari/Firefox stable (graceful
fallback to instant navigation), back-navigation reverses it, no layout shift
on the report page.

**GATE A (stop here):** screenshot/record all three scenes at 390/820/1440px +
reduced-motion + no-JS states, run the full verification protocol below, then
present to Jin for a feel-check. Do not start Phase B without explicit sign-off.

### Phase B — the full replay (only after Gate A approval)

- Quarters tick in the margin as scroll advances time through the Meridian story.
- VINDICATED / RETIRED red-stamp moments with a settle (one shared stamp
  animation, used exactly twice).
- The echo finale: a live proposal slides in at "today" and the retired
  principle lights up across previously-scrolled history — the contradiction
  made spatial.
- Lineage edges draw themselves in the Trust section (SVG stroke animation).

**GATE B:** same protocol + 2–3 outside reactions (ideally investment-firm
adjacent people) before any award submission work.

### Phase C — polish & submission

Poster-frame capture, case-study writeup (the 100KB-JS / a11y story is part of
the entry), OG refresh, final cross-browser pass, submission assets.

## Process discipline

1. **Storyboard before code.** Write `docs/storyboard.md`: per scene — trigger,
   duration in scroll-space, start/end states, reduced-motion state, fallback.
   Get the beats right in prose first.
2. **Prototype Scene 2 in isolation first** (a scratch page is fine). If it
   doesn't feel magical after ~2 days of effort, STOP and rethink the concept
   with Jin rather than polishing a mediocre mechanic. Sunk cost is the enemy.
3. One scene per commit, verification protocol per commit, screenshots in the
   commit body or PR.
4. When judging your own motion work, screenshot mid-animation frames at
   multiple scroll positions — never claim a scene works from code alone.

## Verification protocol (run at every gate, paste results)

```
npm test && npm run build && npm run check
# Lighthouse mobile against `npm run preview` (production build), all 4 categories
# JS weight: total gzipped JS in dist/ — must be ≤ 100KB
# Screenshots: 390 / 820 / 1440, each scene at 3 scroll positions
# prefers-reduced-motion emulation: full page readable, scenes static-complete
# JS disabled: full page readable
# Keyboard: tab through cockpit, ledger records, nav — focus always visible
```

## Definition of done (Phase A)

A first-time visitor on a normal laptop feels the forgetting, watches one
sentence become a typed record, and opens the deliverable — three moments, one
motion system, no cliché, with tests green, Lighthouse ≥ 95×4, and a
reduced-motion experience as good as today's site. Everything else is optional.
