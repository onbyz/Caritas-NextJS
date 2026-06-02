"use client";

import { useEffect } from "react";
import { initLegacySectionMotion } from "@/lib/legacy-section-motion";

/** Re-bind legacy DOM behaviors after React injects static HTML */
export function initLegacyAccordions() {
  const accordions = document.querySelectorAll(".accordion-wrapper .accordion");
  accordions.forEach((acc) => {
    const el = acc as HTMLElement;
    if (el.dataset.accordionBound === "1") return;
    el.dataset.accordionBound = "1";
    const panel = acc.nextElementSibling;
    if (panel?.classList.contains("panel")) {
      (panel as HTMLElement).style.display = "none";
    }
    el.addEventListener("click", (e) => {
      e.preventDefault();
      e.stopPropagation();
      const isActive = el.classList.contains("active");
      el.classList.toggle("active", !isActive);
      const next = el.nextElementSibling;
      if (!next?.classList.contains("panel")) return;
      (next as HTMLElement).style.display = isActive ? "none" : "block";
    });
  });
}

export function LegacyContentEnhancer() {
  useEffect(() => {
    initLegacyAccordions();
    const cleanupMotion = initLegacySectionMotion();

    const t = window.setTimeout(() => {
      initLegacyAccordions();
      initLegacySectionMotion();
    }, 120);

    return () => {
      window.clearTimeout(t);
      cleanupMotion?.();
    };
  }, []);

  return null;
}
