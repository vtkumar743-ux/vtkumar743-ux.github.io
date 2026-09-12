import { certifications } from "@/content/about";

export default function Marquee() {
  const items = [...certifications, ...certifications];

  return (
    <section aria-labelledby="certs-heading" className="border-y border-line bg-bg-2 py-6">
      <h2 id="certs-heading" className="sr-only">
        Certifications and training
      </h2>
      <p className="sr-only">
        Certifications and training completed: {certifications.join(", ")}.
      </p>

      <div
        aria-hidden
        className="relative overflow-hidden"
        style={{
          maskImage:
            "linear-gradient(to right, transparent, #000 8%, #000 92%, transparent)",
        }}
      >
        <div className="marquee-track gap-10">
          {items.map((c, i) => (
            <span
              key={`${c}-${i}`}
              className="flex shrink-0 items-center gap-10 font-mono text-[0.72rem] uppercase tracking-[0.18em] text-muted-2"
            >
              {c}
              <span className="h-1 w-1 rounded-full bg-accent/50" />
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
