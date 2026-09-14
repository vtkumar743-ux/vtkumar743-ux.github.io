"use client";

import { useState } from "react";
import { Check } from "lucide-react";
import { packages } from "@/content/services";
import { SectionHeading, Button, TabTrack } from "@/components/ui";

export default function Packages() {
  const [active, setActive] = useState(0);
  const p = packages[active];

  return (
    <section
      id="pricing"
      aria-labelledby="packages-heading"
      className="section border-t border-line bg-bg-2"
    >
      <div className="shell">
        <div id="packages-heading">
          <SectionHeading
            eyebrow="Freelance engagements"
            light="How I"
            bold="Package Work"
            sub="Fixed scope rather than an hourly rate, so you know exactly what is being built before it starts. Tell me what you need and I will quote it."
          />
        </div>

        <div className="mt-12">
          <TabTrack
            items={packages}
            active={active}
            onSelect={setActive}
            idPrefix="pk"
            label="Engagement types"
          />
        </div>

        <div
          role="tabpanel"
          id={`pk-panel-${p.key}`}
          aria-labelledby={`pk-tab-${p.key}`}
          className="mt-6 grid gap-8 rounded-card border border-line bg-surface p-8 shadow-card lg:grid-cols-[1fr_1fr] lg:gap-14 lg:p-12"
        >
          <div className="flex flex-col gap-5">
            <h3 className="font-display text-[clamp(1.6rem,4vw,2.2rem)] font-semibold tracking-[-0.02em]">
              {p.title}
            </h3>
            <p className="max-w-lede leading-[1.7] text-muted">{p.desc}</p>

            <div className="mt-2 flex flex-col gap-1.5">
              <p className="font-display text-[clamp(1.6rem,4.5vw,2.2rem)] font-semibold leading-none text-text">
                Contact for pricing
              </p>
              <p className="text-sm text-muted">
                Quoted per project, in writing, before any work begins.
              </p>
            </div>

            <p className="font-mono text-[0.7rem] uppercase tracking-[0.16em] text-muted-2">
              {p.duration}
            </p>

            <div className="mt-2">
              <Button href="/#contact">Request a quote</Button>
            </div>
          </div>

          <ul className="flex flex-col gap-3.5 border-line lg:border-l lg:pl-14">
            {p.features.map((f) => (
              <li key={f} className="flex items-start gap-3 text-sm leading-relaxed text-muted">
                <Check size={16} className="mt-0.5 shrink-0 text-accent" />
                {f}
              </li>
            ))}
          </ul>
        </div>

        <p className="mt-6 max-w-lede text-xs leading-relaxed text-muted-2">
          Every quote depends on screens, integrations and content. I confirm the number and the
          timeline in writing before starting, and it does not move unless the scope does.
        </p>
      </div>
    </section>
  );
}
