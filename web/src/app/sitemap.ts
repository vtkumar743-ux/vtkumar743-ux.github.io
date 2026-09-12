import type { MetadataRoute } from "next";
import { site } from "@/content/site";
import { projects } from "@/content/projects";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return [
    { url: site.url, lastModified: now, priority: 1 },
    { url: `${site.url}/projects`, lastModified: now, priority: 0.8 },
    { url: `${site.url}/about`, lastModified: now, priority: 0.7 },
    ...projects.map((p) => ({
      url: `${site.url}/projects/${p.slug}`,
      lastModified: now,
      priority: 0.6,
    })),
  ];
}
