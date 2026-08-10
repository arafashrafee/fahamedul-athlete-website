"use client";

import { useState, useEffect, useLayoutEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

const FIRST_NAME = "FAHAMEDUL";

/* `gap` is the space between FAHAMEDUL and the slot. It lives here rather
   than inline so the hidden measuring pass can mirror the rendered pair
   exactly — the measurement is what keeps each state centred. */
const SLOT_ITEMS = [
  { key: "islam", text: "ISLAM", className: "text-text", gap: "0.18em" },
  { key: "nineteen", text: "19", className: "text-primary", gap: "0.18em" },
  { key: "dot", text: ".", className: "text-primary", gap: "0.04em" },
] as const;

/* Every slot gets an identical STATE_MS beat, measured change-to-change:
   FAHAMEDUL ISLAM, FAHAMEDUL 19 and FAHAMEDUL. each own 2.5s. Inside that
   beat the outgoing word slides out and the incoming one slides in
   (2 x SLIDE_DURATION), leaving 1.5s of stillness before the next swap.

     3 x STATE_MS 2500 = 7500ms + GLOW_MS 400 + EXIT_DURATION 500 = 8.4s */
const SLIDE_DURATION = 0.5;
const STATE_MS = 2500;
const GLOW_MS = 400;
const EXIT_DURATION = 0.5;
const SLIDE_EASE = [0.16, 1, 0.3, 1] as const;

const FONT_SIZE = "clamp(2.25rem, 7.5vw, 6.5rem)";

export function SplashScreen({ onComplete }: { onComplete: () => void }) {
  const [slotIndex, setSlotIndex] = useState(0);
  const [phase, setPhase] = useState<"cycle" | "glow" | "exit">("cycle");

  // Advance the slot: ISLAM -> 19 -> ".", then hand off to the glow phase.
  // One flat STATE_MS per slot keeps the three beats evenly spaced.
  useEffect(() => {
    if (phase !== "cycle") return;
    const timer = setTimeout(() => {
      if (slotIndex < SLOT_ITEMS.length - 1) {
        setSlotIndex((i) => i + 1);
      } else {
        setPhase("glow");
      }
    }, STATE_MS);
    return () => clearTimeout(timer);
  }, [slotIndex, phase]);

  useEffect(() => {
    if (phase === "glow") {
      const exitTimer = setTimeout(() => setPhase("exit"), GLOW_MS);
      return () => clearTimeout(exitTimer);
    }
  }, [phase]);

  const slotItem = SLOT_ITEMS[slotIndex];

  /* Each slot word is a different width, so a fixed-width slot leaves slack
     on the right and the pair drifts off-centre. Measure every variant, size
     the slot to the widest, then slide the row by half the leftover so the
     visible text — not the box — is what sits centred. */
  const measureRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const [widths, setWidths] = useState<number[] | null>(null);

  useLayoutEffect(() => {
    /* Rects exclude margin, and the gap before the slot is a margin — so it
       has to be added back or the widest variant gets clipped. */
    const measure = () =>
      setWidths(
        measureRefs.current.map((el) =>
          el
            ? el.getBoundingClientRect().width +
              parseFloat(getComputedStyle(el).marginLeft || "0")
            : 0,
        ),
      );

    measure();
    /* Bebas Neue swaps in after first paint, and the size is vw-based. */
    let cancelled = false;
    void document.fonts?.ready.then(() => {
      if (!cancelled) measure();
    });
    window.addEventListener("resize", measure);
    return () => {
      cancelled = true;
      window.removeEventListener("resize", measure);
    };
  }, []);

  const maxWidth = widths?.length ? Math.max(...widths) : 0;
  const slotWidth = maxWidth ? `${maxWidth}px` : "3.4em";
  const recentre = widths?.length ? (maxWidth - widths[slotIndex]) / 2 : 0;

  return (
    <AnimatePresence onExitComplete={onComplete}>
      {phase !== "exit" && (
        <motion.div
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-midnight overflow-hidden"
          exit={{ opacity: 0 }}
          transition={{ duration: EXIT_DURATION, ease: [0.4, 0, 0.2, 1] }}
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
            transition={{ duration: GLOW_MS / 1000, ease: "easeInOut" }}
          />

          {/* Name row: FAHAMEDUL [cycling slot] */}
          <div className="relative select-none">
            {/* Hidden twin of the slot, one span per variant — the only job
                is to report each rendered width. */}
            <div
              aria-hidden
              className="absolute top-0 left-0 flex font-display leading-none tracking-[0.04em] invisible pointer-events-none whitespace-nowrap"
              style={{ fontSize: FONT_SIZE }}
            >
              {SLOT_ITEMS.map((item, i) => (
                <span
                  key={item.key}
                  ref={(el) => {
                    measureRefs.current[i] = el;
                  }}
                  className="block"
                  style={{ marginLeft: item.gap }}
                >
                  {item.text}
                </span>
              ))}
            </div>

            <motion.div
              className="flex items-end font-display leading-none tracking-[0.04em]"
              style={{ fontSize: FONT_SIZE }}
              animate={{ x: recentre }}
              /* mode="wait" below means the outgoing word slides away first.
                 Holding the re-centre back by one slide keeps that word
                 centred on its way out, then moves the pair in step with the
                 incoming one. */
              transition={{
                duration: SLIDE_DURATION,
                ease: SLIDE_EASE,
                delay: SLIDE_DURATION,
              }}
            >
              {/* FAHAMEDUL — static, single fade-in */}
              <motion.div
                className="text-text"
                initial={{ opacity: 0, y: 24, filter: "blur(8px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                transition={{ duration: 0.6, ease: SLIDE_EASE }}
              >
                {FIRST_NAME}
              </motion.div>

              {/* Cycling slot: ISLAM -> 19 -> "." — sized to the widest variant
                  so FAHAMEDUL never shifts mid-slide; the row above cancels
                  the leftover slack. */}
              <div
                className="relative overflow-hidden flex justify-start"
                style={{ width: slotWidth, height: "1.15em" }}
              >
                <AnimatePresence mode="wait">
                  <motion.span
                    key={slotItem.key}
                    className={`relative block self-end leading-none ${slotItem.className}`}
                    /* No vertical nudge: the slot span shares FAHAMEDUL's
                       font, size, and line-height, so aligning their box
                       bottoms aligns their baselines exactly. Any offset
                       here pushes the glyph past the slot's overflow-hidden
                       edge and clips it. */
                    style={{ marginLeft: slotItem.gap }}
                    initial={{ y: "120%" }}
                    animate={{ y: "0%" }}
                    exit={{ y: "-120%" }}
                    transition={{
                      duration: SLIDE_DURATION,
                      ease: SLIDE_EASE,
                      /* First word waits for FAHAMEDUL to land; the rest
                         follow the outgoing word immediately. */
                      delay: slotIndex === 0 ? 0.25 : 0,
                    }}
                  >
                    {slotItem.text}
                  </motion.span>
                </AnimatePresence>
              </div>
            </motion.div>

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
              transition={{ duration: GLOW_MS / 1000, ease: "easeInOut" }}
            />
          </div>

          {/* Bottom sweep line */}
          <motion.div
            className="absolute bottom-0 left-0 h-[2px] bg-gradient-to-r from-transparent via-primary to-transparent"
            initial={{ scaleX: 0 }}
            animate={phase === "glow" ? { scaleX: 1 } : {}}
            transition={{ duration: GLOW_MS / 1000, ease: [0.16, 1, 0.3, 1] }}
            style={{ transformOrigin: "center" }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
