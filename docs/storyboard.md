# Storyboard — Phase A: "Scroll is time. The ledger replays."

Principles: every motion demonstrates extraction, lineage, retirement, or replay.
Scrub respects native scroll velocity. Reduced motion / no-JS / unsupported
browsers get the current static editorial site, complete and readable.

Motion tokens (defined in `@theme`, used by every scene):
`--duration-fast: 220ms` (hovers, underlines), `--duration-base: 320ms`
(lifts, cards, stamps), `--duration-scene: 720ms` (reveals, scene settles);
`--ease-standard: ease` and `--ease-settle: cubic-bezier(0.22, 1, 0.36, 1)`.

---

## Scene 1 — The hero forgets

**Teaches:** the product's reason to exist — judgment decays even when documents survive.

- **Stage:** hero H1, sentence 2 only ("It forgets every judgment."). Sentence 1
  never changes — documents are remembered.
- **Trigger / timeline:** CSS scroll-driven animation on the H1's *exit* from the
  viewport (`animation-timeline: view()`, exit range). No pinning, no added page
  height: you witness the forgetting precisely as you scroll on — moving past it
  *is* the forgetting. Completes within roughly the first 60vh of scroll.
- **Start state:** sentence 2 crisp ink, identical to sentence 1.
- **Motion:** per-character stagger (build-time char spans with `--char-i`):
  ink → `--color-struck` color drain + slight weight/opacity thinning, plus a
  strikethrough rule that draws left-to-right across the sentence (scaleX on a
  pseudo-element, struck gray, NOT accent red — red means lifecycle events, not
  loss).
- **End state:** sentence 2 fully struck/grayed but perfectly legible.
- **Selectable:** chars remain real text nodes in spans; parent carries
  `aria-label` with the full sentence, char wrapper `aria-hidden="true"`.
- **Reduced motion / no-JS / no scroll-timeline support:** sentence 2 crisp and
  intact (current site). Gate via `@supports (animation-timeline: view())` AND
  `(prefers-reduced-motion: no-preference)`.
- **Mobile:** same mechanic, same timeline; verify legibility mid-decay at 390px.

## Scene 2 — The extraction (riskiest; prototype in isolation first)

**Teaches:** extraction + lineage — a sentence becomes a typed, source-linked record.

- **Decision:** the sentence does NOT fly across the panel (fragile across
  breakpoints, reads as a gimmick). Extraction is shown as *reference*: a
  lineage edge draws from the memo sentence to the ledger record, and the
  record types itself into existence. This is literally the product's data
  model (source span → edge → typed record), and it hands off perfectly to the
  existing hover-trace interaction.
- **Stage:** hero audit panel. Source: the `<mark data-evidence="principle echo">`
  ("AI-infrastructure margins are structurally durable", memo paragraph 2).
  Target: the Principle ledger record (PRI-0042, tone red).
- **Trigger:** IntersectionObserver on the audit panel (~55% visible), play once,
  time-based (~1.6s total), then remove scene classes so hover-trace owns state.
  If the panel is already past (deep link / fast scroll / mid-scroll entry),
  skip straight to settled end state.
- **Beats** (all on tokens):
  1. 0ms — memo sentence highlight swells once (the `is-active` treatment,
     borrowed, slightly amplified).
  2. ~200ms — SVG lineage edge draws from the mark's right edge across the
     panel gap to the record's left edge (stroke-dasharray draw, accent red,
     1.5px). Overlay `<svg>` is absolutely positioned, recomputed from live
     rects, `aria-hidden`, `pointer-events: none`.
  3. ~600ms — the record card, which started as a dashed empty outline
     ("untyped"), snaps to solid border; its fields type in: PRINCIPLE label,
     status RETIRED, detail text, then meta + source line (mono fields use
     steps() clip reveal; serif detail fades per-word).
  4. ~1.6s — edge fades to 40%, then out; record settles (existing
     `audit-panel-lift` settle); `aria-pressed` initial state applied; scene
     DOM flags removed. Page is now byte-identical in behavior to today.
- **Layout dependency:** the edge requires the memo and ledger side by side →
  scene runs at `lg`+ only. Below `lg` (stacked panels): record types in on
  reveal without the edge (typing alone still teaches extraction).
- **SR story:** DOM content is complete from SSR (fields present, visually
  clipped during the type-in). No live regions, no announcements — the scene is
  visual sugar over already-present content.
- **Reduced motion / no-JS:** the record renders settled (exact current site).
  The "untyped dashed" start state is applied by JS only, never SSR.
- **Kill criterion:** if the isolated prototype doesn't feel magical after ~2
  days of effort, stop and rethink with Jin. Judge from mid-animation frames.

## Scene 3 — Opening the deliverable

**Teaches:** replay/possession — the site's climax is opening the actual artifact.

- **Stage:** Engagement report thumbnail → `/meridian-report/`.
- **Mechanic:** Astro `<ClientRouter />` view transitions;
  `transition:name="meridian-report"` on the thumbnail frame and on the report
  page's header block. Thumbnail expands into the report; back reverses it.
- **Constraints:** report internals never animate (calm, printable). Instant
  navigation fallback in browsers without the View Transitions API (Firefox).
  No layout shift on arrival (reserve header dimensions).
- **Reduced motion:** Astro respects `prefers-reduced-motion` (verify; if not,
  force `transition:animate="none"` under the media query).
- **Verify:** Chrome + Safari morph; Firefox instant nav; Back reverses;
  CLS = 0 on the report page; scrollspy on the report still initializes after
  client-side navigation (its inline script must re-run via `astro:page-load`).

## Scene order of work

1. Motion tokens + migrate the 8 ad-hoc durations (mechanical; commit).
2. Scene 2 prototype on a scratch route (`/proto-extraction`, noindex, deleted
   before Gate A review) — iterate to "magical or kill".
3. Scene 1 (CSS-only; small diff).
4. Scene 3 (ClientRouter + names; verify script re-init on both pages).
5. Integrate Scene 2 into Hero; delete scratch route.
6. Gate A protocol: tests/build/check, Lighthouse ×4 ≥95 mobile prod, gzipped
   JS ≤100KB, screenshots 390/820/1440 × 3 scroll positions, reduced-motion
   pass, JS-off pass, keyboard pass. Present to Jin with mid-animation frames.
