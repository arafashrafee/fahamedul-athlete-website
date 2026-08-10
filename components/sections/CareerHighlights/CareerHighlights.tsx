"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { RevealOnScroll } from "@/components/ui/RevealOnScroll";

interface TeamHighlight {
  id: string;
  team: string;
  badge: string;
  period: string;
  apps: string;
  goals: string;
  videoUrl: string;
  poster: string;
}

/* Dwell used only when a clip never reports a duration (still loading,
   blocked, or missing) — otherwise the reel would stall on that panel. */
const FALLBACK_DWELL_MS = 6000;

const TEAMS: TeamHighlight[] = [
  {
    id: "bangladesh",
    team: "Bangladesh National Team",
    badge: "BFF",
    period: "2019 — Present",
    apps: "25+",
    goals: "4",
    videoUrl: "/videos/career-1.mov",
    poster: "/images/gallery/g2.jpg",
  },
  {
    id: "mohammedan",
    team: "Mohammedan SC",
    badge: "MSC",
    period: "2024 — Present",
    apps: "22",
    goals: "14",
    videoUrl: "/videos/career-1.mov",
    poster: "/images/gallery/g1.jpg",
  },
  {
    id: "bashundhara",
    team: "Bashundhara Kings",
    badge: "BK",
    period: "2022 — 2024",
    apps: "41",
    goals: "16",
    videoUrl: "/videos/career-1.mov",
    poster: "/images/gallery/g3.jpg",
  },
];

/**
 * Full-bleed, drag-scrubbed video carousel.
 *
 * One slide per view; the panel's distance from centre drives video opacity,
 * title lift, and meta fade, so the next chapter bleeds in while you drag.
 * Only the panel in view plays — the rest stay paused on their poster.
 */
