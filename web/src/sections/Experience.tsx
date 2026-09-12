import { experience, education, process } from "@/content/about";
import { SectionHeading } from "@/components/ui";

export default function Experience() {
  return (
    <section aria-labelledby="exp-heading" className="section border-t border-line bg-bg-2">
      <div className="shell">
        <div id="exp-heading">
          <SectionHeading
            eyebrow="Background"
            light="Experience &"
            bold="Education"
            sub="Where I have worked, and what I was responsible for while I was there."
          />
        </div>

        <div className="mt-14 grid gap-10 lg:grid-cols-[1.35fr_1fr] lg:gap-16">
          <ol className="flex flex-col gap-8">
            {experience.map((e, i) => (
              <li
                key={e.title}
                className="reveal relative rounded-card border border-line bg-surface p-7 shadow-card sm:p-9"
              >
                <p className="sr-only">
                  Role {i + 1} of {experience.length}.
                </p>
                <div className="flex flex-wrap items-center gap-3">
                  <span className="font-mono text-[0.68rem] uppercase tracking-[0.18em] text-muted-2">
                    {e.period}
                  </span>
                  {e.current && (
                    <span className="rounded-full border border-accent/30 bg-accent/[0.08] px-2.5 py-0.5 font-mono text-[0.62rem] uppercase tracking-[0.16em] text-accent">
                      Current role
                    </span>
                  )}
                </div>
                <h3 className="mt-4 font-display text-2xl font-semibold tracking-tight sm:text-3xl">
                  {e.title}
                </h3>
                <p className="mt-1.5 text-sm text-muted">
                  {e.company} · {e.location}
                </p>
                <ul className="mt-6 flex flex-col gap-3">
                  {e.points.map((p) => (
                    <li key={p} className="flex gap-3 text-sm leading-relaxed text-muted">
                      <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent" />
                      {p}
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ol>

          <div className="reveal flex flex-col gap-4">
            <h3 className="font-mono text-[0.68rem] uppercase tracking-[0.2em] text-accent">
              Education
            </h3>
            <ul className="flex flex-col">
              {education.map((ed) => (
                <li key={ed.title} className="border-b border-line py-5 last:border-0">
                  <p className="font-display text-base font-medium text-text">{ed.title}</p>
                  <p className="mt-1 text-sm text-muted">{ed.org}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* -------------------------------------------------------- process */}
        <div id="process" className="mt-24 scroll-mt-28">
          <SectionHeading eyebrow="How it goes" light="Working" bold="Process" />
          <ol className="mt-12 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {process.map((s, i) => (
              <li
                key={s.n}
                className="reveal flex flex-col gap-4 rounded-card border border-line bg-surface p-7 shadow-card"
                style={{ transitionDelay: `${i * 70}ms` }}
              >
                <span className="font-mono text-3xl font-bold leading-none text-accent/40">
                  {s.n}
                </span>
                <h4 className="font-display text-xl font-semibold text-text">{s.title}</h4>
                <p className="text-sm leading-relaxed text-muted">{s.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
