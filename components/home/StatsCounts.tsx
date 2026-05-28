"use client";

import { useEffect, useRef } from "react";
import { motion, animate, useInView } from "framer-motion";
import { HOME_STATS } from "@/constants/homepage";
import { EASE_SMOOTH } from "@/lib/motion";
import { StaggerReveal, StaggerItem } from "@/components/shared/StaggerReveal";

function AnimatedCounter({ target }: { target: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  useEffect(() => {
    if (!isInView || !ref.current) return;

    const el = ref.current;
    el.textContent = "0";

    const controls = animate(0, target, {
      duration: 2.2,
      ease: [0.33, 1, 0.68, 1], // easeOutCubic — fast start, decelerate
      onUpdate(value) {
        el.textContent = String(Math.round(value));
      },
    });

    return () => controls.stop();
  }, [isInView, target]);

  return <span ref={ref}>0</span>;
}

const STAT_ICONS = [
  "bi-hospital",
  "bi-person-fill-check",
  "bi-people-fill",
  "bi-heart-pulse",
];

export function StatsCounts() {
  return (
    <section id="counts" className="counts">
      <div className="container">
        <StaggerReveal className="row justify-content-center">
          {HOME_STATS.map((stat, i) => (
            <StaggerItem key={stat.label} className="col-lg-3 col-md-6">
              <motion.div
                className="count-box box box1"
                whileHover={{ y: -4, transition: { duration: 0.25, ease: EASE_SMOOTH } }}
              >
                <i
                  className={`bi ${STAT_ICONS[i] ?? "bi-star"}`}
                  style={{ fontSize: 28, color: "#0072BC", marginBottom: 8, display: "block" }}
                />
                <p>
                  <AnimatedCounter target={stat.end} />
                  <span className="plus">+</span>
                </p>
                <p>{stat.label}</p>
              </motion.div>
            </StaggerItem>
          ))}
        </StaggerReveal>
      </div>
    </section>
  );
}
