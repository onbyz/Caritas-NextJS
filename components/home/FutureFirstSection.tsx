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
  hidden: { opacity: 0, scale: 0.94, x: 24 },
  visible: {
    opacity: 1,
    scale: 1,
    x: 0,
    transition: { duration: 0.9, ease: EASE_SMOOTH },
  },
};

export function FutureFirstSection() {
  return (
    <section id="future" style={{ backgroundColor: "#F4F6F6", paddingBottom: 0 }}>
      <div className="container">
        <div className="row">
          <div className="col-lg-8">
            {/* Heading fades up */}
            <motion.div
              className="row mt-5"
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ duration: 0.7, ease: EASE_SMOOTH }}
            >
              <h3 className="my-3 box box1">Future Starts with the FIRST</h3>
              <span style={{ fontSize: 14 }} className="box box1">
                Being FIRST is an honour. We have made our &apos;First&apos; impressions in care
                that took us further in promoting good health and happiness for all.
              </span>

              {/* Staggered achievement list — desktop */}
              <div className="col-lg-5 mt-5 hide_mobile">
                <StaggerReveal>
                  {ACHIEVEMENTS.slice(0, 3).map((item) => (
                    <StaggerItem key={item} as="div">
                      <div className="mx-2 my-3 box box1 custom-list-item">{item}</div>
                    </StaggerItem>
                  ))}
                </StaggerReveal>
              </div>
              <div className="col-lg-2 hide_mobile" />
              <div className="col-lg-5 mt-5 hide_mobile">
                <StaggerReveal>
                  {ACHIEVEMENTS.slice(3).map((item) => (
                    <StaggerItem key={item} as="div">
                      <div className="mx-2 my-3 box box1 custom-list-item">{item}</div>
                    </StaggerItem>
                  ))}
                </StaggerReveal>
              </div>

              {/* Mobile single column */}
              <div className="col-lg-5 hide_desktop">
                <StaggerReveal>
                  {ACHIEVEMENTS.map((item) => (
                    <StaggerItem key={item} as="div">
                      <div className="mx-2 my-3 box box1 custom-list-item">{item}</div>
                    </StaggerItem>
                  ))}
                </StaggerReveal>
              </div>

              <Link style={{ color: "#C71782!important" }} href="/achievements">
                View All<i className="bi bi-chevron-right ms-2" />
              </Link>
            </motion.div>
          </div>

          {/* Image — cinematic scale reveal */}
          <div className="col-lg-4 my-4 hide_mobile">
            <motion.div
              variants={imageReveal}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-10%" }}
            >
              <Image
                src="/img/resized_image_one.jpg"
                alt="Future starts with first"
                width={400}
                height={500}
                className="box box1"
                style={{ height: 500, objectFit: "cover" }}
              />
            </motion.div>
          </div>

          <div className="col mt-4 hide_desktop">
            <motion.div
              variants={imageReveal}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-5%" }}
            >
              <Image
                src="/img/resized_image_one.jpg"
                alt="Future starts with first"
                width={350}
                height={400}
                className="box box1"
                style={{ width: 350 }}
              />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
