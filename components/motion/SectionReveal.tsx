"use client";

import { motion, useReducedMotion, type HTMLMotionProps } from "framer-motion";
import type { ReactNode } from "react";
import {
  sectionRevealReducedVariants,
  sectionRevealVariants,
  VIEWPORT_DEFAULT,
} from "@/lib/motion";

type SectionRevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  as?: "div" | "section" | "article" | "main";
} & Pick<HTMLMotionProps<"div">, "id">;

/** Standard section scroll-into-view reveal (opacity + y) */
export function SectionReveal({
  children,
  className,
  delay = 0,
  as = "section",
  id,
}: SectionRevealProps) {
  const prefersReducedMotion = useReducedMotion();
  const Component = motion[as];
  const base = prefersReducedMotion ? sectionRevealReducedVariants : sectionRevealVariants;

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
