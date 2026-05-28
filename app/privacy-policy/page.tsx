import { renderStaticPage } from "@/features/pages/renderStaticPage";
import { getStaticPage } from "@/services/static-pages";
import { buildMetadata } from "@/lib/metadata";
import { notFound } from "next/navigation";

const SLUG = "privacy-policy";

export const metadata = buildMetadata({
  title: "Privacy Policy | Caritas Hospital",
  description: "Privacy policy for Caritas Hospital website and services.",
  path: `/${SLUG}`,
});

export default function Page() {
  if (!getStaticPage(SLUG)) notFound();
  return renderStaticPage(SLUG);
}
