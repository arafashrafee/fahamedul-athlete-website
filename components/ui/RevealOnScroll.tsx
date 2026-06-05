"use client";

import { motion, type Variants } from "framer-motion";
import { sectionReveal, VIEWPORT_DEFAULT } from "@/lib/animations";
import { cn } from "@/lib/utils";

type Props = {
  children: React.ReactNode;
  className?: string;
  variants?: Variants;
  delay?: number;
  amount?: number;
  as?: React.ElementType;
};

export function RevealOnScroll({
  children,
  className,
  variants = sectionReveal,
  delay = 0,
  amount,
  as = "div",
}: Props) {
  const Tag = motion[as as keyof typeof motion] as typeof motion.div;
  const viewport = amount !== undefined ? { once: true, amount } : VIEWPORT_DEFAULT;
  return (
    <Tag
      className={cn(className)}
      initial="hidden"
      whileInView="visible"
      viewport={viewport}
      variants={variants}
      transition={{ delay }}
    >
      {children}
    </Tag>
  );
}
