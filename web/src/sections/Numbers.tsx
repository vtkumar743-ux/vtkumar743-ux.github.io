import { stats, skillGroups } from "@/content/about";
import { SectionHeading } from "@/components/ui";

export default function Numbers() {
  return (
    <section id="stack" aria-labelledby="numbers-heading" className="section">
      <div className="shell">
        <div id="numbers-heading">
          <SectionHeading
            eyebrow="My work so far"
            light="Measured in"
            bold="Numbers"
            sub="Every platform below was designed, built and deployed end to end, not handed off halfway."
          />
        </div>

        {/* asymmetric bento — three stats over a four-column skill matrix */}
        <div className="mt-14 grid gap-4 sm:grid-cols-3">
          {stats.map((s, i) => (
            <div
              key={s.label}
              className="reveal flex flex-col justify-between rounded-card border border-line bg-surface p-7 shadow-card"
              style={{ transitionDelay: `${i * 70}ms` }}
            >
              <div>
                <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                <h3 className="mt-4 font-display text-lg font-semibold leading-snug text-text">
                  {s.label}
                </h3>
                <p className="mt-1.5 text-sm leading-relaxed text-muted">{s.note}</p>
              </div>
              <p className="mt-10 font-mono text-[clamp(3rem,9vw,4.5rem)] font-bold leading-[0.85] tracking-tighter text-text">
                {s.value}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-4 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {skillGroups.map((g, i) => (
            <div
              key={g.title}
              className="reveal rounded-card border border-line bg-surface p-7 shadow-card"
              style={{ transitionDelay: `${i * 60}ms` }}
            >
              <h3 className="font-mono text-[0.68rem] uppercase tracking-[0.2em] text-accent">
                {g.title}
              </h3>
              <ul className="mt-5 flex flex-wrap gap-2">
                {g.items.map((it) => (
                  <li
                    key={it}
                    className="rounded-lg border border-line bg-white/[0.02] px-2.5 py-1.5 text-[0.78rem] text-muted"
                  >
                    {it}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