export function CareerHighlights() {
  const trackRef = useRef<HTMLDivElement>(null);
  /* Feature window (sharp) and the dimmed full-bleed layer behind it. */
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const ambientRefs = useRef<(HTMLVideoElement | null)[]>([]);
  /* Fractional slide position: 1.4 = 40% of the way from slide 1 to 2. */
  const [pos, setPos] = useState(0);
  const active = Math.round(pos);

  /* Track scroll position in slide units. */
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    let frame = 0;
    const measure = () => {
      frame = 0;
      const slide = track.clientWidth || 1;
      setPos(track.scrollLeft / slide);
    };
    const onScroll = () => {
      if (frame) return;
      frame = requestAnimationFrame(measure);
    };

    measure();
    track.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", measure);
    return () => {
      cancelAnimationFrame(frame);
      track.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", measure);
    };
  }, []);

  /* Nothing plays while the section is off-screen. */
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold: 0.25 },
    );
    observer.observe(track);
    return () => observer.disconnect();
  }, []);

  /* Only the settled, on-screen panel plays — both of its layers together.
     The incoming panel restarts from the top so the indicator below reads
     as this clip's timeline rather than a resumed one. */
  useEffect(() => {
    [videoRefs, ambientRefs].forEach((group) =>
      group.current.forEach((video, i) => {
        if (!video) return;
        if (inView && i === active) {
          video.currentTime = 0;
          void video.play().catch(() => {});
        } else {
          video.pause();
        }
      }),
    );
  }, [active, inView]);

  /* Keep the ambient layer locked to the feature window. */
  useEffect(() => {
    const feature = videoRefs.current[active];
    const ambient = ambientRefs.current[active];
    if (!feature || !ambient) return;

    const sync = () => {
      if (Math.abs(ambient.currentTime - feature.currentTime) > 0.25) {
        ambient.currentTime = feature.currentTime;
      }
    };
    sync();
    feature.addEventListener("timeupdate", sync);
    return () => feature.removeEventListener("timeupdate", sync);
  }, [active, inView]);

  const goTo = useCallback((i: number) => {
    const track = trackRef.current;
    if (!track) return;
    track.scrollTo({ left: i * track.clientWidth, behavior: "smooth" });
  }, []);

  /* Pointer drag scrubbing — mirrors the touch feel on desktop. */
  const drag = useRef<{ startX: number; startLeft: number } | null>(null);
  const [dragging, setDragging] = useState(false);

  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.pointerType === "touch") return; /* native scroll handles touch */
    const track = trackRef.current;
    if (!track) return;
    drag.current = { startX: e.clientX, startLeft: track.scrollLeft };
    setDragging(true);
    track.setPointerCapture(e.pointerId);
  };

  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const track = trackRef.current;
    if (!track || !drag.current) return;
    track.scrollLeft = drag.current.startLeft - (e.clientX - drag.current.startX);
  };

  const endDrag = (e: React.PointerEvent<HTMLDivElement>) => {
    const track = trackRef.current;
    if (!track || !drag.current) return;
    drag.current = null;
    setDragging(false);
    if (track.hasPointerCapture(e.pointerId)) {
      track.releasePointerCapture(e.pointerId);
    }
    /* Snap to nearest panel — scroll-snap alone won't fire after a drag. */
    goTo(Math.round(track.scrollLeft / (track.clientWidth || 1)));
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "ArrowRight") goTo(Math.min(active + 1, TEAMS.length - 1));
    if (e.key === "ArrowLeft") goTo(Math.max(active - 1, 0));
  };

  /* Auto-advance — the panel holds for exactly as long as its clip runs,
     then wraps. Hover does not pause: the panel is full-bleed, so a resting
     cursor would otherwise stall the reel for good. */
  useEffect(() => {
    const video = videoRefs.current[active];
    if (!video || !inView) return;

    const next = () => goTo((active + 1) % TEAMS.length);
    let timer = 0;
    const armFallback = () => {
      if (!Number.isFinite(video.duration) || video.duration <= 0) {
        timer = window.setTimeout(next, FALLBACK_DWELL_MS);
      }
    };
    /* Once the real duration lands, playback drives the timing instead. */
    const clearFallback = () => window.clearTimeout(timer);

    armFallback();
    video.addEventListener("loadedmetadata", clearFallback);
    video.addEventListener("ended", next);
    return () => {
      clearFallback();
      video.removeEventListener("loadedmetadata", clearFallback);
      video.removeEventListener("ended", next);
    };
  }, [active, inView, goTo]);

  /* Indicator fill — sampled per frame from the playing clip, so the bar is
     the video's own progress bar rather than a separate countdown. */
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    setProgress(0);
    const video = videoRefs.current[active];
    if (!video || !inView) return;

    let frame = requestAnimationFrame(function tick() {
      const total = video.duration;
      setProgress(
        Number.isFinite(total) && total > 0
          ? Math.min(1, video.currentTime / total)
          : 0,
      );
      frame = requestAnimationFrame(tick);
    });
    return () => cancelAnimationFrame(frame);
  }, [active, inView]);

  return (
    <section
      id="career-highlights"
      className="relative bg-midnight overflow-hidden"
    >
      <RevealOnScroll className="absolute top-8 left-5 md:top-12 md:left-10 z-20">
        <span className="eyebrow text-primary">Career Highlights</span>
      </RevealOnScroll>

      <div
        ref={trackRef}
        data-lenis-prevent
        role="region"
        aria-roledescription="carousel"
        aria-label="Career highlight reels"
        tabIndex={0}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
        onKeyDown={onKeyDown}
        className={`flex h-[88vh] min-h-[520px] overflow-x-auto overflow-y-hidden snap-x snap-mandatory no-scrollbar outline-none ${
          dragging ? "cursor-grabbing select-none" : "cursor-grab"
        }`}
      >
        {TEAMS.map((team, i) => {
          /* 0 when centred, 1 when a full panel away. */
          const d = Math.min(1, Math.abs(pos - i));
          /* Every other panel mirrors: window and monogram swap sides. */
          const mirrored = i % 2 === 1;
          return (
            <div
              key={team.id}
              className="relative shrink-0 w-full h-full snap-center"
              aria-roledescription="slide"
              aria-label={`${i + 1} of ${TEAMS.length}: ${team.team}`}
            >
              {/* Ambient layer — same clip, full bleed, dimmed back so the
                  feature window reads as the focal point. */}
              <video
                ref={(el) => {
                  ambientRefs.current[i] = el;
                }}
                src={team.videoUrl}
                poster={team.poster}
                muted
                playsInline
                preload="metadata"
                aria-hidden
                style={{ opacity: 0.3 * (1 - d) }}
                className="absolute inset-0 w-full h-full object-cover scale-110 blur-[3px] pointer-events-none"
              />
              <div className="absolute inset-0 bg-midnight/55 pointer-events-none" />

              {/* Club monogram — ghosted crest stand-in. */}
              <span
                aria-hidden
                style={{
                  opacity: 0.07 * (1 - d),
                  transform: `translateY(${24 * d}px)`,
                }}
                className={`absolute top-1/2 -translate-y-1/2 font-display leading-none text-text select-none pointer-events-none text-[30vw] md:text-[17vw] ${
                  mirrored ? "right-[4%]" : "left-[4%]"
                }`}
              >
                {team.badge}
              </span>

              {/* Feature window — sharp cut of the same reel. */}
              <div
                style={{
                  opacity: 1 - d,
                  transform: `translateY(${48 * d}px) scale(${1 - 0.05 * d})`,
                }}
                className={`absolute z-10 overflow-hidden border border-border-strong shadow-[0_40px_90px_rgba(0,0,0,0.6)] inset-x-5 bottom-[38%] aspect-video md:inset-x-auto md:bottom-auto md:top-[46%] md:-translate-y-1/2 md:w-[56%] ${
                  mirrored ? "md:left-[5%]" : "md:right-[5%]"
                }`}
              >
                <video
                  ref={(el) => {
                    videoRefs.current[i] = el;
                  }}
                  src={team.videoUrl}
                  poster={team.poster}
                  muted
                  playsInline
                  preload="metadata"
                  className="absolute inset-0 w-full h-full object-cover pointer-events-none"
                />
              </div>

              <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-midnight to-transparent pointer-events-none" />

              <div className="absolute bottom-24 left-5 right-5 md:bottom-28 md:left-10 md:right-10 z-20">
                <h3
                  style={{ transform: `translateY(${60 * d}px)` }}
                  className="font-display text-3xl md:text-5xl lg:text-6xl uppercase tracking-tight text-text"
                >
                  {team.team}
                </h3>
                <div
                  style={{
                    opacity: 1 - d,
                    transform: `translateY(${90 * d}px) scale(${1 - 0.1 * d})`,
                    transformOrigin: "left bottom",
                  }}
                  className="mt-3 flex items-center gap-4 label-sm text-faint"
                >
                  <span>{team.period}</span>
                  <span className="w-px h-3 bg-border-strong" />
                  <span>{team.apps} Apps</span>
                  <span className="w-px h-3 bg-border-strong" />
                  <span>{team.goals} Goals</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Segmented progress indicator — the live segment tracks its clip's
          playhead, so the bar reads as the video's own timeline. */}
      <div className="absolute bottom-10 md:bottom-14 left-5 right-5 md:left-10 md:right-10 z-20 flex gap-3">
        {TEAMS.map((team, i) => {
          const isActive = i === active;
          /* Partial fill while a drag scrubs towards this panel. */
          const scrubFill = Math.max(0, 1 - Math.min(1, Math.abs(pos - i)));
          return (
            <button
              key={team.id}
              onClick={() => goTo(i)}
              aria-label={`Show ${team.team}`}
              aria-current={isActive}
              className="group relative flex-1 py-3"
            >
              <span className="block h-px w-full bg-text/25 group-hover:bg-text/45 transition-colors" />
              {isActive ? (
                <span
                  style={{ transform: `scaleX(${progress})` }}
                  className="absolute left-0 right-0 top-3 h-px origin-left bg-primary"
                />
              ) : (
                <span
                  style={{ transform: `scaleX(${scrubFill})` }}
                  className="absolute left-0 right-0 top-3 h-px origin-left bg-primary/60"
                />
              )}
            </button>
          );
        })}
      </div>
    </section>
  );
}
