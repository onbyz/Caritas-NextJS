"use client";

import { useEffect } from "react";

/** Desktop cbp-hrmenu hover (≥992px) and click toggle (<992px) — matches Django base.html */
export function useDesktopMenu() {
  useEffect(() => {
    const menu = document.getElementById("cbp-hrmenu");
    if (!menu) return;

    const dropmenus = menu.querySelectorAll<HTMLElement>("li.dropmenu");

    const closeAll = () => {
      dropmenus.forEach((li) => li.classList.remove("cbp-hropen"));
    };

    const onDocClick = (e: MouseEvent) => {
      if (!menu.contains(e.target as Node)) closeAll();
    };

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeAll();
    };

    const setup = () => {
      dropmenus.forEach((li) => {
        const link = li.querySelector<HTMLAnchorElement>("a[aria-haspopup]");
        if (!link) return;

        li.onmouseenter = null;
        li.onmouseleave = null;
        link.onclick = null;

        if (window.innerWidth > 992) {
          li.onmouseenter = () => li.classList.add("cbp-hropen");
          li.onmouseleave = () => li.classList.remove("cbp-hropen");
          link.onclick = (e) => e.preventDefault();
        } else {
          link.onclick = (e) => {
            e.preventDefault();
            const isOpen = li.classList.contains("cbp-hropen");
            closeAll();
            if (!isOpen) li.classList.add("cbp-hropen");
          };
        }
      });
    };

    setup();
    window.addEventListener("resize", setup);
    document.addEventListener("click", onDocClick);
    document.addEventListener("keydown", onKeyDown);

    return () => {
      window.removeEventListener("resize", setup);
      document.removeEventListener("click", onDocClick);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, []);
}
