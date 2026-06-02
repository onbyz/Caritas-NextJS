"use client";

import {
  motion,
  useReducedMotion,
  type HTMLMotionProps,
  type Variants,
} from "framer-motion";
import type { ReactNode } from "react";
import {
  fadeInVariants,
  fadeUpVariants,
  scaleUpVariants,
  sectionRevealReducedVariants,
  VIEWPORT_DEFAULT,
} from "@/lib/motion";

export type ScrollRevealVariant = "fade-up" | "fade-in" | "scale-up";

const VARIANTS: Record<ScrollRevealVariant, Variants> = {
  "fade-up": fadeUpVariants,
  "fade-in": fadeInVariants,
  "scale-up": scaleUpVariants,
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
  const base = prefersReducedMotion ? sectionRevealReducedVariants : VARIANTS[variant];

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
