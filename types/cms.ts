export type SanityImage = {
  _type: "image";
  asset: { _ref: string; _type: "reference" };
  alt?: string;
};

export type HeroSlide = {
  _id: string;
  title?: string;
  description?: string;
  desktopImage: SanityImage;
  mobileImage?: SanityImage;
  ctaLabel?: string;
  ctaHref?: string;
  order?: number;
};

export type Doctor = {
  _id: string;
  name: string;
  slug: { current: string };
  designation?: string;
  department?: { name: string; slug: string };
  image?: SanityImage;
  qualifications?: string;
  experience?: string;
};

export type Department = {
  _id: string;
  name: string;
  slug: string;
  heroTitle?: string;
  heroSubtitle?: string;
  bannerImage?: SanityImage;
  overview?: unknown[];
  treatments?: unknown[];
  facilities?: unknown[];
};

export type Post = {
  _id: string;
  title: string;
  slug: { current: string };
  excerpt?: string;
  mainImage?: SanityImage;
  publishedAt?: string;
  category?: string;
};

export type Testimonial = {
  _id: string;
  title?: string;
  youtubeId?: string;
  thumbnail?: SanityImage;
};

export type SiteSettings = {
  title: string;
  description: string;
  ogImage?: SanityImage;
  phoneNumbers?: {
    ambulance?: string;
    appointments?: string;
    information?: string;
  };
};

export type Homepage = {
  heroSlides: HeroSlide[];
  stats?: { label: string; value: string }[];
  featuredDepartments?: Department[];
  news?: Post[];
  articles?: Post[];
  testimonials?: Testimonial[];
};
