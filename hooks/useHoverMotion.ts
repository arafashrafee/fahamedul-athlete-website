"use client";

import { HOVER_VARIANTS, type HoverIntensity } from "@/lib/animations";

/**
 * useHoverMotion
 * --------------
 * Returns the props that any `motion.*` element needs to opt in to the
 * site's unified hover physics: lift + scale + brand-tinted shadow on
 * enter (weighted 260ms tween), controlled spring on return.
 *
 * Usage:
 *   const hover = useHoverMotion("card");
 *   return <motion.div {...hover}>…</motion.div>;
 */
export function useHoverMotion(intensity: HoverIntensity = "card") {
  return {
    initial: "rest" as const,
    animate: "rest" as const,
    whileHover: "hover" as const,
    variants: HOVER_VARIANTS[intensity],
    className: "will-change-transform",
  };
}
