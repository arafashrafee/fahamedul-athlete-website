"use client";

import { motion, useScroll, useSpring } from "framer-motion";
import { SCROLL_SPRING } from "@/lib/animations";

export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, SCROLL_SPRING);

  return (
    <motion.div
      aria-hidden
      style={{ scaleX }}
      className="fixed top-0 left-0 right-0 h-px origin-left bg-primary z-[100] glow-sm"
    />
  );
}
