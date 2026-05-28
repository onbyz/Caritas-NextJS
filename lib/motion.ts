/** Shared easing — smooth, professional (easeOutQuart) */
export const EASE_SMOOTH = [0.22, 1, 0.36, 1] as const;

export const MOTION_DURATION = {
  section: 0.75,
  item: 0.55,
  hero: 0.9,
  /** Hero slide crossfade / dissolve */
  heroDissolve: 1.05,
} as const;

export const VIEWPORT_DEFAULT = {
  once: true,
  margin: "-10% 0px -8% 0px" as const,
};
