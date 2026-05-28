"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { BRAND } from "@/constants/brand";
import type { DoctorCardDoctor, DoctorCardView } from "@/components/doctors/types";

const hoverSpring = { type: "spring" as const, stiffness: 420, damping: 28 };

type DoctorListCardProps = {
  doctor: DoctorCardDoctor;
  card: DoctorCardView;
};

export function DoctorListCard({ doctor, card }: DoctorListCardProps) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.div
      className="doctorbox h-100 doctors-card"
      whileHover={prefersReducedMotion ? undefined : { y: -5 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="d-flex flex-column flex-md-row">
        {card.imageUrl && (
          <div className="col-lg-3 col-md-3 col-sm-12 me-md-3 dr_img doctors-card__image-wrap">
            <Image
              src={card.imageUrl}
              alt={card.name}
              width={120}
              height={120}
              className="img-fluid"
              style={{ objectFit: "cover" }}
              unoptimized={card.imageUrl.startsWith("/media/")}
            />
          </div>
        )}
        <div className="col-lg-6 col-md-6 col-sm-12 mx-2 flex-grow-1">
          <h4>{card.name}</h4>
          {card.designation && (
            <h6 dangerouslySetInnerHTML={{ __html: card.designation }} />
          )}
          {doctor.specialization && (
            <p className="small text-muted mb-1">{doctor.specialization}</p>
          )}
          {doctor.departmentName && (
            <h6>
              {doctor.departmentUrl ? (
                <Link href={doctor.departmentUrl} style={{ color: "#c71782" }}>
                  {doctor.departmentName}
                </Link>
              ) : (
                doctor.departmentName
              )}
            </h6>
          )}
          <p className="hide_mobile">&nbsp;</p>
          <p>
            <motion.a
              href={BRAND.bookingUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="doctors-appointment-link"
              style={{ color: "#c71782" }}
              whileHover={prefersReducedMotion ? undefined : { x: 4 }}
              whileTap={prefersReducedMotion ? undefined : { scale: 0.98 }}
              transition={hoverSpring}
            >
              Book An Appointment
              <motion.i
                className="bi bi-chevron-right ms-2"
                aria-hidden
                style={{ display: "inline-block" }}
                whileHover={prefersReducedMotion ? undefined : { x: 3 }}
                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              />
            </motion.a>
          </p>
        </div>
        <div className="col-lg-2 col-md-2 col-sm-12 ms-auto align-self-start drurl">
          <motion.div
            className="doctors-profile-link"
            whileHover={prefersReducedMotion ? undefined : { scale: 1.06, x: 3 }}
            whileTap={prefersReducedMotion ? undefined : { scale: 0.95 }}
            transition={hoverSpring}
          >
            <Link href={`/doctors/${card.slug}`} aria-label={`View ${card.name}`}>
              <i
                className="bi bi-arrow-right-circle"
                style={{ fontSize: 40, color: "#C71782" }}
              />
            </Link>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}
