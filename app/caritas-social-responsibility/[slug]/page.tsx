import { SiteLayout } from "@/components/layout/SiteLayout";
import { PostDetailLayout } from "@/components/shared/PostDetailLayout";
import { getCsrBySlug } from "@/services/cms";
import { buildMetadata } from "@/lib/metadata";
import { notFound } from "next/navigation";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const post = getCsrBySlug(slug);
  if (!post) return {};
  return buildMetadata({
    title: `${post.title} | Caritas Hospital`,
    description: post.title,
    path: `/caritas-social-responsibility/${slug}`,
  });
}

export default async function CsrDetailPage({ params }: Props) {
  const { slug } = await params;
  const post = getCsrBySlug(slug);
  if (!post) notFound();

  return (
    <SiteLayout>
      <PostDetailLayout
        backHref="/caritas-social-responsibility"
        backLabel="Caritas Social Responsibility"
        title={post.title}
        date={post.date_of_added ?? post.created}
        image={post.image}
        bodyHtml={post.body}
        galleryImages={post.extraImages ?? []}
      />
    </SiteLayout>
  );
}
