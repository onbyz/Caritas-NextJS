"use client";

import { useState } from "react";

type YoutubeVideoCardProps = {
  youtubeId: string;
  title: string;
  height?: number;
};

export function YoutubeVideoCard({ youtubeId, title, height = 250 }: YoutubeVideoCardProps) {
  const [playing, setPlaying] = useState(false);
  const shellStyle = { width: "100%", aspectRatio: "16 / 9", minHeight: height } as const;

  if (playing) {
    return (
      <div style={shellStyle}>
        <iframe
          title={title}
          width="100%"
          height="100%"
          src={`https://www.youtube-nocookie.com/embed/${youtubeId}?autoplay=1`}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          style={{ border: 0, width: "100%", height: "100%" }}
        />
      </div>
    );
  }

  return (
    <div style={shellStyle}>
      <button
        type="button"
        className="video-container border-0 bg-transparent p-0 w-100 h-100 text-start loaded"
        onClick={() => setPlaying(true)}
        aria-label={`Play ${title}`}
        data-video-id={youtubeId}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          className="video-thumbnail w-100 h-100"
          src={`https://img.youtube.com/vi/${youtubeId}/hqdefault.jpg`}
          alt={title}
          style={{ width: "100%", height: "100%", objectFit: "cover", cursor: "pointer" }}
        />
        <div className="yt-play-button">
          <svg viewBox="0 0 68 48" width="68" height="48" aria-hidden>
            <path
              d="M66.52 7.43c-.78-2.93-3.08-5.23-6.01-6.01C55.4 0 34 0 34 0S12.6 0 7.49 1.42c-2.93.78-5.23 3.08-6.01 6.01C0 12.54 0 24 0 24s0 11.46 1.48 16.57c.78 2.93 3.08 5.23 6.01 6.01C12.6 48 34 48 34 48s21.4 0 26.51-1.42c2.93-.78 5.23-3.08 6.01-6.01C68 35.46 68 24 68 24s0-11.46-1.48-16.57z"
              fill="red"
            />
            <path d="M45 24 27 14v20z" fill="white" />
          </svg>
        </div>
      </button>
    </div>
  );
}
