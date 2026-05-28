import { createClient, type SanityClient } from "next-sanity";
import imageUrlBuilder from "@sanity/image-url";
import type { SanityImageSource } from "@sanity/image-url";

export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? "";
export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production";
export const apiVersion =
  process.env.NEXT_PUBLIC_SANITY_API_VERSION ?? "2024-01-01";

export const isSanityConfigured = Boolean(projectId);

function createSanityClient(preview = false): SanityClient | null {
  if (!projectId) return null;
  return createClient({
    projectId,
    dataset,
    apiVersion,
    useCdn: !preview,
    token: preview ? process.env.SANITY_API_TOKEN : undefined,
    perspective: preview ? "previewDrafts" : "published",
  });
}

export const sanityClient = createSanityClient(false);
export const sanityPreviewClient = createSanityClient(true);

export function urlFor(source: SanityImageSource) {
  if (!sanityClient) {
    throw new Error("Sanity is not configured");
  }
  return imageUrlBuilder(sanityClient).image(source);
}
