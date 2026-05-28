import Image from "next/image";
import Link from "next/link";
import {
  CENTRES_OF_EXCELLENCE,
  FOOTER_ABOUT_LINKS,
  FOOTER_CONTACT,
  FOOTER_EDUCATION_LINKS,
  FOOTER_HOSPITAL_LINKS,
  RESOURCE_LINKS,
  FOOTER_SERVICE_LINKS,
  FOOTER_USEFUL_LINKS,
  SPECIALITIES,
  type NavLink,
} from "@/constants/navigation";
import { BRAND } from "@/constants/brand";

const FOOTER_SOCIAL = [
  {
    href: "https://www.facebook.com/CaritasHospitalThellakom/",
    icon: "/img/facebook.png",
    label: "Facebook",
  },
  {
    href: "https://www.linkedin.com/company/caritashospital/",
    icon: "/img/linkedin.png",
    label: "LinkedIn",
  },
  {
    href: "https://www.instagram.com/caritashospital",
    icon: "/img/insta.png",
    label: "Instagram",
  },
  {
    href: "https://www.youtube.com/channel/UCKZOzDHqQNwu6ZIreumi9bQ",
    icon: "/img/youtube.png",
    label: "YouTube",
  },
] as const;

function FooterLinkList({ links }: { links: NavLink[] }) {
  return (
    <ul style={{ listStyle: "none", paddingLeft: 0 }}>
      {links.map((item) => (
        <li key={item.href}>
          {item.external ? (
            <a
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              style={{ display: "block", marginBottom: 15 }}
            >
              {item.label}
            </a>
          ) : (
            <Link href={item.href} style={{ display: "block", marginBottom: 15 }}>
              {item.label}
            </Link>
          )}
        </li>
      ))}
    </ul>
  );
}

function FooterColumn({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="col-lg-2 col-md-6 mb-4 mb-lg-0">
      <h6 style={{ marginBottom: 30 }}>{title}</h6>
      {children}
    </div>
  );
}

function ContactColumn() {
  return (
    <div className="col-lg-3 col-md-6 mb-4 mb-lg-0">
      <h6 style={{ marginBottom: 30 }}>Contact</h6>
      <p>
        <strong>Address</strong>
      </p>
      <p>
        <span style={{ color: "#0072bc", fontWeight: 600 }}>{FOOTER_CONTACT.address}</span>
      </p>
      <p>
        <strong>Contact Number</strong>
      </p>
      <p>
        <span style={{ color: "#0072bc", fontWeight: 600 }}>{FOOTER_CONTACT.information}</span>
      </p>
      <p>
        <strong>Email-Id</strong>
      </p>
      <p>
        <a href={`mailto:${FOOTER_CONTACT.email}`}>{FOOTER_CONTACT.email}</a>
      </p>
      <p>
        <strong>Feedback</strong>
      </p>
      <p>
        <a href={`mailto:${FOOTER_CONTACT.feedback}`}>{FOOTER_CONTACT.feedback}</a>
      </p>
      <div className="action_button my-4">
        <a href={BRAND.bookingUrl} target="_blank" rel="noopener noreferrer">
          <button type="button" id="openFormButton">
            Appointments
          </button>
        </a>
      </div>
    </div>
  );
}

