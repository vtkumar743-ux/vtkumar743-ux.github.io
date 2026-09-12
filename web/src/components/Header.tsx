"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Menu, X, Send } from "lucide-react";
import { nav, site } from "@/content/site";
import { cx } from "./ui";

export default function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      {/* masks whatever scrolls underneath so the floating pill stays readable */}
      <div
        aria-hidden
        className={cx(
          "pointer-events-none absolute inset-x-0 top-0 -z-10 transition-opacity duration-300",
          scrolled ? "opacity-100" : "opacity-0",
        )}
        style={{
          height: "calc(var(--header-h) + 28px)",
          background:
            "linear-gradient(to bottom, var(--color-bg) 0%, color-mix(in oklab, var(--color-bg) 92%, transparent) 62%, transparent 100%)",
          backdropFilter: "blur(6px)",
        }}
      />

      {/* wordmark sits above the nav pill */}
      <div
        className={cx(
          "flex justify-center transition-all duration-300",
          scrolled ? "pt-2.5 pb-1" : "pt-5 pb-2",
        )}
      >
        <Link
          href="/"
          onClick={() => setOpen(false)}
          className="font-display text-lg font-bold tracking-tight"
        >
          <span className="text-accent">.</span>
          <span>venkat</span>
        </Link>
      </div>

      <div className="shell flex justify-center">
        <nav
          aria-label="Primary"
          className="flex w-full max-w-[660px] items-center justify-between gap-2 rounded-full border border-line bg-surface/80 px-2 py-2 shadow-lift backdrop-blur-xl"
        >
          <ul className="ml-2 hidden items-center gap-1 md:flex">
            {nav.map((n) => (
              <li key={n.label}>
                <Link
                  href={n.href}
                  className="rounded-full px-3.5 py-2 text-sm text-muted transition-colors duration-200 hover:bg-white/[0.06] hover:text-text"
                >
                  {n.label}
                </Link>
              </li>
            ))}
          </ul>

          <button
            type="button"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="ml-1 grid h-10 w-10 place-items-center rounded-full text-text transition-colors hover:bg-white/[0.06] md:hidden"
          >
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>

          <Link
            href="/#contact"
            onClick={() => setOpen(false)}
            className="group inline-flex items-center gap-2 rounded-full bg-accent px-5 py-2.5 text-sm font-semibold text-bg transition-colors duration-300 hover:bg-text"
          >
            Contact
            <Send
              size={14}
              className="transition-transform duration-300 motion-safe:group-hover:translate-x-0.5"
            />
          </Link>
        </nav>
      </div>

      {open && (
        <div className="fixed inset-x-0 top-[var(--header-h)] bottom-0 z-40 bg-bg/97 backdrop-blur-xl md:hidden">
          <nav aria-label="Mobile" className="shell flex flex-col gap-1 pt-8">
            {nav.map((n) => (
              <Link
                key={n.label}
                href={n.href}
                onClick={() => setOpen(false)}
                className="border-b border-line py-4 font-display text-2xl font-light text-text"
              >
                {n.label}
              </Link>
            ))}
            <a
              href={site.whatsapp}
              target="_blank"
              rel="noreferrer noopener"
              className="mt-6 rounded-full border border-line py-3 text-center text-sm font-medium text-text"
            >
              Message on WhatsApp
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
