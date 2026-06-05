"use client";

import { motion } from "framer-motion";
import { EASE_SECTION, DUR } from "@/lib/animations";

export function PageTransition({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: DUR.hover, ease: EASE_SECTION }}
    >
      {children}
    </motion.div>
  );
}
