# Portfolio — Venkat Thanmai Kumar V

A dark, scroll-driven portfolio for a full-stack engineer and UI/UX developer.
Next.js App Router, TypeScript, Tailwind v4, no runtime dependencies beyond React.

```
docs/        analysis of the reference site, the design system, the content model
web/         the site itself
```

## Run

```bash
cd web
npm install
npm run dev        # http://localhost:3000
npm run build      # production build
npm run lint
```

## Where the content lives

Every word on the site is data, not markup. Nothing in `src/sections/` needs editing
to change what the site says.

| File | What it holds |
|---|---|
| `web/src/content/site.ts` | name, role, contact details, headline, lede, nav |
| `web/src/content/projects.ts` | the five projects: names, taglines, stacks, highlights |
| `web/src/content/about.ts` | stats, experience, education, certifications, skills, process |
| `web/src/content/services.ts` | services, pricing tiers, FAQ |

## Structure

```
web/src/
  app/                  routes: /, /projects, /projects/[slug], /about
                        plus sitemap.ts, robots.ts, opengraph-image.tsx
  components/           Header, Footer, ui primitives, ProjectCover, BrandIcons, Reveal
  sections/             one file per home-page chapter
  content/              all copy
  app/globals.css       the whole design system as Tailwind v4 theme tokens
```

## Design system

Dark only. Ground `#0F1012`, surface `#16181D`, borders `#262932`, text `#F2F3F5`.
Two accents: periwinkle `#7B8CFF` for interaction, amber `#FFC46B` for data.
Sora for display, Inter for body, JetBrains Mono for labels and figures.

The signature interactions are a sticky project stack, where cards pile up as you
scroll, and a centred device frame holding an illustrated portrait.

The portrait is generated from a studio photograph by a script that flattens broad
areas into paint regions while blending the original back wherever local contrast is
high, so the eyes, mouth and hair survive the stylisation.

## Project cover art

Covers are drawn in code (`components/ProjectCover.tsx`), one abstract diagram per
project. This is deliberate: most of the work was done under employment or for
clients, so no real interface, logo or customer data is ever shown.

## Anonymisation rule

No employer is named anywhere: not in a project title, description, slug, URL or
image, and no CV is served. An application is named for what it does. The one place a
company could appear is the experience section, where the name is genericised in
`web/src/content/about.ts` — change that single string if you decide otherwise.

## Deploy

Push to GitHub, import into Vercel, set the custom domain. Then update `site.url` in
`web/src/content/site.ts` so canonical URLs, the sitemap and social cards point at the
real domain.

## Still to do

- Point `site.url` at the real domain.
- Decide how the contact form should deliver. It currently composes a `mailto:`; swap
  `onSubmit` in `sections/Contact.tsx` for a POST once you pick a provider.
- Add real certifications to `content/about.ts` — the current list is a placeholder.
- Review the pricing figures in `content/services.ts`; they are market estimates, not
  your numbers.

## Regenerating the portrait

```bash
python web/scripts/portrait.py     # needs pillow + numpy
```
It reads the studio photograph, cuts the subject off the backdrop, flattens broad
areas into paint regions, blends the photograph back where local contrast is high so
the features survive, lays down soft ink lines, and writes
`web/public/img/portrait.png`. Edit the source path at the top to use a different
photo.
