import { NewsListPage } from "@/features/pages/CmsListPages";
import { STATIC_PAGE_REGISTRY } from "@/constants/pages/registry";
import { getNewsPostsResolved } from "@/services/cms";
import { getStaticPage } from "@/services/static-pages";
import { buildMetadata } from "@/lib/metadata";
import { notFound } from "next/navigation";

const SLUG = "news-and-events";
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
  const items = await getNewsPostsResolved();
  return <NewsListPage page={page} items={items} currentPage={currentPage} perPage={15} />;
}
