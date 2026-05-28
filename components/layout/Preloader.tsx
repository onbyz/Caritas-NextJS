"use client";

import { useEffect } from "react";

/** Hides #preloader after load without conflicting with React DOM reconciliation. */
export function Preloader() {
  useEffect(() => {
    const el = document.getElementById("preloader");
    if (!el) return;
    const hide = () => {
      el.style.display = "none";
      el.classList.add("hidden");
    };
    if (document.readyState === "complete") hide();
    else window.addEventListener("load", hide, { once: true });
    return () => window.removeEventListener("load", hide);
  }, []);
  return <div id="preloader" />;
}
