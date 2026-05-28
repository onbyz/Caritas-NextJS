"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { BRAND } from "@/constants/brand";

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
  const [active, setActive] = useState(0);
  const slidesContainerRef = useRef<HTMLDivElement>(null);
  const count = slides.length;

  const updateSlider = useCallback(() => {
    const container = slidesContainerRef.current;
    if (!container) return;
    const slideEls = container.querySelectorAll<HTMLElement>(".new-slide");

    if (window.innerWidth <= 768) {
      container.style.transform = "";
      slideEls.forEach((slide, index) => {
        slide.classList.toggle("active", index === active);
        slide.style.display = index === active ? "block" : "none";
      });
    } else {
      slideEls.forEach((slide) => {
        slide.classList.remove("active");
        slide.style.display = "";
      });
      container.style.transform = `translateX(-${active * 100}%)`;
    }
  }, [active]);

  useEffect(() => {
    updateSlider();
    window.addEventListener("resize", updateSlider);
    return () => window.removeEventListener("resize", updateSlider);
  }, [updateSlider]);

  const next = useCallback(() => {
    setActive((i) => (i + 1) % count);
  }, [count]);

  const prev = useCallback(() => {
    setActive((i) => (i - 1 + count) % count);
  }, [count]);

  useEffect(() => {
    if (count <= 1) return;
    const timer = setInterval(next, 6000);
    return () => clearInterval(timer);
  }, [count, next]);

  if (!count) return null;

  return (
    <section>
      <div className="new-slider-container">
        <div ref={slidesContainerRef} className="new-slides d-flex">
          {slides.map((slide, index) => (
            <div
              key={slide.id}
              className={`new-slide position-relative${index === active ? " active" : ""}`}
            >
              <picture>
                {slide.mobileSrc && (
                  <source media="(max-width: 768px)" srcSet={slide.mobileSrc} />
                )}
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={slide.desktopSrc}
                  alt={slide.title?.replace(/<[^>]+>/g, "") || "Caritas Hospital"}
                  width={1920}
                  height={752}
                  className="new-slider-img"
                  loading={index === 0 ? "eager" : "lazy"}
                  fetchPriority={index === 0 ? "high" : undefined}
                  decoding="async"
                />
              </picture>
              <div className="overlay" aria-hidden />
              <div className="new-slide-content">
                <div className="container hero-slide-container">
                  <div className="row hero-slide-row">
                    <div className="col-lg-6 col-12 hero-slide-col">
                      <SlideContent slide={slide} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
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
