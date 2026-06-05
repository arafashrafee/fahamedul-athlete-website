"use client";

import { useRef, useState } from "react";
import { motion, type HTMLMotionProps } from "framer-motion";
import { forwardRef } from "react";
import {
  HOVER_VARIANTS,
  magneticTransition,
  magneticReleaseTransition,
} from "@/lib/animations";
import { cn } from "@/lib/utils";

type Props = Omit<HTMLMotionProps<"div">, "ref"> & {
  /** Add cursor-following magnetic pull (default off). */
  magnetic?: boolean;
  /** Magnetic pull amount, 0–1. Default 0.22. */
  strength?: number;
  /** Render as a child (e.g. <Link>) instead of a button — useful for ButtonLink. */
  asChild?: boolean;
  children: React.ReactNode;
};

/**
 * ButtonHover
 * -----------
 * Unified button hover physics:
 *   - lift (y: -3) + scale (1.04) + gold-tinted shadow
 *   - weighted 260ms enter, spring return
 *   - optional magnetic cursor follow (inner layer)
 *
 * Two motion layers so the magnetic translate and the hover lift can
 * coexist without fighting for the transform.
 */
export const ButtonHover = forwardRef<HTMLDivElement, Props>(function ButtonHover(
  { magnetic = false, strength = 0.22, className, children, ...rest },
  ref,
) {
  const innerRef = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [released, setReleased] = useState(true);

  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!magnetic) return;
    const el = innerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    setReleased(false);
    setPos({
      x: (e.clientX - (rect.left + rect.width / 2)) * strength,
      y: (e.clientY - (rect.top + rect.height / 2)) * strength,
    });
  };

  const reset = () => {
    setReleased(true);
    setPos({ x: 0, y: 0 });
  };

  return (
    <motion.div
      ref={ref}
      initial="rest"
      animate="rest"
      whileHover="hover"
      whileFocus="hover"
      variants={HOVER_VARIANTS.button}
      onMouseMove={handleMove}
      onMouseLeave={reset}
      className={cn(
        "inline-flex items-center justify-center will-change-transform rounded-full",
        className,
      )}
      {...rest}
    >
      <motion.div
        ref={innerRef}
        animate={magnetic ? pos : { x: 0, y: 0 }}
        transition={
          magnetic
            ? released
              ? magneticReleaseTransition
              : magneticTransition
            : { duration: 0 }
        }
        className="inline-flex items-center justify-center w-full h-full"
      >
        {children}
      </motion.div>
    </motion.div>
  );
});
