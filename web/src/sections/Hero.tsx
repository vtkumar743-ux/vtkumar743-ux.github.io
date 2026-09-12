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
    <section id="top" className="relative overflow-hidden pb-24 pt-40 sm:pt-48">
      <Backdrop />
      <span
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 text-center font-display text-[19vw] font-bold leading-[0.78] tracking-tighter text-white/[0.02]"
      >
        venkat
      </span>

      <div className="shell">
        {/* ------------------------------------------------------ device frame */}
        <div className="reveal relative mx-auto w-full max-w-[600px]">
          <div className="relative rounded-[54px] bg-gradient-to-b from-[#4a4f5e] via-[#23262e] to-[#14161a] p-[4px] shadow-lift">
            {/* side buttons */}
            <span className="absolute -left-[3px] top-[20%] h-14 w-[3px] rounded-l-full bg-gradient-to-b from-[#565b6b] to-[#2a2d36]" />
            <span className="absolute -left-[3px] top-[31%] h-20 w-[3px] rounded-l-full bg-gradient-to-b from-[#565b6b] to-[#2a2d36]" />
            <span className="absolute -right-[3px] top-[26%] h-24 w-[3px] rounded-r-full bg-gradient-to-b from-[#565b6b] to-[#2a2d36]" />

            <div className="overflow-hidden rounded-[50px] bg-bg-2">
              <div className="relative aspect-[4/5] overflow-hidden">
                {/* warm studio ground behind the cut-out subject */}
                <div
                  aria-hidden
                  className="absolute inset-0 bg-[radial-gradient(120%_90%_at_50%_18%,#3a3128_0%,#1d1e24_52%,#0c0d10_100%)]"
                />
                <div
                  aria-hidden
                  className="absolute inset-0 bg-[radial-gradient(70%_45%_at_50%_100%,var(--color-accent)_0%,transparent_70%)] opacity-[0.16]"
                />
                <Image
                  src="/img/portrait-illustration.png"
                  alt={`${site.name}, ${site.role}`}
                  fill
                  priority
                  sizes="(max-width: 640px) 94vw, 600px"
                  className="object-cover object-[center_12%]"
                />
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-0 bg-gradient-to-t from-bg-2 via-transparent to-transparent"
                />

                <p className="absolute left-6 top-6 inline-flex items-center gap-2 rounded-full border border-white/15 bg-black/45 px-3.5 py-1.5 text-sm font-semibold text-text backdrop-blur-sm">
                  <span aria-hidden>👋</span> Hello
                </p>

                <p className="absolute inset-x-6 bottom-6 text-right font-display leading-[0.92] tracking-[-0.04em] sm:inset-x-8 sm:bottom-8">
                  <span className="block pb-[0.05em] text-[clamp(3.2rem,11vw,5.4rem)] font-bold">
                    Venkat
                  </span>
                </p>
              </div>

              {/* home indicator */}
              <div className="flex justify-center py-4">
                <span className="h-[5px] w-32 rounded-full bg-white/80" />
              </div>
            </div>
          </div>
        </div>

        {/* ------------------------------------------------------------- copy */}
        <div className="reveal mx-auto mt-14 flex max-w-[720px] flex-col items-center gap-6 text-center">
          <div className="flex flex-wrap items-center justify-center gap-3">
            <span className="inline-flex items-center gap-2 rounded-full border border-accent/25 bg-accent/[0.08] px-3.5 py-1.5 font-mono text-[0.66rem] uppercase tracking-[0.16em] text-accent">
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full rounded-full bg-accent opacity-70 motion-safe:animate-ping" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-accent" />
              </span>
              Available for work
            </span>
            <span className="inline-flex items-center gap-1.5 font-mono text-[0.66rem] uppercase tracking-[0.16em] text-muted-2">
              <MapPin size={12} /> {site.location}
            </span>
          </div>

          <p className="font-mono text-[0.7rem] font-medium uppercase tracking-[0.2em] text-accent">
            {site.role}
          </p>

          <h1 className="max-w-[22ch] font-display text-[clamp(1.6rem,4.4vw,2.5rem)] font-semibold leading-[1.2] tracking-[-0.03em] text-text">
            {site.headline}
          </h1>

          <p className="max-w-lede text-pretty text-[0.98rem] leading-[1.75] text-muted">
            {site.lede}
          </p>

          <p className="flex flex-wrap items-baseline justify-center gap-x-2.5 gap-y-1 text-sm">
            <span className="font-semibold text-text">{site.credential.count}</span>
            <span className="text-muted-2">/</span>
            <span className="font-mono text-[0.8rem] text-muted">{site.credential.stack}</span>
          </p>

          <div className="mt-2 flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:items-center">
            <Button href="/#contact">Start a project</Button>
            <Button href="/#work" variant="ghost">
              View my work
            </Button>
          </div>

          <div className="mt-2 flex flex-col items-center gap-4 sm:flex-row sm:gap-5">
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
      </div>
    </section>
  );
}
