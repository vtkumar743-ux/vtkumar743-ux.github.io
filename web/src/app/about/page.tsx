import type { Metadata } from "next";
import Image from "next/image";
import { site } from "@/content/site";
import { education, languages, skillGroups, certifications } from "@/content/about";
import { Backdrop, Button, Chip, SectionHeading, Eyebrow } from "@/components/ui";

export const metadata: Metadata = {
  title: "About — full-stack engineer and UI/UX developer in Bangalore",
  description:
    "Venkat Thanmai Kumar V, a full-stack software engineer in Bangalore working across .NET, React, SQL Server, Azure and AI agent systems.",
};

export default function AboutPage() {
  return (
    <>
      <section className="relative overflow-hidden pb-20 pt-32 sm:pt-40">
        <Backdrop />
        <div className="shell grid items-start gap-12 lg:grid-cols-[1.2fr_0.8fr] lg:gap-16">
          <div className="rise flex flex-col gap-7">
            <Eyebrow>About</Eyebrow>
            <h1 className="font-display text-[clamp(2.2rem,7vw,3.8rem)] font-semibold leading-[1.05] tracking-[-0.04em]">
              I design the interface and build everything behind it.
            </h1>
            <div className="flex max-w-lede flex-col gap-5 text-pretty leading-[1.8] text-muted">
              <p>
                I am a full-stack software engineer based in {site.location}. My day job is .NET and
                React: REST APIs on a layered architecture, SQL Server schemas tuned for the queries
                they actually serve, and front ends built mobile-first because that is where people
                open things.
              </p>
              <p>
                The part I care about is the seam between the two. A data model that ignores the
                interface produces screens nobody enjoys using, and an interface designed without
                regard for the query plan falls over the first time the table gets large. Owning both
                sides is what lets me avoid that.
              </p>
              <p>
                More recently I have been building AI agent systems in Python — tool-calling against
                a real API, retrieval with citations, and a confirm-before-write gate so a model can
                never act on its own. That work came with an evaluation suite covering permissions,
                prompt injection and honesty, because &ldquo;it seemed fine when I tried it&rdquo; is
                not a standard.
              </p>
              <p>
                I am open to full-time engineering roles and I take freelance projects alongside
                them. If either sounds relevant, the fastest thing is to email me.
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              <Button href="/#contact">Get in touch</Button>
              <Button href="/projects" variant="ghost">
                See the work
              </Button>
            </div>
          </div>

          <div className="rise relative mx-auto w-full max-w-[340px]" style={{ animationDelay: "90ms" }}>
            <div className="overflow-hidden rounded-[32px] border border-line bg-gradient-to-b from-surface to-bg-2 shadow-lift">
              <div className="relative aspect-[4/5]">
                <Image
                  src="/img/portrait-illustration.webp"
                  alt={site.name}
                  fill
                  priority
                  sizes="(max-width: 1024px) 80vw, 340px"
                  className="object-cover object-[center_12%]"
                />
              </div>
            </div>
            <dl className="mt-6 flex flex-col gap-4 text-sm">
              <div className="flex justify-between gap-4 border-b border-line pb-3">
                <dt className="text-muted-2">Based in</dt>
                <dd className="text-text">{site.location}</dd>
              </div>
              <div className="flex justify-between gap-4 border-b border-line pb-3">
                <dt className="text-muted-2">Availability</dt>
                <dd className="text-right text-text">Roles &amp; freelance</dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt className="text-muted-2">Languages</dt>
                <dd className="text-right text-text">{languages.join(", ")}</dd>
              </div>
            </dl>
          </div>
        </div>
      </section>

      <section aria-labelledby="about-stack" className="section border-t border-line bg-bg-2">
        <div className="shell">
          <div id="about-stack">
            <SectionHeading eyebrow="Toolkit" light="The" bold="Stack" />
          </div>
          <div className="mt-12 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {skillGroups.map((g) => (
              <div key={g.title} className="reveal rounded-card border border-line bg-surface p-7">
                <h3 className="font-mono text-[0.68rem] uppercase tracking-[0.2em] text-accent">
                  {g.title}
                </h3>
                <ul className="mt-5 flex flex-wrap gap-2">
                  {g.items.map((i) => (
                    <li key={i}>
                      <Chip>{i}</Chip>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="mt-16 grid gap-12 lg:grid-cols-2">
            <div className="reveal">
              <h3 className="font-mono text-[0.68rem] uppercase tracking-[0.2em] text-muted-2">
                Education
              </h3>
              <ul className="mt-5 flex flex-col">
                {education.map((e) => (
                  <li key={e.title} className="border-b border-line py-4 last:border-0">
                    <p className="text-sm font-medium text-text">{e.title}</p>
                    <p className="mt-1 text-sm text-muted">{e.org}</p>
                  </li>
                ))}
              </ul>
            </div>
            <div className="reveal">
              <h3 className="font-mono text-[0.68rem] uppercase tracking-[0.2em] text-muted-2">
                Certifications
              </h3>
              <ul className="mt-5 flex flex-wrap gap-2">
                {certifications.map((c) => (
                  <li key={c}>
                    <Chip>{c}</Chip>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
