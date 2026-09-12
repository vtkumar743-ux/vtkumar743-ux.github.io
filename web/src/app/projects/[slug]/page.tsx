import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Lock, ExternalLink } from "lucide-react";
import { GithubIcon } from "@/components/BrandIcons";
import { projects } from "@/content/projects";
import { Backdrop, Button, Chip, Eyebrow } from "@/components/ui";
import ProjectCover from "@/components/ProjectCover";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/projects/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const p = projects.find((x) => x.slug === slug);
  if (!p) return {};
  return { title: `${p.name} — ${p.tagline}`, description: p.blurb };
}

export default async function ProjectPage({ params }: PageProps<"/projects/[slug]">) {
  const { slug } = await params;
  const p = projects.find((x) => x.slug === slug);
  if (!p) notFound();

  const idx = projects.findIndex((x) => x.slug === slug);
  const next = projects[(idx + 1) % projects.length];

  return (
    <article className="relative overflow-hidden pb-24 pt-32 sm:pt-40">
      <Backdrop />
      <div className="shell">
        <Link
          href="/projects"
          className="inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-accent"
        >
          <ArrowLeft size={15} /> All projects
        </Link>

        <header className="reveal mt-8 flex flex-col gap-6">
          <Eyebrow>
            {p.year} · {p.role}
          </Eyebrow>
          <h1 className="font-display text-[clamp(2.4rem,8vw,4.5rem)] font-semibold leading-[1.02] tracking-[-0.04em]">
            {p.name}
          </h1>
          <p className="font-mono text-sm text-accent">{p.tagline}</p>
          <p className="max-w-lede text-pretty text-[1.02rem] leading-[1.75] text-muted">
            {p.blurb}
          </p>
          <div className="flex flex-wrap items-center gap-3">
            {p.repo ? (
              <Button href={p.repo} external variant="ghost">
                <span className="inline-flex items-center gap-2">
                  <GithubIcon size={15} /> View the code
                </span>
              </Button>
            ) : (
              <span className="inline-flex items-center gap-2 rounded-full border border-line bg-white/[0.03] px-4 py-2.5 text-sm text-muted-2">
                <Lock size={14} /> Private repository — happy to walk through it on a call
              </span>
            )}
            {p.live && (
              <Button href={p.live} external variant="ghost">
                <span className="inline-flex items-center gap-2">
                  <ExternalLink size={15} /> Live site
                </span>
              </Button>
            )}
          </div>
        </header>

        <div className="reveal mt-12 overflow-hidden rounded-card border border-line shadow-lift">
          <div className="aspect-[16/9]">
            <ProjectCover slug={p.slug} hue={p.hue} />
          </div>
        </div>

        <div className="mt-16 grid gap-12 lg:grid-cols-[1.4fr_1fr] lg:gap-16">
          <section className="reveal">
            <h2 className="font-mono text-[0.68rem] uppercase tracking-[0.2em] text-accent">
              What it does
            </h2>
            <ul className="mt-7 flex flex-col gap-5">
              {p.highlights.map((h) => (
                <li key={h} className="flex gap-4 leading-[1.7] text-muted">
                  <span className="mt-2.5 h-1 w-1 shrink-0 rounded-full bg-accent" />
                  {h}
                </li>
              ))}
            </ul>
          </section>

          <aside className="reveal flex flex-col gap-8 lg:border-l lg:border-line lg:pl-16">
            <div>
              <h2 className="font-mono text-[0.68rem] uppercase tracking-[0.2em] text-muted-2">
                Stack
              </h2>
              <ul className="mt-4 flex flex-wrap gap-2">
                {p.stack.map((s) => (
                  <li key={s}>
                    <Chip>{s}</Chip>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h2 className="font-mono text-[0.68rem] uppercase tracking-[0.2em] text-muted-2">
                My role
              </h2>
              <p className="mt-3 text-sm text-muted">{p.role}</p>
            </div>
          </aside>
        </div>

        <nav aria-label="Next project" className="mt-24 border-t border-line pt-10">
          <Link href={`/projects/${next.slug}`} className="group flex items-end justify-between gap-6">
            <span>
              <span className="font-mono text-[0.66rem] uppercase tracking-[0.18em] text-muted-2">
                Next project
              </span>
              <span className="mt-2 block font-display text-3xl font-semibold tracking-tight transition-colors group-hover:text-accent sm:text-5xl">
                {next.name}
              </span>
            </span>
            <span className="pb-2 font-mono text-sm text-muted">{next.tagline}</span>
          </Link>
        </nav>
      </div>
    </article>
  );
}
