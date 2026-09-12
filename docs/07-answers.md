# Answers given, and what I assumed

Recorded 2026-09-12. This supersedes `05-QUESTIONS.md`, which is now history.

## Answered directly

| Question | Answer |
|---|---|
| Positioning | Everything: freelance, for hire, and open to eligible full-time roles |
| Title | Full-Stack Software Engineer · UI/UX |
| Name | Venkat Thanmai Kumar V. The hero frame shows just "Venkat" |
| Email | vtkumar743@gmail.com |
| Phone / WhatsApp | +91 88619 44492 |
| GitHub | github.com/vtkumar743-ux |
| Projects | Drop Evol. Keep Conduit, TaskFlow, Forge, Ledger, CRM |
| Portrait | Studio headshot from Downloads, rendered as a painted illustration |
| Design | Replicate the reference structure, but change the arrangement, colour and UI so it is not a copy |

## Taken from the CV (`Venkat_T.pdf`, found in Downloads)

- Location: Bangalore, India
- LinkedIn: linkedin.com/in/venkatthanmai
- Current role: .NET Full Stack Developer, one year
- Education: B.Tech Computer Science, New Horizon College of Engineering, Bangalore;
  Intermediate at Sri Chaitanya PU College; SSC at Sri Chaitanya Techno School
- Languages: English, Tamil, Telugu, Hindi, Kannada
- Skills: .NET, ASP.NET Core, C#, Web API, EF Core, ADO.NET, React, Angular, HTML5,
  Tailwind, JavaScript, SQL Server, Azure, Linux, Nginx, JWT, REST, IoT integration

## Assumptions I made, which you can overturn in one edit each

1. **Employer name genericised in the experience section** to "IT Solutions Company".
   One string in `web/src/content/about.ts`. Your instruction was no company details
   anywhere, but an unnamed employer is unusual on a job-seeking portfolio, so this is
   your call.
2. **The CV has been removed** at your request. No PDF is served and there are no
   download links. The employer name now appears nowhere on the site except the
   genericised experience label above.
3. **Certifications are placeholders** derived from the CV's single entry, ".NET Full
   Stack Development". Replace the list in `content/about.ts` with what you actually hold.
4. **Statistics**: five platforms shipped, twenty-plus technologies, three core stacks.
   All defensible from the repositories, none inflated.
5. **Pricing tiers** are invented at market rates for Bangalore freelance work. Review
   the numbers before anyone sees them.
6. **No testimonials and no awards section.** You have no quotes on record and I will
   not write fake ones. Both sections exist in the reference and are simply absent here.
7. **Domain is a placeholder** (`venkat.dev`) in `content/site.ts`.
8. **Contact form has no backend.** It composes a pre-filled email in the visitor's
   mail client.
9. **Project year for CRM** is shown as 2025 to 2026, inferred from the repositories.

## How this differs from the reference, deliberately

- **Palette**: periwinkle `#7B8CFF` plus amber `#FFC46B`, not the reference's single
  cyan. Ground is `#0F1012` rather than `#111111`.
- **Type**: Sora, Inter and JetBrains Mono, replacing Poppins, Inter and a pixel font.
  Figures are set in mono rather than pixel type, which reads as engineering.
- **Hero**: a centred device frame, like the reference, since that was the part you
  liked. The portrait inside is an illustration derived from your own photograph
  rather than a drawn character.
- **Texture**: a starfield plus a masked hairline grid and grain.
- **Projects**: the sticky stack is kept, but each card gains an index, a year, a
  private-repository marker and a stack chip row.
- **Skills**: a four-group matrix replaces the reference's six tool tiles.
- **Sections dropped**: awards, testimonials, Instagram strip, blog.
- **Sections added**: education, and a private-repository explanation in the FAQ.
