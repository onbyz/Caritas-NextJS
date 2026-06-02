"use client";

import { motion, useReducedMotion } from "framer-motion";
import { EASE_SMOOTH } from "@/lib/motion";

type FutureFirstHeroProps = {
  /** Set true when section scrolls into view — drives entrance + loops */
  active: boolean;
};

export function FutureFirstHero({ active }: FutureFirstHeroProps) {
  const prefersReducedMotion = useReducedMotion();
  const motionOn = !prefersReducedMotion && active;

  return (
    <div className="future-first-hero">
      <motion.div
        className="future-first-hero__stage"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={
          active
            ? { opacity: 1, scale: 1 }
            : { opacity: prefersReducedMotion ? 1 : 0, scale: prefersReducedMotion ? 1 : 0.9 }
        }
        transition={{ duration: 0.85, ease: EASE_SMOOTH }}
      >
        <motion.div
          className="future-first-hero__glow"
          animate={
            motionOn
              ? { opacity: [0.5, 0.92, 0.5], scale: [0.94, 1.08, 0.94] }
              : { opacity: active ? 0.75 : 0, scale: 1 }
          }
          transition={
            motionOn
              ? { duration: 6, repeat: Infinity, ease: "easeInOut" }
              : { duration: 0.6 }
          }
        />

        <motion.div
          className="future-first-hero__halo future-first-hero__halo--outer"
          animate={motionOn ? { rotate: 360 } : { rotate: 0 }}
          transition={
            motionOn
              ? { duration: 50, repeat: Infinity, ease: "linear" }
              : { duration: 0 }
          }
        >
          <span className="future-first-hero__halo-ring future-first-hero__halo-ring--outer" />
        </motion.div>

        <motion.div
          className="future-first-hero__halo"
          animate={motionOn ? { rotate: -360 } : { rotate: 0 }}
          transition={
            motionOn
              ? { duration: 36, repeat: Infinity, ease: "linear" }
              : { duration: 0 }
          }
        >
          <span className="future-first-hero__halo-ring" />
        </motion.div>

        <motion.div
          className="future-first-hero__float"
          animate={
            motionOn
              ? { y: [-14, 14, -14], rotateZ: [-1, 1, -1] }
              : { y: 0, rotateZ: 0 }
          }
          transition={
            motionOn
              ? { duration: 5.5, repeat: Infinity, ease: "easeInOut" }
              : { duration: 0.7, ease: EASE_SMOOTH }
          }
        >
          <div className="future-first-hero__digit-wrap">
            <motion.span
              className="future-first-hero__digit-shadow"
              aria-hidden
              animate={
                motionOn
                  ? { y: [0, 4, 0], opacity: [0.38, 0.58, 0.38] }
                  : { y: 0, opacity: 0.45 }
              }
              transition={
                motionOn
                  ? { duration: 5.5, repeat: Infinity, ease: "easeInOut" }
                  : { duration: 0.5 }
              }
            >
              1
            </motion.span>

            <motion.span
              className="future-first-hero__digit"
              animate={
                motionOn
                  ? { scale: [1, 1.05, 1], y: [0, -3, 0] }
                  : { scale: 1, y: 0 }
              }
              transition={
                motionOn
                  ? {
                      scale: { duration: 4.5, repeat: Infinity, ease: "easeInOut" },
                      y: { duration: 5.5, repeat: Infinity, ease: "easeInOut" },
                    }
                  : { duration: 0.6, ease: EASE_SMOOTH }
              }
            >
              1
            </motion.span>

            {motionOn && (
              <motion.span
                className="future-first-hero__sweep"
                animate={{ x: ["-150%", "250%"], opacity: [0, 0.7, 0] }}
                transition={{
                  duration: 2.2,
                  repeat: Infinity,
                  repeatDelay: 5,
                  ease: EASE_SMOOTH,
                }}
              />
            )}
          </div>
        </motion.div>

        <motion.div
          className="future-first-hero__base"
          style={{ left: "50%", x: "-50%" }}
          animate={
            motionOn
              ? { scale: [1, 1.1, 1], opacity: [0.65, 1, 0.65] }
              : { scale: 1, opacity: active ? 0.85 : 0 }
          }
          transition={
            motionOn
              ? { duration: 5, repeat: Infinity, ease: "easeInOut" }
              : { duration: 0.5 }
          }
        >
          <span className="future-first-hero__base-ring" />
          <span className="future-first-hero__base-core" />
        </motion.div>
      </motion.div>

      <motion.p
        className="future-first-hero__caption"
        initial={{ opacity: 0, y: 8 }}
        animate={
          active
            ? motionOn
              ? { opacity: [0.7, 1, 0.7], y: 0 }
              : { opacity: 1, y: 0 }
            : { opacity: 0, y: 8 }
        }
        transition={
          motionOn
            ? { opacity: { duration: 3.5, repeat: Infinity, ease: "easeInOut" }, y: { duration: 0.5 } }
            : { duration: 0.5, delay: 0.15 }
        }
      >
        Leading healthcare innovation
      </motion.p>
    </div>
  );
}
