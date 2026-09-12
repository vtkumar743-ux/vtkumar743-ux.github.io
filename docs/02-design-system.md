# Design system — extracted from the reference, retuned for us

Dark-only. Every colour below was read out of the reference stylesheet.

## Colour tokens (reference values)
| Token | Value | Use |
|---|---|---|
| `bg` | `#111111` | page ground |
| `surface` | `#1A1A1A` | cards, panels |
| `surface-2` | `#0A0A0A` | deep end of card gradients |
| `line` | `#232323` | all 1px borders |
| `text` | `#F5F5F5` | primary text |
| `muted` | `#9CA3AF` | body copy, subtitles |
| `muted-2` | `#9A9A9A` / `#B4B4B4` | metallic bezel steps |
| `accent` | `#4CC9FF` | the single accent — links, CTAs, hovers, glow |

Accent is used at many alphas, always as `accent/<n>`:
`0a 0f 12 14 59 66 73 b3` → i.e. `/[0.04] /[0.06] /[0.07] /[0.08] /35 /40 /45 /70`.
White overlays: `#ffffff0a 0b 0d 0f 14 29` → `white/[0.04] … white/[0.16]`.

**Decision needed from you:** keep `#4CC9FF` or pick your own accent.
See `05-QUESTIONS.md` Q4.

## Type
| Role | Reference font | Where |
|---|---|---|
| display | **Poppins** (300/400/500/600/700) | headings, wordmark, names, nav |
| body | **Inter** | paragraphs, form labels, small print |
| pixel | **Handjet** | big statistic numbers only |

Base `line-height: 1.5`, `-webkit-tap-highlight-color: transparent`, `tab-size: 4`.

Heading scale is entirely `clamp()`-driven — no breakpoint jumps:
- section h2 — `clamp(2.5rem, 9vw, 4rem)` / `leading-[1.05]` / `tracking-[-0.03em]`
- hero name — `clamp(2.75rem, 9.5vw, 5.25rem)` / `leading-[0.92]` / `tracking-[-0.035em]`
- hero h1 — `clamp(1.5rem, 3.9vw, 2rem)` / `leading-[1.18]` / `tracking-[-0.025em]`
- stat number — `clamp(3.5rem, 13vw, 6rem)` / `leading-[0.8]`
- card title — `text-2xl sm:text-4xl`
- kicker / eyebrow — `0.7rem`, `uppercase`, `tracking-[0.16em]`, `font-semibold`, accent

## Layout tokens
```css
--shell-x: clamp(20px, 4vw, 48px);   /* horizontal page gutter */
--card-stick: 6.5rem;                /* sticky offset for stacked project cards */
```
- `.shell` — centred container with `padding-inline: var(--shell-x)`
- `.section` — vertical rhythm wrapper for each block
- `max-w-lede` — measure cap for lede paragraphs (~60ch)
- `rounded-card` — the card radius; hero uses `52px` outer / `47px` inner
- `shadow-card` — soft elevated shadow on cards

## Motion
- Durations: `300ms` micro (buttons, icon colour), `500ms` card borders,
  `700ms` image scale/opacity.
- `ease-smooth` custom easing on image transitions.
- Hover: image `scale-[1.04]`, arrow icon `translate-x-0.5 -translate-y-0.5`.
- **Everything** motion-related is prefixed `motion-safe:`.
- Project list uses CSS `position: sticky` for card stacking — no JS scroll library needed.

## Texture
- `.grain` — a film-grain overlay (tiled SVG/noise data URI) at `opacity-50`, sat in
  a `pointer-events-none absolute inset-0 -z-10` layer.
- Accent glow — a large `rounded-full` div, `bg-accent/[0.07]`, `blur-[150px]`.
- Ghost wordmark — `text-[22vw] text-white/[0.025]` behind the hero.

## Component inventory to build
- `Header` (sticky, blurred, mobile drawer)
- `Button` (primary pill with arrow badge / ghost / icon-circle)
- `SectionHeading` (two-weight title + subtitle)
- `Marquee` (duplicated track, pauses on `prefers-reduced-motion`)
- `StatCard`, `BentoGrid`
- `StickyProjectCard` + `ProjectList`
- `Timeline` (experience)
- `Tabs` (used by both Services and Pricing)
- `ToolCard`
- `ProcessStep`
- `AwardCard`
- `TestimonialCarousel`
- `PricingCard`
- `Accordion` (FAQ)
- `ContactForm` (honeypot + validation + success state)
- `Footer`

## Build stack (proposed — confirm in Q1)
Next.js 15 App Router · TypeScript · Tailwind CSS v4 · lucide-react ·
`next/font` for Poppins + Inter + Handjet · `next/image` · dynamic OG image route ·
deploy on Vercel. This matches the reference exactly, and you already ship
React + Vite + Tailwind v4 in two of your repos, so the idioms carry over.
