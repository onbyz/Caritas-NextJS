import { ContentStaticPage } from "@/features/pages/ContentStaticPage";
import { ServiceQuickLinks } from "@/components/shared/ServiceQuickLinks";
import { TransplantVideos } from "@/components/shared/TransplantVideos";
import type { StaticPageFullContent } from "@/constants/pages/full-content";

/** Strip transplant videos + bottom links from extracted HTML (rendered in React). */
function organBodyHtml(html: string | undefined): string | undefined {
  if (!html) return html;
  let h = html;
  const videoIdx = h.indexOf("<h3>Transplant Videos</h3>");
  if (videoIdx > 0) {
    const sectionStart = h.lastIndexOf("<section", videoIdx);
    if (sectionStart >= 0) h = h.slice(0, sectionStart).trim();
  }
  const linksIdx = h.lastIndexOf('class="row bottomlinks"');
  if (linksIdx > 0) {
    const sectionStart = h.lastIndexOf("<section", linksIdx);
    if (sectionStart >= 0) h = h.slice(0, sectionStart).trim();
  }
  return h;
}

export function OrganTransplantPage({ page }: { page: StaticPageFullContent }) {
  return (
    <ContentStaticPage {...page} contentHtml={organBodyHtml(page.contentHtml)}>
      <TransplantVideos />
      <ServiceQuickLinks activeHref="/organ" />
    </ContentStaticPage>
  );
}
