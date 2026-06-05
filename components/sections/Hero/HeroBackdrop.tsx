"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { EASE_HERO, DUR } from "@/lib/animations";

/**
 * Hero backdrop — uses /public/images/hero/main.jpg with a slow Ken Burns
 * zoom + pan. Replace the image to change the hero photo.
 */
export function HeroBackdrop() {
  return (
    <div className="absolute inset-0 overflow-hidden bg-midnight">
      <motion.div
        initial={{ scale: 1.08, opacity: 0 }}
        animate={{ scale: 1.18, opacity: 1 }}
        transition={{
          scale: { duration: 18, ease: "linear", repeat: Infinity, repeatType: "reverse" },
          opacity: { duration: DUR.cinematic, ease: EASE_HERO },
        }}
        className="absolute inset-0 will-change-transform"
      >
        <Image
          src="/images/hero/main.jpg"
          alt=""
          fill
          priority
          sizes="100vw"
          quality={90}
          className="object-cover object-center"
        />
      </motion.div>

      {/* Cinematic vignette + tone */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_45%,transparent_0%,rgba(7,7,7,0.45)_55%,#070707_100%)]" />
      <div
        className="absolute inset-0 opacity-40 mix-blend-multiply"
        style={{
          backgroundImage:
            "linear-gradient(180deg, rgba(7,7,7,0.5) 0%, transparent 30%, transparent 60%, rgba(7,7,7,0.85) 100%)",
        }}
      />
      <div
        className="absolute inset-0 opacity-[0.08] mix-blend-screen"
        style={{
          backgroundImage:
            "radial-gradient(circle at 70% 40%, rgba(225,29,72,0.6), transparent 50%)",
        }}
      />
      <div
        className="absolute inset-0 opacity-[0.05] mix-blend-overlay pointer-events-none"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='240' height='240'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>\")",
        }}
      />
    </div>
  );
}
