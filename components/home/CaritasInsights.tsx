"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import { FadeIn } from "@/components/shared/FadeIn";
import { YoutubeVideoCard } from "@/components/home/YoutubeVideoCard";

export type InsightPost = {
  id: string;
  title: string;
  slug: string;
};

export type InsightVideo = {
  id: string | number;
  title: string;
  youtube_id: string;
};

type CaritasInsightsProps = {
  news: InsightPost[];
  articles: InsightPost[];
  videos: InsightVideo[];
};

type InsightTab = "news" | "articles" | "videos";

function PostList({ items }: { items: InsightPost[] }) {
  const latestItems = items.slice(0, 3);
  return (
    <>
      {latestItems.map((post) => (
        <div key={post.id} className="col-lg-12">
          <div className="post">
            <div className="row align-items-center mx-4 animation-element bounce-up">
              <div className="col-lg-11 box box1">
                <h6>
                  <Link href={`/articles/${post.slug}`}>{post.title}</Link>
                </h6>
              </div>
              <div className="col-lg-1 box box1">
                <Link href={`/articles/${post.slug}`}>
                  <Image src="/img/right-arrow.png" alt="" width={24} height={24} />
                </Link>
              </div>
            </div>
            <hr style={{ width: "95%", margin: "30px auto" }} />
          </div>
        </div>
      ))}
    </>
  );
}

export function CaritasInsights({ news, articles, videos }: CaritasInsightsProps) {
  const tabs = useMemo(() => {
    const list: { id: InsightTab; label: string }[] = [];
    if (news.length > 0) list.push({ id: "news", label: "News & Events" });
    if (articles.length > 0) list.push({ id: "articles", label: "Articles" });
    if (videos.length > 0) list.push({ id: "videos", label: "Videos" });
    return list;
  }, [news.length, articles.length, videos.length]);

  const [tab, setTab] = useState<InsightTab>(() => tabs[0]?.id ?? "news");

  const activeTab = tabs.some((t) => t.id === tab) ? tab : (tabs[0]?.id ?? "news");

  if (tabs.length === 0) return null;

  return (
    <section id="insight_tab" style={{ backgroundColor: "#F4F6F6" }} className="pt-5">
      <div className="container">
        <div className="row justify-content-center my-5 animation-element bounce-up">
          <div className="col-lg-8 box box1">
            <h3>Caritas Insights</h3>
            <div className="row">
              <div className="col-lg-4 box box1">
                <p>Discover what&apos;s happening at Caritas</p>
              </div>
              <div className="col-lg-8 px-0">
                <hr style={{ width: "100%", marginTop: 13 }} />
              </div>
            </div>
          </div>
          <div className="col-lg-4 px-0">
            <ul className="nav nav-tabs pt-3" id="homeInsightTab" role="tablist">
              {tabs.map((item) => (
                <li key={item.id} className="nav-item" role="presentation">
                  <button
                    type="button"
                    className={`nav-link${activeTab === item.id ? " active" : ""}`}
                    onClick={() => setTab(item.id)}
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
            <hr style={{ width: "90%", marginTop: -2, marginLeft: -2 }} />
          </div>
        </div>

        <div className="row justify-content-center">
          <div className="col">
            {activeTab === "news" && news.length > 0 && (
              <FadeIn>
                <div className="row justify-content-center">
                  <PostList items={news} />
                  <p className="animation-element bounce-up">
                    <Link
                      className="mx-4 mt-5 box box1"
                      href="/news-and-events"
                      style={{ color: "#C71782 !important" }}
                    >
                      Read All News & Events <i className="bi bi-chevron-right ms-2" />
                    </Link>
                  </p>
                </div>
              </FadeIn>
            )}
            {activeTab === "articles" && articles.length > 0 && (
              <FadeIn>
                <PostList items={articles} />
                <p className="animation-element bounce-up">
                  <Link
                    className="mx-4 mt-5 box box1"
                    href="/articles"
                    style={{ color: "#C71782 !important" }}
                  >
                    Read All Articles <i className="bi bi-chevron-right ms-2" />
                  </Link>
                </p>
              </FadeIn>
            )}
            {activeTab === "videos" && videos.length > 0 && (
              <FadeIn>
                <div className="row justify-content-center animation-element bounce-up">
                  {videos.slice(0, 3).map((v) => (
                    <div key={v.id} className="col-lg-4 my-3 box box1">
                      <YoutubeVideoCard youtubeId={v.youtube_id} title={v.title} />
                      <h5 className="mt-3">{v.title}</h5>
                    </div>
                  ))}
                </div>
                <p className="animation-element bounce-up text-center">
                  <Link style={{ color: "#C71782 !important" }} href="/testimonials">
                    View All <i className="bi bi-chevron-right ms-2" />
                  </Link>
                </p>
              </FadeIn>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
