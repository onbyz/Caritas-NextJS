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
    <section ref={ref} className="donation-banner-section">
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

      <div className="donation-banner__scrim" aria-hidden />

      <motion.div
        className="donation-banner__content"
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-15%" }}
        transition={{ duration: 0.9, ease: EASE_SMOOTH }}
      >
        <a
          className="donation-banner__btn"
          href={BRAND.onlinePaymentsUrl}
          target="_blank"
          rel="noopener noreferrer"
        >
          Donate Now
        </a>
        <Link className="donation-banner__link" href="/caritas-social-responsibility">
          Learn More <i className="bi bi-chevron-right ms-2" aria-hidden />
        </Link>
      </motion.div>
    </section>
  );
}
