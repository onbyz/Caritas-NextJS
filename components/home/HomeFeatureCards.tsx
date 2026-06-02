import type { ReactNode } from "react";
import Link from "next/link";
import { FadeIn } from "@/components/shared/FadeIn";

function TextCard({
  title,
  description,
  href,
  linkLabel,
  extraLinkMargin,
}: {
  title: ReactNode;
  description: string;
  href: string;
  linkLabel: string;
  extraLinkMargin?: boolean;
}) {
  return (
    <div className="col-md-4 py-5 px-4">
      <h3 className="card-title box box1" style={{ marginTop: -40 }}>
        {title}
      </h3>
      <p className="card-text box box1">{description}</p>
      <p style={extraLinkMargin ? { marginTop: "45px !important" } : undefined}>
        <Link className="box box1" style={{ color: "#C71782 !important" }} href={href}>
          {linkLabel} <i className="bi bi-chevron-right ms-2" />
        </Link>
      </p>
    </div>
  );
}

function ImageCard({ src }: { src: string }) {
  return (
    <div
      className="col-md-4 box box1 home-feature-image"
      style={{
        backgroundImage: `url(${src})`,
      }}
      aria-hidden
    />
  );
}

export function HomeFeatureCards() {
  return (
    <section id="card">
      <div className="container desktop-card mt-5 animation-element bounce-up d-none d-lg-block">
        <div className="row justify-content-center mb-5">
          <TextCard
            title={
              <>
                Health Checkup <br />
                Packages
              </>
            }
            description="Our health checkup packages are thoughtfully crafted to provide you with a holistic assessment of your health, enabling early detection of potential concerns and proactive management."
            href="/health-checkup-packages"
            linkLabel="View All Packages"
            extraLinkMargin
          />
          <ImageCard src="/img/home-health-banner.jpg" />
          <TextCard
            title={
              <>
                Caritas <br />
                Pastoral Care
              </>
            }
            description="Provides spiritual, psychological assistance and emotional support to the patients and to their dear ones if needed, by which it contributes to the holistic health program of the hospital, irrespective of their caste, creed and religion."
            href="/pastoralcare"
            linkLabel="Know More"
          />
        </div>
        <div className="row justify-content-center box box1">
          <ImageCard src="/img/home-pastoral-care.png" />
          <TextCard
            title={
              <>
                Caritas <br />
                Organ Transplant
              </>
            }
            description="Caritas Hospital & Institute of Health Sciences stands as a licensed multi-organ transplantation center, boasting both deceased and live donor programs, led by an exceptional team of doctors at the forefront of the Caritas Transplant Programme."
            href="/organ"
            linkLabel="Know More"
          />
          <ImageCard src="/img/home-organ-banner.jpg" />
        </div>
      </div>

      <div className="d-block d-lg-none mb-2">
        <div className="container tablet-card mt-5 animation-element bounce-up">
          <FadeIn>
            <div className="row justify-content-center">
              <div className="col-12 col-md-6 py-5 px-4">
                <h3 className="card-title box box1" style={{ marginTop: -40 }}>
                  Health Checkup <br />
                  Packages
                </h3>
                <p className="card-text box box1">
                  Our health checkup packages are thoughtfully crafted to provide you with a
                  holistic assessment of your health, enabling early detection of potential
                  concerns and proactive management.
                </p>
                <p>
                  <Link
                    className="box box1"
                    style={{ color: "#C71782 !important" }}
                    href="/health-checkup-packages"
                  >
                    View All Packages <i className="bi bi-chevron-right ms-2" />
                  </Link>
                </p>
              </div>
              <div
                className="col-12 col-md-6 box box1 home-feature-image"
                style={{
                  backgroundImage: "url(/img/home-health-banner.jpg)",
                }}
              />
            </div>
            <br />
            <br />
            <div className="row justify-content-center">
              <div className="col-12 col-md-6 py-5 px-4 box box1">
                <h3 className="card-title box box1" style={{ marginTop: -40 }}>
                  Caritas <br />
                  Pastoral Care
                </h3>
                <p className="card-text box box1">
                  Provides spiritual, psychological assistance and emotional support to the
                  patients and to their dear ones if needed.
                </p>
                <p>
                  <Link
                    className="box box1"
                    style={{ color: "#C71782 !important" }}
                    href="/pastoralcare"
                  >
                    Know More <i className="bi bi-chevron-right ms-2" />
                  </Link>
                </p>
              </div>
              <div
                className="col-12 col-md-6 box box1 home-feature-image"
                style={{
                  backgroundImage: "url(/img/home-pastoral-care.png)",
                }}
              />
            </div>
            <br />
            <br />
            <div className="row justify-content-center box box1">
              <div className="col-12 col-md-6 py-5 px-4">
                <h3 className="card-title box box1" style={{ marginTop: -40 }}>
                  Caritas <br />
                  Organ Transplant
                </h3>
                <p className="card-text box box1">
                  Caritas Hospital stands as a licensed multi-organ transplantation center with
                  deceased and live donor programs.
                </p>
                <p>
                  <Link className="box box1" style={{ color: "#C71782 !important" }} href="/organ">
                    Know More <i className="bi bi-chevron-right ms-2" />
                  </Link>
                </p>
              </div>
              <div
                className="col-12 col-md-6 box box1 home-feature-image"
                style={{
                  backgroundImage: "url(/img/home-organ-banner.jpg)",
                }}
              />
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
