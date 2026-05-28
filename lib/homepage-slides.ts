import type { SlideData } from "@/components/home/HeroSlider";
import heroSlidesJson from "@/constants/cms/hero-slides.json";
import type { Homepage } from "@/types/cms";
import { urlFor } from "@/lib/sanity/client";
import { isSanityConfigured } from "@/lib/sanity/client";

const LEGACY_SLIDES = heroSlidesJson as SlideData[];

/** Build hero slides from Sanity, else legacy DB export (matches Django zip of desktop/mobile sliders). */
export function resolveHeroSlides(data: Homepage): SlideData[] {
  if (isSanityConfigured && data.heroSlides?.length) {
    return data.heroSlides.map((slide, index) => {
      let variant: SlideData["variant"] = "image-only";
      if (index === 1) variant = "donate";
      else if (slide.title) variant = "content";

      return {
        id: slide._id,
        desktopSrc: slide.desktopImage
          ? urlFor(slide.desktopImage).width(1920).height(752).url()
          : LEGACY_SLIDES[0]?.desktopSrc ?? "",
        mobileSrc: slide.mobileImage
          ? urlFor(slide.mobileImage).width(768).url()
          : undefined,
        title: slide.title,
        description: slide.description,
        variant,
      };
    });
  }

  return LEGACY_SLIDES.filter((s) => s.desktopSrc);
}
