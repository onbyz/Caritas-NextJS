"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import {
  pageTransitionReducedVariants,
  pageTransitionVariants,
} from "@/lib/motion";

type PageTransitionProps = {
  children: ReactNode;
};

/** Soft fade + lift on route change (used in app/template.tsx) */
export function PageTransition({ children }: PageTransitionProps) {
  const pathname = usePathname();
  const prefersReducedMotion = useReducedMotion();
  const variants = prefersReducedMotion
    ? pageTransitionReducedVariants
    : pageTransitionVariants;

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={pathname}
        className="page-transition-root"
        initial="initial"
        animate="animate"
        exit="exit"
        variants={variants}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
