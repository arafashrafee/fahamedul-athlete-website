import type { MetadataRoute } from "next";
import { SITE, NAV_LINKS } from "@/lib/constants";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return NAV_LINKS.map((link) => ({
    url: `${SITE.url}${link.href}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: link.href === "/" ? 1 : 0.7,
  }));
}
