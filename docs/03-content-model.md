# Content model — your portfolio

Everything the site says lives in one typed data file (`src/content/*.ts`) so copy is
edited without touching markup. This is how your existing `Portfolio` repo is already
organised, and the pattern carries over.

## Identity
- Name: **Venkat Thanmai Kumar V** (from the `Portfolio` repo README)
- Everything else in this section is unanswered — see `05-QUESTIONS.md` Q2, Q3.

## Projects — mapped from your GitHub

Company names are stripped everywhere. No employer is named in any project title,
description, screenshot, or URL.

| # | Site name | Source repo | One-liner · stack | Notes |
|---|---|---|---|---|
| 1 | **Conduit** | `CONDUIT` (private, Python) | ai agent service · fastapi, tool-calling, rag | 11 phases shipped: agent loop, evals (22 cases, 3 graders, prompt-injection tests), local vector index, RAG with citations and "I don't know" gating, propose/confirm/commit write actions with single-use expiring tokens, structured output. Your strongest differentiator — leads with AI. |
| 2 | **TaskFlow** | `WORKFLOW` (private, TS + C#) | role-based task platform · react, .net 9, sql server | Multi-department, mandatory daily progress updates, 5-level drill-down analytics, JWT role auth (Admin/Manager/User). |
| 3 | **Forge** | `FORGE` (public, TS + C#) | multi-branch gym platform · react 19, .net 8, ef core | CMS-driven public site + member portal + admin panel. Has a full design system ("Dark Luxe Performance") behind it. |
| 4 | **Ledger** | `Worker` (private, C# + TS) | rent & wage ledgers · react, .net 10, jwt | One login, two independently deployable modules (rent, labour). Strict dependency rule, background reminder worker, UPI payments stubbed. Good "architecture" story. |
| 5 | **CRM** | `crm_application` / `CRM_V2` / `ELPISCRM-API` (private) | mobile-first sales crm · react, business-card ocr | **Rename mandatory.** Employer name appears in the repo name, the README title, the deployed URL, and likely in the UI. On the site it is only ever "CRM". Features: camera business-card scanning, multi-role permissions, account/contact management, mobile-first responsive rebuild. |
| 6 | **Evol** | `evol` (public, JS) | digitisation brief generator · vanilla js, no backend | Live at `vtkumar743-ux.github.io/evol`. Zero backend — the finished brief lives entirely in the URL hash. Nice "constraint-driven" story and the only one with a public live demo today. |

The reference features 5 on the home page and links the rest from `/projects`.
Recommendation: feature Conduit, TaskFlow, Forge, Ledger, CRM on the home page;
Evol and anything else on `/projects`. Confirm in Q5.

### Per-project accent hue (project card gradient)
Give each card its own `from-<hex>/14 via-[#1A1A1A] to-[#0A0A0A]` wash:
Conduit `#4CC9FF` · TaskFlow `#818CF8` · Forge `#F97316` ·
Ledger `#34D399` · CRM `#F43F5E` · Evol `#A78BFA`.

## Anonymisation rules (non-negotiable)
1. No employer name in any repo-derived text, image, screenshot, alt text, slug, or URL.
2. Screenshots of the CRM must have logos, client names, and real contact data blurred
   or replaced with seeded demo data.
3. Private repos are **not** linked. A private project shows a case study on your site,
   a stack list, and no "View code" button. Only `evol` and `FORGE` are public and
   linkable today. Confirm in Q6.
4. Describe work as "a platform I built" rather than naming the client.

## Sections that need your input, not your repos
- Certifications marquee (Q7)
- Journey-in-numbers statistics (Q8)
- Experience timeline (Q9)
- Services you want to offer (Q10)
- Pricing packages (Q11)
- Awards (Q12)
- Testimonials (Q13)
- Contact details and social links (Q3)

## Text you should NOT copy verbatim
The reference's hero line, service paragraphs, FAQ answers, and pricing footnote are
that person's own words. We reuse the *structure and rhythm*, and write fresh copy in
your voice. Nothing is lifted sentence-for-sentence.
