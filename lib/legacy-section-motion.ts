/**
 * Lightweight scroll reveals for pages that are not explicitly wrapped with
 * Framer Motion components. Uses transform + opacity only (GPU-friendly).
 */

const REVEAL_SELECTOR = [
  ".site-main > section",
  ".site-main > article",
  ".site-main > div:not(.page-home):not(.legacy-static-content):not(.page-transition-root)",
  ".site-main > div:not(.page-home) > section",
  ".site-main > main > section",
  ".legacy-static-content section",
  "#deptsections",
  ".data-filter-section",
  ".health-package-section",
  ".department-treatments-section",
  ".international-enquiry-section",
].join(", ");

export function initLegacySectionMotion() {
  if (typeof window === "undefined") return () => undefined;

  const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (prefersReduced) return () => undefined;

  const elements = [...document.querySelectorAll<HTMLElement>(REVEAL_SELECTOR)].filter(
    (el) =>
      !el.closest(".page-home") &&
      !el.classList.contains("home-scroll-section") &&
      !el.classList.contains("motion-reveal-skip"),
  );
  if (!elements.length) return () => undefined;

  elements.forEach((el, index) => {
    if (el.dataset.motionReveal === "1") return;
    el.dataset.motionReveal = "1";
    el.classList.add("motion-reveal");
    el.style.setProperty("--motion-delay", `${Math.min(index * 0.04, 0.24)}s`);
  });

  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          entry.target.classList.add("motion-reveal--visible");
          observer.unobserve(entry.target);
        }
      }
    },
    { threshold: 0.12, rootMargin: "-5% 0px -5% 0px" },
  );

  elements.forEach((el) => {
    if (!el.classList.contains("motion-reveal--visible")) {
      observer.observe(el);
    }
  });

  return () => observer.disconnect();
}
