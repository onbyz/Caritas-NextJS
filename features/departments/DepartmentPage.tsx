import Image from "next/image";
import { SiteLayout } from "@/components/layout/SiteLayout";
import { EnquiryForm } from "@/components/shared/EnquiryForm";
import { FadeIn } from "@/components/shared/FadeIn";
import { AccordionSection } from "@/components/departments/AccordionSection";
import { ArticlesSection, type DeptArticle } from "@/components/departments/ArticlesSection";
import { DepartmentStickyNav } from "@/components/departments/DepartmentStickyNav";
import { DoctorGrid, type DeptDoctor } from "@/components/departments/DoctorGrid";
import { FacilitiesSection } from "@/components/departments/FacilitiesSection";
import { TreatmentListSection } from "@/components/departments/TreatmentListSection";

export type DepartmentPageProps = {
  slug: string;
  title: string;
  subtitle: string;
  bannerImage: string;
  navItems: { id: string; label: string }[];
  doctorsAnchorId?: string;
  overview: {
    heading?: string;
    image?: string;
    paragraphs: string[];
    listInColumn?: string[];
    footerHeading?: string;
    footerParagraphs?: string[];
  };
  treatmentsIntro?: string;
  treatments?: { title: string; content: string }[];
  treatmentLists?: {
    intro?: string;
    column1: string[];
    column2?: string[];
    secondIntro?: string;
    listsWidth?: string;
  };
  treatmentsCustomHtml?: string;
  facilities?: {
    heading?: string;
    intro?: string;
    anchorId?: string;
    html?: string;
    columns?: [string[], string[]];
    bgGray?: boolean;
  };
  extraSections?: {
    id?: string;
    heading: string;
    html: string;
    bgGray?: boolean;
  }[];
  doctorGroups?: { heading: string; doctors: DeptDoctor[] }[];
  articles?: DeptArticle[];
};

