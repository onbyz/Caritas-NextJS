import { BRAND } from "@/constants/brand";

const MAGAZINE_PDF = "/magazines/Caritasian Magazine.pdf";

/**
 * Fixed action icons on the right — matches Django base.html (WhatsApp, magazine PDF, mobile call).
 */
export function FloatingActionIcons() {
  return (
    <div className="site-floating-icons-root">
      <div className="whatsapp-icon site-floating-icon site-floating-icon--whatsapp">
        <a
          href={BRAND.whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Chat on WhatsApp"
          style={{ width: 50, height: 50 }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/img/whatsapp-icon.png"
            alt="WhatsApp"
            width={50}
            height={50}
            className="site-floating-icon__img"
            style={{ width: 50, height: 50, maxWidth: 50 }}
          />
        </a>
      </div>

      <div className="pdf-icon site-floating-icon site-floating-icon--pdf">
        <a
          href={MAGAZINE_PDF}
          title="Download Caritasian December Edition"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Download Caritasian Magazine"
          style={{ width: 45, height: 45 }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/img/pdf-icon.svg"
            alt="Download Caritasian December Edition"
            width={45}
            height={45}
            className="site-floating-icon__img"
            style={{ width: 45, height: 45, maxWidth: 45 }}
          />
        </a>
      </div>

      <div className="call-icon hide_desktop site-floating-icon site-floating-icon--call">
        <a href="tel:0481-2790025" aria-label="Call Caritas Hospital" style={{ width: 40, height: 40 }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/img/ph_phone.png"
            alt="Call"
            width={40}
            height={40}
            className="site-floating-icon__img"
            style={{ width: 40, height: 40, maxWidth: 40 }}
          />
        </a>
      </div>
    </div>
  );
}
