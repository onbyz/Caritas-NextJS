import { renderStaticPage } from "@/features/pages/renderStaticPage";
import { getStaticPage } from "@/services/static-pages";
import { buildMetadata } from "@/lib/metadata";
import { notFound } from "next/navigation";

const SLUG = "terms-and-conditions";

export const metadata = buildMetadata({
  title: "Terms & Conditions | Caritas Hospital",
  description: "Terms and conditions for using Caritas Hospital website and services.",
  path: `/${SLUG}`,
});

export default function Page() {
  if (!getStaticPage(SLUG)) notFound();
  return renderStaticPage(SLUG);
}
