import { ContentStaticPage } from "@/features/pages/ContentStaticPage";
import { HomeCareForm } from "@/components/forms/HomeCareForm";
import { HomeCareContactAside } from "@/components/home-care/HomeCareContactAside";
import { ServiceQuickLinks } from "@/components/shared/ServiceQuickLinks";
import type { StaticPageFullContent } from "@/constants/pages/full-content";

function stripContactSection(html: string | undefined): string | undefined {
  if (!html) return html;
  const marker = "Reach Out for";
  const idx = html.indexOf(marker);
  if (idx < 0) return html;
  const sectionStart = html.lastIndexOf("<section", idx);
  const sectionEnd = html.indexOf("</section>", idx);
  if (sectionStart >= 0 && sectionEnd > sectionStart) {
    return (html.slice(0, sectionStart) + html.slice(sectionEnd + "</section>".length)).trim();
  }
  return html;
}

export function HomeCarePage({ page }: { page: StaticPageFullContent }) {
  return (
    <ContentStaticPage {...page} contentHtml={stripContactSection(page.contentHtml)}>
      <section id="deptsections" className="py-5">
        <span id="Contact" />
        <div className="container mt-5">
          <div className="row g-4 align-items-stretch">
            <div className="col-lg-6">
              <h3>
                Reach Out for
                <br />
                Caritas Home Care Services
              </h3>
              <p>
                <span style={{ color: "#c71782" }}>Note:</span> Please note that our home
                care services are available to residents within a 30-kilometer radius of
                Caritas Hospital.
              </p>
              <HomeCareForm />
            </div>
            <div className="col-lg-6">
              <HomeCareContactAside />
            </div>
          </div>
        </div>
      </section>
      <ServiceQuickLinks activeHref="/caritas-home-care" />
    </ContentStaticPage>
  );
}
