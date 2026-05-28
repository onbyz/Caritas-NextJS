"use client";

import { useEffect, useState } from "react";

/** Scroll-to-top control — visibility matches Django main.js + style3.css .back-to-top */
export function BackToTop() {
  const [active, setActive] = useState(false);

  useEffect(() => {
    const onScroll = () => setActive(window.scrollY > 100);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollToTop = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <a
      href="#"
      className={`back-to-top d-flex align-items-center justify-content-center${active ? " active" : ""}`}
      aria-label="Back to top"
      onClick={scrollToTop}
    >
      <i className="bi bi-arrow-up-short" />
    </a>
  );
}
