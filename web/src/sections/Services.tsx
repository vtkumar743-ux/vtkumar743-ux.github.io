"use client";

import { useState } from "react";
import { services } from "@/content/services";
import { SectionHeading, Button, cx } from "@/components/ui";

export default function Services() {
  const [active, setActive] = useState(0);
  const s = services[active];

  return (
    <section id="services" aria-labelledby="services-heading" className="section">
      <div className="shell">
        <div id="services-heading">
          <SectionHeading
            eyebrow="Services"
            light="What I"
            bold="Build"
            sub="Four ways I work with teams and founders, whether you need the whole product or just the half you cannot staff."
          />
        </div>

        <div className="mt-12 flex flex-wrap gap-2" role="tablist" aria-label="Services">
          {services.map((sv, i) => (
            <button
              key={sv.key}
              type="button"
              role="tab"
              id={`svc-tab-${sv.key}`}
              aria-selected={i === active}
              aria-controls={`svc-panel-${sv.key}`}
              onClick={() => setActive(i)}
              className={cx(
                "rounded-full border px-4 py-2 text-sm transition-colors duration-300",
                i === active
                  ? "border-accent bg-accent text-bg"
                  : "border-line bg-white/[0.03] text-muted hover:border-accent/40 hover:text-text",
              )}
            >
              {sv.tab}
            </button>
          ))}
        </div>

        <div
          role="tabpanel"
          id={`svc-panel-${s.key}`}
          aria-labelledby={`svc-tab-${s.key}`}
          className="mt-6 overflow-hidden rounded-card border border-line bg-surface shadow-card"
        >
          <div className="grid gap-8 p-8 lg:grid-cols-[1.5fr_1fr] lg:gap-14 lg:p-12">
            <div className="flex flex-col gap-5">
              <p className="font-mono text-[0.68rem] uppercase tracking-[0.18em] text-accent">
                {s.kicker}
              </p>
              <h3 className="font-display text-[clamp(1.6rem,4vw,2.4rem)] font-semibold leading-tight tracking-[-0.02em]">
                {s.title}
              </h3>
              <p className="max-w-lede text-pretty leading-[1.75] text-muted">{s.body}</p>
              <div className="mt-2 flex flex-col gap-3 sm:flex-row">
                <Button href="/#contact">Start now</Button>
                <Button href="/#pricing" variant="ghost">
                  See pricing
                </Button>
              </div>
            </div>

            <dl className="flex flex-col gap-6 border-line lg:border-l lg:pl-14">
              <div>
                <dt className="font-mono text-[0.66rem] uppercase tracking-[0.18em] text-muted-2">
                  Typical timeline
                </dt>
                <dd className="mt-2 font-display text-xl font-medium text-text">{s.timeline}</dd>
              </div>
              <div>
                <dt className="font-mono text-[0.66rem] uppercase tracking-[0.18em] text-muted-2">
                  Built with
                </dt>
                <dd className="mt-2 text-sm leading-relaxed text-muted">{s.built}</dd>
              </div>
              <div className="mt-auto">
                <span className="font-mono text-5xl font-bold leading-none text-accent/25">
                  {String(active + 1).padStart(2, "0")}
                </span>
              </div>
            </dl>
          </div>
        </div>
      </div>
    </section>
  );
}
