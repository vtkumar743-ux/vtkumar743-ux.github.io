# Reference teardown — dhatrii.me

Captured 2026-09-12 from a local copy of the rendered HTML + CSS.
**Do not re-fetch the site.** Everything needed to replicate it is in this file,
`02-design-system.md`, and `03-content-model.md`.

## Stack observed
- Next.js (App Router, Turbopack build, `/_next/static/immutable/...`)
- Tailwind CSS v4 with a custom theme layer (semantic tokens, not raw palette utilities)
- `lucide` icon set (inline SVG, `lucide-github`, `lucide-linkedin`, `lucide-instagram`, `lucide-arrow-up-right`)
- Self-hosted Google fonts via `next/font`: Poppins, Inter, Handjet
- Dark-only: `<meta name="color-scheme" content="dark">`, `theme-color #111111`

## Page inventory
| Route | Purpose |
|---|---|
| `/` | Long-form single page, all sections below |
| `/projects` | Full project index |
| `/projects/<slug>` | One case-study page per project (5 of them) |
| `/services` | Expanded services page |
| `/about` | About page |
| `/blog` | Blog index |

Home page anchor ids: `#top`, `#work`, `#services`, `#process`, `#pricing`, `#contact`.
Primary nav: Work · Services · About · Blog · Pricing, plus a WhatsApp "Contact" button.

## Section order on the home page
1. **Header** — sticky, `.Dhatri` wordmark left, nav centre, Contact button right.
2. **Hero** (`section#top`) — the signature block. See "Hero anatomy" below.
3. **Certifications & Training** — infinite marquee of certification names, duplicated
   track for seamless loop, with a visually-hidden sentence listing them for screen readers.
4. **Journey in Numbers** — bento of stat cards: avatar-stack card, "Technology / 20+",
   "Work / Projects Done / 5". Numbers set in the pixel font (Handjet).
5. **Projects Done** (`section#work`) — the standout interaction: a `<ul>` of
   `li.sticky` cards that stack on top of each other as you scroll. Each card is a
   full-bleed 16:9 cover image, a per-project coloured gradient wash, title, one-line
   subtitle, and a circular arrow button that fills with the accent on hover.
   Ends with a "View All Projects" link to `/projects`.
6. **Experience** — timeline; current role highlighted with a "Current role" chip,
   date range, title, company, location, and an `N of M` screen-reader caption.
7. **What I Build** (`section#services`) — tabbed services. Tab row
   (Flutter Apps / Web Apps / Websites / MVPs), then a panel per tab with a kicker
   ("Android & iOS"), title, paragraph, "Typical timeline", "Built with", a large
   step number (`01`), and two CTAs.
8. **Mastered Tools** — 6 tool cards, each a glyph, a name, and a role label.
9. **Work Process** (`section#process`) — 4 numbered cards: Discovery Session,
   Strategy Mapping, Prototype Creation, Final Delivery.
10. **Awards & Recognition** — award card: placement, event, year, pull-quote.
11. **What Clients Say** — testimonial carousel; initials avatar, name, company·city,
    quote, `1 of 1` caption.
12. **Pricing Plans** (`section#pricing`) — tabbed packages
    (Business Website / Web App or MVP / Flutter App / Maintenance). Each shows a
    description, INR range, USD range, CTA, duration, and a feature list. Footnote
    about firm quotes.
13. **Common Questions** — accordion FAQ, 6 items, first one open.
14. **Contact** (`section#contact`) — form with honeypot ("Leave this field empty"),
    name, email, business (optional), project-type select, timeline select, message,
    submit. Plus WhatsApp link and email address.
15. **Instagram / social strip** — "Explore Instagram".
16. **Why Choose <Name>** — 6 short value chips.
17. **Footer** — wordmark, nav repeat, "Back to top", copyright,
    "Designed and built from scratch."

## Hero anatomy (the piece that defines the look)
- Section: `relative overflow-hidden pb-20 pt-36 sm:pt-40`
- Background layer (`pointer-events-none absolute inset-0 -z-10`) containing:
  - a film-grain overlay at `opacity-50`
  - a 38rem circular accent glow, `bg-accent/[0.07] blur-[150px]`, centred near the top
  - a giant ghost wordmark: `text-[22vw] font-bold text-white/[0.025]`, centred
