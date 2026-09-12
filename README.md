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

```bash
cd web && node scripts/covers.mjs     # needs Chrome installed
```
Each cover is an abstract product mockup written in HTML and screenshotted in Chrome
at 3840x2160, then saved as WebP into `public/img/projects/`. They are mockups, not
screenshots: most of this work was done under employment or for clients, so no real
interface, logo or customer data appears in any of them. Edit the `ui` object in the
script to change a layout, or `PROJECTS` to change a hue or caption.

## Anonymisation rule

No employer is named anywhere: not in a project title, description, slug, URL or
image, and no CV is served. An application is named for what it does. The one place a
company could appear is the experience section, where the name is genericised in
`web/src/content/about.ts` — change that single string if you decide otherwise.

## Deploy

Live at **https://vtkumar743-ux.github.io**

Every push to `main` triggers `.github/workflows/deploy.yml`, which lints, builds a
static export and publishes it to GitHub Pages. Nothing to run by hand.

Pages serves files, not a server, so the build is a static export
(`output: "export"` in `web/next.config.ts`). Three consequences:

- The image optimiser cannot run, so `images.unoptimized` is set and images are served
  exactly as authored. They are already sized for delivery.
- `robots.ts`, `sitemap.ts` and `opengraph-image.tsx` each need `export const dynamic =
  "force-static"`, or the build fails.
- `trailingSlash` is on so each route emits its own `index.html`. Without it Pages
  cannot serve `/projects/conduit`.

To move to a custom domain later: add it under the repository's Pages settings, then
change `site.url` in `web/src/content/site.ts` so canonical URLs, the sitemap and the
social card point at it.

## Still to do

- Point `site.url` at the real domain.
- Decide how the contact form should deliver. It currently composes a `mailto:`; swap
  `onSubmit` in `sections/Contact.tsx` for a POST once you pick a provider.
- Add real certifications to `content/about.ts` — the current list is a placeholder.
- Review the pricing figures in `content/services.ts`; they are market estimates, not
  your numbers.

## The portrait

`web/public/img/portrait-illustration.png` is an illustrated portrait supplied as a
JPEG and prepared for the site by:

```bash
cd web && python scripts/portrait.py      # needs opencv-python-headless, pillow, numpy
```

It cuts the subject off the backdrop and writes a transparent PNG. Two details matter:

- **The cutout keys on saturation, not brightness or texture.** Backdrop and the soft
  glow drawn around the subject both sit at 0.106 saturation, while skin is 0.47-0.60
  and the shirt 0.52. Brightness fails because lit skin is brighter than the backdrop;
  texture fails because the glow's gradient reads as variation and leaves a halo.
- **Colour is flooded outward into the transparent area before saving.** Next
  re-encodes this as lossy WebP, which compresses RGB independently of alpha, so
  whatever sits in the transparent region bleeds into the edge on decode. Without the
  flood the halo reappears in the browser even when the PNG on disk is clean.

If you regenerate an image and the old one still shows, clear **`.next/dev/cache/images`**
and restart the dev server. That is where Next 16 caches optimised images in
development; `.next/cache/images` is a different directory and clearing it does nothing.
