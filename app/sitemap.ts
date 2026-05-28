import type { MetadataRoute } from "next";
import { STATIC_ROUTES } from "@/constants/routes";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.caritashospital.org";

export default function sitemap(): MetadataRoute.Sitemap {
  return STATIC_ROUTES.map((route) => ({
    url: `${siteUrl}${route === "/" ? "" : route}`,
    lastModified: new Date(),
    changeFrequency: route === "/" ? "daily" : "weekly",
    priority: route === "/" ? 1 : 0.7,
  }));
}
