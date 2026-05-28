import { renderStaticPage } from "@/features/pages/renderStaticPage";
import { buildMetadata } from "@/lib/metadata";
import { getStaticPage } from "@/services/static-pages";
import { notFound } from "next/navigation";

const SLUG = "caritas-internship";

export const metadata = buildMetadata({
  title: `${getStaticPage(SLUG)?.title ?? "Caritas Internship / Observership Program"} | Caritas Hospital`,
  description: getStaticPage(SLUG)?.subtitle ?? "",
  path: `/${SLUG}`,
});

export default function Page() {
  if (!getStaticPage(SLUG)) notFound();
  return renderStaticPage(SLUG);
}
