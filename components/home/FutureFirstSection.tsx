"use client";

import Link from "next/link";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { FutureFirstHero } from "@/components/home/FutureFirstHero";
import {
  EASE_SMOOTH,
  staggerContainerVariants,
  staggerItemReducedVariants,
  staggerItemVariants,
  VIEWPORT_IN_VIEW,
} from "@/lib/motion";

const ACHIEVEMENTS = [
  "Kerala's First Laser Angioplasty System",
  "India's First Telemedic AI ED on Wheels",
  "Kerala's First Hospital to Implement Bharat Bill Payment System",
  "Kerala's First Great Place To Work-Certified Hospital",
  "Kerala's First TrueBeam with HyperArc Technology",
  "Kerala's First 384-Slice Diagnostic Cardiology Dual Energy RT-CT Scan Machine",
];

/** Lenis-friendly: also check scroll position so in-view always fires */
function useSectionInView() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, VIEWPORT_IN_VIEW);
  const [active, setActive] = useState(false);

  useEffect(() => {
    if (isInView) {
      setActive(true);
      return;
    }

    const el = ref.current;
    if (!el) return;

    const check = () => {
      const rect = el.getBoundingClientRect();
      const visible =
        rect.top < window.innerHeight * 0.88 && rect.bottom > window.innerHeight * 0.12;
      if (visible) setActive(true);
    };

    check();
    window.addEventListener("scroll", check, { passive: true });
    window.addEventListener("resize", check, { passive: true });

    return () => {
      window.removeEventListener("scroll", check);
      window.removeEventListener("resize", check);
    };
  }, [isInView]);

  return { ref, active };
}

export function FutureFirstSection() {
  const { ref, active } = useSectionInView();
  const prefersReducedMotion = useReducedMotion();
  const itemVariants = prefersReducedMotion ? staggerItemReducedVariants : staggerItemVariants;

  const leftCol = ACHIEVEMENTS.slice(0, 3);
  const rightCol = ACHIEVEMENTS.slice(3);

  return (
    <section id="future" ref={ref} className="future-first-section">
      <div className="container">
        <motion.div
          className="future-first-header text-center text-lg-start"
          initial={{ opacity: 0, y: 24 }}
          animate={active ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
          transition={{ duration: 0.7, ease: EASE_SMOOTH }}
        >
          <h3 className="future-first-title">Future Starts with the FIRST</h3>
          <p className="future-first-lead">
            Being FIRST is an honour. We have made our &apos;First&apos; impressions in care
            that took us further in promoting good health and happiness for all.
          </p>
        </motion.div>

        <div className="row future-first-body align-items-center">
          <div className="col-lg-7 order-lg-1 order-3 future-first-content-col">
            <div className="row future-first-list g-2 g-md-3">
              <div className="col-md-6">
                <motion.div
                  variants={staggerContainerVariants}
                  initial="hidden"
                  animate={active ? "visible" : "hidden"}
                >
                  {leftCol.map((item) => (
                    <motion.div key={item} variants={itemVariants}>
                      <div className="future-first-item">{item}</div>
                    </motion.div>
                  ))}
                </motion.div>
              </div>
              <div className="col-md-6">
                <motion.div
                  variants={staggerContainerVariants}
                  initial="hidden"
                  animate={active ? "visible" : "hidden"}
                >
                  {rightCol.map((item) => (
                    <motion.div key={item} variants={itemVariants}>
                      <div className="future-first-item">{item}</div>
                    </motion.div>
                  ))}
                </motion.div>
              </div>
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={active ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: 0.5, delay: 0.35, ease: EASE_SMOOTH }}
            >
              <Link className="future-first-cta" href="/achievements">
                View All <i className="bi bi-chevron-right ms-1" aria-hidden />
              </Link>
            </motion.div>
          </div>

          <div className="col-lg-5 order-lg-2 order-2 future-first-hero-col">
            <FutureFirstHero active={active} />
          </div>
        </div>
      </div>
    </section>
  );
}
