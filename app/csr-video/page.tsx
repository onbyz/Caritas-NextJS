import { SiteLayout } from "@/components/layout/SiteLayout";
import { buildMetadata } from "@/lib/metadata";

export const metadata = buildMetadata({
  title: "CSR Activity: Life Boat Service | Caritas Hospital",
  description: "Life Boat Service CSR activity video.",
  path: "/csr-video",
});

export default function CsrVideoPage() {
  return (
    <SiteLayout>
      <section className="py-5">
        <div className="container">
          <div className="row justify-content-center">
            <video width="100%" controls playsInline>
              <source src="/csr-video/csr.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
