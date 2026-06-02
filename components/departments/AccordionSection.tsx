"use client";

import { useState } from "react";
import { StaggerItem, StaggerReveal } from "@/components/shared/StaggerReveal";

type AccordionItem = { title: string; content: string };

export function AccordionSection({
  items,
  width = "70%",
}: {
  items: AccordionItem[];
  width?: string;
}) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div
      className="row justify-content-center accordion-wrapper treatment-accordion"
      style={{ width, margin: "0 auto" }}
    >
      <StaggerReveal className="w-100" margin="-6% 0px">
      {items.map((item, index) => (
        <StaggerItem key={item.title} className="treatment-accordion__item">
          <button
            type="button"
            className={`accordion treatment-accordion__button${
              openIndex === index ? " active" : ""
            }`}
            onClick={() => setOpenIndex(openIndex === index ? null : index)}
            aria-expanded={openIndex === index}
          >
            <span className="treatment-accordion__index">
              {String(index + 1).padStart(2, "0")}
            </span>
            <span className="treatment-accordion__title">{item.title}</span>
            <span className="treatment-accordion__icon" aria-hidden>
              <i className="bi bi-plus-lg" />
            </span>
          </button>
          <div
            className="panel treatment-accordion__panel"
            style={{ display: openIndex === index ? "block" : "none" }}
            dangerouslySetInnerHTML={{ __html: item.content }}
          />
        </StaggerItem>
      ))}
      </StaggerReveal>
    </div>
  );
}
