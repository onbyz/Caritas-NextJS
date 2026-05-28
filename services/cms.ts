import albums from "@/constants/cms/albums.json";
import biomedical from "@/constants/cms/biomedical.json";
import careers from "@/constants/cms/careers.json";
import csrActivities from "@/constants/cms/csr-activities.json";
import postImages from "@/constants/cms/post-images.json";
import posts from "@/constants/cms/posts.json";
import qualityControl from "@/constants/cms/quality-control.json";
import testimonialVideos from "@/constants/cms/testimonial-videos.json";
import videoGallery from "@/constants/cms/video-gallery.json";
import { isSanityConfigured, sanityClient, urlFor } from "@/lib/sanity/client";

export type CmsPost = {
  id: string;
  title: string;
  slug: string;
  excerpt?: string;
  body?: string;
  image?: string;
  created?: string;
  categoryTitle?: string;
  departmentUrl?: string | null;
};

export type CmsAlbum = {
  id: number;
  title: string;
  coverImage?: string;
  images: { id: number; src: string; description?: string }[];
};

export type CmsVideo = {
  id: number;
  title: string;
  youtube_id: string;
  created_at?: string;
};

export type CsrActivity = {
  id: string;
  title: string;
  slug: string;
  body: string;
  image?: string | null;
  created?: string;
  date_of_added?: string;
  extraImages?: string[];
};

export function getArticles(): CmsPost[] {
  return (posts as CmsPost[]).filter((p) => p.categoryTitle !== "News & Events");
}

export function getNewsPosts(): CmsPost[] {
  return (posts as CmsPost[]).filter((p) => p.categoryTitle === "News & Events");
}

export function getPostBySlug(slug: string): CmsPost | undefined {
  return (posts as CmsPost[]).find((p) => p.slug === slug);
}

export function getPostGalleryImages(slug: string): string[] {
  const map = postImages as Record<string, string[]>;
  return map[slug] ?? [];
}

export function getCsrActivities(): CsrActivity[] {
  return csrActivities as CsrActivity[];
}

export function getCsrBySlug(slug: string): CsrActivity | undefined {
  return getCsrActivities().find((a) => a.slug === slug);
}

export function getAlbums(): CmsAlbum[] {
  return albums as CmsAlbum[];
}

export function getAlbumById(id: number): CmsAlbum | undefined {
  return (albums as CmsAlbum[]).find((a) => a.id === id);
}

export function getTestimonialVideos(): CmsVideo[] {
  return testimonialVideos as CmsVideo[];
}

export function getVideoGallery(): CmsVideo[] {
  return videoGallery as CmsVideo[];
}

function fallbackPosts(category: "article" | "news"): CmsPost[] {
  const isNews = category === "news";
  return (posts as CmsPost[]).filter((p) =>
    isNews ? p.categoryTitle === "News & Events" : p.categoryTitle !== "News & Events",
  );
}

export async function getArticlesResolved(): Promise<CmsPost[]> {
  if (!isSanityConfigured || !sanityClient) return fallbackPosts("article");
  try {
    const docs = await sanityClient.fetch<
      {
        _id: string;
        title: string;
        slug?: { current?: string };
        excerpt?: string;
        mainImage?: unknown;
        publishedAt?: string;
        department?: { slug?: { current?: string } };
      }[]
    >(`*[_type == "post" && category == "article"] | order(publishedAt desc) {
      _id, title, slug, excerpt, mainImage, publishedAt, department->{slug}
    }`);
    if (!docs.length) return fallbackPosts("article");
    return docs.map((d) => ({
      id: d._id,
      title: d.title,
      slug: d.slug?.current ?? d._id,
      excerpt: d.excerpt,
      image: d.mainImage ? urlFor(d.mainImage as any).width(900).height(600).url() : undefined,
      created: d.publishedAt,
      categoryTitle: "Articles",
      departmentUrl: d.department?.slug?.current ? `/${d.department.slug.current}` : null,
    }));
  } catch {
    return fallbackPosts("article");
  }
}

