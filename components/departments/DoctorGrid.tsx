import Image from "next/image";
import Link from "next/link";
import { StaggerItem, StaggerReveal } from "@/components/shared/StaggerReveal";
import { BRAND } from "@/constants/brand";

export type DeptDoctor = {
  id: string;
  name: string;
  designation?: string;
  imageUrl?: string;
  slug?: string;
  appointmentEnabled?: boolean;
};

export function DoctorGrid({
  groups,
  anchorId = "dedicated-doctors",
}: {
  groups: { heading: string; doctors: DeptDoctor[] }[];
  anchorId?: string;
}) {
  if (!groups.some((g) => g.doctors.length)) return null;

  return (
    <section id="deptsections">
      <span id={anchorId} />
      <div className="container mt-5">
        <h3 className="text-center mb-4">Dedicated Team of Doctors</h3>
        <p className="text-center">
          At Caritas, our dedicated team of experienced doctors is committed to your
          well-being. With a wealth of medical expertise and a passion for compassionate
          care, our physicians are here to provide you with top-notch healthcare services.
        </p>
        <p>&nbsp;</p>
        <p>&nbsp;</p>

        {groups.map((group) =>
          group.doctors.length > 0 ? (
            <div key={group.heading}>
              <h5 className="mainheading">{group.heading}</h5>
              <StaggerReveal className="row">
              {group.doctors.map((doctor) => (
                <StaggerItem
                  key={doctor.id}
                  className="col-lg-6 col-md-6 col-sm-12 mb-4 pt-4 doctorbox"
                >
                  <div className="d-flex flex-column flex-md-row align-items-center">
                    <div className="col-lg-3 col-md-3 col-sm-12 mr-5 dr_img">
                      {doctor.imageUrl ? (
                        <Image
                          src={doctor.imageUrl}
                          alt={doctor.name}
                          width={120}
                          height={120}
                          className="img-fluid"
                          unoptimized={doctor.imageUrl.startsWith("/media/")}
                        />
                      ) : (
                        <div
                          className="img-fluid bg-light"
                          style={{ width: 100, height: 100 }}
                        />
                      )}
                    </div>
                    <div className="col-lg-6 col-md-6 col-sm-12 mx-2 mt-2">
                      <h4>{doctor.name}</h4>
                      {doctor.designation && <h6>{doctor.designation}</h6>}
                      <p className="hide_mobile">&nbsp;</p>
                      {doctor.appointmentEnabled !== false && (
                        <p>
                          <a
                            style={{ color: "#c71782" }}
                            href={BRAND.bookingUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            Book An Appointment
                            <i className="bi bi-chevron-right ms-2" />
                          </a>
                        </p>
                      )}
                    </div>
                    <div className="col-lg-2 col-md-2 col-sm-12 ml-auto align-self-start drurl">
                      {doctor.slug ? (
                        <Link href={`/doctors/${doctor.slug}`}>
                          <i
                            className="bi bi-arrow-right-circle"
                            style={{ fontSize: 40, color: "#C71782" }}
                          />
                        </Link>
                      ) : (
                        <i
                          className="bi bi-arrow-right-circle"
                          style={{ fontSize: 40, color: "#C71782" }}
                        />
                      )}
                    </div>
                  </div>
                  <br />
                </StaggerItem>
              ))}
              </StaggerReveal>
            </div>
          ) : null,
        )}
      </div>
    </section>
  );
}
