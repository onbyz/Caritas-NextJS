"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import type { ReactNode } from "react";
import { EASE_SMOOTH, MOTION_DURATION, VIEWPORT_DEFAULT } from "@/lib/motion";

const variants: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: MOTION_DURATION.item, ease: EASE_SMOOTH },
  },
};

const reducedVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.2 } },
};

type FadeInProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  as?: "div" | "section";
};

export function FadeIn({
  children,
  className,
  delay = 0,
  as = "div",
}: FadeInProps) {
  const prefersReducedMotion = useReducedMotion();
  const Component = motion[as];
  const base = prefersReducedMotion ? reducedVariants : variants;

  return (
    <Component
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
