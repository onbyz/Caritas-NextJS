"use client";

import type { ReactNode } from "react";
import {
  ScrollReveal,
  type ScrollRevealVariant,
} from "@/components/shared/ScrollReveal";

type HomeScrollSectionProps = {
  children: ReactNode;
  delay?: number;
  variant?: ScrollRevealVariant;
};

/** Wraps a homepage block with a single scroll-into-view animation */
export function HomeScrollSection({
  children,
  delay = 0,
  variant = "fade-up",
}: HomeScrollSectionProps) {
  return (
    <ScrollReveal as="div" className="home-scroll-section" delay={delay} variant={variant}>
      {children}
    </ScrollReveal>
  );
}
