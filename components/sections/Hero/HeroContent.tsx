"use client";

import { motion } from "framer-motion";
import { ButtonLink } from "@/components/ui/Button";
import { stagger, wordReveal, fadeUp } from "@/lib/animations";

const NAME = ["FAHAMEDUL", "ISLAM"];

export function HeroContent() {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={stagger(0.4, 0.12)}
      className="flex flex-col gap-10"
    >
      <motion.div
        variants={fadeUp}
        className="flex items-center gap-4 label tracking-[0.3em] text-primary"
      >
        <span className="block w-10 h-px bg-primary" />
        <span>Bangladesh · Forward · #9</span>
      </motion.div>

      <h1 className="font-display leading-[0.85] tracking-tight">
        {NAME.map((word, i) => (
          <span
            key={word}
            className="block overflow-hidden"
            aria-hidden={i > 0 ? undefined : undefined}
          >
            <motion.span
              variants={wordReveal}
              className="block text-text"
              style={{
                fontSize: "clamp(3.5rem, 13vw, 12rem)",
              }}
            >
              {word}
              {i === NAME.length - 1 && (
                <span className="text-primary">.</span>
              )}
            </motion.span>
          </span>
        ))}
      </h1>

      <motion.p
        variants={fadeUp}
        className="max-w-xl text-base sm:text-lg text-muted leading-relaxed"
      >
        Bangladesh national team forward. Building a career defined by pace,
        precision, and the weight of representing a nation on the rise.
      </motion.p>

      <motion.div variants={fadeUp} className="flex flex-wrap gap-4">
        <ButtonLink href="#career" variant="primary" magnetic>
          View Career
        </ButtonLink>
        <ButtonLink href="#highlights" variant="ghost" magnetic>
          Watch Highlights
        </ButtonLink>
      </motion.div>
    </motion.div>
  );
}
