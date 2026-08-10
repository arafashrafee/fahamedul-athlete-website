import type { Variants, Transition } from "framer-motion";

/* ============================================================
   PREMIUM MOTION SYSTEM
   ------------------------------------------------------------
   Single source of truth for every animation in the app.
   No component should hardcode easings, durations, or spring
   configs — pull from these tokens. Inspired by Webflow-tier
   editorial sites (fitcore, ttm).
   ============================================================ */

/* ---------- Easing tokens ---------- */

/** Cinematic hero / large reveals — exhale-style deceleration. */
export const EASE_HERO: Transition["ease"] = [0.16, 1, 0.3, 1]; // easeOutExpo

/** Editorial section reveals — premium, deliberate. */
export const EASE_SECTION: Transition["ease"] = [0.22, 1, 0.36, 1]; // easeOutQuart

/** Snappy hover / UI feedback — low-latency, no overshoot. */
export const EASE_HOVER: Transition["ease"] = [0.4, 0, 0.2, 1]; // material standard

/** Smooth return to rest — slower than enter, grounded. */
export const EASE_RETURN: Transition["ease"] = [0.32, 0.72, 0, 1];

/** Symmetric in/out — for clip-path / overlay wipes. */
export const EASE_IN_OUT: Transition["ease"] = [0.77, 0, 0.175, 1];

/* ---------- Duration tokens (seconds) ---------- */

export const DUR = {
  micro: 0.18,
  hover: 0.4,
  hoverSlow: 0.6,
  imageZoom: 1.2,
  reveal: 0.9,
  section: 1.1,
  hero: 1.4,
  cinematic: 1.8,
} as const;

/* ---------- Viewport defaults ---------- */

export const VIEWPORT_DEFAULT = { once: true, amount: 0.25 } as const;
export const VIEWPORT_EARLY = { once: true, amount: 0.1 } as const;

/* ---------- Named motion speeds ----------
   Three explicit tempos. Every animation in the site picks
   one of these — no ad-hoc { duration, ease } pairs. */

export const MOTION_SPEEDS = {
  /** Hero / page-load / featured reveals. */
  cinematic: { duration: DUR.cinematic, ease: EASE_HERO },
  /** Scroll-triggered section reveals. */
  standard: { duration: DUR.reveal, ease: EASE_SECTION },
  /** Hover / micro-interactions. */
  fast: { duration: DUR.hover, ease: EASE_HOVER },
} as const;

export type MotionSpeed = keyof typeof MOTION_SPEEDS;

/* ---------- Controlled spring (used only where scroll-linked) ---------- */

export const SCROLL_SPRING = {
  type: "spring" as const,
  stiffness: 220,
  damping: 32,
  mass: 0.4,
};

/* ============================================================
   HERO VARIANTS
   ============================================================ */

/** Per-word slide-up from a clipped container. Pair with overflow-hidden wrapper. */
export const heroTextReveal: Variants = {
  hidden: { y: "115%" },
  visible: {
    y: "0%",
    transition: { duration: DUR.hero, ease: EASE_HERO },
  },
};

/** Soft secondary hero element — eyebrow, subtitle, CTAs. */
export const heroFadeIn: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: DUR.section, ease: EASE_HERO },
  },
};

/** Slow, deliberate scale-in — hero backdrops, featured imagery. */
export const heroScaleIn: Variants = {
  hidden: { opacity: 0, scale: 1.06 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: DUR.cinematic, ease: EASE_HERO },
  },
};

/* ============================================================
   SECTION VARIANTS
   ============================================================ */

/** Scroll-triggered single-element reveal. */
export const sectionReveal: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: DUR.reveal, ease: EASE_SECTION },
  },
};

export const sectionFadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: DUR.section, ease: EASE_SECTION },
  },
};

export const sectionSlideInLeft: Variants = {
  hidden: { opacity: 0, x: -56 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: DUR.reveal, ease: EASE_SECTION },
  },
};

export const sectionSlideInRight: Variants = {
  hidden: { opacity: 0, x: 56 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: DUR.reveal, ease: EASE_SECTION },
  },
};

/** Top→bottom clip-path wipe (mobile menu, overlays). */
export const clipReveal: Variants = {
  hidden: { clipPath: "inset(0 0 100% 0)" },
  visible: {
    clipPath: "inset(0 0 0% 0)",
    transition: { duration: DUR.section, ease: EASE_IN_OUT },
  },
  exit: {
    clipPath: "inset(0 0 100% 0)",
    transition: { duration: DUR.section, ease: EASE_IN_OUT },
  },
};

