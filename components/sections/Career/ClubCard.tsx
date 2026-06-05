"use client";

import { motion } from "framer-motion";
import type { CareerEntry } from "@/types";
import { cn } from "@/lib/utils";
import { EASE_SECTION, DUR, VIEWPORT_DEFAULT } from "@/lib/animations";

type Props = {
  entry: CareerEntry;
  index: number;
  side: "left" | "right";
};

export function ClubCard({ entry, index, side }: Props) {
  return (
    <motion.li
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={VIEWPORT_DEFAULT}
      transition={{ duration: DUR.reveal, delay: index * 0.08, ease: EASE_SECTION }}
      className={cn(
        "relative pl-10 md:pl-0 md:grid md:grid-cols-2 md:gap-12 mb-14 md:mb-20",
      )}
    >
      <span
        aria-hidden
        className="absolute left-0 md:left-1/2 top-2 -translate-x-1/2 md:-translate-x-1/2 flex items-center justify-center w-4 h-4 rounded-full border border-primary bg-midnight"
      >
        <span className="w-1.5 h-1.5 rounded-full bg-primary" />
      </span>

      <div
        className={cn(
          "md:col-start-1",
          side === "right" && "md:col-start-2 md:pl-6",
          side === "left" && "md:text-right md:pr-6",
        )}
      >
        <div className="label-sm text-primary mb-3">
          {entry.yearStart} — {entry.yearEnd}
        </div>
        <h3 className="display-md text-text leading-[0.95]" style={{ fontSize: "clamp(1.875rem, 4vw, 3rem)" }}>
          {entry.club}
        </h3>
        <div className="mt-2 body-sm">
          {entry.league ? `${entry.league} · ` : ""}
          {entry.country}
        </div>

        <div
          className={cn(
            "mt-5 flex gap-8 text-text",
            side === "left" && "md:justify-end",
          )}
        >
          <div>
            <div className="stat-md">
              {entry.appearances}
            </div>
            <div className="label-sm text-faint mt-1">
              Apps
            </div>
          </div>
          <div>
            <div className="stat-md text-primary">
              {entry.goals}
            </div>
            <div className="label-sm text-faint mt-1">
              Goals
            </div>
          </div>
        </div>

        {entry.notes && (
          <p
            className={cn(
              "mt-5 text-sm text-muted max-w-sm",
              side === "left" && "md:ml-auto",
            )}
          >
            {entry.notes}
          </p>
        )}
      </div>
    </motion.li>
  );
}
