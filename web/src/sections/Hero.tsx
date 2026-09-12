import Image from "next/image";
import { Mail, MapPin } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/BrandIcons";
import { site } from "@/content/site";
import { Button, Backdrop } from "@/components/ui";

const socials = [
  { href: site.github, label: "GitHub", Icon: GithubIcon },
  { href: site.linkedin, label: "LinkedIn", Icon: LinkedinIcon },
  { href: `mailto:${site.email}`, label: "Email", Icon: Mail },
];

export default function Hero() {
  return (
    <section id="top" className="relative overflow-hidden pb-20 pt-32 sm:pt-40">
      <Backdrop />
      {/* ghost wordmark */}
      <span
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-[38%] -z-10 -translate-x-1/2 whitespace-nowrap font-display text-[20vw] font-bold leading-none tracking-tighter text-white/[0.022]"
      >
        venkat
      </span>

      <div className="shell">
        <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
          {/* ---------------------------------------------------------- copy */}
          <div className="reveal flex flex-col gap-7 lg:order-1">
            <div className="flex flex-wrap items-center gap-3">
              <span className="inline-flex items-center gap-2 rounded-full border border-accent/25 bg-accent/[0.07] px-3.5 py-1.5 font-mono text-[0.68rem] uppercase tracking-[0.16em] text-accent">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="absolute inline-flex h-full w-full rounded-full bg-accent opacity-70 motion-safe:animate-ping" />
                  <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-accent" />
                </span>
                Available for work
              </span>
              <span className="inline-flex items-center gap-1.5 font-mono text-[0.68rem] uppercase tracking-[0.16em] text-muted-2">
                <MapPin size={12} /> {site.location}
              </span>
            </div>

            <div className="flex flex-col gap-1">
              <p className="font-display text-[clamp(2.6rem,8.5vw,4.4rem)] font-light leading-[0.95] tracking-[-0.04em] text-muted">
                Venkat
              </p>
              <p className="font-display text-[clamp(2.6rem,8.5vw,4.4rem)] font-semibold leading-[0.95] tracking-[-0.04em] text-text">
                Thanmai Kumar
              </p>
            </div>

            <p className="font-mono text-[0.7rem] font-medium uppercase leading-[1.7] tracking-[0.18em] text-accent">
              {site.role}
            </p>

            <div className="flex flex-col gap-4">
              <h1 className="max-w-[20ch] font-display text-[clamp(1.35rem,3.4vw,1.85rem)] font-medium leading-[1.25] tracking-[-0.02em] text-text">
                {site.headline}
              </h1>
              <p className="max-w-lede text-pretty text-[0.95rem] leading-[1.75] text-muted">
                {site.lede}
              </p>
            </div>

            <p className="flex flex-wrap items-baseline gap-x-2.5 gap-y-1 text-sm">
              <span className="font-semibold text-text">{site.credential.count}</span>
              <span className="text-muted-2">/</span>
              <span className="font-mono text-[0.8rem] text-muted">{site.credential.stack}</span>
            </p>

            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <Button href="/#contact">Start a project</Button>
              <Button href="/#work" variant="ghost">
                View my work
              </Button>
            </div>

            <div className="flex items-center gap-5 pt-1">
              <ul className="flex gap-2.5">
                {socials.map(({ href, label, Icon }) => (
                  <li key={label}>
                    <a
                      href={href}
                      target={href.startsWith("mailto") ? undefined : "_blank"}
                      rel="noreferrer noopener"
                      aria-label={label}
                      className="grid h-10 w-10 place-items-center rounded-full border border-line bg-white/[0.03] text-text transition-colors duration-300 hover:border-accent/50 hover:text-accent"
                    >
                      <Icon size={16} />
                    </a>
                  </li>
                ))}
              </ul>
              <a
                href={site.whatsapp}
                target="_blank"
                rel="noreferrer noopener"
                className="text-xs text-muted underline decoration-line underline-offset-4 transition-colors hover:text-accent"
              >
                or message me on WhatsApp
              </a>
            </div>
          </div>

          {/* ------------------------------------------------------- portrait */}
          <div className="reveal relative mx-auto w-full max-w-[420px] lg:order-2 lg:max-w-none">
            <div className="relative">
              {/* accent ring */}
              <div
                aria-hidden
                className="absolute -inset-3 rounded-[44px] border border-accent/15"
                style={{ maskImage: "linear-gradient(to bottom, #000 35%, transparent 92%)" }}
              />
              <div className="relative overflow-hidden rounded-[36px] border border-line bg-gradient-to-b from-surface to-bg-2 shadow-lift">
                <div
                  aria-hidden
                  className="absolute inset-0 bg-[radial-gradient(120%_80%_at_50%_0%,var(--color-accent)_0%,transparent_58%)] opacity-[0.16]"
                />
                <div className="relative aspect-[4/5]">
                  <Image
                    src="/img/portrait-sketch.png"
                    alt={`${site.name}, ${site.role}`}
                    fill
                    priority
                    sizes="(max-width: 1024px) 92vw, 480px"
                    className="object-cover object-[center_18%]"
                  />
                  <div
                    aria-hidden
                    className="pointer-events-none absolute inset-0 bg-gradient-to-t from-bg-2 via-bg-2/10 to-transparent"
                  />
                </div>

                {/* caption rail */}
                <div className="relative flex items-center justify-between gap-4 border-t border-line px-6 py-4">
                  <p className="font-mono text-[0.66rem] uppercase tracking-[0.18em] text-muted-2">
                    Bangalore · IN
                  </p>
                  <p className="font-mono text-[0.66rem] uppercase tracking-[0.18em] text-accent">
                    Open to roles
                  </p>
                </div>
              </div>

              {/* floating stat */}
              <div className="absolute -bottom-6 -left-4 hidden rounded-2xl border border-line bg-surface/90 px-5 py-3.5 shadow-card backdrop-blur-md sm:block">
                <p className="font-mono text-[0.62rem] uppercase tracking-[0.18em] text-muted-2">
                  Shipped
                </p>
                <p className="font-display text-2xl font-semibold leading-none text-text">
                  5<span className="text-accent"> platforms</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
