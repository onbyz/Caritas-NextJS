import Image from "next/image";
import Link from "next/link";

const PHONE = "9188527154";
const PHONE_DISPLAY = "+91 9188 527 154";
const WHATSAPP_URL = `https://api.whatsapp.com/send?phone=${PHONE}&text=${encodeURIComponent("Hello there!")}`;

export function HomeCareContactAside() {
  return (
    <aside
      className="home-care-contact-aside h-100 d-flex flex-column"
      style={{ backgroundColor: "#FAF9F9" }}
    >
      <h5 className="mb-3" style={{ fontWeight: 600 }}>
        Other Ways to Avail Caritas Home Care Service
      </h5>
      <p className="mb-4" style={{ color: "#555", lineHeight: 1.6 }}>
        In addition to our online form, Caritas Hospital offers you multiple convenient
        methods to book our home care services.
      </p>

      <div className="home-care-contact-method mb-4">
        <div className="d-flex align-items-start gap-3">
          <span
            className="d-flex align-items-center justify-content-center flex-shrink-0 rounded-circle"
            style={{
              width: 44,
              height: 44,
              backgroundColor: "rgba(0, 114, 188, 0.1)",
            }}
            aria-hidden
          >
            <i className="bi bi-telephone-fill" style={{ color: "#0072bc", fontSize: 20 }} />
          </span>
          <div>
            <p className="mb-1 fw-semibold">Talk to Us</p>
            <Link
              href={`tel:+91${PHONE}`}
              style={{ color: "#0072bc", fontWeight: 600, fontSize: "1.1rem" }}
            >
              {PHONE_DISPLAY}
            </Link>
            <p className="mb-0 mt-2 small text-muted">
              Simply give us a call, and our dedicated team will assist you.
            </p>
          </div>
        </div>
      </div>

      <div className="home-care-contact-method">
        <div className="d-flex align-items-start gap-3">
          <span
            className="d-flex align-items-center justify-content-center flex-shrink-0 rounded-circle"
            style={{
              width: 44,
              height: 44,
              backgroundColor: "rgba(37, 211, 102, 0.12)",
            }}
            aria-hidden
          >
            <Image src="/img/whatsapp 1.png" alt="" width={24} height={24} />
          </span>
          <div>
            <p className="mb-1 fw-semibold">WhatsApp</p>
            <Link
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Chat on WhatsApp"
              className="d-inline-flex align-items-center gap-2"
              style={{ color: "#0072bc", fontWeight: 600, fontSize: "1.1rem" }}
            >
              {PHONE_DISPLAY}
            </Link>
            <p className="mb-0 mt-2 small text-muted">
              Use WhatsApp to initiate your enquiry. Our team will guide you through the
              rest of the process.
            </p>
          </div>
        </div>
      </div>
    </aside>
  );
}
