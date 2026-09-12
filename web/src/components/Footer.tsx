import Link from "next/link";
import { Mail, ArrowUp } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/BrandIcons";
import { nav, site } from "@/content/site";
import { values } from "@/content/about";

export default function Footer() {
  return (
    <footer className="relative border-t border-line bg-bg-2">
      <div className="shell py-16">
        <div className="grid gap-12 md:grid-cols-[1.3fr_1fr_1fr]">
          <div className="flex flex-col gap-5">
            <Link href="/" className="font-display text-lg font-semibold tracking-tight">
              <span className="text-accent">.</span>venkat
            </Link>
            <p className="max-w-xs text-sm leading-relaxed text-muted">
              {site.role}. Based in {site.location}, working remotely with teams anywhere.
            </p>
            <ul className="flex gap-2.5">
              <li>
                <a
                  href={site.github}
                  target="_blank"
                  rel="noreferrer noopener"
                  aria-label="GitHub"
                  className="grid h-10 w-10 place-items-center rounded-full border border-line bg-white/[0.03] transition-colors duration-300 hover:border-accent/50 hover:text-accent"
                >
                  <GithubIcon size={16} />
                </a>
              </li>
              <li>
                <a
                  href={site.linkedin}
                  target="_blank"
                  rel="noreferrer noopener"
                  aria-label="LinkedIn"
                  className="grid h-10 w-10 place-items-center rounded-full border border-line bg-white/[0.03] transition-colors duration-300 hover:border-accent/50 hover:text-accent"
                >
                  <LinkedinIcon size={16} />
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${site.email}`}
                  aria-label="Email"
                  className="grid h-10 w-10 place-items-center rounded-full border border-line bg-white/[0.03] transition-colors duration-300 hover:border-accent/50 hover:text-accent"
                >
                  <Mail size={16} />
                </a>
              </li>
            </ul>
          </div>

          <nav aria-label="Footer" className="flex flex-col gap-3">
            <h2 className="font-mono text-[0.68rem] uppercase tracking-[0.2em] text-muted-2">
              Explore
            </h2>
            {nav.map((n) => (
              <Link
                key={n.label}
                href={n.href}
                className="text-sm text-muted transition-colors hover:text-text"
              >
                {n.label}
              </Link>
            ))}
            <Link href="/#contact" className="text-sm text-muted transition-colors hover:text-text">
              Contact
            </Link>
            <a
              href={site.resume}
              download
              className="text-sm text-muted transition-colors hover:text-text"
            >
              Download CV
            </a>
          </nav>

          <div className="flex flex-col gap-3">
            <h2 className="font-mono text-[0.68rem] uppercase tracking-[0.2em] text-muted-2">
              How I work
            </h2>
            <ul className="flex flex-wrap gap-2">
              {values.map((v) => (
                <li
                  key={v}
                  className="rounded-full border border-line px-3 py-1 text-[0.72rem] text-muted"
                >
                  {v}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-start justify-between gap-4 border-t border-line pt-7 sm:flex-row sm:items-center">
          <p className="text-xs text-muted-2">
            © {new Date().getFullYear()} {site.name}. All rights reserved. Designed and built from
            scratch.
          </p>
          <a
            href="#main"
            className="inline-flex items-center gap-2 text-xs text-muted transition-colors hover:text-accent"
          >
            Back to top <ArrowUp size={13} />
          </a>
        </div>
      </div>
    </footer>
  );
}
