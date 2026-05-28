"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

const FORM_ROUTES: Record<string, string> = {
  "/health_package_form/": "/api/health-package",
  "/health_package_form": "/api/health-package",
  "/nri-health-checkup-packages": "/api/nri-health-package",
};

export function StaticFormsBridge() {
  const router = useRouter();

  useEffect(() => {
    const handlers: Array<{ form: HTMLFormElement; listener: (e: Event) => void }> = [];

    for (const form of document.querySelectorAll<HTMLFormElement>("form.custom-form")) {
      const action = (form.getAttribute("action") ?? "").trim();
      const api = FORM_ROUTES[action];
      if (!api) continue;

      const listener = async (e: Event) => {
        e.preventDefault();
        const fd = new FormData(form);
        try {
          const res = await fetch(api, { method: "POST", body: fd });
          if (res.ok) router.push("/success");
        } catch {
          router.push("/success");
        }
      };

      form.addEventListener("submit", listener);
      handlers.push({ form, listener });
    }

    return () => {
      for (const { form, listener } of handlers) {
        form.removeEventListener("submit", listener);
      }
    };
  }, [router]);

  return null;
}
