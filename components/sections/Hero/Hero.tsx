"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { HeroContent } from "./HeroContent";
import { HeroBackdrop } from "./HeroBackdrop";

export function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "-15%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  return (
    <section
      ref={ref}
      className="relative h-[100svh] min-h-[640px] w-full overflow-hidden bg-midnight"
    >
      <motion.div style={{ y: bgY }} className="absolute inset-0">
        <HeroBackdrop />
      </motion.div>

      {/* Top + bottom gradient overlay for cinematic feel */}
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-midnight/60 via-midnight/0 to-midnight" />
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-midnight via-transparent to-transparent" />

      <motion.div
        style={{ y: contentY, opacity }}
        className="relative z-10 h-full container-page flex flex-col justify-end pb-20 sm:pb-24"
      >
        <HeroContent />
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 text-muted"
      >
        <span className="label-sm tracking-[0.3em]">
          Scroll
        </span>
        <motion.span
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          className="block w-px h-10 bg-gradient-to-b from-primary to-transparent"
        />
      </motion.div>
    </section>
  );
}
