"use client";

import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { BRAND } from "@/constants/brand";
import { EASE_SMOOTH, MOTION_DURATION } from "@/lib/motion";

export type SlideVariant = "image-only" | "donate" | "content";

export type SlideData = {
  id: string;
  desktopSrc: string;
  mobileSrc?: string;
  title?: string;
  description?: string;
  variant: SlideVariant;
};

type HeroSliderProps = {
  slides: SlideData[];
};

function SlideContent({ slide }: { slide: SlideData }) {
  if (slide.variant === "image-only") return null;

  if (slide.variant === "donate") {
    return (
      <div className="hero-slide-donate">
        <a
          className="hero-slide-donate__btn"
          href={BRAND.onlinePaymentsUrl}
          target="_blank"
          rel="noopener noreferrer"
        >
          Donate Now
        </a>
        <Link className="hero-slide-donate__link" href="/caritas-social-responsibility">
          Learn more <i className="bi bi-chevron-right" aria-hidden />
        </Link>
      </div>
    );
  }

  return (
    <>
      {slide.title && (
        <h1
          className="text-white slider-title hero-slide-title"
          dangerouslySetInnerHTML={{ __html: slide.title }}
        />
      )}
      <div className="hero-slide-actions">
        <Link className="hero-slide-actions__link" href="/doctors">
          Find a Doctor <i className="bi bi-chevron-right" aria-hidden />
        </Link>
        <a
          className="hero-slide-actions__booking"
          href={BRAND.bookingUrl}
          target="_blank"
          rel="noopener noreferrer"
        >
          <span className="hero-slide-actions__btn">Book An Appointment</span>
        </a>
      </div>
      {slide.description && (
        <div className="tab-img-description text-white hero-slide-description">
          {slide.description}
        </div>
      )}
    </>
  );
}

export function HeroSlider({ slides }: HeroSliderProps) {
  const prefersReducedMotion = useReducedMotion();
  const [active, setActive] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);
  const count = slides.length;

  /* Parallax — single scroll listener shared across all slides */
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const parallaxY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const parallaxScale = useTransform(scrollYProgress, [0, 1], [1, 1.08]);

  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 768px)");
    const update = () => setIsMobile(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  const parallaxEnabled = !prefersReducedMotion && !isMobile;

  const dissolveTransition = {
    duration: prefersReducedMotion ? 0.15 : MOTION_DURATION.heroDissolve,
    ease: EASE_SMOOTH,
  };

  const next = useCallback(() => setActive((i) => (i + 1) % count), [count]);
  const prev = useCallback(() => setActive((i) => (i - 1 + count) % count), [count]);

  useEffect(() => {
    if (count <= 1) return;
    const timer = setInterval(next, 6000);
    return () => clearInterval(timer);
  }, [count, next]);

  if (!count) return null;

  return (
    <section ref={sectionRef} className="hero-slider-section">
      <div className="new-slider-container hero-dissolve-container">
        {slides.map((slide, index) => {
          const isActive = index === active;

          return (
            <motion.div
              key={slide.id}
              className="hero-dissolve-slide"
              initial={false}
              animate={{ opacity: isActive ? 1 : 0 }}
              transition={dissolveTransition}
              aria-hidden={!isActive}
              style={{ zIndex: isActive ? 2 : 1 }}
            >
              {/* Background image layer with parallax */}
              <motion.div
                className="hero-dissolve-bg"
                style={
                  parallaxEnabled
                    ? { y: parallaxY, scale: parallaxScale, willChange: "transform" }
                    : undefined
                }
              >
                <picture>
                  {slide.mobileSrc && (
                    <source media="(max-width: 768px)" srcSet={slide.mobileSrc} />
                  )}
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={slide.desktopSrc}
                    alt={slide.title?.replace(/<[^>]+>/g, "") || "Caritas Hospital"}
                    className="hero-dissolve-img"
                    loading={index === 0 ? "eager" : "lazy"}
                    fetchPriority={index === 0 ? "high" : undefined}
                    decoding="async"
                  />
                </picture>
              </motion.div>

              {/* Slide content overlay */}
              <div className="new-slide-content">
                <div className="container hero-slide-container">
                  <div className="row hero-slide-row">
                    <div className="col-lg-6 col-12 hero-slide-col">
                      <SlideContent slide={slide} />
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}

        {count > 1 && (
          <>
            <i
              className="arrow prev fas fa-chevron-left"
              role="button"
              tabIndex={0}
              onClick={prev}
              onKeyDown={(e) => e.key === "Enter" && prev()}
              aria-label="Previous slide"
            />
            <i
              className="arrow next fas fa-chevron-right"
              role="button"
              tabIndex={0}
              onClick={next}
              onKeyDown={(e) => e.key === "Enter" && next()}
              aria-label="Next slide"
            />
          </>
        )}
      </div>
    </section>
  );
}
