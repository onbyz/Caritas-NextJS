"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import { Pagination, paginate, totalPages } from "@/components/shared/Pagination";
import type { CmsAlbum, CmsPost, CmsVideo, CsrActivity } from "@/services/cms";
import { ContentStaticPage } from "./ContentStaticPage";
import type { StaticPageFullContent } from "@/constants/pages/full-content";

function formatMonthYear(value?: string): string {
  if (!value) return "";
  const dt = new Date(value);
  if (Number.isNaN(dt.getTime())) return "";
  return dt.toLocaleDateString("en-US", { month: "long", year: "numeric" });
}

function deptLabelFromUrl(url?: string | null): string {
  if (!url) return "";
  const slug = url.replace(/^\/+|\/+$/g, "");
  if (!slug) return "";
  return slug
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}

function YoutubeEmbed({ youtubeId, title }: { youtubeId: string; title: string }) {
  const [playing, setPlaying] = useState(false);
  if (playing) {
    return (
      <iframe
        title={title}
        width="100%"
        height="315"
        src={`https://www.youtube.com/embed/${youtubeId}?autoplay=1`}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        style={{ border: 0, aspectRatio: "16/9" }}
      />
    );
  }
  return (
    <button
      type="button"
      className="video-container border-0 bg-transparent p-0 w-100 text-start position-relative"
      onClick={() => setPlaying(true)}
      aria-label={`Play ${title}`}
    >
      <img
        className="video-thumbnail w-100"
        src={`https://img.youtube.com/vi/${youtubeId}/hqdefault.jpg`}
        alt={title}
        style={{ cursor: "pointer", display: "block" }}
      />
      <span
        className="yt-play-button"
        style={{
          position: "absolute",
          left: "50%",
          top: "50%",
          transform: "translate(-50%, -50%)",
          pointerEvents: "none",
        }}
        aria-hidden
      >
        <svg viewBox="0 0 68 48" width="68" height="48">
          <path
            d="M66.52 7.43c-.78-2.93-3.08-5.23-6.01-6.01C55.4 0 34 0 34 0S12.6 0 7.49 1.42c-2.93.78-5.23 3.08-6.01 6.01C0 12.54 0 24 0 24s0 11.46 1.48 16.57c.78 2.93 3.08 5.23 6.01 6.01C12.6 48 34 48 34 48s21.4 0 26.51-1.42c2.93-.78 5.23-3.08 6.01-6.01C68 35.46 68 24 68 24s0-11.46-1.48-16.57z"
            fill="red"
          />
          <path d="M45 24 27 14v20z" fill="white" />
        </svg>
      </span>
    </button>
  );
}

