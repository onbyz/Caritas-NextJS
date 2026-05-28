import type { Transition, Variants } from "framer-motion";
import { EASE_SMOOTH, MOTION_DURATION, VIEWPORT_DEFAULT } from "@/lib/motion";

export const DOCTORS_VIEWPORT = {
  once: true,
  margin: "-6% 0px -4% 0px" as const,
} as const;

export const pageFadeVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.55, ease: EASE_SMOOTH },
  },
};

export const heroContainerVariants: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12, delayChildren: 0.08 },
  },
};

export const heroItemVariants: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: MOTION_DURATION.hero, ease: EASE_SMOOTH },
  },
};

export const filterPanelVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: MOTION_DURATION.item, ease: EASE_SMOOTH, delay: 0.15 },
  },
};

export const sectionTitleVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: MOTION_DURATION.section, ease: EASE_SMOOTH },
  },
};

export const cardGridVariants: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.09, delayChildren: 0.06 },
  },
};

export const cardItemVariants: Variants = {
  hidden: { opacity: 0, y: 30, scale: 0.96 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 120,
      damping: 22,
      mass: 0.85,
    } satisfies Transition,
  },
};

export const reducedCardVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.2 } },
};

export { VIEWPORT_DEFAULT };
