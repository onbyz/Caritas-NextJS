import Image from "next/image";
import Link from "next/link";
import { SiteLayout } from "@/components/layout/SiteLayout";
import { getAlbumById } from "@/services/cms";
import { buildMetadata } from "@/lib/metadata";
import { notFound } from "next/navigation";

type Props = { params: Promise<{ id: string }> };

export async function generateMetadata({ params }: Props) {
  const { id } = await params;
  const album = getAlbumById(Number(id));
  if (!album) return {};
  return buildMetadata({
    title: `${album.title} | Gallery | Caritas Hospital`,
    description: album.title,
    path: `/gallery/${id}`,
  });
}

export default async function AlbumDetailPage({ params }: Props) {
  const { id } = await params;
  const album = getAlbumById(Number(id));
  if (!album) notFound();

  return (
    <SiteLayout>
      <section className="py-5">
        <div className="container">
          <h1 style={{ fontWeight: 600 }}>{album.title}</h1>
          <p>
            <Link href="/gallery">← Back to Gallery</Link>
          </p>
          <div className="row mt-4">
            {album.images.map((img) => (
              <div key={img.id} className="col-md-4 mb-4">
                {img.src && (
                  <Image
                    src={img.src}
                    alt={img.description || album.title}
                    width={400}
                    height={300}
                    className="img-fluid w-100"
                    unoptimized
                  />
                )}
                {img.description && <p className="mt-2">{img.description}</p>}
              </div>
            ))}
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
