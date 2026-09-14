import Link from "next/link";
import { ArrowUpRight, Lock } from "lucide-react";
import { featuredProjects } from "@/content/projects";
import { SectionHeading, Button } from "@/components/ui";
import Image from "next/image";

export default function Work() {
  return (
    <section id="work" aria-labelledby="work-heading" className="section">
      <div className="shell">
        <div id="work-heading">
          <SectionHeading
            eyebrow="Selected work"
            light="Platforms"
            bold="Shipped"
            sub="Five products I designed, built and deployed. Where the work was done under employment or for a client, the company is not named and the interface is not shown."
          />
        </div>

        <ul className="mt-14 flex flex-col gap-8">
          {featuredProjects.map((p, i) => (
            <li key={p.slug} className="sticky-card" style={{ top: `calc(var(--card-stick) + ${i * 14}px)` }}>
              <article className="group overflow-hidden rounded-card border border-line bg-surface shadow-card transition-colors duration-500 hover:border-white/[0.14]">
                <Link href={`/projects/${p.slug}`} className="block">
                  {/* 16:9 everywhere — the cover art is authored at that ratio, so any
                      other box would crop the mockup out of the frame. */}
                  <div className="relative w-full aspect-[16/9] overflow-hidden">
                    <Image
                      src={p.cover}
                      alt={`${p.name} — ${p.tagline}`}
                      fill
                      sizes="(max-width: 1220px) 100vw, 1130px"
                      className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] motion-safe:group-hover:scale-[1.03]"
                    />
                    <div
                      aria-hidden
                      className="pointer-events-none absolute inset-0 bg-gradient-to-t from-surface/80 via-transparent to-transparent"
                    />
                    <span className="absolute left-6 top-6 rounded-full border border-white/15 bg-black/40 px-3 py-1 font-mono text-[0.66rem] tracking-[0.14em] text-white/70 backdrop-blur-sm">
                      {String(i + 1).padStart(2, "0")} / {p.year}
                    </span>
                    {p.visibility === "private" && (
                      <span className="absolute right-6 top-6 inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-black/40 px-3 py-1 font-mono text-[0.62rem] uppercase tracking-[0.14em] text-white/60 backdrop-blur-sm">
                        <Lock size={10} /> Private repo
                      </span>
                    )}
                  </div>

                  <div className="flex flex-col gap-5 p-7 sm:flex-row sm:items-end sm:justify-between sm:gap-8 sm:p-9">
                    <div className="min-w-0">
                      <h3 className="font-display text-2xl font-semibold tracking-tight sm:text-4xl">
                        {p.name}
                      </h3>
                      <p className="mt-2 text-sm text-muted">{p.tagline}</p>
                      <ul className="mt-4 flex flex-wrap gap-1.5">
                        {p.stack.slice(0, 5).map((s) => (
                          <li
                            key={s}
                            className="rounded-md border border-line px-2 py-1 font-mono text-[0.66rem] text-muted-2"
                          >
                            {s}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <span className="grid h-14 w-14 shrink-0 place-items-center rounded-full border border-line text-text transition-colors duration-500 group-hover:border-accent group-hover:bg-accent group-hover:text-bg sm:h-16 sm:w-16">
                      <ArrowUpRight
                        size={20}
                        className="transition-transform duration-500 motion-safe:group-hover:translate-x-0.5 motion-safe:group-hover:-translate-y-0.5"
                      />
                    </span>
                  </div>
                </Link>
              </article>
            </li>
          ))}
        </ul>

        <div className="mt-12 flex justify-center">
          <Button href="/projects" variant="ghost">
            All projects
          </Button>
        </div>
      </div>
    </section>
  );
}
