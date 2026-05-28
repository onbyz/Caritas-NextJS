import type { Metadata } from "next";
import Script from "next/script";
import { Analytics } from "@/components/layout/Analytics";
import { BackToTop } from "@/components/layout/BackToTop";
import { FloatingActionIcons } from "@/components/layout/FloatingActionIcons";
import { Preloader } from "@/components/layout/Preloader";
import { SmoothScrollProvider } from "@/components/layout/SmoothScrollProvider";
import { defaultMetadata } from "@/lib/metadata";
import "./globals.css";
import "@/styles/legacy.css";

export const metadata: Metadata = defaultMetadata;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/img/fevicon-new.png" />
        <link rel="apple-touch-icon" href="/img/fevicon-new.png" />
        <link
          href="https://fonts.googleapis.com/css?family=Open+Sans:300,300i,400,400i,600,600i,700,700i|Roboto:300,300i,400,400i,500,500i,600,600i,700,700i|Poppins:300,300i,400,400i,500,500i,600,600i,700,700i"
          rel="stylesheet"
        />
        <link href="/vendor/aos/aos.css" rel="stylesheet" />
        <link href="/vendor/bootstrap/css/bootstrap.min.css" rel="stylesheet" />
        <link href="/vendor/bootstrap-icons/bootstrap-icons.min.css" rel="stylesheet" />
        <link href="/vendor/boxicons/css/boxicons.min.css" rel="stylesheet" />
        <link href="/vendor/glightbox/css/glightbox.min.css" rel="stylesheet" />
        <link href="/vendor/swiper/swiper-bundle.min.css" rel="stylesheet" />
        <link href="/css/navbar.css" rel="stylesheet" />
        <link href="/css/style3.css" rel="stylesheet" />
        <link
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css"
          rel="stylesheet"
        />
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/slick-carousel@1.8.1/slick/slick.min.css"
        />
      </head>
      <body>
        {/* jQuery required by /js/main.js and Slick (same as Django base.html) */}
        <Script
          src="https://code.jquery.com/jquery-3.6.0.min.js"
          strategy="beforeInteractive"
        />
        <Analytics />
        <SmoothScrollProvider>
        {children}
        <FloatingActionIcons />
        <Preloader />
        <BackToTop />
        </SmoothScrollProvider>
        <Script
          src="https://cdn.jsdelivr.net/npm/slick-carousel@1.8.1/slick/slick.min.js"
          strategy="lazyOnload"
        />
      </body>
    </html>
  );
}
