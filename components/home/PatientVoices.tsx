import Link from "next/link";
import { FadeIn } from "@/components/shared/FadeIn";
import { YoutubeVideoCard } from "@/components/home/YoutubeVideoCard";
import type { InsightVideo } from "@/components/home/CaritasInsights";

type PatientVoicesProps = {
  videos: InsightVideo[];
};

export function PatientVoices({ videos }: PatientVoicesProps) {
  const featured = videos.slice(0, 3);

  return (
    <section style={{ backgroundColor: "#F4F6F6" }}>
      <div className="container mt-5 animation-element bounce-up pb-5">
        <div className="row justify-content-center text-center box box1">
          <h3>Voices of Our Patients</h3>
          <p>Discover the heartfelt stories and experiences shared by our valued patients</p>
          <p>&nbsp;</p>
        </div>
        <div className="row justify-content-center">
          {featured.map((v) => (
            <FadeIn key={v.id} className="col-lg-4 my-3">
              <YoutubeVideoCard youtubeId={v.youtube_id} title={v.title} />
              <h5 className="mb-3 mt-3 box box1">{v.title}</h5>
            </FadeIn>
          ))}
        </div>
        <p className="box box1 text-center">
          <Link style={{ color: "#C71782" }} href="/testimonials">
            View All <i className="bi bi-chevron-right ms-2" />
          </Link>
        </p>
      </div>
    </section>
  );
}
