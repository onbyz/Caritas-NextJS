import { renderStaticPage } from "@/features/pages/renderStaticPage";
import { STATIC_PAGE_REGISTRY } from "@/constants/pages/registry";
import { getStaticPage } from "@/services/static-pages";
import { buildMetadata } from "@/lib/metadata";
import { notFound } from "next/navigation";

const SLUG = "health-checkup-packages";
const config = STATIC_PAGE_REGISTRY[SLUG];

export const metadata = buildMetadata({
  title: `${getStaticPage(SLUG)?.title ?? config?.title ?? SLUG} | Caritas Hospital`,
  description: getStaticPage(SLUG)?.subtitle ?? config?.subtitle ?? "",
  path: `/${SLUG}`,
});

export default function Page() {
  if (!getStaticPage(SLUG)) notFound();
  return renderStaticPage(SLUG);
}
