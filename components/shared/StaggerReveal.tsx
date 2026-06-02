"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";
import {
  staggerContainerVariants,
  staggerItemReducedVariants,
  staggerItemVariants,
  VIEWPORT_DEFAULT,
} from "@/lib/motion";

type StaggerRevealProps = {
  children: ReactNode;
  className?: string;
  margin?: string;
};

/** Container: stagger-triggers children when it scrolls into view */
export function StaggerReveal({
  children,
  className,
  margin,
}: StaggerRevealProps) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{
        ...VIEWPORT_DEFAULT,
        ...(margin ? { margin: margin as `${string}px` } : {}),
      }}
      variants={staggerContainerVariants}
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
  const variants = prefersReducedMotion ? staggerItemReducedVariants : staggerItemVariants;

  return (
    <Component className={className} variants={variants}>
      {children}
    </Component>
  );
}
