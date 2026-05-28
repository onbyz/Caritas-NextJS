import Image from "next/image";
import Link from "next/link";
import { SiteLayout } from "@/components/layout/SiteLayout";
import { getPostBySlug } from "@/services/cms";
import { buildMetadata } from "@/lib/metadata";
import { notFound } from "next/navigation";

type Props = { params: Promise<{ slug: string }> };

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

  return (
    <SiteLayout>
      <section className="py-5">
        <div className="container">
          <p>
            <Link href="/articles">← Articles</Link>
          </p>
          <h1 style={{ fontWeight: 600 }}>{post.title}</h1>
          {post.image && (
            <div className="my-4">
              <Image
                src={post.image}
                alt={post.title}
                width={900}
                height={400}
                className="img-fluid"
                unoptimized
              />
            </div>
          )}
          <div
            className="legacy-static-content"
            dangerouslySetInnerHTML={{ __html: post.body }}
          />
        </div>
      </section>
    </SiteLayout>
  );
}
