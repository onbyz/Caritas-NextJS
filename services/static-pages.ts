import fs from "fs";
import path from "path";
import {
  STATIC_PAGE_FULL_CONTENT,
  type StaticPageFullContent,
} from "@/constants/pages/full-content";
import { STATIC_PAGE_REGISTRY } from "@/constants/pages/registry";

function readContentHtml(slug: string, contentPath: string): string | undefined {
  if (!STATIC_PAGE_FULL_CONTENT[slug]) return undefined;
  const relative = contentPath.replace(/^\/content\/pages\//, "");
  if (!relative.endsWith(".html") || relative.includes("..")) return undefined;
  const filePath = path.join(process.cwd(), "public", "content", "pages", relative);
  if (!fs.existsSync(filePath)) return undefined;
  let html = fs.readFileSync(filePath, "utf8");
  html = html.replace(/<script[\s\S]*?<\/script>/gi, "");
  html = html.replace(/\sonclick="[^"]*"/gi, "");
  return html;
}

export function getStaticPage(slug: string): StaticPageFullContent | null {
  const full = STATIC_PAGE_FULL_CONTENT[slug];
  const seed = STATIC_PAGE_REGISTRY[slug];
  if (!full && !seed) return null;

  const merged: StaticPageFullContent = {
    ...seed,
    ...full,
    slug,
    title: full?.title ?? seed?.title ?? slug,
    subtitle: full?.subtitle ?? seed?.subtitle ?? "",
    bannerImage: full?.bannerImage ?? seed?.bannerImage ?? "/img/about-1.png",
    showEnquiry: full?.showEnquiry ?? seed?.showEnquiry ?? true,
  };

  if (full?.contentPath) {
    merged.contentHtml = readContentHtml(slug, full.contentPath);
  }

  return merged;
}
