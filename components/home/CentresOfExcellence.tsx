"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FadeIn } from "@/components/shared/FadeIn";
import { CENTRES_OF_EXCELLENCE } from "@/constants/navigation";
import { DOCTOR_CAROUSEL_IMAGES } from "@/services/homepage";

export function CentresOfExcellence() {
  const [activeImage, setActiveImage] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveImage((i) => (i + 1) % DOCTOR_CAROUSEL_IMAGES.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  const half = Math.ceil(CENTRES_OF_EXCELLENCE.length / 2);
  const col1 = CENTRES_OF_EXCELLENCE.slice(0, half);
  const col2 = CENTRES_OF_EXCELLENCE.slice(half);

  const LinkList = ({
    items,
    className,
  }: {
    items: typeof CENTRES_OF_EXCELLENCE;
    className?: string;
  }) => (
    <div className={className}>
      {items.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className="d-flex justify-content-between align-items-center mb-4 link-with-icon box box1"
        >
          {item.label}
          <i className="bi bi-chevron-right ms-2" />
        </Link>
      ))}
    </div>
  );

  return (
    <section id="about" className="about">
      <div className="container1" style={{ margin: 0 }}>
        <FadeIn className="section-title animation-element bounce-up tab-title">
          <h3 className="mb-3 box box1">Centres of Excellence</h3>
          <h6 className="box box1">
            Discover exceptional care through our specialized
            <br /> centres of excellence.
          </h6>
        </FadeIn>

        <div className="row justify-content-center">
          <div className="col-md-6 col-lg-4">
            <div className="image-slider">
              {DOCTOR_CAROUSEL_IMAGES.map((image, index) => (
                <Image
                  key={image}
                  src={`/img/${image}`}
                  width={400}
                  height={600}
                  alt="Caritas doctor"
                  className={index === activeImage ? "active" : ""}
                  decoding="async"
                  style={{
                    display: index === activeImage ? "block" : "none",
                    width: "100%",
                    height: "auto",
                  }}
                />
              ))}
            </div>
          </div>

          <div className="col-lg-8 pt-lg-0 content d-flex flex-column hide_mobile">
            <div className="row coelist main-departments">
              <div className="col-lg-5 px-4 animation-element bounce-up">
                <LinkList items={col1} />
              </div>
              <div className="col-lg-1" />
              <div className="col-lg-5 px-4 animation-element bounce-up">
                <LinkList items={col2} />
              </div>
            </div>
          </div>

          <div className="row coelistmob pt-4">
            {CENTRES_OF_EXCELLENCE.map((item) => (
              <div key={item.href} className="col-lg-5 px-5 animation-element bounce-up">
                <p>
                  <Link href={item.href} className="box box1">
                    {item.label} <i className="bi bi-chevron-right mx-3" />
                  </Link>
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
