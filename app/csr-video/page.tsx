import { SiteLayout } from "@/components/layout/SiteLayout";
import { SectionReveal } from "@/components/motion/SectionReveal";
import { CSR_LIFEBOAT_MUX_PLAYER_URL } from "@/constants/csr-video";
import { buildMetadata } from "@/lib/metadata";

export const metadata = buildMetadata({
  title: "CSR Activity: Life Boat Service | Caritas Hospital",
  description: "Life Boat Service CSR activity video.",
  path: "/csr-video",
});

export default function CsrVideoPage() {
  return (
    <SiteLayout>
      <SectionReveal as="section" className="py-5">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-12">
              <h1 className="text-center mb-4" style={{ fontWeight: 600 }}>
                CSR Activity: Life Boat Service
              </h1>
              <div
                className="csr-mux-player-wrap"
                style={{
                  position: "relative",
                  width: "100%",
                  maxWidth: 960,
                  margin: "0 auto",
                  aspectRatio: "16 / 9",
                  borderRadius: 12,
                  overflow: "hidden",
                  boxShadow: "0 8px 32px rgba(22, 65, 147, 0.12)",
                }}
              >
                <iframe
                  src={CSR_LIFEBOAT_MUX_PLAYER_URL}
                  title="CSR Activity: Life Boat Service"
                  style={{
                    position: "absolute",
                    inset: 0,
                    width: "100%",
                    height: "100%",
                    border: "none",
                  }}
                  allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture;"
                  allowFullScreen
                />
              </div>
            </div>
          </div>
        </div>
      </SectionReveal>
    </SiteLayout>
  );
}
