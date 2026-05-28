import Image from "next/image";
import Link from "next/link";
import { VIRTUAL_TOUR_URL } from "@/constants/homepage";

export function VirtualTourBanner() {
  return (
    <section
      className="position-relative d-flex align-items-end"
      style={{
        position: "relative",
        overflow: "hidden",
        color: "white",
        background:
          "linear-gradient(135deg, rgba(0,114,188,0.95) 0%, rgba(26,44,82,0.95) 50%, rgba(199,23,130,0.9) 100%)",
        paddingBottom: 100,
        minHeight: "80vh",
        margin: "30px 0 60px 0",
      }}
    >
      <Image
        src="/img/vr-banner.webp"
        alt=""
        fill
        className="hide_mobile"
        style={{ objectFit: "cover", zIndex: 0 }}
        sizes="100vw"
        loading="lazy"
      />
      <Image
        src="/img/vr-mobile-banner.webp"
        alt=""
        fill
        className="hide_desktop"
        style={{ objectFit: "cover", zIndex: 0 }}
        sizes="100vw"
        loading="lazy"
      />
      <div
        className="container text-start"
        style={{ position: "absolute", left: 40, top: "40%", zIndex: 1 }}
      >
        <div className="row">
          <div className="col">
            <h2>
              Visit our hospital
              <br />
              using Virtual Reality
            </h2>
            <div className="action_button my-4">
              <h3>
                <Link href={VIRTUAL_TOUR_URL} target="_blank" rel="noopener noreferrer">
                  <button type="button" id="openFormButton">
                    Click Here
                  </button>
                </Link>
              </h3>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
