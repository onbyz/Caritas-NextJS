"use client";

import Script from "next/script";

export function LegacyScripts() {
  return (
    <>
      <Script src="/vendor/bootstrap/js/bootstrap.bundle.min.js" strategy="afterInteractive" />
      <Script src="/vendor/aos/aos.js" strategy="afterInteractive" />
      <Script src="/vendor/swiper/swiper-bundle.min.js" strategy="afterInteractive" />
      <Script src="/vendor/glightbox/js/glightbox.min.js" strategy="afterInteractive" />
      <Script src="/vendor/purecounter/purecounter_vanilla.js" strategy="afterInteractive" />
      {/* main.js uses jQuery — must load after jquery in root layout */}
      <Script src="/js/main.js" strategy="afterInteractive" />
      <Script src="/js/navbar.js" strategy="afterInteractive" />
    </>
  );
}
