"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { initLegacySectionMotion } from "@/lib/legacy-section-motion";

/** Applies homepage-style section reveals to pages that don't use ScrollReveal directly. */
export function GlobalScrollMotion() {
  const pathname = usePathname();

  useEffect(() => {
    const cleanup = initLegacySectionMotion();
    const t = window.setTimeout(initLegacySectionMotion, 100);

    return () => {
      window.clearTimeout(t);
      cleanup?.();
    };
  }, [pathname]);

  return null;
}
