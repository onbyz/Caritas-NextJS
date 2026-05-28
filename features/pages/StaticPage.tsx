import Image from "next/image";
import type { ReactNode } from "react";
import { SiteLayout } from "@/components/layout/SiteLayout";
import { EnquiryForm } from "@/components/shared/EnquiryForm";
import type { StaticPageConfig } from "@/constants/pages/registry";

type StaticPageProps = StaticPageConfig & {
  sidebar?: ReactNode;
  children?: ReactNode;
};

export function StaticPage({
  title,
  subtitle,
  bannerImage,
  showEnquiry = true,
  intro,
  sidebar,
  children,
}: StaticPageProps) {
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
            {(showEnquiry || sidebar) && (
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
        </div>
      </section>
      {intro && (
        <section className="py-4">
          <div className="container">
            <p style={{ fontWeight: 500 }}>{intro}</p>
          </div>
        </section>
      )}
      {children}
    </SiteLayout>
  );
}
