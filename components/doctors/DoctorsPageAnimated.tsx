"use client";

import { motion, useReducedMotion } from "framer-motion";
import { DoctorFindPanel } from "@/components/doctors/DoctorFindPanel";
import { DoctorListCard } from "@/components/doctors/DoctorListCard";
import {
  cardGridVariants,
  cardItemVariants,
  DOCTORS_VIEWPORT,
  filterPanelVariants,
  heroContainerVariants,
  heroItemVariants,
  pageFadeVariants,
  reducedCardVariants,
  sectionTitleVariants,
} from "@/components/doctors/doctor-motion";
import type { DoctorCardDoctor, DoctorDepartmentOption } from "@/components/doctors/types";
import { mergedToDeptDoctor } from "@/services/doctors";
import "@/components/doctors/doctors-page.css";

type DoctorsPageAnimatedProps = {
  doctors: DoctorCardDoctor[];
  departments: DoctorDepartmentOption[];
  initialSearch?: string;
  initialDepartment?: string;
  hasFilters: boolean;
  filtered: DoctorCardDoctor[];
  search?: string;
  department?: string;
};

function DoctorCardGrid({
  items,
  colClassName = "col-lg-6 col-sm-12 mb-4 pt-4",
}: {
  items: DoctorCardDoctor[];
  colClassName?: string;
}) {
  const prefersReducedMotion = useReducedMotion();
  const itemVariants = prefersReducedMotion ? reducedCardVariants : cardItemVariants;

  return (
    <>
      {items.map((doctor) => (
        <motion.div key={doctor.id} className={colClassName} variants={itemVariants}>
          <DoctorListCard doctor={doctor} card={mergedToDeptDoctor(doctor)} />
        </motion.div>
      ))}
    </>
  );
}

export function DoctorsPageAnimated({
  doctors,
  departments,
  initialSearch,
  initialDepartment,
  hasFilters,
  filtered,
  search,
  department,
}: DoctorsPageAnimatedProps) {
  const prefersReducedMotion = useReducedMotion();
  const pageVariants = prefersReducedMotion
    ? { hidden: { opacity: 0 }, visible: { opacity: 1 } }
    : pageFadeVariants;

  const resultsLabel =
    search && department
      ? `Search results for "${search}" in ${department}`
      : search
        ? `Search results for "${search}"`
        : department
          ? `Doctors in ${department}`
          : "";

  return (
    <motion.div initial="hidden" animate="visible" variants={pageVariants}>
      <section className="py-5 doctors-page-hero">
        <div className="container">
          <motion.div
            className="row justify-content-center text-center"
            variants={heroContainerVariants}
          >
            <motion.h1 style={{ fontWeight: 600 }} variants={heroItemVariants}>
              Doctors
            </motion.h1>
            <motion.h2
              style={{ color: "#c71782", fontWeight: 300 }}
              variants={heroItemVariants}
            >
              Meet Our Expert Medical Team at Caritas Hospital
            </motion.h2>
          </motion.div>
        </div>
      </section>

      <motion.section
        initial="hidden"
        animate="visible"
        variants={prefersReducedMotion ? pageFadeVariants : filterPanelVariants}
      >
        <DoctorFindPanel
          departments={departments}
          initialSearch={initialSearch}
          initialDepartment={initialDepartment}
          submitOnPage
        />
      </motion.section>

      {hasFilters && (
        <motion.section
          className="py-4"
          key={`results-${search ?? ""}-${department ?? ""}`}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="container">
            <motion.h5
              className="mb-3 doctors-results-heading"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            >
              {resultsLabel}
            </motion.h5>
            {filtered.length === 0 ? (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.08, duration: 0.35 }}
              >
                No results found.
              </motion.p>
            ) : (
              <motion.div
                className="row g-4"
                initial="hidden"
                animate="visible"
                variants={cardGridVariants}
              >
                <DoctorCardGrid items={filtered} colClassName="col-lg-6 col-sm-12" />
              </motion.div>
            )}
          </div>
        </motion.section>
      )}

      {!hasFilters && (
        <section className="py-4" id="sections-to-filter">
          <div className="container">
            {departments.map((dept) => {
              const deptDoctors = doctors.filter((d) => d.departmentName === dept.name);
              if (deptDoctors.length === 0) return null;
              return (
                <div
                  key={dept.name}
                  id={dept.name}
                  className="mb-5 doctors-dept-section"
                >
                  <motion.h3
                    className="mainheading text-center mb-4"
                    initial="hidden"
                    whileInView="visible"
                    viewport={DOCTORS_VIEWPORT}
                    variants={sectionTitleVariants}
                  >
                    {dept.name.toUpperCase()}
                  </motion.h3>
                  <motion.div
                    className="row"
                    initial="hidden"
                    whileInView="visible"
                    viewport={DOCTORS_VIEWPORT}
                    variants={cardGridVariants}
                  >
                    <DoctorCardGrid items={deptDoctors} />
                  </motion.div>
                </div>
              );
            })}
          </div>
        </section>
      )}
    </motion.div>
  );
}
