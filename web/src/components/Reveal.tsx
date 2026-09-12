"use client";

import { useEffect } from "react";

/**
 * Flips `.is-in` on any `.reveal` element as it enters the viewport.
 * One observer for the whole document; re-scans on route change via MutationObserver.
 */
export default function Reveal() {
  useEffect(() => {
    if (typeof window === "undefined") return;

    // Hydration succeeded, so the no-JS failsafe in <head> is no longer needed.
    const w = window as Window & { __revealFallback?: number };
    if (w.__revealFallback) {
      clearTimeout(w.__revealFallback);
      w.__revealFallback = undefined;
    }
    document.documentElement.classList.add("js");

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      document.querySelectorAll(".reveal").forEach((el) => el.classList.add("is-in"));
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            e.target.classList.add("is-in");
            io.unobserve(e.target);
          }
        }
      },
      { rootMargin: "0px 0px -12% 0px", threshold: 0.08 },
    );

    const scan = () =>
      document.querySelectorAll(".reveal:not(.is-in)").forEach((el) => io.observe(el));

    scan();
    const mo = new MutationObserver(scan);
    mo.observe(document.body, { childList: true, subtree: true });

    return () => {
      io.disconnect();
      mo.disconnect();
    };
  }, []);

  return null;
}
