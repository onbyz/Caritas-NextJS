import type { Transition, Variants } from "framer-motion";

/** Shared easing — smooth, professional (easeOutQuart) */
export const EASE_SMOOTH = [0.22, 1, 0.36, 1] as const;

export const MOTION_DURATION = {
  section: 0.75,
  item: 0.55,
  hero: 0.9,
  page: 0.45,
  /** Hero slide crossfade / dissolve */
  heroDissolve: 1.05,
} as const;

/** Default viewport for scroll-triggered reveals */
export const VIEWPORT_DEFAULT = {
  once: true,
  amount: 0.15 as const,
  margin: "-8% 0px -5% 0px" as const,
};

/** Looser viewport — works better with Lenis smooth scroll */
export const VIEWPORT_IN_VIEW = {
  once: true,
  amount: 0.12 as const,
  margin: "0px 0px -80px 0px" as const,
};

/** @deprecated Use VIEWPORT_DEFAULT */
export const VIEWPORT_SECTION = VIEWPORT_DEFAULT;

const springTransition: Transition = {
  type: "spring",
  stiffness: 120,
  damping: 24,
  mass: 0.9,
};

/** Major section entering viewport */
export const sectionRevealVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: MOTION_DURATION.section, ease: EASE_SMOOTH },
  },
};

export const sectionRevealReducedVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.2 } },
};

/** Stagger parent for grids, lists, card groups */
export const staggerContainerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.09,
      delayChildren: 0.06,
    },
  },
};

/** Child item inside a stagger container */
export const staggerItemVariants: Variants = {
  hidden: { opacity: 0, y: 30, scale: 0.98 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: springTransition,
  },
};

export const staggerItemReducedVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.2 } },
};

/** Route / page change */
export const pageTransitionVariants: Variants = {
  initial: { opacity: 0, y: 14 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: MOTION_DURATION.page, ease: EASE_SMOOTH },
  },
  exit: {
    opacity: 0,
    y: -8,
    transition: { duration: 0.32, ease: EASE_SMOOTH },
  },
};

export const pageTransitionReducedVariants: Variants = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration: 0.15 } },
  exit: { opacity: 0, transition: { duration: 0.1 } },
};

/** Fade-up alias (ScrollReveal) */
export const fadeUpVariants: Variants = sectionRevealVariants;

export const fadeInVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: MOTION_DURATION.section, ease: EASE_SMOOTH },
  },
};

export const scaleUpVariants: Variants = {
  hidden: { opacity: 0, y: 30, scale: 0.97 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: MOTION_DURATION.section, ease: EASE_SMOOTH },
  },
};
