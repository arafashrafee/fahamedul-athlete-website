"use client";

import Image from "next/image";
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
      className="relative pl-10 md:pl-0 md:grid md:grid-cols-2 md:gap-12 mb-10 md:mb-16"
    >
      {/* Timeline dot */}
      <span
        aria-hidden
        className="absolute left-0 md:left-1/2 top-2 -translate-x-1/2 w-3.5 h-3.5 rounded-full bg-primary glow-sm"
      />

      <div
        className={cn(
          "md:col-start-1",
          side === "right" && "md:col-start-2",
        )}
      >
        <article
          className={cn(
            "group border border-white/[0.08] bg-card/40 overflow-hidden transition-colors duration-500 hover:border-primary/30 md:max-w-[26rem]",
            side === "left" && "md:ml-auto",
          )}
        >
          {/* Photo with year watermark */}
          {entry.image && (
            <div className="relative aspect-[16/10] overflow-hidden">
              <Image
                src={entry.image}
                alt={entry.club}
                fill
                className="object-cover grayscale-[40%] brightness-[0.85] transition-all duration-700 group-hover:grayscale-0 group-hover:brightness-100 group-hover:scale-[1.03]"
                sizes="(max-width: 768px) 90vw, 560px"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-card/90 via-transparent to-transparent" />
              <span
                aria-hidden
                className="absolute bottom-1 right-4 font-display leading-none text-white/15 select-none"
                style={{ fontSize: "clamp(2.75rem, 5vw, 4rem)" }}
              >
                {entry.yearStart}
              </span>
            </div>
          )}

          {/* Text block */}
          <div className="p-5 md:p-6 flex flex-col gap-2.5">
            <span className="label-sm text-primary tracking-[0.3em]">
              {entry.yearStart} — {entry.yearEnd}
            </span>

            <h3
              className="display-md text-text leading-[0.95]"
              style={{ fontSize: "clamp(1.5rem, 2.2vw, 2rem)" }}
            >
              {entry.club}
            </h3>

            <div className="body-xs">
              {entry.league ? `${entry.league} · ` : ""}
              {entry.country}
            </div>

            <div className="mt-2 flex gap-8 text-text">
              <div>
                <div className="stat-md">{entry.appearances}</div>
                <div className="label-sm text-faint mt-1">Apps</div>
              </div>
              <div>
                <div className="stat-md text-primary glow-text-sm">
                  {entry.goals}
                </div>
                <div className="label-sm text-faint mt-1">Goals</div>
              </div>
            </div>

            {entry.notes && (
              <p className="mt-2 text-sm text-muted leading-relaxed">
                {entry.notes}
              </p>
            )}
          </div>
        </article>
      </div>
    </motion.li>
  );
}
