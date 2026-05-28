import { CsrActivitiesSection } from "./CmsListPages";
import { ContentStaticPage } from "./ContentStaticPage";
import type { StaticPageFullContent } from "@/constants/pages/full-content";
import type { CsrActivity } from "@/services/cms";

function fixCsrHtml(html: string | undefined): string | undefined {
  if (!html) return html;
  let h = html;

  h = h.replace(
    /<h4>\s*<a[^>]*href=["']#["'][^>]*>[\s\S]*?CSR Activity\s*:\s*Life Boat Service[\s\S]*?<\/a>\s*<\/h4>/i,
    `<h4><a href="/csr-video" style="color: #0072BC;">CSR Activity : Life Boat Service</a></h4>`,
  );

  const marker = "Caritas Public Health Mission";
  const idx = h.indexOf(marker);
  if (idx >= 0) {
    const sectionStart = h.lastIndexOf("<section", idx);
    const sectionEnd = h.indexOf("</section>", idx);
    if (sectionStart >= 0 && sectionEnd > sectionStart) {
      h = (h.slice(0, sectionStart) + h.slice(sectionEnd + "</section>".length)).trim();
    }
  }

  return h;
}

export function CsrListPage({
  page,
  activities,
  currentPage,
}: {
  page: StaticPageFullContent;
  activities: CsrActivity[];
  currentPage: number;
}) {
  return (
    <ContentStaticPage {...page} contentHtml={fixCsrHtml(page.contentHtml)}>
      <CsrActivitiesSection activities={activities} currentPage={currentPage} />
    </ContentStaticPage>
  );
}
