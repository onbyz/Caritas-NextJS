import { useRef } from "react";
import { useScroll, useSpring, useTransform, type MotionValue } from "framer-motion";

type ParallaxOpts = {
  /** How far the element moves relative to scroll. 0.1 = subtle, 0.3 = strong */
  strength?: number;
  /** Spring config for the eased momentum feel */
  spring?: { stiffness: number; damping: number; mass: number };
};

type ParallaxResult = {
  ref: React.RefObject<HTMLElement | null>;
  y: MotionValue<string>;
  scale: MotionValue<number>;
};

const DEFAULT_SPRING = { stiffness: 80, damping: 20, mass: 0.4 };

/**
 * Returns scroll-driven parallax values with spring-eased momentum.
 * Apply `ref` to the section and `y`/`scale` to the motion element inside.
 */
export function useParallax({
  strength = 0.18,
  spring = DEFAULT_SPRING,
}: ParallaxOpts = {}): ParallaxResult {
  const ref = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  // Spring adds the eased-momentum / inertia feel
  const smoothProgress = useSpring(scrollYProgress, spring);

  const pct = strength * 100;
  const y = useTransform(smoothProgress, [0, 1], [`-${pct}%`, `${pct}%`]);
  const scale = useTransform(smoothProgress, [0, 1], [1.12, 1.0]);

  return { ref, y, scale };
}
