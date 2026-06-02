"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { StaggerReveal, StaggerItem } from "@/components/shared/StaggerReveal";
import { EASE_SMOOTH } from "@/lib/motion";

const ACHIEVEMENTS = [
  "Kerala's First Laser Angioplasty System",
  "India's First Telemedic AI ED on Wheels",
  "Kerala's First Hospital to Implement Bharat Bill Payment System",
  "Kerala's First Great Place To Work-Certified Hospital",
  "Kerala's First TrueBeam with HyperArc Technology",
  "Kerala's First 384-Slice Diagnostic Cardiology Dual Energy RT-CT Scan Machine",
];

const imageReveal = {
  hidden: { opacity: 0, scale: 0.96 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.9, ease: EASE_SMOOTH },
  },
};

export function FutureFirstSection() {
  const leftCol = ACHIEVEMENTS.slice(0, 3);
  const rightCol = ACHIEVEMENTS.slice(3);

  return (
    <section id="future" className="future-first-section">
      <div className="container">
        <motion.div
          className="future-first-header text-center text-lg-start"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 0.7, ease: EASE_SMOOTH }}
        >
          <h3 className="future-first-title">Future Starts with the FIRST</h3>
          <p className="future-first-lead">
            Being FIRST is an honour. We have made our &apos;First&apos; impressions in care
            that took us further in promoting good health and happiness for all.
          </p>
        </motion.div>

        <div className="row align-items-start g-4 g-lg-5 mt-2 mt-lg-4">
          <div className="col-lg-5 order-lg-2">
            <motion.div
              className="future-first-image-wrap"
              variants={imageReveal}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-10%" }}
            >
              <Image
                src="/img/resized_image_one.jpg"
                alt="Future starts with first"
                width={480}
                height={560}
                className="future-first-image"
                priority={false}
              />
            </motion.div>
          </div>

          <div className="col-lg-7 order-lg-1">
            <div className="row g-3 g-lg-4">
              <div className="col-md-6">
                <StaggerReveal>
                  {leftCol.map((item) => (
                    <StaggerItem key={item} as="div">
                      <div className="future-first-item">{item}</div>
                    </StaggerItem>
                  ))}
                </StaggerReveal>
              </div>
              <div className="col-md-6">
                <StaggerReveal>
                  {rightCol.map((item) => (
                    <StaggerItem key={item} as="div">
                      <div className="future-first-item">{item}</div>
                    </StaggerItem>
                  ))}
                </StaggerReveal>
              </div>
            </div>

            <Link className="future-first-cta" href="/achievements">
              View All <i className="bi bi-chevron-right ms-1" aria-hidden />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