- The card: `max-w-[640px] rounded-[52px]`, a **metallic bezel** made from a
  `bg-gradient-to-b from-[#b4b4b4] via-[#4a4a4a] to-[#232323]` with `p-[5px]`,
  plus three small "side button" slivers absolutely positioned on the left/right edges
  (`h-16/h-24/h-20`, `w-[3px]`, gradient `#9a9a9a → #4a4a4a`). It reads as a phone.
- Inner: `rounded-[47px] bg-bg overflow-hidden`
  - Portrait, `aspect-[4/5]`, `object-cover object-[center_32%]`, with a
    `bg-gradient-to-t from-bg via-bg/25 to-transparent` scrim
  - Top-left pill: `👋 Hello` — `rounded-full border border-white/20 bg-black/30 backdrop-blur-sm`
  - Bottom-right name, two lines, `leading-[0.92] tracking-[-0.035em]`,
    `text-[clamp(2.75rem,9.5vw,5.25rem)]`, first line `font-bold`, second `font-light`
  - Below the image: a `h-[5px] w-36 rounded-full bg-white/85` grab-handle bar
  - Role line in accent: `text-[0.7rem] font-semibold uppercase tracking-[0.16em]`
  - Social icons: three `h-11 w-11` circular bordered buttons, hover → accent
  - `h1`: `text-[clamp(1.5rem,3.9vw,2rem)] font-semibold leading-[1.18] tracking-[-0.025em]`
  - Lede paragraph: `text-[0.95rem] leading-[1.65] text-muted`
  - Credential line: bold count · middot · muted stack list
  - CTA row: primary pill `bg-accent text-bg hover:bg-text`, `py-2 pl-7 pr-2`,
    with a `h-10 w-10` circular arrow badge inside; secondary ghost pill
  - Location line + WhatsApp link

## Project card anatomy
```
li.sticky                                   ← stacking scroll effect
  article.group.rounded-card.border.border-line.bg-surface.shadow-card
    a.block
      div.relative.aspect-[3/2].sm:aspect-[16/9].max-h-[48vh]
        span.absolute.inset-0  bg-gradient-to-br from-<PROJECT_COLOR>/14 via-[#1A1A1A] to-[#0A0A0A]
        img  object-cover  group-hover:scale-[1.04]  duration-700 ease-smooth
        div  bg-gradient-to-t from-bg/70 via-transparent to-transparent
      div.flex.items-center.justify-between.p-7.sm:p-9
        h3  font-display text-2xl sm:text-4xl font-bold tracking-tight
        p   text-sm text-muted                    ← "one-liner · tech, tech, tech"
        span.h-14.w-14.sm:h-16.sm:w-16 rounded-full border border-line
             group-hover:border-accent group-hover:bg-accent group-hover:text-bg
```
Per-project gradient colours seen: `#818CF8` (indigo), `#34D399` (emerald), and one each
for the remaining three. Give every project its own hue.

## Section heading pattern
Centred, `max-w-2xl`, with a two-weight headline:
```
h2.text-[clamp(2.5rem,9vw,4rem)].leading-[1.05].tracking-[-0.03em]
   <span class="font-light">First word</span> <span class="font-bold">Second word</span>
p.mt-4.max-w-xl.text-pretty.text-muted   ← one-sentence subtitle
```
Stat cards use a small `h-1.5 w-1.5 rounded-full bg-accent` dot above the label.

## Accessibility patterns worth copying
- "Skip to content" link as the first focusable element; `main#main`.
- Every section is a `<section aria-labelledby="...-heading">`.
- Carousels/marquees carry a visually-hidden sentence with the full plain-text content.
- Carousels announce `Item N of M` to screen readers.
- All motion is gated behind `motion-safe:` so reduced-motion users get a static page.

## SEO patterns worth copying
- Title formula: `<Role> in <City> | <Name>`
- Description names the role, the city, the region, and "remotely, worldwide".
- `og:image` generated at `/opengraph-image` (1200×630) — Next.js dynamic OG image.
- `rel=canonical`, `rel=author`, `og:locale`, favicon as SVG.
