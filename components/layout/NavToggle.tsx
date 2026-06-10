"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { NAV_LINKS, SOCIAL_LINKS, SITE } from "@/lib/constants";
import { EASE_HERO, EASE_HOVER, EASE_IN_OUT, DUR, stagger } from "@/lib/animations";

const itemVariants = {
  hidden: { opacity: 0, x: 48 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: DUR.reveal, ease: EASE_HERO },
  },
};

export function NavToggle() {
  const [open, setOpen] = useState(false);

  /* Escape closes; body scroll locks via Lenis. */
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);

    const lenis = window.__lenis;
    lenis?.stop();

    return () => {
      window.removeEventListener("keydown", onKey);
      lenis?.start();
    };
  }, [open]);

  return (
    <>
      {/* Hamburger / X — fixed top-right, always on top. */}
      <motion.button
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? "Close menu" : "Open menu"}
        aria-expanded={open}
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: DUR.section, delay: 0.4, ease: EASE_HERO }}
        className="fixed top-3 right-5 md:right-7 z-[80] w-14 h-14 rounded-full border border-border-strong bg-midnight/70 backdrop-blur-md hover:border-primary transition-all flex items-center justify-center hover:shadow-[0_0_10px_rgba(233,58,59,0.35)]"
      >
        <span className="relative w-5 h-4 flex flex-col items-center justify-center">
          <motion.span
            animate={
              open
                ? { rotate: 45, y: 0, width: 20 }
                : { rotate: 0, y: -4, width: 20 }
            }
            transition={{ duration: DUR.hover, ease: EASE_HOVER }}
            className="absolute block h-px bg-text origin-center"
          />
          <motion.span
            animate={open ? { opacity: 0 } : { opacity: 1 }}
            transition={{ duration: DUR.micro, ease: EASE_HOVER }}
            className="absolute block h-px w-3 bg-text"
          />
          <motion.span
            animate={
              open
                ? { rotate: -45, y: 0, width: 20 }
                : { rotate: 0, y: 4, width: 14 }
            }
            transition={{ duration: DUR.hover, ease: EASE_HOVER }}
            className="absolute block h-px bg-text origin-center"
          />
        </span>
      </motion.button>

      <AnimatePresence>
        {open && (
          <>
            {/* Click-away backdrop. */}
            <motion.div
              key="nav-backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: DUR.section, ease: EASE_HOVER }}
              onClick={() => setOpen(false)}
              className="fixed inset-0 z-[60] bg-midnight/70 backdrop-blur-md"
              aria-hidden
            />

            {/* Drawer — slides in from right. */}
            <motion.aside
              key="nav-panel"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: DUR.section, ease: EASE_IN_OUT }}
              className="fixed top-0 right-0 bottom-0 z-[70] w-full sm:w-[440px] md:w-[520px] bg-midnight border-l border-border flex flex-col"
              role="dialog"
              aria-modal="true"
              aria-label="Site navigation"
            >
              <header className="flex items-center justify-between px-7 md:px-10 h-[var(--header-h)] border-b border-border">
                <span className="label-sm text-faint">
                  {SITE.shortName.toUpperCase()} · MENU
                </span>
                <span className="label-sm text-faint">
                  {String(NAV_LINKS.length).padStart(2, "0")}
                </span>
              </header>

              <motion.nav
                variants={stagger(0.15, 0.06)}
                initial="hidden"
                animate="visible"
                className="flex-1 flex flex-col justify-center px-7 md:px-10"
              >
                {NAV_LINKS.map((link, i) => (
                    <div key={link.href} className="overflow-hidden">
                      <motion.div variants={itemVariants}>
                        <a
                          href={link.href}
                          onClick={() => setOpen(false)}
                          className="group flex items-baseline gap-5 md:gap-7 py-2.5 md:py-3 transition-colors text-text hover:text-primary"
                        >
                          <span className="label-sm text-faint group-hover:text-primary transition-colors w-6 shrink-0">
                            {String(i + 1).padStart(2, "0")}
                          </span>
                          <span
                            className="font-display leading-[0.95] tracking-tight"
                            style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)" }}
                          >
                            {link.label}
                          </span>
                        </a>
                      </motion.div>
                    </div>
                ))}
              </motion.nav>

              <footer className="px-7 md:px-10 py-6 border-t border-border">
                <div className="label-sm text-faint mb-4">CONNECT</div>
                <div className="flex flex-wrap gap-x-6 gap-y-3">
                  {SOCIAL_LINKS.map((s) => (
                    <a
                      key={s.label}
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="label text-muted hover:text-primary transition-colors"
                    >
                      {s.label}
                    </a>
                  ))}
                </div>
              </footer>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
