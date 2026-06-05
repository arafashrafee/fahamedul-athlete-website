"use client";

import { motion, type HTMLMotionProps } from "framer-motion";
import { forwardRef } from "react";
import { HOVER_VARIANTS, type HoverIntensity } from "@/lib/animations";
import { cn } from "@/lib/utils";

type Props = HTMLMotionProps<"div"> & {
  intensity?: HoverIntensity;
  children: React.ReactNode;
};

/**
 * CardHover
 * ---------
 * Drop-in wrapper that gives any content the site's unified hover
 * physics. Use it on tiles, cards, image containers — anything
 * non-button that needs to feel interactive on hover.
 *
 * <CardHover intensity="card">…</CardHover>
 */
export const CardHover = forwardRef<HTMLDivElement, Props>(function CardHover(
  { intensity = "card", className, children, ...rest },
  ref,
) {
  return (
    <motion.div
      ref={ref}
      initial="rest"
      animate="rest"
      whileHover="hover"
      whileFocus="hover"
      variants={HOVER_VARIANTS[intensity]}
      className={cn("will-change-transform", className)}
      {...rest}
    >
      {children}
    </motion.div>
  );
});
