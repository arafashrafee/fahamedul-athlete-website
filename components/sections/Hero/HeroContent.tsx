"use client";

import { motion } from "framer-motion";
import { ButtonLink } from "@/components/ui/Button";
import { HeroTypewriter } from "./HeroTypewriter";
import { stagger, fadeUp } from "@/lib/animations";

export function HeroContent() {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={stagger(0.4, 0.12)}
      className="flex flex-col gap-6 items-start"
    >
      <motion.div variants={fadeUp}>
        <HeroTypewriter />
      </motion.div>

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
