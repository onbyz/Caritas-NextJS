import { VideoGridPage } from "@/features/pages/CmsListPages";
import { STATIC_PAGE_REGISTRY } from "@/constants/pages/registry";
import { getTestimonialVideosResolved } from "@/services/cms";
import { getStaticPage } from "@/services/static-pages";
import { buildMetadata } from "@/lib/metadata";
import { notFound } from "next/navigation";

const SLUG = "testimonials";
const config = STATIC_PAGE_REGISTRY[SLUG];

export const metadata = buildMetadata({
  title: `${getStaticPage(SLUG)?.title ?? config?.title ?? SLUG} | Caritas Hospital`,
  description: getStaticPage(SLUG)?.subtitle ?? config?.subtitle ?? "",
  path: `/${SLUG}`,
});

export default async function Page() {
  const page = getStaticPage(SLUG);
  if (!page) notFound();
  const videos = await getTestimonialVideosResolved();
  return <VideoGridPage page={page} videos={videos} />;
}
