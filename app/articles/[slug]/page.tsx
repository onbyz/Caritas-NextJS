import { SiteLayout } from "@/components/layout/SiteLayout";
import { PostDetailLayout } from "@/components/shared/PostDetailLayout";
import { getPostBySlug, getPostGalleryImages } from "@/services/cms";
import { buildMetadata } from "@/lib/metadata";
import { notFound } from "next/navigation";

type Props = { params: Promise<{ slug: string }> };

function deptLabelFromUrl(url?: string | null): string {
  if (!url) return "";
  const slug = url.replace(/^\/+|\/+$/g, "");
  if (!slug) return "";
  return slug
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};
  return buildMetadata({
    title: `${post.title} | Caritas Hospital`,
    description: post.excerpt || post.title,
    path: `/articles/${slug}`,
  });
}

export default async function ArticleDetailPage({ params }: Props) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const isNews = post.categoryTitle === "News & Events";
  const galleryImages = getPostGalleryImages(slug);

  return (
    <SiteLayout>
      <PostDetailLayout
        backHref={isNews ? "/news-and-events" : "/articles"}
        backLabel={isNews ? "News & Events" : "Articles"}
        title={post.title}
        date={post.created}
        image={post.image}
        departmentUrl={post.departmentUrl}
        departmentLabel={deptLabelFromUrl(post.departmentUrl)}
        bodyHtml={post.body ?? post.excerpt ?? ""}
        galleryImages={galleryImages}
      />
    </SiteLayout>
  );
}
