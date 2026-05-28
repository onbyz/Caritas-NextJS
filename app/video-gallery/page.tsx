import { VideoGridPage } from "@/features/pages/CmsListPages";
import { STATIC_PAGE_REGISTRY } from "@/constants/pages/registry";
import { getVideoGalleryResolved } from "@/services/cms";
import { getStaticPage } from "@/services/static-pages";
import { buildMetadata } from "@/lib/metadata";
import { notFound } from "next/navigation";

const SLUG = "video-gallery";
const config = STATIC_PAGE_REGISTRY[SLUG];

export const metadata = buildMetadata({
  title: `${getStaticPage(SLUG)?.title ?? config?.title ?? SLUG} | Caritas Hospital`,
  description: getStaticPage(SLUG)?.subtitle ?? config?.subtitle ?? "",
  path: `/${SLUG}`,
});

type Props = { searchParams: Promise<{ page?: string }> };

export default async function Page({ searchParams }: Props) {
  const page = getStaticPage(SLUG);
  if (!page) notFound();
  const sp = await searchParams;
  const currentPage = Math.max(1, Number.parseInt(sp.page ?? "1", 10) || 1);
  const videos = await getVideoGalleryResolved();
  return (
    <VideoGridPage
      page={page}
      videos={videos}
      currentPage={currentPage}
      perPage={10}
      basePath="/video-gallery"
    />
  );
}
