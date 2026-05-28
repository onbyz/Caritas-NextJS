import { renderStaticPage } from "@/features/pages/renderStaticPage";
import { buildMetadata } from "@/lib/metadata";
import { getStaticPage } from "@/services/static-pages";
import { notFound } from "next/navigation";

const SLUG = "college-of-pharmacy";

export const metadata = buildMetadata({
  title: `${getStaticPage(SLUG)?.title ?? "Caritas College of Pharmacy"} | Caritas Hospital`,
  description: getStaticPage(SLUG)?.subtitle ?? "",
  path: `/${SLUG}`,
});

export default function Page() {
  if (!getStaticPage(SLUG)) notFound();
  return renderStaticPage(SLUG);
}
