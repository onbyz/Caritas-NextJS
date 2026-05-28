import { renderStaticPage } from "@/features/pages/renderStaticPage";
import { STATIC_PAGE_REGISTRY } from "@/constants/pages/registry";
import { getStaticPage } from "@/services/static-pages";
import { buildMetadata } from "@/lib/metadata";
import { notFound } from "next/navigation";

const SLUG = "biomedical";
const config = STATIC_PAGE_REGISTRY[SLUG];

export const metadata = buildMetadata({
  title: `${getStaticPage(SLUG)?.title ?? config?.title ?? SLUG} | Caritas Hospital`,
  description: getStaticPage(SLUG)?.subtitle ?? config?.subtitle ?? "",
  path: `/${SLUG}`,
});

const biomedicalSidebar = (
  <h6 className="text-light">
    Caritas Hospital places a high value on the health and safety of patients, staff, and the
    environment, demonstrated through our dedicated Biomedical Waste Management program. We ensure
    safe disposal by following regulatory standards and maintaining affiliation with IMAGE. Our use
    of state-of-the-art systems sets a benchmark for responsible healthcare waste management,
    reflecting our commitment to ethical and environmental practices.
  </h6>
);

export default function Page() {
  if (!getStaticPage(SLUG)) notFound();
  return renderStaticPage(SLUG, { sidebar: biomedicalSidebar });
}
