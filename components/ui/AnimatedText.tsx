"use client";

import { motion } from "framer-motion";
import { heroTextReveal, stagger, VIEWPORT_DEFAULT } from "@/lib/animations";
import { cn } from "@/lib/utils";

type Props = {
  text: string;
  className?: string;
  wordClassName?: string;
  delay?: number;
  stagger?: number;
  as?: "h1" | "h2" | "h3" | "p" | "span";
};

export function AnimatedText({
  text,
  className,
  wordClassName,
  delay = 0,
  stagger: staggerChildren = 0.07,
  as = "h2",
}: Props) {
  const words = text.split(" ");
  const Tag = motion[as] as typeof motion.h2;

  return (
    <Tag
      className={cn("inline-block", className)}
      initial="hidden"
      whileInView="visible"
      viewport={VIEWPORT_DEFAULT}
      variants={stagger(delay, staggerChildren)}
      aria-label={text}
    >
      {words.map((word, i) => (
        <span
          key={`${word}-${i}`}
          className="inline-block overflow-hidden align-bottom mr-[0.25em] last:mr-0"
          aria-hidden
        >
          <motion.span
            className={cn("inline-block will-change-transform", wordClassName)}
            variants={heroTextReveal}
          >
            {word}
            {i < words.length - 1 ? " " : ""}
          </motion.span>
        </span>
      ))}
    </Tag>
  );
}
