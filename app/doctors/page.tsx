import Image from "next/image";
import Link from "next/link";
import { DoctorFindPanel } from "@/components/doctors/DoctorFindPanel";
import { SiteLayout } from "@/components/layout/SiteLayout";
import { buildMetadata } from "@/lib/metadata";
import {
  filterDoctors,
  getDoctorDepartmentOptions,
  getMergedDoctors,
  mergedToDeptDoctor,
} from "@/services/doctors";
import { BRAND } from "@/constants/brand";

export const metadata = buildMetadata({
  title: "Find a Doctor | Caritas Hospital",
  description: "Search and find specialist doctors at Caritas Hospital, Kottayam.",
  path: "/doctors",
});

export default async function DoctorsPage({
  searchParams,
}: {
  searchParams: Promise<{ search?: string; department?: string }>;
}) {
  const { search, department } = await searchParams;
  const [doctors, departments] = await Promise.all([
    getMergedDoctors(),
    getDoctorDepartmentOptions(),
  ]);
  const filtered = filterDoctors(doctors, { search, department });
  const hasFilters = Boolean(search?.trim() || department?.trim());

  return (
    <SiteLayout>
      <section className="py-5">
        <div className="container">
          <div className="row justify-content-center text-center">
            <h1 style={{ fontWeight: 600 }}>Doctors</h1>
            <h2 style={{ color: "#c71782", fontWeight: 300 }}>
              Meet Our Expert Medical Team at Caritas Hospital
            </h2>
          </div>
        </div>
      </section>

      <section>
        <DoctorFindPanel
          departments={departments}
          initialSearch={search}
          initialDepartment={department}
          submitOnPage
        />
      </section>

      {hasFilters && (
        <section className="py-4">
          <div className="container">
            <h5 className="mb-3">
              {search && department
                ? `Search results for "${search}" in ${department}`
                : search
                  ? `Search results for "${search}"`
                  : `Doctors in ${department}`}
            </h5>
            {filtered.length === 0 ? (
              <p>No results found.</p>
            ) : (
              <div className="row g-4">
                {filtered.map((doctor) => {
                  const card = mergedToDeptDoctor(doctor);
                  return (
                    <div key={doctor.id} className="col-lg-6 col-sm-12">
                      <DoctorListCard doctor={doctor} card={card} />
                    </div>
                  );
                })}
              </div>
            )}
            <p className="text-center mt-4">
              <Link
                href="/doctors"
                className="enqrybtn d-inline-block px-4 py-2 text-decoration-none"
                style={{ color: "#fff" }}
              >
                Clear Search Result
              </Link>
            </p>
          </div>
        </section>
      )}

      {!hasFilters && (
        <section className="py-4" id="sections-to-filter">
          <div className="container">
            {departments.map((dept) => {
              const deptDoctors = doctors.filter((d) => d.departmentName === dept.name);
              if (deptDoctors.length === 0) return null;
              return (
                <div key={dept.name} id={dept.name} className="mb-5">
                  <h3 className="mainheading text-center mb-4">{dept.name.toUpperCase()}</h3>
                  <div className="row">
                    {deptDoctors.map((doctor) => {
                      const card = mergedToDeptDoctor(doctor);
                      return (
                        <div key={doctor.id} className="col-lg-6 col-sm-12 mb-4 pt-4">
                          <DoctorListCard doctor={doctor} card={card} />
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      )}
    </SiteLayout>
  );
}

function DoctorListCard({
  doctor,
  card,
}: {
  doctor: Awaited<ReturnType<typeof getMergedDoctors>>[number];
  card: ReturnType<typeof mergedToDeptDoctor>;
}) {
  return (
    <div className="doctorbox h-100">
      <div className="d-flex flex-column flex-md-row">
        {card.imageUrl && (
          <div className="col-lg-3 col-md-3 col-sm-12 me-md-3 dr_img">
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
          {card.designation && <h6 dangerouslySetInnerHTML={{ __html: card.designation }} />}
          {doctor.specialization && <p className="small text-muted mb-1">{doctor.specialization}</p>}
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
            <a
              href={BRAND.bookingUrl}
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: "#c71782" }}
            >
              Book An Appointment
              <i className="bi bi-chevron-right ms-2" />
            </a>
          </p>
        </div>
        <div className="col-lg-2 col-md-2 col-sm-12 ms-auto align-self-start drurl">
          <Link href={`/doctors/${card.slug}`} aria-label={`View ${card.name}`}>
            <i className="bi bi-arrow-right-circle" style={{ fontSize: 40, color: "#C71782" }} />
          </Link>
        </div>
      </div>
    </div>
  );
}
