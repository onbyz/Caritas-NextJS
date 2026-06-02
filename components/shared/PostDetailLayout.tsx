"use client";

import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { SectionReveal } from "@/components/motion/SectionReveal";

function formatMonthYear(value?: string): string {
  if (!value) return "";
  const dt = new Date(value);
  if (Number.isNaN(dt.getTime())) return "";
  return dt.toLocaleDateString("en-US", { month: "long", year: "numeric" });
}

type PostDetailLayoutProps = {
  backHref: string;
  backLabel: string;
  title: string;
  date?: string;
  image?: string | null;
  departmentUrl?: string | null;
  departmentLabel?: string;
  bodyHtml: string;
  galleryImages?: string[];
  footer?: ReactNode;
};

export function PostDetailLayout({
  backHref,
  backLabel,
  title,
  date,
  image,
  departmentUrl,
  departmentLabel,
  bodyHtml,
  galleryImages = [],
  footer,
}: PostDetailLayoutProps) {
  return (
    <SectionReveal as="section" className="py-5">
      <div className="container px-5 my-5">
        <p>
          <Link href={backHref}>← {backLabel}</Link>
        </p>
        <div className="row gx-5">
          <div className="col-lg-12">
            <div>
              {departmentUrl && departmentLabel && (
                <p style={{ color: "#0072BC" }}>
                  <Link href={departmentUrl} style={{ color: "#0072bc" }}>
                    {departmentLabel}
                  </Link>
                </p>
              )}
              <h1 className="articl-title d-block mb-3" style={{ fontWeight: 600 }}>
                {title}
              </h1>
              {date && (
                <p style={{ color: "rgba(0, 0, 0, 0.5)" }}>{formatMonthYear(date)}</p>
              )}
              {image && (
                <div className="mb-4">
                  <Image
                    src={image}
                    alt={title}
                    width={900}
                    height={500}
                    className="img-fluid rounded"
                    style={{ width: "100%", height: "auto", maxWidth: 900 }}
                    unoptimized
                  />
                </div>
              )}
            </div>
            <div
              className="fs-5 my-4 article-contents legacy-static-content"
              dangerouslySetInnerHTML={{ __html: bodyHtml }}
            />
            {galleryImages.length > 0 && (
              <div className="row mt-5">
                {galleryImages.map((src, i) => (
                  <div key={src + i} className="col-12 col-md-6 mb-4">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={src} alt="" className="img-fluid rounded w-100" />
                  </div>
                ))}
              </div>
            )}
            {footer}
          </div>
        </div>
      </div>
    </SectionReveal>
  );
}
