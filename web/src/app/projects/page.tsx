import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, Lock } from "lucide-react";
import { projects } from "@/content/projects";
import { SectionHeading, Backdrop } from "@/components/ui";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Projects — platforms designed, built and shipped",
  description:
    "Full-stack platforms built on .NET, React and Python: an AI agent service, a role-based work platform, a multi-branch gym system, a dual-ledger product and a mobile-first CRM.",
};

export default function ProjectsPage() {
  return (
    <section className="relative overflow-hidden pb-24 pt-32 sm:pt-40">
      <Backdrop />
      <div className="shell">
        <SectionHeading
          immediate
          eyebrow="Index"
          light="All"
          bold="Projects"
          sub="Everything I have designed and built end to end. Work done under employment or for clients is described by what it does, never by who it was for."
        />

        <ul className="mt-14 grid gap-6 md:grid-cols-2">
          {projects.map((p) => (
            <li key={p.slug} className="reveal">
              <Link
                href={`/projects/${p.slug}`}
                className="group flex h-full flex-col overflow-hidden rounded-card border border-line bg-surface shadow-card transition-colors duration-500 hover:border-white/[0.14]"
              >
                <div className="relative aspect-[16/9] overflow-hidden">
                  <Image
                    src={p.cover}
                    alt={`${p.name} — ${p.tagline}`}
                    fill
                    sizes="(max-width: 768px) 100vw, 560px"
                    className="object-cover transition-transform duration-700 motion-safe:group-hover:scale-[1.03]"
                  />
                  {p.visibility === "private" && (
                    <span className="absolute right-5 top-5 inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-black/40 px-3 py-1 font-mono text-[0.6rem] uppercase tracking-[0.14em] text-white/60 backdrop-blur-sm">
                      <Lock size={10} /> Private
                    </span>
                  )}
                </div>
                <div className="flex flex-1 flex-col gap-3 p-7">
                  <div className="flex items-start justify-between gap-4">
                    <h2 className="font-display text-2xl font-semibold tracking-tight">{p.name}</h2>
                    <ArrowUpRight
                      size={18}
                      className="mt-1.5 shrink-0 text-muted-2 transition-colors duration-300 group-hover:text-accent"
                    />
                  </div>
                  <p className="text-sm text-muted">{p.tagline}</p>
                  <p className="mt-auto pt-4 font-mono text-[0.66rem] uppercase tracking-[0.16em] text-muted-2">
                    {p.year} · {p.role}
                  </p>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
