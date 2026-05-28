import Image from "next/image";
import Link from "next/link";
import { BRAND } from "@/constants/brand";

export function DonationBanner() {
  return (
    <section
      className="position-relative d-flex align-items-end"
      style={{
        position: "relative",
        overflow: "hidden",
        color: "white",
        paddingBottom: 100,
        minHeight: "70vh",
      }}
    >
      <Image
        src="/media/slider_images/banner-1_lUqAwHp.webp"
        alt=""
        fill
        className="hide_mobile"
        style={{ objectFit: "cover", zIndex: 0 }}
        sizes="100vw"
        loading="lazy"
      />
      <Image
        src="/media/mobileslider_images/mobile-banner-4_AiJ5pZv.webp"
        alt=""
        fill
        className="hide_desktop"
        style={{ objectFit: "cover", zIndex: 0 }}
        sizes="100vw"
        loading="lazy"
      />
      <div className="container-fluid text-start donation-button" style={{ position: "relative", zIndex: 1 }}>
        <div className="row">
          <div className="col-auto ps-4">
            <a
              className="action_button button"
              style={{
                display: "inline-block",
                padding: "8px 20px",
                backgroundColor: "#C71782",
                color: "white",
                textDecoration: "none",
                borderRadius: 25,
                marginRight: 20,
              }}
              href={BRAND.onlinePaymentsUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              Donate Now
            </a>
            <Link
              style={{ color: "#fff !important", fontWeight: 600 }}
              href="/caritas-social-responsibility"
            >
              Learn More <i className="bi bi-chevron-right ms-2" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
