"use client";

import Image from "next/image";
import { FadeIn } from "@/components/shared/FadeIn";
import { useEffect } from "react";

const RATINGS = [
  {
    src: "/img/Google Rating.png",
    alt: "Google Rating",
    text: "4.7 Star Google Rating",
    width: 117,
    height: 153,
  },
  {
    src: "/img/GREAT PLACE TO WORK 2.jpg",
    alt: "Great Place to Work",
    text: "Great Place to Work Certification Since 2025",
    width: 117,
    height: 152,
  },
  {
    src: "/img/nps score big.png",
    alt: "NPS Score",
    text: "NPS (Net Promoter Score) 83.1",
    width: 117,
    height: 153,
  },
  {
    src: "/img/WSO.png",
    alt: "WSO Award",
    text: "Diamond Status by WSO for Excellence in Stroke Care 2025",
    width: 117,
    height: 153,
  },
];

export function RatingsSection() {
  useEffect(() => {
    if (typeof window === "undefined") return;
    const initSwiper = async () => {
      const Swiper = (await import("swiper")).default;
      const { Autoplay } = await import("swiper/modules");
      const el = document.querySelector(".home-ratings-swiper");
      if (el && window.innerWidth < 992) {
        new Swiper(".home-ratings-swiper", {
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
        <div className="container mt-5">
          <div className="row text-center animation-element bounce-up">
            {RATINGS.map((item) => (
              <FadeIn key={item.alt} className="col-lg-3 col-md-6 mx-auto box box1">
                <Image
                  src={item.src}
                  alt={item.alt}
                  width={item.width}
                  height={item.height}
                  className="mx-auto d-block"
                  style={{ width: item.width, height: "auto" }}
                />
                <p className="mt-3" dangerouslySetInnerHTML={{ __html: item.text.replace(" ", "<br />") }} />
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      <section className="hide_desktop">
        <div className="container mt-5">
          <div className="home-ratings-swiper swiper-container">
            <div className="swiper-wrapper animation-element bounce-up">
              {RATINGS.map((item) => (
                <div key={item.alt} className="swiper-slide box box1">
                  <Image
                    src={item.src}
                    alt={item.alt}
                    width={117}
                    height={153}
                    className="mx-auto d-block"
                  />
                  <p className="mt-3 text-center">{item.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
