"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { VIRTUAL_TOUR_URL } from "@/constants/homepage";
import { useParallax } from "@/hooks/useParallax";
import { EASE_SMOOTH } from "@/lib/motion";

const textVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: (delay: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.9, ease: EASE_SMOOTH, delay },
  }),
};

export function VirtualTourBanner() {
  const { ref, y, scale } = useParallax({ strength: 0.16 });

  return (
    <section
      ref={ref}
      className="position-relative d-flex align-items-end"
      style={{
        overflow: "hidden",
        color: "white",
        background:
          "linear-gradient(135deg, rgba(0,114,188,0.95) 0%, rgba(26,44,82,0.95) 50%, rgba(199,23,130,0.9) 100%)",
        paddingBottom: 100,
        minHeight: "80vh",
        margin: "30px 0 60px 0",
      }}
    >
      {/* Cinematic parallax background */}
      <motion.div
        className="vr-banner-bg hide_mobile"
        style={{ y, scale, willChange: "transform" }}
      >
        <Image
          src="/img/vr-banner.webp"
          alt=""
          fill
          style={{ objectFit: "cover" }}
          sizes="100vw"
          loading="lazy"
        />
      </motion.div>

      {/* Mobile background (no parallax) */}
      <div className="vr-banner-bg hide_desktop">
        <Image
          src="/img/vr-mobile-banner.webp"
          alt=""
          fill
          style={{ objectFit: "cover" }}
          sizes="100vw"
          loading="lazy"
        />
      </div>

      {/* Cinematic text reveal — each line staggers in */}
      <div
        className="container text-start"
        style={{ position: "absolute", left: 40, top: "40%", zIndex: 1 }}
      >
        <div className="row">
          <div className="col">
            <motion.h2
              custom={0}
              variants={textVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-20%" }}
            >
              Visit our hospital
              <br />
              using Virtual Reality
            </motion.h2>

            <motion.div
              className="action_button my-4"
              custom={0.2}
              variants={textVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-20%" }}
            >
              <h3>
                <Link href={VIRTUAL_TOUR_URL} target="_blank" rel="noopener noreferrer">
                  <button type="button" id="openFormButton">
                    Click Here
                  </button>
                </Link>
              </h3>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
