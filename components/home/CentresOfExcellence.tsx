"use client";

import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { CENTRES_OF_EXCELLENCE } from "@/constants/navigation";
import { DOCTOR_CAROUSEL_IMAGES } from "@/services/homepage";
import { EASE_SMOOTH } from "@/lib/motion";

const DEPT_ICONS: Record<string, string> = {
  "/caritas-cancer-institute": "bi-bandaid-fill",
  "/caritas-heart-institute": "bi-heart-fill",
  "/caritas-neuro": "bi-activity",
  "/criticalcare": "bi-lightning-charge-fill",
  "/dermatology": "bi-person-badge-fill",
  "/caritas-gastro": "bi-droplet-fill",
  "/caritas-general-medicine": "bi-clipboard2-pulse-fill",
  "/caritas-rheumatology": "bi-universal-access",
  "/caritas-urology": "bi-droplet-half",
  "/caritas-nephrology": "bi-heart-pulse-fill",
  "/caritas-paediatrics": "bi-balloon-heart-fill",
  "/physical-medicine": "bi-bicycle",
  "/emergency-medicine": "bi-plus-circle-fill",
  "/gynaecology": "bi-gender-female",
  "/caritas-orthopaedics": "bi-person-fill-gear",
  "/general-surgery": "bi-scissors",
};

const STAGGER = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.04, delayChildren: 0.1 } },
};

const ITEM_FADE = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: EASE_SMOOTH } },
};

export function CentresOfExcellence() {
  const [active, setActive] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 });
  const total = DOCTOR_CAROUSEL_IMAGES.length;

  useEffect(() => {
    const timer = setInterval(() => setActive((i) => (i + 1) % total), 3600);
    return () => clearInterval(timer);
  }, [total]);

  return (
    <section id="about" ref={sectionRef} className="coe-section">
      <div className="coe-bg" aria-hidden />
      <div className="container coe-container">
        {/* Header */}
        <motion.div
          className="coe-header"
          initial={{ opacity: 0, y: 22 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: EASE_SMOOTH }}
        >
          <span className="coe-eyebrow">
            <i className="bi bi-stars" aria-hidden /> Centres of Excellence
          </span>
          <h2 className="coe-title">
            Specialised care, <span>powered by experts</span>
          </h2>
          <p className="coe-subtitle">
            Explore our centres of excellence — each led by leading specialists and
            equipped with advanced technology for world-class outcomes.
          </p>
        </motion.div>

        <div className="coe-layout">
          {/* Doctor showcase */}
          <motion.div
            className="coe-showcase"
            initial={{ opacity: 0, scale: 0.94, y: 30 }}
            animate={isInView ? { opacity: 1, scale: 1, y: 0 } : {}}
            transition={{ duration: 0.75, ease: EASE_SMOOTH }}
          >
            <div className="coe-showcase__halo" aria-hidden />
            <div className="coe-showcase__grid" aria-hidden />

            <div className="coe-showcase__stage">
              <AnimatePresence mode="wait">
                <motion.div
                  key={DOCTOR_CAROUSEL_IMAGES[active]}
                  className="coe-showcase__figure"
                  initial={{ opacity: 0, scale: 1.04 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.6, ease: EASE_SMOOTH }}
                >
                  <Image
                    src={`/img/${DOCTOR_CAROUSEL_IMAGES[active]}`}
                    alt="Caritas specialist"
                    width={469}
                    height={650}
                    className="coe-showcase__img"
                    decoding="async"
                    priority={active === 0}
                  />
                </motion.div>
              </AnimatePresence>
              <div className="coe-showcase__platform" aria-hidden />
            </div>

            {/* Floating glass chips */}
            <motion.div
              className="coe-chip coe-chip--top"
              animate={{ y: [-5, 5, -5] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            >
              <span className="coe-chip__icon coe-chip__icon--blue">
                <i className="bi bi-people-fill" aria-hidden />
              </span>
              <span className="coe-chip__text">
                <strong>200+</strong>
                Expert Doctors
              </span>
            </motion.div>

            <motion.div
              className="coe-chip coe-chip--bottom"
              animate={{ y: [5, -5, 5] }}
              transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut" }}
            >
              <span className="coe-chip__icon coe-chip__icon--pink">
                <i className="bi bi-heart-pulse-fill" aria-hidden />
              </span>
              <span className="coe-chip__text">
                <strong>16</strong>
                Centres of Excellence
              </span>
            </motion.div>

            {/* Dots */}
            <div className="coe-showcase__dots">
              {DOCTOR_CAROUSEL_IMAGES.map((src, i) => (
                <button
                  key={src}
                  type="button"
                  className={`coe-showcase__dot${i === active ? " active" : ""}`}
                  onClick={() => setActive(i)}
                  aria-label={`Show specialist ${i + 1}`}
                />
              ))}
            </div>
          </motion.div>

          {/* Department grid */}
          <motion.div
            className="coe-dept-grid"
            variants={STAGGER}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            {CENTRES_OF_EXCELLENCE.map((item) => (
              <motion.div key={item.href} variants={ITEM_FADE}>
                <Link href={item.href} className="coe-dept">
                  <span className="coe-dept__icon">
                    <i
                      className={`bi ${DEPT_ICONS[item.href] ?? "bi-arrow-right-circle"}`}
                      aria-hidden
                    />
                  </span>
                  <span className="coe-dept__label">{item.label}</span>
                  <i className="bi bi-arrow-right coe-dept__arrow" aria-hidden />
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
