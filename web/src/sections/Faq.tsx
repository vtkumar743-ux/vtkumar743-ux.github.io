import { faqs } from "@/content/services";
import { SectionHeading } from "@/components/ui";
import { Plus } from "lucide-react";

export default function Faq() {
  return (
    <section aria-labelledby="faq-heading" className="section">
      <div className="shell">
        <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
          <div id="faq-heading" className="lg:sticky lg:top-32 lg:self-start">
            <SectionHeading
              eyebrow="FAQ"
              light="Common"
              bold="Questions"
              sub="How I work, what you get, and who owns it afterwards."
            />
          </div>

          <div className="flex flex-col">
            {faqs.map((f, i) => (
              <details
                key={f.q}
                open={i === 0}
                className="group border-b border-line py-6 first:pt-0"
              >
                <summary className="flex cursor-pointer list-none items-start justify-between gap-6 font-display text-lg font-medium text-text marker:hidden">
                  {f.q}
                  <Plus
                    size={18}
                    className="mt-1 shrink-0 text-accent transition-transform duration-300 group-open:rotate-45"
                  />
                </summary>
                <p className="mt-4 max-w-lede text-sm leading-[1.75] text-muted">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
