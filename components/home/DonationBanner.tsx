"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { BRAND } from "@/constants/brand";
import { useParallax } from "@/hooks/useParallax";
import { EASE_SMOOTH } from "@/lib/motion";

export function DonationBanner() {
  const { ref, y, scale } = useParallax({ strength: 0.14 });

  return (
    <section
      ref={ref}
      className="position-relative d-flex align-items-end donation-banner-section"
      style={{ overflow: "hidden", color: "white", paddingBottom: 100, minHeight: "70vh" }}
    >
      {/* Cinematic parallax background */}
      <motion.div
        className="donation-banner-bg hide_mobile"
        style={{ y, scale, willChange: "transform" }}
      >
        <Image
          src="/media/slider_images/banner-1_lUqAwHp.webp"
          alt=""
          fill
          style={{ objectFit: "cover" }}
          sizes="100vw"
          loading="lazy"
        />
      </motion.div>

      {/* Mobile background (no parallax) */}
      <div className="donation-banner-bg hide_desktop">
        <Image
          src="/media/mobileslider_images/mobile-banner-4_AiJ5pZv.webp"
          alt=""
          fill
          style={{ objectFit: "cover" }}
          sizes="100vw"
          loading="lazy"
        />
      </div>

      {/* Content — subtle drift upward as you scroll */}
      <motion.div
        className="container-fluid text-start donation-button"
        style={{ position: "relative", zIndex: 1 }}
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-15%" }}
        transition={{ duration: 0.9, ease: EASE_SMOOTH }}
      >
        <div className="row">
          <div className="col-auto ps-4">
            <a
              className="action_button button"
              style={{
                display: "inline-block",
                padding: "8px 20px",
                backgroundColor: "#C71782",
                color: "white",
                textDecoration: "none",
                borderRadius: 25,
                marginRight: 20,
              }}
              href={BRAND.onlinePaymentsUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              Donate Now
            </a>
            <Link
              style={{ color: "#fff !important", fontWeight: 600 }}
              href="/caritas-social-responsibility"
            >
              Learn More <i className="bi bi-chevron-right ms-2" />
            </Link>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
