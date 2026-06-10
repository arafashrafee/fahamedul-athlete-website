"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const FIRST_NAME = "FAHAMEDUL";

const SLOT_ITEMS = [
  { key: "islam", text: "ISLAM", className: "text-text" },
  { key: "nineteen", text: "19", className: "text-primary" },
  { key: "dot", text: ".", className: "text-primary" },
] as const;

const SLIDE_DURATION = 0.7;
const HOLD_MS = 1200;
const SLIDE_EASE = [0.16, 1, 0.3, 1] as const;

const FONT_SIZE = "clamp(2.25rem, 7.5vw, 6.5rem)";

export function SplashScreen({ onComplete }: { onComplete: () => void }) {
  const [slotIndex, setSlotIndex] = useState(0);
  const [phase, setPhase] = useState<"cycle" | "glow" | "exit">("cycle");

  // Advance the slot: ISLAM -> 19 -> ".", then hand off to the glow phase.
  // mode="wait" below means each swap costs an exit + an enter, so the
  // timer covers both slides plus the hold.
  useEffect(() => {
    if (phase !== "cycle") return;
    const timer = setTimeout(() => {
      if (slotIndex < SLOT_ITEMS.length - 1) {
        setSlotIndex((i) => i + 1);
      } else {
        setPhase("glow");
      }
    }, SLIDE_DURATION * 2 * 1000 + HOLD_MS);
    return () => clearTimeout(timer);
  }, [slotIndex, phase]);

  useEffect(() => {
    if (phase === "glow") {
      const exitTimer = setTimeout(() => setPhase("exit"), 1100);
      return () => clearTimeout(exitTimer);
    }
  }, [phase]);

  const slotItem = SLOT_ITEMS[slotIndex];
  const isDot = slotItem.key === "dot";

  return (
    <AnimatePresence onExitComplete={onComplete}>
      {phase !== "exit" && (
        <motion.div
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-midnight overflow-hidden"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
        >
          {/* Ambient particles */}
          <div className="absolute inset-0 pointer-events-none">
            {Array.from({ length: 20 }).map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 rounded-full bg-primary/30"
                style={{
                  left: `${(i * 37) % 100}%`,
                  top: `${(i * 53) % 100}%`,
                }}
                animate={{
                  opacity: [0, 0.6, 0],
                  scale: [0, 1.5, 0],
                }}
                transition={{
                  duration: 2 + (i % 3),
                  delay: (i * 0.15) % 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            ))}
          </div>

          {/* Radial glow behind text */}
          <motion.div
            className="absolute w-[600px] h-[600px] rounded-full"
            style={{
              background:
                "radial-gradient(circle, rgba(233,58,59,0.08) 0%, transparent 70%)",
            }}
            animate={{
              scale: phase === "glow" ? [1, 1.3, 1.1] : 1,
              opacity: phase === "glow" ? [0.5, 1, 0.8] : 0.3,
            }}
            transition={{ duration: 1.2, ease: "easeInOut" }}
          />

          {/* Name row: [cycling slot] FAHAMEDUL */}
          <div className="relative select-none">
            <div
              className="flex items-end font-display leading-none tracking-[0.04em]"
              style={{ fontSize: FONT_SIZE }}
            >
              {/* FAHAMEDUL — static, single fade-in */}
              <motion.div
                className="text-text"
                initial={{ opacity: 0, y: 24, filter: "blur(8px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                transition={{ duration: 0.9, ease: SLIDE_EASE }}
              >
                {FIRST_NAME}
              </motion.div>

              {/* Cycling slot: ISLAM -> 19 -> "." — fixed width so FAHAMEDUL never shifts */}
              <div
                className="relative overflow-hidden flex justify-start"
                style={{ width: "3.4em", height: "1.15em" }}
              >
                <AnimatePresence mode="wait">
                  <motion.span
                    key={slotItem.key}
                    className={`relative block self-end leading-none ${slotItem.className}`}
                    style={
                      isDot
                        ? { top: "0.06em", marginLeft: "0.04em" }
                        : { marginLeft: "0.18em" }
                    }
                    initial={{ y: "120%" }}
                    animate={{ y: "0%" }}
                    exit={{ y: "-120%" }}
                    transition={{
                      duration: SLIDE_DURATION,
                      ease: SLIDE_EASE,
                      delay: slotIndex === 0 ? 0.5 : 0,
                    }}
                  >
                    {slotItem.text}
                  </motion.span>
                </AnimatePresence>
              </div>
            </div>

            {/* Glow pulse on name after assembly */}
            <motion.div
              className="absolute inset-0 pointer-events-none"
              style={{
                textShadow:
                  "0 0 40px rgba(233,58,59,0.6), 0 0 80px rgba(233,58,59,0.3)",
              }}
              animate={
                phase === "glow" ? { opacity: [0, 1, 0.6] } : { opacity: 0 }
              }
              transition={{ duration: 1, ease: "easeInOut" }}
            />
          </div>

          {/* Bottom sweep line */}
          <motion.div
            className="absolute bottom-0 left-0 h-[2px] bg-gradient-to-r from-transparent via-primary to-transparent"
            initial={{ scaleX: 0 }}
            animate={phase === "glow" ? { scaleX: 1 } : {}}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            style={{ transformOrigin: "center" }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