/** Parent stagger helper. */
export const stagger = (delayChildren = 0, staggerChildren = 0.07): Variants => ({
  hidden: {},
  visible: { transition: { delayChildren, staggerChildren } },
});

/* ============================================================
   UNIFIED HOVER SYSTEM
   ------------------------------------------------------------
   One physics model used by every card, image, and button on
   the site. Enter is a "weighted" tween (260ms, EASE_HOVER) so
   it feels responsive but not snappy. Return is a single tuned
   spring — same config everywhere, never random.
   ============================================================ */

/** Weighted enter — 260ms, perceptible without feeling slow. */
export const HOVER_ENTER: Transition = {
  duration: 0.26,
  ease: EASE_HOVER,
};

/** Controlled spring return — same physics for every component. */
export const HOVER_RETURN: Transition = {
  type: "spring",
  stiffness: 180,
  damping: 22,
  mass: 0.6,
};

/* Shadow strings animated by Framer. Crimson-tinted to match brand. */
const SHADOW_REST =
  "0px 0px 0px rgba(0,0,0,0), 0px 0px 0px rgba(255,45,35,0)";
const SHADOW_CARD =
  "0px 28px 56px -22px rgba(0,0,0,0.65), 0px 0px 60px -16px rgba(225,29,72,0.22)";

/**
 * HOVER_VARIANTS — three intensities. All share the same enter
 * curve and spring return so the site feels unified.
 *
 *  card    — primary tiles (gallery photos, video cards, achievement cards)
 *  subtle  — secondary tiles (timeline cards, stat blocks)
 *  button  — buttons / CTAs
 */
export const HOVER_VARIANTS = {
  card: {
    rest: {
      y: 0,
      scale: 1,
      rotate: 0,
      boxShadow: SHADOW_REST,
      transition: HOVER_RETURN,
    },
    hover: {
      y: -10,
      scale: 1.025,
      rotate: -0.3,
      boxShadow: SHADOW_CARD,
      transition: HOVER_ENTER,
    },
  },
  subtle: {
    rest: {
      y: 0,
      scale: 1,
      rotate: 0,
      boxShadow: SHADOW_REST,
      transition: HOVER_RETURN,
    },
    hover: {
      y: -6,
      scale: 1.015,
      rotate: -0.2,
      boxShadow: SHADOW_CARD,
      transition: HOVER_ENTER,
    },
  },
  /* Buttons stay put and cast no box glow — a box-shadow would trace
     the wrapper rectangle, not the clipped HUD plate. Their glow is a
     drop-shadow filter on .btn-cyber, which follows the real shape. */
  button: {
    rest: {},
    hover: {},
  },
} as const;

export type HoverIntensity = keyof typeof HOVER_VARIANTS;

/** Slow image zoom layered inside hover containers. */
export const imageHoverZoom = {
  rest: {
    scale: 1,
    transition: HOVER_RETURN,
  },
  hover: {
    scale: 1.06,
    transition: { duration: DUR.imageZoom, ease: EASE_HOVER },
  },
} as const;

/** Magnetic cursor — controlled tweens, never random spring. */
export const magneticTransition: Transition = {
  type: "tween",
  duration: 0.45,
  ease: EASE_HOVER,
};

export const magneticReleaseTransition: Transition = {
  type: "tween",
  duration: DUR.section,
  ease: EASE_RETURN,
};

/* ============================================================
   COUNTER / TEXT REVEAL
   ============================================================ */

/**
 * counterReveal — staged opacity + y entry for animated numerals.
 * Use on the wrapping container; the numeric tween itself runs
 * inside <AnimatedCounter> with the cinematic easeOut curve so
 * digits decelerate, never tick linearly.
 */
export const counterReveal: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: DUR.reveal, ease: EASE_HERO },
  },
};

/** Alias for stagger() — semantic name when used on text. */
export const textStagger = stagger;

/* ============================================================
   LEGACY ALIASES — keep older imports working.
   ============================================================ */

export const cardHoverLift = HOVER_VARIANTS.subtle;

/* ============================================================
   LEGACY ALIASES
   Keep existing import names working so we don't churn every
   consumer file. New code should prefer the explicit names above.
   ============================================================ */

export const EASE_OUT_EXPO = EASE_HERO;
export const EASE_IN_OUT_QUART = EASE_IN_OUT;
export const fadeUp = sectionReveal;
export const fadeIn = sectionFadeIn;
export const scaleIn = heroScaleIn;
export const slideInLeft = sectionSlideInLeft;
export const slideInRight = sectionSlideInRight;
export const wordReveal = heroTextReveal;
