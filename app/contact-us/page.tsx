import Link from "next/link";
import { ContactUsForm } from "@/components/forms/ContactUsForm";
import { SiteLayout } from "@/components/layout/SiteLayout";
import { buildMetadata } from "@/lib/metadata";

export const metadata = buildMetadata({
  title: "Contact Us | Caritas Hospital",
  description: "Contact Caritas Hospital, Kottayam for appointments, enquiries and patient support.",
  path: "/contact-us",
});

export default function ContactUsPage() {
  return (
    <SiteLayout>
      <section className="py-5">
        <div className="container">
          <div className="row justify-content-center text-center">
            <h1 style={{ fontWeight: 600 }}>Contact Us</h1>
            <h2 style={{ color: "#c71782", fontWeight: 300 }}>
              Your Path to World-Class Healthcare
            </h2>
          </div>
          <div className="row pt-5">
            <div
              className="col-lg-4"
              style={{ backgroundColor: "#FAF9F9", padding: "1% 3% 4% 4%", minHeight: 450 }}
            >
              <p className="mt-5">
                Ambulance
                <br />
                <a style={{ color: "#0072bc" }} href="tel:+919496555200">
                  +91 (0) 9496555200
                </a>
              </p>
              <p>
                Appointment
                <br />
                <span style={{ color: "#0072bc" }}>+91 (0) 9496555300, +91 (0) 9496555400</span>
              </p>
              <p>
                Information 24/7
                <br />
                <span style={{ color: "#0072bc" }}>+91 (0) 481-2790025 to 29</span>
              </p>
              <p>
                Health Check-up plans
                <br />
                <a style={{ color: "#0072bc" }} href="tel:+919496555900">
                  +91 (0) 9496555900
                </a>
              </p>
            </div>
            <div className="col-lg-7" style={{ margin: "0 2% 0 4%" }}>
              <div className="row">
                <div className="col-lg-6">
                  <p>
                    <b>Caritas Hospital</b>
                  </p>
                  <p>
                    Thellakom P.O, Kottayam-686630
                    <br />
                    Kerala, India
                  </p>
                  <p>
                    Phone: <span style={{ color: "#0072bc" }}>0481-2790025 to 29</span>
                    <br />
                    Email:{" "}
                    <a style={{ color: "#0072bc" }} href="mailto:mail@caritashospital.org">
                      mail@caritashospital.org
                    </a>
                  </p>
                </div>
                <div className="col-lg-6">
                  <img src="/img/NABH1.png" className="img-fluid mx-1" alt="NABH accreditation" />
                  <img src="/img/NABH2.png" className="img-fluid mx-1" alt="NABH accreditation" />
                </div>
                <p>&nbsp;</p>
                <h5>General Enquiry</h5>
                <p>&nbsp;</p>
                <ContactUsForm />
              </div>
            </div>
          </div>
        </div>
      </section>
      <section>
        <div className="container">
          <div className="row">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3933.4144083857113!2d76.54630901083584!3d9.645586678992442!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3b07d357e35d61ad%3A0x27680d9b2d78f03!2sCaritas%20Hospital%20-%20Multispeciality%20Hospital%2C%20Kottayam!5e0!3m2!1sen!2sin!4v1698934618083!5m2!1sen!2sin"
              width="600"
              height="450"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Caritas Hospital location"
            />
          </div>
        </div>
      </section>
      <p className="container pb-4">
        <Link href="/directions">
          Directions to Reach <i className="bi bi-chevron-right" />
        </Link>
      </p>
    </SiteLayout>
  );
}
