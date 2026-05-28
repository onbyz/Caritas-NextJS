"use client";

import Image from "next/image";
import Link from "next/link";
import { HOME_ACCREDITATIONS } from "@/constants/homepage";
import { FadeIn } from "@/components/shared/FadeIn";
import { useEffect } from "react";

export function AccreditationsSection() {
  useEffect(() => {
    if (typeof window === "undefined") return;
    const initSwiper = async () => {
      const Swiper = (await import("swiper")).default;
      const { Autoplay } = await import("swiper/modules");
      const el = document.querySelector(".home-accreditations-swiper");
      if (el && window.innerWidth < 992) {
        new Swiper(".home-accreditations-swiper", {
          modules: [Autoplay],
          slidesPerView: 1,
          autoplay: { delay: 4000 },
          loop: true,
        });
      }
    };
    initSwiper();
  }, []);

  return (
    <>
      <section className="hide_mobile">
        <div className="container mt-5 animation-element bounce-up pb-5">
          <div className="row text-center box box1">
            <h3 className="my-3">Accreditations & Certifications</h3>
            <span style={{ fontSize: 14 }}>
              Elevating Standards, Ensuring Excellence: Explore Our
              <br />
              Accreditations and Certifications
            </span>
          </div>
          <div className="row text-center mt-5 box box1">
            {HOME_ACCREDITATIONS.map((item, index) => (
              <FadeIn
                key={item.alt}
                className={`col-lg-3${index < HOME_ACCREDITATIONS.length - 1 ? " border-end" : ""} box box1`}
              >
                <Image
                  src={item.src}
                  alt={item.alt}
                  width={item.width}
                  height={item.height}
                  style={{ maxWidth: "100%", height: "auto" }}
                  className="mx-auto d-block"
                />
                <p dangerouslySetInnerHTML={{ __html: item.labelHtml }} />
              </FadeIn>
            ))}
            <p>&nbsp;</p>
            <p className="box box1" style={{ textAlign: "center" }}>
              <Link style={{ color: "#C71782 !important" }} href="/achievements#accreditations">
                View All <i className="bi bi-chevron-right ms-2" />
              </Link>
            </p>
          </div>
        </div>
      </section>

      <section className="hide_desktop pb-5">
        <div className="container mt-5 animation-element bounce-up">
          <div className="row text-center mb-5 box box1">
            <h3 className="my-3">Accreditations & Certifications</h3>
            <span style={{ fontSize: 14 }}>
              Elevating Standards, Ensuring Excellence: Explore Our <br /> Accreditations and
              Certifications
            </span>
          </div>
          <div className="home-accreditations-swiper swiper-container">
            <div className="swiper-wrapper">
              {HOME_ACCREDITATIONS.map((item) => (
                <div key={item.alt} className="swiper-slide box box1">
                  <Image
                    src={item.src}
                    alt={item.alt}
                    width={item.width}
                    height={item.height}
                    className="mx-auto d-block"
                    style={{ maxWidth: 136 }}
                  />
                  <p
                    className="text-center mt-3"
                    dangerouslySetInnerHTML={{ __html: item.labelHtml }}
                  />
                </div>
              ))}
            </div>
          </div>
          <p className="text-center mt-4 box box1">
            <Link style={{ color: "#C71782 !important" }} href="/achievements#accreditations">
              View All <i className="bi bi-chevron-right ms-2" />
            </Link>
          </p>
        </div>
      </section>
    </>
  );
}