export function ArticlesListPage({
  page,
  items,
}: {
  page: StaticPageFullContent;
  items: CmsPost[];
}) {
  const [department, setDepartment] = useState("");
  const departments = useMemo(
    () =>
      [...new Set(items.map((p) => p.departmentUrl).filter((d): d is string => Boolean(d)))].sort(),
    [items],
  );
  const filteredItems = useMemo(
    () => (department ? items.filter((p) => p.departmentUrl === department) : items),
    [items, department],
  );

  return (
    <ContentStaticPage {...page} showEnquiry={false}>
      <section className="py-3">
        <div className="container">
          <div className="row mb-4">
            <div className="col-md-4">
              <label htmlFor="department-filter" className="form-label">
                Filter by Department:
              </label>
              <select
                id="department-filter"
                className="form-select"
                value={department}
                onChange={(e) => setDepartment(e.target.value)}
              >
                <option value="">All Departments</option>
                {departments.map((d) => (
                  <option key={d} value={d}>
                    {deptLabelFromUrl(d)}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="row justify-content-center">
            {filteredItems.map((post) => (
              <div key={post.id} className="col-lg-4 mb-4">
                <div className="post">
                  <Link href={`/articles/${post.slug}`} style={{ color: "#000" }}>
                    {post.image ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={post.image}
                        alt={post.title}
                        style={{ height: 250, width: "100%", objectFit: "cover" }}
                        className="img-fluid mb-2"
                      />
                    ) : null}
                    {post.departmentUrl && (
                      <p style={{ color: "#0072BC" }}>
                        <Link href={post.departmentUrl} style={{ color: "#0072bc" }}>
                          {deptLabelFromUrl(post.departmentUrl)}
                        </Link>
                      </p>
                    )}
                    <h6>{post.title}</h6>
                    {post.created && (
                      <p style={{ color: "rgba(0, 0, 0, 0.5)" }}>{formatMonthYear(post.created)}</p>
                    )}
                  </Link>
                </div>
              </div>
            ))}
            {filteredItems.length === 0 && (
              <div className="col-lg-12">
                <p className="text-center">No posts found for the selected department.</p>
              </div>
            )}
          </div>
        </div>
      </section>
    </ContentStaticPage>
  );
}

export function NewsListPage({
  page,
  items,
  currentPage = 1,
  perPage = 15,
}: {
  page: StaticPageFullContent;
  items: CmsPost[];
  currentPage?: number;
  perPage?: number;
}) {
  const pages = totalPages(items.length, perPage);
  const pageItems = paginate(items, currentPage, perPage);

  return (
    <ContentStaticPage {...page} showEnquiry={false}>
      <section className="py-3">
        <div className="container">
          <div className="row">
            {pageItems.map((post) => (
              <div key={post.id} className="col-lg-4 mb-4">
                <div className="post">
                  <Link href={`/articles/${post.slug}`} style={{ color: "#000" }}>
                    {post.image ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={post.image} alt={post.title} className="img-fluid mb-4" />
                    ) : null}
                    <h6 style={{ maxWidth: 550 }}>{post.title}</h6>
                  </Link>
                  {post.created && (
                    <p style={{ color: "rgba(0, 0, 0, 0.5)" }}>{formatMonthYear(post.created)}</p>
                  )}
                </div>
              </div>
            ))}
            {items.length === 0 && <p>No news found.</p>}
          </div>
          <Pagination currentPage={currentPage} totalPages={pages} basePath="/news-and-events" />
        </div>
      </section>
    </ContentStaticPage>
  );
}

export function GalleryPage({
  page,
  albums: albumList,
}: {
  page: StaticPageFullContent;
  albums: CmsAlbum[];
}) {
  return (
    <ContentStaticPage {...page} showEnquiry={false}>
      <section className="py-3">
        <div className="container">
          <div className="row">
            {albumList.map((album) => (
              <div key={album.id} className="col-md-4 mb-4">
                <Link href={`/gallery/${album.id}`}>
                  {album.coverImage && (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={album.coverImage}
                      alt={album.title}
                      style={{ width: "100%" }}
                    />
                  )}
                  <h5 className="mt-3">{album.title}</h5>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>
    </ContentStaticPage>
  );
}

export function VideoGridPage({
  page,
  videos,
  currentPage = 1,
  perPage = 10,
  basePath,
}: {
  page: StaticPageFullContent;
  videos: CmsVideo[];
  currentPage?: number;
  perPage?: number;
  basePath: string;
}) {
  const pages = totalPages(videos.length, perPage);
  const pageVideos = paginate(videos, currentPage, perPage);

  return (
    <ContentStaticPage {...page} showEnquiry={false}>
      <section className="py-3">
        <div className="container">
          <div className="row">
            {pageVideos.map((v) => (
              <div key={`${v.id}-${v.youtube_id}`} className="col-lg-6 mb-5 px-3">
                <YoutubeEmbed youtubeId={v.youtube_id} title={v.title} />
                <h5 className="my-4">{v.title}</h5>
              </div>
            ))}
          </div>
          <Pagination currentPage={currentPage} totalPages={pages} basePath={basePath} />
        </div>
      </section>
    </ContentStaticPage>
  );
}

export function CsrActivitiesSection({
  activities,
  currentPage = 1,
  perPage = 9,
}: {
  activities: CsrActivity[];
  currentPage?: number;
  perPage?: number;
}) {
  const pages = totalPages(activities.length, perPage);
  const items = paginate(activities, currentPage, perPage);

  return (
    <section className="py-5">
      <div className="container">
        <div className="row justify-content-center">
          <h3 style={{ fontWeight: 600 }}>Caritas Public Health Mission</h3>
          <p>&nbsp;</p>
        </div>
        <div className="row">
          {items.map((item) => (
            <div key={item.id} className="col-lg-4 mb-4">
              <div className="post">
                <Link
                  href={`/caritas-social-responsibility/${item.slug}`}
                  style={{ color: "#000" }}
                >
                  {item.image ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={item.image}
                      alt={item.title}
                      className="img-fluid mb-2"
                      style={{ borderRadius: 20 }}
                    />
                  ) : null}
                  <h6 className="post-title mt-3" style={{ maxWidth: 560 }}>
                    {item.title}
                  </h6>
                </Link>
                {item.date_of_added && (
                  <p style={{ color: "rgba(0, 0, 0, 0.5)" }}>
                    {formatMonthYear(item.date_of_added)}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
        <Pagination
          currentPage={currentPage}
          totalPages={pages}
          basePath="/caritas-social-responsibility"
        />
      </div>
    </section>
  );
}
