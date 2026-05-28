import Link from "next/link";
import { FadeIn } from "@/components/shared/FadeIn";
import { QUICK_SERVICES } from "@/constants/navigation";

const ICONS = [
  "bi-calendar-check",
  "bi-camera-video",
  "bi-heart-pulse",
  "bi-people",
  "bi-pencil-square",
];

export function QuickServices() {
  return (
    <section className="services tab-services align-items-center">
      <div className="container mt-2 animation-element bounce-up">
        <div className="row justify-content-center">
          {QUICK_SERVICES.map((service, index) => {
            const isExternal = service.external || service.href.startsWith("http");
            const href = isExternal ? service.href : service.href;
            const content = (
              <div className="d-flex align-items-center">
                <div className="icon mx-3">
                  <i className={`bi ${ICONS[index] ?? "bi-arrow-right"}`} />
                </div>
                <div>
                  <h6 style={{ marginTop: 10 }}>{service.label}</h6>
                </div>
              </div>
            );

            return (
              <FadeIn
                key={service.href}
                className={`col-md-6 col-lg-${index === 0 ? "3 d-md-none" : index === 1 ? "3" : index === 2 ? "4" : index === 3 ? "3" : "2"} box box1`}
              >
                {isExternal ? (
                  <a href={href} target="_blank" rel="noopener noreferrer">
                    {content}
                  </a>
                ) : (
                  <Link href={href}>{content}</Link>
                )}
              </FadeIn>
            );
          })}
        </div>
      </div>
    </section>
  );
}
