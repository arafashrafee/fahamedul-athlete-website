"use client";

import Image from "next/image";
import { RevealOnScroll } from "@/components/ui/RevealOnScroll";
import { AnimatedText } from "@/components/ui/AnimatedText";

interface SocialLink {
  name: string;
  handle: string;
  href: string;
  icon: React.ReactNode;
  brandColor: string;
}

const SOCIALS: SocialLink[] = [
  {
    name: "Facebook",
    handle: "Fahamedul Islam",
    href: "https://www.facebook.com/md.fahamedul.islam",
    brandColor: "#1877F2",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-7 h-7">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
      </svg>
    ),
  },
  {
    name: "Instagram",
    handle: "@fahamedul.islam__",
    href: "https://www.instagram.com/fahamedul.islam__",
    brandColor: "#E4405F",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-7 h-7">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
      </svg>
    ),
  },
  {
    name: "TikTok",
    handle: "@fahamedul",
    href: "https://www.tiktok.com/@fahamedul",
    brandColor: "#00F2EA",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-7 h-7">
        <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1v-3.5a6.37 6.37 0 00-.79-.05A6.34 6.34 0 003.15 15.2a6.34 6.34 0 0010.86 4.48V13a8.28 8.28 0 005.58 2.17v-3.45a4.85 4.85 0 01-2.65-.78 4.83 4.83 0 01-1.35-1.25V6.69h3z" />
      </svg>
    ),
  },
  {
    name: "X",
    handle: "@fahamedul10",
    href: "https://x.com/fahamedul10",
    brandColor: "#FFFFFF",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-7 h-7">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
  {
    name: "Wikipedia",
    handle: "Fahamedul Islam",
    href: "https://en.wikipedia.org/wiki/Fahamedul_Islam",
    brandColor: "#636466",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-7 h-7">
        <path d="M12.09 13.119c-.936 1.932-2.217 4.548-2.853 5.728-.616 1.074-1.127.931-1.532.029-1.406-3.321-4.293-9.144-5.651-12.409-.251-.601-.441-.987-.619-1.139-.181-.15-.554-.24-1.122-.271C.103 5.033 0 4.982 0 4.898v-.455l.052-.045c.924-.005 5.401 0 5.401 0l.051.045v.434c0 .119-.075.176-.225.176l-.564.031c-.485.029-.727.164-.727.436 0 .135.053.33.166.601 1.082 2.646 4.818 10.521 4.818 10.521l2.681-5.452-2.12-4.574c-.281-.608-.437-.975-.575-1.095-.14-.12-.46-.199-.96-.237-.221-.015-.334-.078-.334-.176v-.455l.052-.045c.924-.005 4.981 0 4.981 0l.051.045v.434c0 .119-.075.176-.225.176l-.391.017c-.485.029-.656.157-.656.436 0 .135.048.315.144.557l1.34 3.082 1.28-2.623c.128-.262.18-.469.18-.601 0-.272-.194-.392-.679-.421l-.539-.031c-.15 0-.225-.057-.225-.176v-.455l.052-.045c.924-.005 3.841 0 3.841 0l.051.045v.434c0 .119-.075.176-.225.176-.609.022-1.027.128-1.263.315-.237.187-.566.727-.99 1.62l-1.82 3.672 2.521 5.452s3.456-7.569 4.429-9.903c.175-.417.269-.716.269-.901 0-.272-.227-.392-.712-.421l-.677-.031c-.15 0-.225-.057-.225-.176v-.455l.052-.045c.924-.005 4.17 0 4.17 0l.051.045v.434c0 .119-.075.176-.225.176-.735.031-1.216.168-1.443.413-.226.244-.63 1.003-1.212 2.275l-5.312 11.623c-.596 1.074-1.079.93-1.488.029L12.09 13.119z" />
      </svg>
    ),
  },
];

export function NationalTeam() {
  return (
    <section id="social" className="relative overflow-hidden bg-midnight">
      {/* Hero image background — zoomed, weighted to the right */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <Image
          src="/images/hero/social.png"
          alt=""
          fill
          className="object-cover object-[75%_20%] opacity-55 scale-110 origin-right"
          sizes="100vw"
        />
        {/* Darken the left for the card column, fade edges into the page */}
        <div className="absolute inset-0 bg-gradient-to-r from-midnight via-midnight/70 to-midnight/20" />
        <div className="absolute inset-0 bg-gradient-to-b from-midnight via-transparent to-midnight" />
      </div>

      <div className="relative container-page section flex flex-col items-start text-left gap-8">
        <span className="eyebrow">
          <span className="text-primary">——</span> CONNECT
        </span>

        <AnimatedText
          text="Follow the Journey."
          as="h2"
          className="display-lg text-text text-balance max-w-3xl"
          stagger={0.05}
        />

        <RevealOnScroll className="max-w-md text-sm text-muted leading-relaxed">
          Stay connected across all platforms for behind-the-scenes content,
          updates, and more.
        </RevealOnScroll>

        {/* Social cards — single column, left side */}
        <div className="mt-2 flex flex-col gap-3 w-full max-w-sm">
          {SOCIALS.map((social, i) => (
            <RevealOnScroll key={social.name} delay={i * 0.06}>
              <a
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-4 py-4 pl-4 pr-7 w-full border border-white/[0.08] bg-midnight/50 backdrop-blur-sm rounded-lg transition-all duration-500"
                style={{
                  "--brand": social.brandColor,
                } as React.CSSProperties}
                onMouseEnter={(e) => {
                  const el = e.currentTarget;
                  el.style.borderColor = social.brandColor + "50";
                  el.style.backgroundColor = social.brandColor + "0A";
                  el.style.boxShadow = `0 0 30px ${social.brandColor}15`;
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget;
                  el.style.borderColor = "";
                  el.style.backgroundColor = "";
                  el.style.boxShadow = "";
                }}
              >
                <div className="flex items-center justify-center w-12 h-12 shrink-0 rounded-md border border-white/10 bg-white/[0.04] text-white/60 transition-colors duration-500 group-hover:text-[var(--brand)] group-hover:border-[var(--brand)]">
                  {social.icon}
                </div>
                <div className="flex flex-col items-start gap-0.5 text-left min-w-0">
                  <span className="font-display text-base tracking-[0.1em] text-text transition-colors duration-500 group-hover:text-[var(--brand)]">
                    {social.name}
                  </span>
                  <span className="text-[11px] text-faint tracking-wide truncate w-full">
                    {social.handle}
                  </span>
                </div>
              </a>
            </RevealOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
}
