import Image from "next/image";
import Link from "next/link";
import { ContentStaticPage } from "@/features/pages/ContentStaticPage";
import { ServiceQuickLinks } from "@/components/shared/ServiceQuickLinks";
import { BRAND } from "@/constants/brand";
import type { StaticPageFullContent } from "@/constants/pages/full-content";

const NUTRITION_DOCTOR = {
  id: "ac002a9a210247b99586ff22297c1503",
  name: "Dr. Remya Paul Mukkathu",
  designation: "Consultant - Dietician",
  image: "/media/doctors/Dr.-Remya---Website-Photo111.jpg",
  appointmentEnabled: true,
};

function stripDoctorsSection(html: string | undefined): string | undefined {
  if (!html) return html;
  const start = html.indexOf('<span id="doctors">');
  if (start < 0) return html;
  const sectionStart = html.lastIndexOf("<section", start);
  const nextSection = html.indexOf("<section", start + 20);
  if (sectionStart >= 0 && nextSection > sectionStart) {
    return (html.slice(0, sectionStart) + html.slice(nextSection)).trim();
  }
  return html;
}

function ClinicalNutritionDoctors() {
  const doctor = NUTRITION_DOCTOR;
  return (
    <section id="deptsections">
      <span id="doctors" />
      <div className="container mt-5">
        <h3 className="text-center mb-4">Dedicated Team of Dietitians</h3>
        <p className="text-center">
          At Caritas, our dedicated team of experienced doctors is committed to your
          well-being. With a wealth of medical expertise and a passion for compassionate
          care, our physicians are here to provide you with top-notch healthcare services.
        </p>
        <p>&nbsp;</p>
        <p>&nbsp;</p>
        <div className="row">
          <h5 className="mainheading">Clinical Nutrition</h5>
          <div className="col-lg-6 col-md-6 col-sm-12 mb-4 pt-4 doctorbox">
            <div className="d-flex">
              <div className="col-lg-3 col-md-3 col-sm-12 mr-5 dr_img">
                <Image
                  src={doctor.image}
                  alt={doctor.name}
                  width={120}
                  height={120}
                  className="img-fluid"
                  unoptimized
                />
              </div>
              <div className="col-lg-6 col-md-6 col-sm-12 mx-2">
                <h4>{doctor.name}</h4>
                <h6>{doctor.designation}</h6>
                <h6>
                  <a style={{ color: "#c71782" }} href="/clinical-nutrition">
                    Clinical Nutrition
                  </a>
                </h6>
                <p className="hide_mobile">&nbsp;</p>
                {doctor.appointmentEnabled && (
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
                <Link href={`/doctors/${doctor.id}`}>
                  <i
                    className="bi bi-arrow-right-circle"
                    style={{ fontSize: 40, color: "#C71782" }}
                  />
                </Link>
              </div>
            </div>
            <br />
          </div>
        </div>
      </div>
    </section>
  );
}

export function ClinicalNutritionPage({ page }: { page: StaticPageFullContent }) {
  const body = stripDoctorsSection(page.contentHtml);
  const linksIdx = body?.lastIndexOf('style="width: 90%; margin: 0 auto"');
  let contentHtml = body;
  if (body && linksIdx && linksIdx > 0) {
    const sectionStart = body.lastIndexOf("<section", linksIdx);
    if (sectionStart > 0) contentHtml = body.slice(0, sectionStart).trim();
  }

  return (
    <ContentStaticPage {...page} contentHtml={contentHtml}>
      <ClinicalNutritionDoctors />
      <ServiceQuickLinks activeHref="/clinical-nutrition" />
    </ContentStaticPage>
  );
}
