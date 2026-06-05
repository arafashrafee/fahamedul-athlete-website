"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { useInView } from "@/hooks/useInView";
import { formatNumber } from "@/lib/utils";
import { counterReveal } from "@/lib/animations";

type Props = {
  to: number;
  /** Duration of the number tween (ms). The container fade uses the
   *  motion-system `counterReveal` timing — independent of this. */
  duration?: number;
  suffix?: string;
  className?: string;
};

export function AnimatedCounter({ to, duration = 1800, suffix, className }: Props) {
  const { ref, inView } = useInView<HTMLSpanElement>({ threshold: 0.5 });
  const [value, setValue] = useState(0);
  const startRef = useRef<number | null>(null);

  useEffect(() => {
    if (!inView) return;
    let frame = 0;

    const step = (ts: number) => {
      if (startRef.current === null) startRef.current = ts;
      const elapsed = ts - startRef.current;
      const progress = Math.min(elapsed / duration, 1);
      // Matches EASE_HERO (easeOutExpo) so numbers decelerate, never tick linearly.
      const eased = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      setValue(Math.round(eased * to));
      if (progress < 1) frame = requestAnimationFrame(step);
    };

    frame = requestAnimationFrame(step);
    return () => cancelAnimationFrame(frame);
  }, [inView, to, duration]);

  return (
    <motion.span
      ref={ref}
      variants={counterReveal}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      className={className}
    >
      {formatNumber(value)}
      {suffix}
    </motion.span>
  );
}
