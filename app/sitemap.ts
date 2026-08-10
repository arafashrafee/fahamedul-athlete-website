import type { MetadataRoute } from "next";
import { SITE, NAV_LINKS } from "@/lib/constants";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  // Anchor entries point at the homepage, so only real routes are listed.
  return NAV_LINKS.filter((link) => !link.href.includes("#")).map((link) => ({
    url: `${SITE.url}${link.href}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: link.href === "/" ? 1 : 0.7,
  }));
}
