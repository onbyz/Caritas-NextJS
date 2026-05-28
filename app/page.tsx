import { SiteLayout } from "@/components/layout/SiteLayout";
import { AccreditationsSection } from "@/components/home/AccreditationsSection";
import { CaritasInsights } from "@/components/home/CaritasInsights";
import { CentresOfExcellence } from "@/components/home/CentresOfExcellence";
import { DonationBanner } from "@/components/home/DonationBanner";
import { DoctorSearch } from "@/components/home/DoctorSearch";
import { FutureFirstSection } from "@/components/home/FutureFirstSection";
import { HeroSlider } from "@/components/home/HeroSlider";
import { HomeScrollSection } from "@/components/home/HomeScrollSection";
import { HomeFeatureCards } from "@/components/home/HomeFeatureCards";
import { OurHospitals } from "@/components/home/OurHospitals";
import { PatientVoices } from "@/components/home/PatientVoices";
import { QuickServices } from "@/components/home/QuickServices";
import { RatingsSection } from "@/components/home/RatingsSection";
import { StatsCounts } from "@/components/home/StatsCounts";
import { VirtualTourBanner } from "@/components/home/VirtualTourBanner";
import { resolveHeroSlides } from "@/lib/homepage-slides";
import { getHomepageData } from "@/services/homepage";

export default async function HomePage() {
  const data = await getHomepageData();
  const slides = resolveHeroSlides(data);

  const news = (data.news ?? []).map((p) => ({
    id: p._id,
    title: p.title,
    slug: p.slug.current,
  }));

  const articles = (data.articles ?? []).map((p) => ({
    id: p._id,
    title: p.title,
    slug: p.slug.current,
  }));

  const videos = (data.testimonials ?? [])
    .filter((t) => t.youtubeId)
    .map((t) => ({
      id: t._id,
      title: t.title ?? "Patient testimonial",
      youtube_id: t.youtubeId!,
    }));

  return (
    <div className="page-home">
      <SiteLayout>
        <HeroSlider slides={slides} />
        <main id="main">
          <HomeScrollSection>
            <QuickServices />
          </HomeScrollSection>
          <hr style={{ width: "85%", margin: "0 auto" }} />
          <HomeScrollSection variant="fade-in">
            <RatingsSection />
          </HomeScrollSection>
          <HomeScrollSection>
            <DoctorSearch />
          </HomeScrollSection>
          <HomeScrollSection variant="scale-up">
            <CentresOfExcellence />
          </HomeScrollSection>
          <HomeScrollSection>
            <FutureFirstSection />
          </HomeScrollSection>
          <HomeScrollSection variant="fade-in">
            <DonationBanner />
          </HomeScrollSection>
          <HomeScrollSection>
            <CaritasInsights news={news} articles={articles} videos={videos} />
          </HomeScrollSection>
          <HomeScrollSection variant="scale-up">
            <HomeFeatureCards />
          </HomeScrollSection>
          <HomeScrollSection variant="fade-in">
            <VirtualTourBanner />
          </HomeScrollSection>
          <HomeScrollSection>
            <OurHospitals />
          </HomeScrollSection>
          <HomeScrollSection variant="fade-up">
            <StatsCounts />
          </HomeScrollSection>
          <HomeScrollSection>
            <PatientVoices videos={videos} />
          </HomeScrollSection>
          <HomeScrollSection variant="fade-in">
            <AccreditationsSection />
          </HomeScrollSection>
        </main>
      </SiteLayout>
    </div>
  );
}