export async function getNewsPostsResolved(): Promise<CmsPost[]> {
  if (!isSanityConfigured || !sanityClient) return fallbackPosts("news");
  try {
    const docs = await sanityClient.fetch<
      {
        _id: string;
        title: string;
        slug?: { current?: string };
        excerpt?: string;
        mainImage?: unknown;
        publishedAt?: string;
      }[]
    >(`*[_type == "post" && category == "news"] | order(publishedAt desc) {
      _id, title, slug, excerpt, mainImage, publishedAt
    }`);
    if (!docs.length) return fallbackPosts("news");
    return docs.map((d) => ({
      id: d._id,
      title: d.title,
      slug: d.slug?.current ?? d._id,
      excerpt: d.excerpt,
      image: d.mainImage ? urlFor(d.mainImage as any).width(900).height(600).url() : undefined,
      created: d.publishedAt,
      categoryTitle: "News & Events",
      departmentUrl: null,
    }));
  } catch {
    return fallbackPosts("news");
  }
}

export async function getTestimonialVideosResolved(): Promise<CmsVideo[]> {
  if (!isSanityConfigured || !sanityClient) return getTestimonialVideos();
  try {
    const docs = await sanityClient.fetch<
      { _id: string; title?: string; youtubeId?: string; _createdAt?: string }[]
    >(`*[_type == "testimonial"] | order(_createdAt desc) { _id, title, youtubeId, _createdAt }`);
    const mapped = docs
      .filter((d) => Boolean(d.youtubeId))
      .map((d, idx) => ({
        id: idx + 1,
        title: d.title ?? "Patient testimonial",
        youtube_id: d.youtubeId!,
        created_at: d._createdAt,
      }));
    return mapped.length ? mapped : getTestimonialVideos();
  } catch {
    return getTestimonialVideos();
  }
}

export async function getVideoGalleryResolved(): Promise<CmsVideo[]> {
  if (!isSanityConfigured || !sanityClient) return getVideoGallery();
  try {
    const docs = await sanityClient.fetch<
      { _id: string; title?: string; youtubeId?: string; _createdAt?: string }[]
    >(`*[_type == "videoGallery" || _type == "testimonial"] | order(_createdAt desc) {
      _id, title, youtubeId, _createdAt
    }`);
    const mapped = docs
      .filter((d) => Boolean(d.youtubeId))
      .map((d, idx) => ({
        id: idx + 1,
        title: d.title ?? "Video",
        youtube_id: d.youtubeId!,
        created_at: d._createdAt,
      }));
    return mapped.length ? mapped : getVideoGallery();
  } catch {
    return getVideoGallery();
  }
}

export async function getAlbumsResolved(): Promise<CmsAlbum[]> {
  if (!isSanityConfigured || !sanityClient) return getAlbums();
  try {
    const docs = await sanityClient.fetch<
      {
        _id: string;
        title?: string;
        coverImage?: unknown;
        images?: { asset?: unknown; alt?: string }[];
      }[]
    >(`*[_type == "album"] | order(_createdAt desc) { _id, title, coverImage, images[] }`);

    const mapped = docs.map((d, idx) => ({
      id: idx + 1,
      title: d.title ?? `Album ${idx + 1}`,
      coverImage: d.coverImage ? urlFor(d.coverImage as any).width(900).height(600).url() : undefined,
      images:
        d.images?.map((img, imgIdx) => ({
          id: imgIdx + 1,
          src: img ? urlFor(img as any).width(1400).height(1000).url() : "",
          description: img?.alt ?? "",
        })) ?? [],
    }));

    return mapped.length ? mapped : getAlbums();
  } catch {
    return getAlbums();
  }
}

export function getCareers() {
  return careers;
}

export function getQualityControlData() {
  return qualityControl;
}

export function getBiomedicalData() {
  return biomedical;
}
