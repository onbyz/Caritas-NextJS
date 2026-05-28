"use client";

import { useEffect } from "react";

/** Re-bind legacy DOM behaviors after React injects static HTML */
export function initLegacyAccordions() {
  const accordions = document.querySelectorAll(".accordion-wrapper .accordion");
  accordions.forEach((acc) => {
    const el = acc as HTMLElement;
    if (el.dataset.accordionBound === "1") return;
    el.dataset.accordionBound = "1";
    const panel = el.nextElementSibling;
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
    const t = window.setTimeout(initLegacyAccordions, 100);
    return () => window.clearTimeout(t);
  }, []);

  return null;
}