export function DepartmentPage({
  title,
  subtitle,
  bannerImage,
  navItems,
  doctorsAnchorId = "dedicated-doctors",
  overview,
  treatmentsIntro,
  treatments,
  treatmentLists,
  treatmentsCustomHtml,
  facilities,
  extraSections,
  doctorGroups,
  articles,
}: DepartmentPageProps) {
  const hasTreatments =
    !!treatmentsCustomHtml ||
    (treatments && treatments.length > 0) ||
    (treatmentLists && treatmentLists.column1.length > 0);
  const hasFacilities =
    !!facilities?.html ||
    !!facilities?.intro ||
    (facilities?.columns?.[0]?.length ?? 0) > 0;

  /** Facilities nav item doubles as treatments-procedures (no separate treatments block). */
  const facilitiesBeforeDoctors =
    hasFacilities &&
    !hasTreatments &&
    facilities?.anchorId === "treatments-procedures";

  const facilitiesAfterDoctors = hasFacilities && !facilitiesBeforeDoctors;

  return (
    <SiteLayout>
      <section className="py-5">
        <div className="container">
          <div className="row justify-content-center">
            <h1 style={{ fontWeight: 600 }}>{title}</h1>
            <h2 style={{ color: "#c71782", fontWeight: 300 }}>{subtitle}</h2>
          </div>
          <div className="row px-3">
            <div
              className="col-lg-8 col-md-10 col-sm-12 text-center px-0"
              style={{ margin: "auto 0" }}
            >
              <Image
                src={bannerImage}
                alt={title}
                width={900}
                height={400}
                className="img-fluid"
                style={{ width: "100%", height: "auto" }}
              />
            </div>
            <div
              className="col-lg-4 col-md-10 col-sm-12 px-5 py-5"
              style={{ backgroundColor: "#c71782" }}
            >
              <div className="col-content text-justify">
                <h4 className="text-light">
                  Have Questions?
                  <br />
                  We&apos;re Here to Help
                </h4>
                <p className="text-light">
                  Feel free to reach out, and let&apos;s embark on a journey to better
                  health together.
                </p>
                <EnquiryForm />
              </div>
            </div>
          </div>
        </div>
      </section>

      <DepartmentStickyNav items={navItems} />

      <section id="deptsections">
        <span id="overview" />
        <div className="container">
          <FadeIn className="row">
            {overview.heading && (
              <h3 dangerouslySetInnerHTML={{ __html: overview.heading }} />
            )}
            <p>&nbsp;</p>
            {overview.image ? (
              <>
                <div className="col-lg-5">
                  <Image
                    src={overview.image}
                    alt=""
                    width={500}
                    height={400}
                    style={{ width: "96%" }}
                  />
                </div>
                <div className="col-lg-7 pt-4 mt-1 mb-2">
                  {overview.paragraphs.map((p) => (
                    <p key={p.slice(0, 50)} style={{ fontWeight: 500, marginBottom: 30 }}>
                      {p}
                    </p>
                  ))}
                  {overview.listInColumn && overview.listInColumn.length > 0 && (
                    <>
                      {overview.footerHeading && (
                        <h5 style={{ marginTop: 16 }}>{overview.footerHeading}</h5>
                      )}
                      <ul style={{ marginLeft: 30 }}>
                        {overview.listInColumn.map((item) => (
                          <li key={item.slice(0, 40)}>{item}</li>
                        ))}
                      </ul>
                    </>
                  )}
                </div>
              </>
            ) : (
              <div className="col-12">
                {overview.paragraphs.map((p) => (
                  <p key={p.slice(0, 50)} style={{ fontWeight: 500, marginBottom: 30 }}>
                    {p}
                  </p>
                ))}
                {overview.listInColumn && overview.listInColumn.length > 0 && (
                  <>
                    {overview.footerHeading && (
                      <h5 style={{ marginTop: 16 }}>{overview.footerHeading}</h5>
                    )}
                    <ul style={{ marginLeft: 30 }}>
                      {overview.listInColumn.map((item) => (
                        <li key={item.slice(0, 40)}>{item}</li>
                      ))}
                    </ul>
                  </>
                )}
              </div>
            )}
            {overview.footerHeading && (
              <div className="col-12 mt-4">
                <h5 className="mainheading">{overview.footerHeading}</h5>
              </div>
            )}
            {overview.footerParagraphs?.map((p) => (
              <p key={p.slice(0, 50)} className="col-12">
                {p}
              </p>
            ))}
          </FadeIn>
        </div>
      </section>

      {hasTreatments && (
        <section
          id="deptsections"
          className="department-treatments-section"
        >
          <span id="treatments-procedures" />
          <div className="container">
            <div className="row justify-content-center department-treatments-section__header">
              <span className="department-treatments-section__eyebrow">
                Care Pathways
              </span>
              <h3 className="text-center department-treatments-section__title">
                Treatment and Procedures
              </h3>
              <p className="department-treatments-section__subtitle">
                Explore the major treatments, procedures, and care options available
                in this specialty.
              </p>
            </div>
            {treatmentsCustomHtml ? (
              <div
                className="department-treatments-content department-treatments-content--custom"
                dangerouslySetInnerHTML={{ __html: treatmentsCustomHtml }}
              />
            ) : treatments && treatments.length > 0 ? (
              <>
                {treatmentsIntro && (
                  <p className="text-center mb-5 mt-3 department-treatments-section__intro">
                    {treatmentsIntro}
                  </p>
                )}
                <AccordionSection items={treatments} width="60%" />
              </>
            ) : (
              treatmentLists && (
                <TreatmentListSection
                  intro={treatmentLists.intro ?? treatmentsIntro}
                  column1={treatmentLists.column1}
                  column2={treatmentLists.column2}
                  secondIntro={treatmentLists.secondIntro}
                  width={treatmentLists.listsWidth}
                />
              )
            )}
          </div>
        </section>
      )}

      {facilitiesBeforeDoctors && facilities && (
        <FacilitiesSection facilities={facilities} />
      )}

      {extraSections?.map((section) => (
        <section
          key={section.heading}
          id="deptsections"
          style={
            section.bgGray
              ? { backgroundColor: "#F4F6F6", maxWidth: "100%" }
              : undefined
          }
        >
          {section.id && <span id={section.id} />}
          <div className="container mt-5 py-3">
            <h3>{section.heading}</h3>
            <div dangerouslySetInnerHTML={{ __html: section.html }} />
          </div>
        </section>
      ))}

      {doctorGroups && (
        <DoctorGrid groups={doctorGroups} anchorId={doctorsAnchorId} />
      )}

      {facilitiesAfterDoctors && facilities && (
        <FacilitiesSection facilities={facilities} />
      )}

      {articles && articles.length > 0 && (
        <ArticlesSection articles={articles} departmentName={title} />
      )}
    </SiteLayout>
  );
}
