import Image from "next/image";
import type { ReactNode } from "react";
import { StaticFormsBridge } from "@/components/forms/StaticFormsBridge";
import { SectionReveal } from "@/components/motion/SectionReveal";
import { LegacyContentEnhancer } from "@/components/shared/LegacyContentEnhancer";
import { SiteLayout } from "@/components/layout/SiteLayout";
import { EnquiryForm } from "@/components/shared/EnquiryForm";
import type { StaticPageFullContent } from "@/constants/pages/full-content";

type ContentStaticPageProps = StaticPageFullContent & {
  sidebar?: ReactNode;
  children?: ReactNode;
};

export function ContentStaticPage({
  title,
  subtitle,
  bannerImage,
  showEnquiry = true,
  hasHeroBanner = false,
  contentHtml,
  sidebar,
  children,
}: ContentStaticPageProps) {
  const showSidebar = showEnquiry || !!sidebar;

  return (
    <SiteLayout>
      <SectionReveal as="section" className="py-5">
        <div className="container">
          <div className="row justify-content-center text-center">
            <h1 style={{ fontWeight: 600 }}>{title}</h1>
            {subtitle && (
              <h2 style={{ color: "#c71782", fontWeight: 300 }}>{subtitle}</h2>
            )}
          </div>
          {hasHeroBanner && bannerImage && (
            <div className="row px-3 mt-3">
              <div
                className={
                  showSidebar
                    ? "col-lg-8 col-md-10 col-sm-12 text-center px-0"
                    : "col-12 text-center px-0"
                }
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
              {showSidebar && (
                <div
                  className="col-lg-4 col-md-10 col-sm-12 px-5 py-5"
                  style={{ backgroundColor: "#c71782" }}
                >
                  <div className="col-content text-justify">
                    {sidebar ?? (
                      <>
                        <h4 className="text-light">
                          Have Questions?
                          <br />
                          We&apos;re Here to Help
                        </h4>
                        <p className="text-light">
                          Feel free to reach out, and let&apos;s embark on a journey to
                          better health together.
                        </p>
                        <EnquiryForm />
                      </>
                    )}
                  </div>
                </div>
              )}
            </div>
          )}
          {!hasHeroBanner && showSidebar && (
            <div className="row px-3 mt-3 justify-content-end">
              <div
                className="col-lg-4 col-md-10 col-sm-12 px-5 py-5"
                style={{ backgroundColor: "#c71782" }}
              >
                <div className="col-content text-justify">
                  {sidebar ?? (
                    <>
                      <h4 className="text-light">
                        Have Questions?
                        <br />
                        We&apos;re Here to Help
                      </h4>
                      <p className="text-light">
                        Feel free to reach out, and let&apos;s embark on a journey to
                        better health together.
                      </p>
                      <EnquiryForm />
                    </>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </SectionReveal>

      {contentHtml && (
        <div
          className="legacy-static-content"
          dangerouslySetInnerHTML={{ __html: contentHtml }}
        />
      )}
      {children}
      <LegacyContentEnhancer />
      <StaticFormsBridge />
    </SiteLayout>
  );
}
