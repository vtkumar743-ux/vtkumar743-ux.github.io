import type { MetadataRoute } from "next";

// Static export has no server, so this route must be emitted as a file at build time.
export const dynamic = "force-static";
import { site } from "@/content/site";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${site.url}/sitemap.xml`,
  };
}
