import type { Metadata } from "next";
import { BRAND } from "@/constants/brand";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? BRAND.siteUrl;

type PageMeta = {
  title: string;
  description: string;
  path?: string;
  image?: string;
};

export function buildMetadata({
  title,
  description,
  path = "",
  image = "/img/caritas-logo-65.svg",
}: PageMeta): Metadata {
  const url = `${siteUrl}${path}`;
  const fullTitle = title.includes("Caritas")
    ? title
    : `${title} | ${BRAND.siteName}`;

  return {
    title: fullTitle,
    description,
    metadataBase: new URL(siteUrl),
    alternates: { canonical: url },
    openGraph: {
      title: fullTitle,
      description,
      url,
      siteName: BRAND.siteName,
      type: "website",
      images: [{ url: image, width: 1200, height: 630 }],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [image],
    },
  };
}

export const defaultMetadata = buildMetadata({
  title: "Best Private Hospital in Kottayam | Caritas Hospital",
  description:
    "Trusted healthcare with over 60 years of medical excellence in Kottayam. Book appointments, find doctors, and explore our centres of excellence.",
  path: "/",
});
