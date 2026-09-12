import type { NextConfig } from "next";

/**
 * GitHub Pages serves static files only, so the site is exported rather than run.
 *
 * `images.unoptimized` is required: the Next image optimiser is a server, and there
 * is none. Images are served as authored, which is why the portrait and the covers
 * are already sized for delivery rather than left oversized.
 *
 * `trailingSlash` makes every route emit `<route>/index.html`, which is what Pages
 * needs to serve `/projects/conduit` without a rewrite rule.
 */
const nextConfig: NextConfig = {
  output: "export",
  images: { unoptimized: true },
  trailingSlash: true,
};

export default nextConfig;
