"use client";

import { motion, type HTMLMotionProps } from "framer-motion";
import { forwardRef } from "react";
import { HOVER_VARIANTS, imageHoverZoom, type HoverIntensity } from "@/lib/animations";
import { cn } from "@/lib/utils";

type Props = HTMLMotionProps<"div"> & {
  intensity?: HoverIntensity;
  children: React.ReactNode;
};

/**
 * ImageHover
 * ----------
 * Two-layer hover wrapper for gallery / highlight / featured images:
 *   - outer  → card lift physics (y, scale, rotate, shadow)
 *   - inner  → slow image zoom (scale 1.06 over 1.2s)
 *
 * Drop your <Image fill /> + overlays inside. The inner div is
 * `absolute inset-0` so any positioned overlays work as expected.
 *
 *   <ImageHover className="aspect-[3/4] border border-border">
 *     <Image src=... fill alt=... />
 *     <div className="absolute inset-0 …" />  // overlay (does NOT zoom)
 *   </ImageHover>
 *
 * Pass children that should NOT zoom (overlays, captions) as
 * `staticOverlay` — they sit outside the zooming layer.
 */
type ImageHoverProps = Props & {
  staticOverlay?: React.ReactNode;
};

export const ImageHover = forwardRef<HTMLDivElement, ImageHoverProps>(
  function ImageHover(
    { intensity = "card", className, children, staticOverlay, ...rest },
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
        className={cn(
          "relative overflow-hidden will-change-transform",
          className,
        )}
        {...rest}
      >
        <motion.div variants={imageHoverZoom} className="absolute inset-0">
          {children}
        </motion.div>
        {staticOverlay}
      </motion.div>
    );
  },
);
