"use client";

import { useState } from "react";
import { Check } from "lucide-react";
import { pricing } from "@/content/services";
import { SectionHeading, Button, TabTrack } from "@/components/ui";

export default function Pricing() {
  const [active, setActive] = useState(0);
  const p = pricing[active];

  return (
    <section id="pricing" aria-labelledby="pricing-heading" className="section border-t border-line bg-bg-2">
      <div className="shell">
        <div id="pricing-heading">
          <SectionHeading
            eyebrow="Freelance engagements"
            light="Pricing"
            bold="Plans"
            sub="Fixed-scope packages rather than an hourly rate, so you know the number before the work starts. Hiring full-time instead? Skip this and email me."
          />
        </div>

        <div className="mt-12">
          <TabTrack
            items={pricing}
            active={active}
            onSelect={setActive}
            idPrefix="pr"
            label="Pricing packages"
          />
        </div>

        <div
          role="tabpanel"
          id={`pr-panel-${p.key}`}
          aria-labelledby={`pr-tab-${p.key}`}
          className="mt-6 grid gap-8 rounded-card border border-line bg-surface p-8 shadow-card lg:grid-cols-[1fr_1fr] lg:gap-14 lg:p-12"
        >
          <div className="flex flex-col gap-5">
            <h3 className="font-display text-[clamp(1.6rem,4vw,2.2rem)] font-semibold tracking-[-0.02em]">
              {p.title}
            </h3>
            <p className="max-w-lede leading-[1.7] text-muted">{p.desc}</p>
            <div className="mt-2">
              <p className="font-display text-[clamp(2rem,6vw,2.8rem)] font-semibold leading-none text-text">
                {p.inr}
              </p>
              <p className="mt-2 font-mono text-sm text-accent">{p.usd}</p>
            </div>
            <p className="font-mono text-[0.7rem] uppercase tracking-[0.16em] text-muted-2">
              {p.duration}
            </p>
            <div className="mt-2">
              <Button href="/#contact">Start a project</Button>
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
          These are starting ranges based on typical scope. The final quote depends on screens,
          integrations and content, and I confirm it in writing, with a timeline, before any work
          begins.
        </p>
      </div>
    </section>
  );
}
