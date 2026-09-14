"use client";

import { useEffect } from "react";

/**
 * Scroll entrance animation, as a true enhancement.
 *
 * The earlier version hid every `.reveal` element via CSS until this component
 * hydrated. On a phone that left the whole page below the first screen blank for
 * several seconds, so scrolling down during load showed empty space.
 *
 * Now nothing is hidden by CSS. On hydration this marks only the elements that are
 * still below the viewport and animates those in as they arrive. Anything already on
 * screen is left alone, and if the bundle never loads the page simply shows
 * everything, which is the correct fallback.
 */
export default function Reveal() {
  useEffect(() => {
    if (typeof window === "undefined") return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            e.target.classList.add("is-in");
            io.unobserve(e.target);
          }
        }
      },
      { rootMargin: "0px 0px -10% 0px", threshold: 0.05 },
    );

    const arm = () => {
      const fold = window.innerHeight * 1.05;
      for (const el of document.querySelectorAll<HTMLElement>(".reveal:not(.armed)")) {
        el.classList.add("armed");
        // Only hide what the reader cannot see yet; hiding anything on screen would
        // make content that had already painted disappear.
        if (el.getBoundingClientRect().top > fold) {
          el.classList.add("pending");
          io.observe(el);
        }
      }
    };

    arm();
    const mo = new MutationObserver(arm);
    mo.observe(document.body, { childList: true, subtree: true });

    return () => {
      io.disconnect();
      mo.disconnect();
    };
  }, []);

  return null;
}
