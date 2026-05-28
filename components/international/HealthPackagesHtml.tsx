"use client";

import { useEffect } from "react";

/** Renders migrated Django health-packages HTML with accordion behaviour */
export function HealthPackagesHtml({ html }: { html: string }) {
  useEffect(() => {
    const acc = document.querySelectorAll(".health-package-international-patients .accordion, .accordion-wrapper .accordion");
    const handlers: Array<{ el: Element; fn: () => void }> = [];

    acc.forEach((button) => {
      const fn = (event: Event) => {
        event.preventDefault();
        button.classList.toggle("active");
        const panel = button.nextElementSibling as HTMLElement | null;
        if (panel?.classList.contains("panel")) {
          panel.style.display = panel.style.display === "block" ? "none" : "block";
        }
      };
      button.addEventListener("click", fn);
      handlers.push({ el: button, fn });
    });

    return () => {
      handlers.forEach(({ el, fn }) => el.removeEventListener("click", fn));
    };
  }, [html]);

  return <div dangerouslySetInnerHTML={{ __html: html }} />;
}
