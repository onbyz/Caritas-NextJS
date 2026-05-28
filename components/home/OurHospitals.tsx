import Image from "next/image";
import Link from "next/link";
import { AFFILIATED_HOSPITALS } from "@/constants/homepage";
import { FadeIn } from "@/components/shared/FadeIn";

export function OurHospitals() {
  return (
    <section className="pb-0 animation-element bounce-up">
      <div
        className="container px-5 py-5 box box1 our-hospital"
        style={{ backgroundColor: "#F4F6F6", borderRadius: 25 }}
      >
        <div className="row justify-content-center text-center">
          <h3 className="mb-3">Our Hospitals and Institutes</h3>
          <p>
            Discover our network of exceptional hospitals,
            <br />
            each committed to providing comprehensive healthcare with expertise and compassion.
          </p>
        </div>
        <div className="box-row mt-4">
          {AFFILIATED_HOSPITALS.map((hospital) => (
            <FadeIn key={hospital.name} className="box-container marged animation-element bounce-up">
              <div className="block">
                <div className="image">
                  <Image
                    src={hospital.image}
                    alt={hospital.name}
                    width={400}
                    height={300}
                    className="box-image img-fluid w-100"
                  />
                  <div className="box-content">
                    <h5>{hospital.name}</h5>
                    <span style={{ fontSize: 14 }}>
                      {hospital.address.split(", ").map((line, i, arr) => (
                        <span key={i}>
                          {line}
                          {i < arr.length - 1 && <br />}
                        </span>
                      ))}
                    </span>
                    <h6 className="mt-3">{hospital.phone}</h6>
                    <br />
                    <p>
                      {hospital.external ? (
                        <a
                          style={{ color: "#C71782 !important" }}
                          href={hospital.href}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          Know More <i className="bi bi-chevron-right ms-2" />
                        </a>
                      ) : (
                        <Link style={{ color: "#C71782 !important" }} href={hospital.href}>
                          Know More <i className="bi bi-chevron-right ms-2" />
                        </Link>
                      )}
                    </p>
                  </div>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
