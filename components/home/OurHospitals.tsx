"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { AFFILIATED_HOSPITALS } from "@/constants/homepage";
import { StaggerReveal, StaggerItem } from "@/components/shared/StaggerReveal";
import { EASE_SMOOTH } from "@/lib/motion";

export function OurHospitals() {
  return (
    <section className="pb-0">
      <motion.div
        className="container px-5 py-5 box box1 our-hospital"
        style={{ backgroundColor: "#F4F6F6", borderRadius: 25 }}
        initial={{ opacity: 0, y: 32 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-8%" }}
        transition={{ duration: 0.7, ease: EASE_SMOOTH }}
      >
        <div className="row justify-content-center text-center">
          <h3 className="mb-3">Our Hospitals and Institutes</h3>
          <p>
            Discover our network of exceptional hospitals,
            <br />
            each committed to providing comprehensive healthcare with expertise and compassion.
          </p>
        </div>

        <StaggerReveal className="box-row mt-4">
          {AFFILIATED_HOSPITALS.map((hospital) => (
            <StaggerItem key={hospital.name} className="box-container marged">
              <motion.div
                className="block"
                whileHover={{
                  y: -6,
                  transition: { duration: 0.3, ease: EASE_SMOOTH },
                }}
              >
                <div className="image">
                  <Image
                    src={hospital.image}
                    alt={hospital.name}
                    width={400}
                    height={300}
                    className="box-image img-fluid w-100"
                  />
                  <div className="box-content">
                    <h5>{hospital.name}</h5>
                    <span style={{ fontSize: 14 }}>
                      {hospital.address.split(", ").map((line, i, arr) => (
                        <span key={i}>
                          {line}
                          {i < arr.length - 1 && <br />}
                        </span>
                      ))}
                    </span>
                    <h6 className="mt-3">{hospital.phone}</h6>
                    <br />
                    <p>
                      {hospital.external ? (
                        <a
                          style={{ color: "#C71782 !important" }}
                          href={hospital.href}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          Know More <i className="bi bi-chevron-right ms-2" />
                        </a>
                      ) : (
                        <Link style={{ color: "#C71782 !important" }} href={hospital.href}>
                          Know More <i className="bi bi-chevron-right ms-2" />
                        </Link>
                      )}
                    </p>
                  </div>
                </div>
              </motion.div>
            </StaggerItem>
          ))}
        </StaggerReveal>
      </motion.div>
    </section>
  );
}