function SocialIcons() {
  return (
    <>
      {FOOTER_SOCIAL.map((item) => (
        <a
          key={item.href}
          href={item.href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={item.label}
          title={item.label}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={item.icon} alt="" width={32} height={32} loading="lazy" />
        </a>
      ))}
    </>
  );
}

function FooterEnd({ year }: { year: number }) {
  return (
    <div className="container d-none d-md-block mb-2 footer-end">
      <div className="row align-items-center">
        <div className="col-12 col-lg-6 social d-flex align-items-center gap-2 flex-wrap">
          <SocialIcons />
        </div>
        <div className="col-12 col-lg-6 credits text-lg-end">
          <Link style={{ color: "#000!important" }} href="/privacy-policy">
            Privacy Policy
          </Link>
          {" | "}
          <Link style={{ color: "#000!important" }} href="/terms-and-conditions">
            Terms & Conditions
          </Link>
          {" | "}
          All Rights Reserved © {year} Caritas Hospital.
        </div>
      </div>
    </div>
  );
}

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer id="footer">
      <section>
        <div
          className="container px-5 py-5"
          style={{ backgroundColor: "#F4F6F6", borderRadius: "25px" }}
        >
          <div className="row justify-content-center text-center text-lg-start">
            <div className="col-lg-3 col-6 mb-3 mb-lg-0">
              <p>Ambulance</p>
              <p>
                <a href="tel:+919496555200">{FOOTER_CONTACT.ambulance}</a>
              </p>
            </div>
            <div className="col-lg-3 col-6 mb-3 mb-lg-0">
              <p>Appointments</p>
              <p>
                <a href="tel:+919496555300">{FOOTER_CONTACT.appointments}</a>
              </p>
            </div>
            <div className="col-lg-3 col-6">
              <p>Information 24/7</p>
              <p>
                <a href="tel:0481-2790025">{FOOTER_CONTACT.informationDisplay}</a>
              </p>
            </div>
            <div className="col-lg-3 col-6">
              <p>Health Check-up plans</p>
              <p>
                <a href="tel:+919496555900">{FOOTER_CONTACT.healthCheckup}</a>
              </p>
            </div>
          </div>
        </div>
      </section>

      <div className="footer-top">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-6">
              <h6 style={{ marginBottom: 30 }}>Centres of Excellence</h6>
              <hr style={{ width: "85%", margin: "20px 0" }} />
              <div className="row">
                <div className="col-lg-6">
                  <FooterLinkList links={CENTRES_OF_EXCELLENCE.slice(0, 9)} />
                </div>
                <div className="col-lg-6">
                  <FooterLinkList links={CENTRES_OF_EXCELLENCE.slice(9)} />
                </div>
              </div>
            </div>
            <div className="col-lg-6">
              <h6 style={{ marginBottom: 30 }}>Specialities</h6>
              <hr style={{ width: "85%", margin: "20px 0" }} />
              <div className="row">
                <div className="col-lg-6">
                  <FooterLinkList links={SPECIALITIES.slice(0, 8)} />
                </div>
                <div className="col-lg-6">
                  <FooterLinkList links={SPECIALITIES.slice(8)} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <section id="cntct" className="footer-second py-5" style={{ margin: 25 }}>
        <div className="container px-0">
          <div className="row justify-content-center">
            <ContactColumn />
            <FooterColumn title="About">
              <FooterLinkList links={FOOTER_ABOUT_LINKS} />
            </FooterColumn>
            <FooterColumn title="Education">
              <FooterLinkList links={FOOTER_EDUCATION_LINKS} />
              <h6 style={{ marginBottom: 20, marginTop: 20 }}>Our Hospitals</h6>
              <FooterLinkList links={FOOTER_HOSPITAL_LINKS} />
            </FooterColumn>
            <FooterColumn title="Services">
              <FooterLinkList links={FOOTER_SERVICE_LINKS} />
            </FooterColumn>
            <div className="col-lg-2 col-md-6 mb-4 mb-lg-0">
              <h6 style={{ marginBottom: 30 }}>Useful Links</h6>
              <FooterLinkList links={FOOTER_USEFUL_LINKS} />
              <div className="d-none d-md-block">
                <h6 style={{ marginBottom: 30 }}>Resources</h6>
                <FooterLinkList links={RESOURCE_LINKS} />
              </div>
            </div>
            <div className="col-lg-2 d-md-none mb-2 footer-resource">
              <h6 style={{ marginBottom: 30 }}>Resources</h6>
              <FooterLinkList links={RESOURCE_LINKS} />
              <br />
              <div className="row" style={{ width: "100%", padding: 10 }}>
                <div className="col-12 social d-flex flex-wrap gap-2 mb-3">
                  <SocialIcons />
                </div>
                <div className="col-12 credits" style={{ fontSize: 14 }}>
                  <Link href="/privacy-policy">Privacy Policy</Link>
                  {" | "}
                  <Link href="/terms-and-conditions">Terms & Conditions</Link>
                  {" | "}
                  All Rights Reserved © {year} Caritas Hospital.
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <FooterEnd year={year} />
    </footer>
  );
}
