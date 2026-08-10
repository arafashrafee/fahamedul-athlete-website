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
      className="flex flex-col gap-4 items-start"
    >
      <motion.div variants={fadeUp} className="flex flex-wrap gap-4">
        <ButtonLink href="#identity" variant="primary">
          Story
        </ButtonLink>
        <ButtonLink href="#contact" variant="ghost">
          Get in Touch
        </ButtonLink>
      </motion.div>
    </motion.div>
  );
}
