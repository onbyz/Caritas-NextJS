"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";
import { EASE_SMOOTH } from "@/lib/motion";

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.11,
      delayChildren: 0.05,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 36 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: EASE_SMOOTH },
  },
};

const reducedItemVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.2 } },
};

type StaggerRevealProps = {
  children: ReactNode;
  className?: string;
  /** px from viewport edge to trigger (e.g. "-10%") */
  margin?: string;
};

/** Container: stagger-triggers children when it scrolls into view */
export function StaggerReveal({
  children,
  className,
  margin = "-8% 0px",
}: StaggerRevealProps) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: margin as `${string}px` }}
      variants={containerVariants}
    >
      {children}
    </motion.div>
  );
}

type StaggerItemProps = {
  children: ReactNode;
  className?: string;
  as?: "div" | "li" | "section";
};

/** Individual child that receives stagger animation from StaggerReveal parent */
export function StaggerItem({ children, className, as = "div" }: StaggerItemProps) {
  const prefersReducedMotion = useReducedMotion();
  const Component = motion[as];
  const variants = prefersReducedMotion ? reducedItemVariants : itemVariants;

  return (
    <Component className={className} variants={variants}>
      {children}
    </Component>
  );
}
