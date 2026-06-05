"use client";

import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { magneticTransition, magneticReleaseTransition } from "@/lib/animations";

type Props = React.ComponentPropsWithoutRef<"button"> & {
  children: React.ReactNode;
  strength?: number;
};

export function MagneticButton({ children, className, strength = 0.22, ...rest }: Props) {
  const ref = useRef<HTMLButtonElement>(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [released, setReleased] = useState(true);

  const handleMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - (rect.left + rect.width / 2)) * strength;
    const y = (e.clientY - (rect.top + rect.height / 2)) * strength;
    setReleased(false);
    setPos({ x, y });
  };

  const reset = () => {
    setReleased(true);
    setPos({ x: 0, y: 0 });
  };

  return (
    <motion.button
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={reset}
      animate={pos}
      transition={released ? magneticReleaseTransition : magneticTransition}
      className={cn("relative inline-flex items-center justify-center", className)}
      {...(rest as React.ComponentPropsWithoutRef<typeof motion.button>)}
    >
      {children}
    </motion.button>
  );
}
