"use client";

import { useState } from "react";

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
    <div className="row justify-content-center accordion-wrapper" style={{ width, margin: "0 auto" }}>
      {items.map((item, index) => (
        <div key={item.title} style={{ width: "100%" }}>
          <button
            type="button"
            className={`accordion${openIndex === index ? " active" : ""}`}
            onClick={() => setOpenIndex(openIndex === index ? null : index)}
          >
            {item.title}
          </button>
          <div
            className="panel"
            style={{ display: openIndex === index ? "block" : "none" }}
            dangerouslySetInnerHTML={{ __html: item.content }}
          />
          <hr style={{ width: "100%", margin: 0 }} />
        </div>
      ))}
    </div>
  );
}
