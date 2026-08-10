export const SITE = {
  name: "Fahamedul Islam",
  shortName: "Fahamedul",
  role: "Forward",
  nationality: "Bangladesh",
  tagline: "Forward · Bangladesh National Football Team",
  description:
    "Official site of Fahamedul Islam — Bangladeshi professional footballer. Career, highlights, achievements, and international caps.",
  url: "https://fahamedulislam.com",
  twitter: "@fahamedul",
} as const;

/**
 * Menu order mirrors the homepage section order. Anchors are
 * root-relative ("/#about") so they still resolve when the menu is
 * opened from a standalone route.
 */
export const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "About", href: "/#about" },
  { label: "Career Highlights", href: "/#career-highlights" },
  { label: "Career", href: "/#career" },
  { label: "Features", href: "/#story" },
  { label: "Press", href: "/#press" },
  { label: "Social Media", href: "/#social" },
  { label: "Contact", href: "/#contact" },
] as const;

export const SOCIAL_LINKS = [
  { label: "Instagram", href: "https://instagram.com/", handle: "@fahamedul" },
  { label: "X", href: "https://x.com/", handle: "@fahamedul" },
  { label: "YouTube", href: "https://youtube.com/", handle: "@fahamedul" },
] as const;
