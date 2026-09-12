"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { WhatsappIcon } from "@/components/BrandIcons";
import { nav, site } from "@/content/site";
import { cx } from "./ui";

export default function Header() {
  const [open, setOpen] = useState(false);
  const [solid, setSolid] = useState(false);

  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > 24);
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
    <header
      className={cx(
        "fixed inset-x-0 top-0 z-50 transition-colors duration-300",
        solid ? "border-b border-line bg-bg/80 backdrop-blur-xl" : "border-b border-transparent",
      )}
      style={{ height: "var(--header-h)" }}
    >
      <div className="shell flex h-full items-center justify-between gap-6">
        <Link
          href="/"
          className="font-display text-lg font-semibold tracking-tight"
          onClick={() => setOpen(false)}
        >
          <span className="text-accent">.</span>
          <span>venkat</span>
        </Link>

        <nav aria-label="Primary" className="hidden md:block">
          <ul className="flex items-center gap-1">
            {nav.map((n) => (
              <li key={n.label}>
                <Link
                  href={n.href}
                  className="rounded-full px-3.5 py-2 text-sm text-muted transition-colors duration-200 hover:bg-white/[0.05] hover:text-text"
                >
                  {n.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <Link
            href="/#contact"
            className="hidden rounded-full border border-line bg-white/[0.03] px-4 py-2 text-sm font-medium transition-colors duration-300 hover:border-accent/50 hover:text-accent sm:inline-block"
          >
            Contact
          </Link>
          <a
            href={site.whatsapp}
            target="_blank"
            rel="noreferrer noopener"
            aria-label="Message me on WhatsApp"
            className="grid h-9 w-9 place-items-center rounded-full bg-accent text-bg transition-colors duration-300 hover:bg-text"
          >
            <WhatsappIcon size={15} />
          </a>
          <button
            type="button"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="grid h-9 w-9 place-items-center rounded-full border border-line text-text md:hidden"
          >
            {open ? <X size={16} /> : <Menu size={16} />}
          </button>
        </div>
      </div>

      {open && (
        <div className="fixed inset-x-0 top-[var(--header-h)] bottom-0 z-40 border-t border-line bg-bg/97 backdrop-blur-xl md:hidden">
          <nav aria-label="Mobile" className="shell flex flex-col gap-1 pt-6">
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
            <Link
              href="/#contact"
              onClick={() => setOpen(false)}
              className="mt-6 rounded-full bg-accent px-6 py-3 text-center font-medium text-bg"
            >
              Start a conversation
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
