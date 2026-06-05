"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { SITE } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { EASE_HERO, DUR } from "@/lib/animations";

/**
 * Slim, scroll-aware top bar — brand wordmark + status caption.
 * Navigation now lives in <NavToggle /> (right drawer); this header
 * just anchors the brand and frames the page on scroll.
 */
export function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -32, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: DUR.reveal, delay: 0.2, ease: EASE_HERO }}
      className={cn(
        "fixed top-0 inset-x-0 z-50 transition-all duration-500 pointer-events-none",
        scrolled
          ? "bg-midnight/75 backdrop-blur-xl border-b border-border"
          : "bg-transparent border-b border-transparent",
      )}
    >
      <div className="container-page flex items-center justify-between h-[var(--header-h)]">
        <Link
          href="/"
          className="pointer-events-auto font-display text-xl tracking-widest text-text hover:text-primary transition-colors"
          aria-label={`${SITE.name} — Home`}
        >
          {SITE.shortName.toUpperCase()}
          <span className="text-primary">.</span>
        </Link>

        <span className="pointer-events-auto label-sm text-faint hidden sm:inline">
          BANGLADESH · FORWARD
        </span>
      </div>
    </motion.header>
  );
}
