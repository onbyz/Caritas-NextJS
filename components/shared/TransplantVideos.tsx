"use client";

import { YoutubeVideoCard } from "@/components/home/YoutubeVideoCard";

const TRANSPLANT_VIDEOS = [
  {
    youtubeId: "DONTmEIzYcw",
    title: "Eight Years With Heartfelt Gratitude!",
  },
  {
    youtubeId: "0C-qH9p4p14",
    title:
      "+1 student undergoes successful kidney transplant surgery at Caritas Hospital",
  },
  {
    youtubeId: "DhGYJC2wz40",
    title: "Liver transplant from Caritas",
  },
] as const;

export function TransplantVideos() {
  return (
    <section>
      <div className="container">
        <div className="row">
          <h3>Transplant Videos</h3>
          <p>&nbsp;</p>
          {TRANSPLANT_VIDEOS.map((video) => (
            <div key={video.youtubeId} className="col-lg-4 mb-5 px-3">
              <YoutubeVideoCard
                youtubeId={video.youtubeId}
                title={video.title}
                height={300}
              />
              <h5 className="my-4">{video.title}</h5>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
