import { ContentStaticPage } from "./ContentStaticPage";
import type { StaticPageFullContent } from "@/constants/pages/full-content";

function fixCareerHtml(html: string | undefined): string | undefined {
  if (!html) return html;
  let h = html
    .replace(/href="#"/g, 'href="/open-positions"')
    .replace(/href='#'/g, "href='/open-positions'");

  let openBtnCount = 0;
  h = h.replace(
    /<a href="\/open-positions">\s*<button type="button" class="enqrybtn[^"]*">View Open Positions<\/button>\s*<\/a>/g,
    (match) => {
      openBtnCount += 1;
      return openBtnCount === 1 ? match : "";
    },
  );

  return h;
}

export function CareerPage({ page }: { page: StaticPageFullContent }) {
  return (
    <ContentStaticPage
      {...page}
      showEnquiry
      contentHtml={fixCareerHtml(page.contentHtml)}
    />
  );
}
