"use client";

import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";
import { EASE_HERO, DUR } from "@/lib/animations";

const pageVariants = {
  initial: { opacity: 0, y: 28 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -16 },
};

/**
 * Wraps app/page contents in AnimatePresence keyed on pathname.
 * Routes fade + lift on enter, fade + sink on exit. Mode="wait"
 * so the exiting page finishes before the next mounts — no flash.
 */
export function PageTransitionShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={pathname}
        variants={pageVariants}
        initial="initial"
        animate="animate"
        exit="exit"
        transition={{ duration: DUR.section, ease: EASE_HERO }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
