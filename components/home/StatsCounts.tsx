"use client";

import { HOME_STATS } from "@/constants/homepage";
import { FadeIn } from "@/components/shared/FadeIn";
import { useEffect } from "react";

export function StatsCounts() {
  useEffect(() => {
    if (typeof window === "undefined") return;
    const PureCounter = (window as Window & { PureCounter?: new () => void }).PureCounter;
    if (PureCounter) {
      new PureCounter();
    }
  }, []);

  return (
    <section id="counts" className="counts">
      <div className="container animation-element bounce-up">
        <div className="row justify-content-center">
          {HOME_STATS.map((stat) => (
            <FadeIn key={stat.label} className="col-lg-3 col-md-6">
              <div className="count-box box box1">
                <p>
                  <span
                    data-purecounter-end={stat.end}
                    data-purecounter-duration="1"
                    className="purecounter"
                  >
                    0
                  </span>
                  <span className="plus">+</span>
                </p>
                <p>{stat.label}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
