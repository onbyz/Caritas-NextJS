"use client";

/**
 * Lenis smooth scroll with inertia/momentum.
 * Integrates with Framer Motion's useScroll via a shared MotionValue.
 */

import Lenis from "lenis";
import { useEffect } from "react";
import { useReducedMotion } from "framer-motion";

export function SmoothScrollProvider({ children }: { children: React.ReactNode }) {
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) return;

    const lenis = new Lenis({
      duration: 1.3,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // expo ease-out
      smoothWheel: true,
      touchMultiplier: 1.5,
    });

    // Sync with Framer Motion's RAF
    let rafId: number;
    function raf(time: number) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, [prefersReducedMotion]);

  return <>{children}</>;
}
