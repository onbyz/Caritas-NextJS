import fullContentJson from "./full-content.json";
import type { StaticPageConfig } from "./registry";

export type StaticPageFullContent = StaticPageConfig & {
  contentPath?: string;
  hasHeroBanner?: boolean;
  contentHtml?: string;
};

export const STATIC_PAGE_FULL_CONTENT = fullContentJson as Record<
  string,
  Partial<StaticPageFullContent> & { slug: string; contentPath?: string }
>;
