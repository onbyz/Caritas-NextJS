import { renderStaticPage } from "@/features/pages/renderStaticPage";
import { buildMetadata } from "@/lib/metadata";
import { getStaticPage } from "@/services/static-pages";
import { notFound } from "next/navigation";

const SLUG = "caritas-neuroscience-drnb";

export const metadata = buildMetadata({
  title: `${getStaticPage(SLUG)?.title ?? "Caritas Neuroscience DrNB"} | Caritas Hospital`,
  description: getStaticPage(SLUG)?.subtitle ?? "",
  path: `/${SLUG}`,
});

export default function Page() {
  if (!getStaticPage(SLUG)) notFound();
  return renderStaticPage(SLUG);
}
