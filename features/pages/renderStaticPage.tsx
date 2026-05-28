import { notFound } from "next/navigation";
import {
  ArticlesListPage,
  CareerJobsSection,
  GalleryPage,
  NewsListPage,
  VideoGridPage,
} from "@/features/pages/CmsListPages";
import { BiomedicalWastePanel, QualityControlPanel } from "@/features/pages/DataFilterPanels";
import { ClinicalNutritionPage } from "@/features/pages/ClinicalNutritionPage";
import { ContentStaticPage } from "@/features/pages/ContentStaticPage";
import { HomeCarePage } from "@/features/pages/HomeCarePage";
import { InsurancePage } from "@/features/pages/InsurancePage";
import { OrganTransplantPage } from "@/features/pages/OrganTransplantPage";
import { SecondOpinionPage } from "@/features/pages/SecondOpinionPage";
import {
  getAlbums,
  getArticles,
  getCareers,
  getNewsPosts,
  getTestimonialVideos,
  getVideoGallery,
} from "@/services/cms";
import { getStaticPage } from "@/services/static-pages";
import type { ReactNode } from "react";

const CMS_HANDLERS: Record<
  string,
  (page: NonNullable<ReturnType<typeof getStaticPage>>) => React.ReactNode
> = {
  articles: (page) => <ArticlesListPage page={page} items={getArticles()} />,
  "news-and-events": (page) => <NewsListPage page={page} items={getNewsPosts()} />,
  gallery: (page) => <GalleryPage page={page} albums={getAlbums()} />,
  testimonials: (page) => (
    <VideoGridPage page={page} videos={getTestimonialVideos()} />
  ),
  "video-gallery": (page) => (
    <VideoGridPage page={page} videos={getVideoGallery()} />
  ),
  career: (page) => (
    <ContentStaticPage {...page}>
      <CareerJobsSection jobs={getCareers()} />
    </ContentStaticPage>
  ),
  biomedical: (page) => (
    <>
      <ContentStaticPage {...page} />
      <BiomedicalWastePanel />
    </>
  ),
  "quality-control": (page) => (
    <>
      <ContentStaticPage {...page} />
      <QualityControlPanel />
    </>
  ),
  secondopinion: (page) => <SecondOpinionPage page={page} />,
  insurance: (page) => <InsurancePage page={page} />,
  organ: (page) => <OrganTransplantPage page={page} />,
  "clinical-nutrition": (page) => <ClinicalNutritionPage page={page} />,
  clinical: (page) => <ClinicalNutritionPage page={page} />,
  "caritas-home-care": (page) => <HomeCarePage page={page} />,
};

export function renderStaticPage(slug: string, options?: { sidebar?: ReactNode }) {
  const page = getStaticPage(slug);
  if (!page) notFound();

  const handler = CMS_HANDLERS[slug];
  if (handler) return handler(page);

  return <ContentStaticPage {...page} sidebar={options?.sidebar} />;
}
