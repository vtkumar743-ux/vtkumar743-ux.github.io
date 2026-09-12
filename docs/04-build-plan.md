# Build plan

Each phase is a fresh session. Read `01`, `02`, `03` first — never re-fetch the
reference site.

## Phase 0 — scaffold
Next.js 15 (App Router, TS) · Tailwind v4 · lucide-react · `next/font` for
Poppins + Inter + Handjet. Theme tokens from `02-design-system.md` wired into
`@theme`. `.shell`, `.section`, `.grain`, `ease-smooth`, `shadow-card`,
`rounded-card`, `max-w-lede`, `--card-stick`. Typed content files under
`src/content/`. Verify: dark ground, correct fonts, grain visible.

## Phase 1 — chrome
Header (sticky, blurred, mobile drawer, skip-link), Footer, Button variants,
SectionHeading. Route stubs for `/projects`, `/projects/[slug]`, `/services`,
`/about`, `/blog`.

## Phase 2 — hero
The metallic-bezel portrait card, ghost wordmark, accent glow, grain. This is the
single highest-value block; get it pixel-right before moving on.

## Phase 3 — proof
Certifications marquee, Journey-in-Numbers bento, Mastered Tools, Work Process.

## Phase 4 — projects
Sticky stacking card list, per-project hue, `/projects` index, `/projects/[slug]`
case-study template (problem, approach, architecture, what shipped, stack, gallery).

## Phase 5 — narrative
Experience timeline, Awards, Testimonials carousel, `/about`.

## Phase 6 — conversion
Services tabs, Pricing tabs, FAQ accordion, Contact form with honeypot, validation,
success state, and a real delivery route.

## Phase 7 — polish
Dynamic `/opengraph-image`, metadata per route, JSON-LD Person schema, sitemap,
robots, favicon, Lighthouse pass, `prefers-reduced-motion` audit, keyboard-nav audit,
400px-width audit.

## Phase 8 — deploy
Vercel, custom domain, analytics.

## Definition of done per section
Renders correctly at 400px and 1440px · no horizontal scroll · all motion behind
`motion-safe:` · section has `aria-labelledby` · carousels have a visually-hidden
plain-text equivalent · every interactive element is reachable and visible on keyboard focus.
