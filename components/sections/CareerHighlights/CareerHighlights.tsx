"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { RevealOnScroll } from "@/components/ui/RevealOnScroll";
import { EASE_HERO, DUR } from "@/lib/animations";

interface TeamHighlight {
  id: string;
  team: string;
  period: string;
  apps: string;
  goals: string;
  badge: string;
  badgeColor: string;
  videoUrl: string;
  poster: string;
}

const TEAMS: TeamHighlight[] = [
  {
    id: "bangladesh",
    team: "Bangladesh National Team",
    period: "2019 — Present",
    apps: "25+",
    goals: "4",
    badge: "BFF",
    badgeColor: "var(--color-bd-green)",
    videoUrl: "/videos/career-1.mov",
    poster: "/images/gallery/g2.jpg",
  },
  {
    id: "mohammedan",
    team: "Mohammedan SC",
    period: "2024 — Present",
    apps: "22",
    goals: "14",
    badge: "MSC",
    badgeColor: "var(--color-primary)",
    videoUrl: "/videos/career-1.mov",
    poster: "/images/gallery/g1.jpg",
  },
  {
    id: "bashundhara",
    team: "Bashundhara Kings",
    period: "2022 — 2024",
    apps: "41",
    goals: "16",
    badge: "BK",
    badgeColor: "#f59e0b",
    videoUrl: "/videos/career-1.mov",
    poster: "/images/gallery/g3.jpg",
  },
];

function TeamBadge({ label, color }: { label: string; color: string }) {
  return (
    <div className="relative w-48 h-48 md:w-64 md:h-64">
      {/* Outer hexagon border */}
      <svg viewBox="0 0 200 200" className="absolute inset-0 w-full h-full">
        <polygon
          points="100,10 180,50 180,150 100,190 20,150 20,50"
          fill="none"
          stroke={color}
          strokeWidth="1.5"
          opacity="0.4"
        />
        <polygon
          points="100,25 168,58 168,142 100,175 32,142 32,58"
          fill="none"
          stroke={color}
          strokeWidth="0.8"
          opacity="0.2"
        />
      </svg>
      {/* Center glow */}
      <div
        className="absolute inset-0 flex items-center justify-center"
      >
        <motion.div
          animate={{ scale: [1, 1.15, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          className="w-20 h-20 md:w-28 md:h-28 rounded-full"
          style={{
            background: `radial-gradient(circle, ${color}33 0%, transparent 70%)`,
          }}
        />
      </div>
      {/* Badge text */}
      <div className="absolute inset-0 flex items-center justify-center">
        <span
          className="font-display text-2xl md:text-3xl tracking-[0.15em]"
          style={{ color }}
        >
          {label}
        </span>
      </div>
      {/* Corner dots */}
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          className="absolute w-1.5 h-1.5 rounded-full"
          style={{
            backgroundColor: color,
            left: `${40 + i * 15}%`,
            top: "12%",
            opacity: 0.6,
          }}
          animate={{ opacity: [0.3, 0.8, 0.3] }}
          transition={{
            duration: 2,
            delay: i * 0.3,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}

export function CareerHighlights() {
  const [active, setActive] = useState(0);
  const current = TEAMS[active];

  return (
    <section
      id="career-highlights"
      className="relative bg-midnight overflow-hidden"
    >
      <div className="relative grid grid-cols-1 lg:grid-cols-2 min-h-[90vh]">
        {/* Left panel — badge + info */}
        <div className="relative flex flex-col justify-between p-8 md:p-12 lg:p-16 z-10">
          <RevealOnScroll>
            <span className="eyebrow text-primary">Career Highlights</span>
          </RevealOnScroll>

          <div className="flex-1 flex items-center justify-center py-12">
            <AnimatePresence mode="wait">
              <motion.div
                key={current.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.5, ease: EASE_HERO }}
              >
                <TeamBadge label={current.badge} color={current.badgeColor} />
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="space-y-5">
            <AnimatePresence mode="wait">
              <motion.div
                key={current.id}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.4, ease: EASE_HERO }}
              >
                <h3 className="font-display text-2xl md:text-4xl tracking-tight text-text">
                  {current.team}
                </h3>
                <div className="mt-2 flex items-center gap-4 label-sm text-faint">
                  <span>{current.period}</span>
                  <span className="w-px h-3 bg-border-strong" />
                  <span>{current.apps} Apps</span>
                  <span className="w-px h-3 bg-border-strong" />
                  <span>{current.goals} Goals</span>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Team selector tabs */}
            <div className="flex items-center gap-6 pt-2">
              {TEAMS.map((team, i) => (
                <button
                  key={team.id}
                  onClick={() => setActive(i)}
                  className="group flex items-center gap-2 transition-colors"
                >
                  <span
                    className="w-2 h-2 rounded-full transition-colors"
                    style={{
                      backgroundColor:
                        i === active ? team.badgeColor : "var(--color-faint)",
                    }}
                  />
                  <span
                    className="label-sm transition-colors"
                    style={{
                      color:
                        i === active
                          ? "var(--color-text)"
                          : "var(--color-faint)",
                    }}
                  >
                    {team.badge}
                  </span>
                </button>
              ))}
            </div>

            {/* Active tab underline */}
            <div className="relative h-px bg-border">
              <motion.div
                className="absolute top-0 h-px"
                style={{ backgroundColor: current.badgeColor }}
                animate={{
                  left: `${(active / TEAMS.length) * 100}%`,
                  width: `${100 / TEAMS.length}%`,
                }}
                transition={{ duration: 0.4, ease: EASE_HERO }}
              />
            </div>
          </div>
        </div>

        {/* Right panel — looping video */}
        <div className="relative min-h-[50vh] lg:min-h-0">
          <AnimatePresence mode="wait">
            <motion.div
              key={current.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6 }}
              className="absolute inset-0"
            >
              <video
                key={current.videoUrl}
                className="absolute inset-0 w-full h-full object-cover"
                src={current.videoUrl}
                poster={current.poster}
                autoPlay
                loop
                muted
                playsInline
              />
              {/* Gradient overlays */}
              <div className="absolute inset-0 bg-gradient-to-r from-midnight via-midnight/40 to-transparent lg:via-midnight/20" />
              <div className="absolute inset-0 bg-gradient-to-t from-midnight/60 via-transparent to-midnight/30" />
            </motion.div>
          </AnimatePresence>

          {/* Now playing indicator */}
          <div className="absolute bottom-6 right-6 flex items-center gap-2 z-10">
            <motion.span
              className="w-2 h-2 rounded-full bg-primary"
              animate={{ opacity: [1, 0.4, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
            <span className="label-sm text-faint">Now Playing</span>
          </div>
        </div>
      </div>
    </section>
  );
}
