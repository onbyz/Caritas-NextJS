import { isSanityConfigured, sanityClient } from "@/lib/sanity/client";
import { homepageQuery } from "@/lib/sanity/queries";
import { getArticles, getNewsPosts, getTestimonialVideos } from "@/services/cms";
import type { HeroSlide, Homepage, Post, Testimonial } from "@/types/cms";

/** Fallback slides when Sanity is not configured — mirrors Django static sliders */
export const FALLBACK_SLIDES: HeroSlide[] = [
  {
    _id: "1",
    title: "Best Private Hospital in Kottayam",
    description:
      "Trusted healthcare with over 60 years of medical excellence in Kottayam.",
    desktopImage: {
      _type: "image",
      asset: { _ref: "", _type: "reference" },
    },
  },
];

export const DOCTOR_CAROUSEL_IMAGES = [
  "home-doctor-1.webp",
  "home-doctor-2.webp",
  "home-doctor-3.webp",
  "home-doctor-4.webp",
  "home-doctor-5.webp",
  "home-doctor-6.webp",
  "home-doctor-7.webp",
  "home-doctor-8.webp",
  "home-doctor-9.webp",
  "home-doctor-10.webp",
  "home-doctor-11.webp",
];

function mapLegacyPosts(): { news: Post[]; articles: Post[]; testimonials: Testimonial[] } {
  const news = getNewsPosts().slice(0, 6).map((p) => ({
    _id: String(p.id),
    title: p.title,
    slug: { current: p.slug },
    excerpt: p.excerpt,
    category: p.categoryTitle,
  }));

  const articles = getArticles().slice(0, 6).map((p) => ({
    _id: String(p.id),
    title: p.title,
    slug: { current: p.slug },
    excerpt: p.excerpt,
    category: p.categoryTitle,
  }));

  const testimonials = getTestimonialVideos().map((v) => ({
    _id: String(v.id),
    title: v.title,
    youtubeId: v.youtube_id,
  }));

  return { news, articles, testimonials };
}

export async function getHomepageData(): Promise<Homepage> {
  if (isSanityConfigured && sanityClient) {
    try {
      const data = await sanityClient.fetch<Homepage>(homepageQuery);
      if (data.news?.length || data.articles?.length || data.testimonials?.length) {
        return data;
      }
    } catch {
      /* fall through to legacy */
    }
  }

  const legacy = mapLegacyPosts();
  return {
    heroSlides: [],
    news: legacy.news,
    articles: legacy.articles,
    testimonials: legacy.testimonials,
  };
}
