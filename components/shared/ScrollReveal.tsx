"use client";

import {
  motion,
  useReducedMotion,
  type HTMLMotionProps,
  type Variants,
} from "framer-motion";
import type { ReactNode } from "react";
import { EASE_SMOOTH, MOTION_DURATION, VIEWPORT_DEFAULT } from "@/lib/motion";

export type ScrollRevealVariant = "fade-up" | "fade-in" | "scale-up";

const VARIANTS: Record<ScrollRevealVariant, Variants> = {
  "fade-up": {
    hidden: { opacity: 0, y: 48 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: MOTION_DURATION.section, ease: EASE_SMOOTH },
    },
  },
  "fade-in": {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: MOTION_DURATION.section, ease: EASE_SMOOTH },
    },
  },
  "scale-up": {
    hidden: { opacity: 0, y: 32, scale: 0.97 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: MOTION_DURATION.section, ease: EASE_SMOOTH },
    },
  },
};

const REDUCED_VARIANTS: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.2 } },
};

type ScrollRevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  variant?: ScrollRevealVariant;
  as?: "div" | "section";
} & Pick<HTMLMotionProps<"div">, "id">;

export function ScrollReveal({
  children,
  className,
  delay = 0,
  variant = "fade-up",
  as = "div",
  id,
}: ScrollRevealProps) {
  const prefersReducedMotion = useReducedMotion();
  const Component = motion[as];
  const base = prefersReducedMotion ? REDUCED_VARIANTS : VARIANTS[variant];

  return (
    <Component
      id={id}
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={VIEWPORT_DEFAULT}
      variants={{
        hidden: base.hidden,
        visible: {
          ...base.visible,
          transition: {
            ...(typeof base.visible === "object" && "transition" in base.visible
              ? base.visible.transition
              : {}),
            delay,
          },
        },
      }}
    >
      {children}
    </Component>
  );
}
