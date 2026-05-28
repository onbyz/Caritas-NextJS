import { ContentStaticPage } from "@/features/pages/ContentStaticPage";
import { ServiceQuickLinks } from "@/components/shared/ServiceQuickLinks";
import type { StaticPageFullContent } from "@/constants/pages/full-content";

const MISSING_LOGOS = new Set([
  "bluedor.jpg",
  "care-health.jpg",
  "digit.jpg",
  "navi.jpg",
  "tokio.jpg",
  "volvo.jpg",
  "galaxy.jpg",
]);

function fixInsuranceHtml(html: string | undefined): string | undefined {
  if (!html) return html;
  let h = html;

  // Encode spaces in image paths for reliable loading
  h = h.replace(/src="(\/img\/[^"]+)"/g, (_, src: string) => {
    const filename = src.split("/").pop() ?? "";
    if (MISSING_LOGOS.has(filename)) {
      return 'src="" data-missing="true" style="display:none"';
    }
    return `src="${src.replace(/ /g, "%20")}"`;
  });

  // Drop bottom quick-links block (rendered in React)
  const linksIdx = h.lastIndexOf('style="width: 90%; margin: 0 auto"');
  if (linksIdx > 0) {
    const sectionStart = h.lastIndexOf("<section", linksIdx);
    if (sectionStart > 0) h = h.slice(0, sectionStart).trim();
  }

  return h;
}

export function InsurancePage({ page }: { page: StaticPageFullContent }) {
  return (
    <ContentStaticPage {...page} contentHtml={fixInsuranceHtml(page.contentHtml)}>
      <ServiceQuickLinks activeHref="/insurance" />
    </ContentStaticPage>
  );
}
