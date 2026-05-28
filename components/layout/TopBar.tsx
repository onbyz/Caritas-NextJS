import Link from "next/link";
import { BRAND } from "@/constants/brand";

const EMERGENCY_TEL = "9496555200";
const EMERGENCY_DISPLAY = "+91 94965 55200";

export function TopBar() {
  return (
    <section id="topbar" className="site-topbar" aria-label="Quick links">
      <div className="container site-topbar__container">
        <div className="site-topbar__inner">
          <nav className="site-topbar__links" aria-label="Utility navigation">
            <a
              className="site-topbar__link site-topbar__link--accent"
              href={BRAND.onlinePaymentsUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="bi bi-credit-card-2-front" aria-hidden />
              <span>Online Payments</span>
            </a>

            <span className="site-topbar__divider" aria-hidden />

            <Link className="site-topbar__link site-topbar__link--dark" href="/career">
              <i className="bi bi-briefcase" aria-hidden />
              <span>Careers</span>
            </Link>

            <span className="site-topbar__divider site-topbar__divider--before-emergency" aria-hidden />

            <a
              className="site-topbar__link site-topbar__link--emergency"
              href={`tel:${EMERGENCY_TEL}`}
            >
              <i className="bi bi-telephone-fill" aria-hidden />
              <span className="site-topbar__emergency-text">
                <span className="site-topbar__emergency-label">24×7 Emergency</span>
                <span className="site-topbar__emergency-number">{EMERGENCY_DISPLAY}</span>
              </span>
            </a>
          </nav>

          <a
            className="site-topbar__appointment d-md-none"
            href={BRAND.bookingUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            Book an Appointment
          </a>
        </div>
      </div>
    </section>
  );
}
