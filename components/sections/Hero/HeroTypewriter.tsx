"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

/** Never retyped — only the trailing word cycles. */
const PREFIX = "FAHAMEDUL ";

/** `space` false closes the gap so the dot reads as the logo: FAHAMEDUL. */
const SUFFIXES = [
  { text: "ISLAM", className: "text-text", space: true },
  { text: "19", className: "text-primary", space: true },
  { text: ".", className: "text-primary", space: false },
] as const;

const TYPE_MS = 95;
const DELETE_MS = 55;
/** Dwell on the finished word before it starts erasing. */
const HOLD_MS = 1600;
/** Beat of empty space between one word erased and the next typed. */
const GAP_MS = 320;

type Phase = "typing" | "holding" | "deleting";

/**
 * Hero heading. Types "FAHAMEDUL ISLAM", erases ISLAM letter by letter,
 * types 19, erases it, types "." — then loops.
 *
 * The prefix is plain text; only the suffix is driven by the state machine,
 * so FAHAMEDUL never flickers. Screen readers get the full name once from
 * the sr-only span and skip the animating copy entirely.
 *
 * Runs regardless of prefers-reduced-motion, matching the rest of the site's
 * Framer animations — gating only this one left it frozen on machines with
 * the OS setting enabled.
 */
export function HeroTypewriter() {
  const [index, setIndex] = useState(0);
  const [typed, setTyped] = useState("");
  const [phase, setPhase] = useState<Phase>("typing");

  const suffix = SUFFIXES[index];

  useEffect(() => {
    if (phase === "typing") {
      if (typed.length < suffix.text.length) {
        const t = setTimeout(
          () => setTyped(suffix.text.slice(0, typed.length + 1)),
          TYPE_MS,
        );
        return () => clearTimeout(t);
      }
      const t = setTimeout(() => setPhase("holding"), 0);
      return () => clearTimeout(t);
    }

    if (phase === "holding") {
      const t = setTimeout(() => setPhase("deleting"), HOLD_MS);
      return () => clearTimeout(t);
    }

    if (typed.length > 0) {
      const t = setTimeout(
        () => setTyped(suffix.text.slice(0, typed.length - 1)),
        DELETE_MS,
      );
      return () => clearTimeout(t);
    }

    const t = setTimeout(() => {
      setIndex((i) => (i + 1) % SUFFIXES.length);
      setPhase("typing");
    }, GAP_MS);
    return () => clearTimeout(t);
  }, [phase, typed, suffix.text]);

  return (
    <h1 className="display-lg text-text leading-[0.95]">
      <span className="sr-only">Fahamedul Islam</span>

      <span aria-hidden className="inline-flex items-baseline">
        {PREFIX.trimEnd()}
        {/* Non-breaking space so the caret never wraps onto its own line.
            Dropped for the dot, which sits flush against the name. */}
        {suffix.space && <span>&nbsp;</span>}
        <span className={suffix.className}>{typed}</span>
        <motion.span
          className="inline-block w-[0.06em] self-stretch bg-primary ml-[0.06em]"
          animate={{ opacity: [1, 1, 0, 0] }}
          transition={{
            duration: 1,
            times: [0, 0.5, 0.5, 1],
            repeat: Infinity,
            ease: "linear",
          }}
        />
      </span>
    </h1>
  );
}
