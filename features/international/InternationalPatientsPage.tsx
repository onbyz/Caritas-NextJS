import Image from "next/image";
import Link from "next/link";
import { readFile } from "fs/promises";
import path from "path";
import { SiteLayout } from "@/components/layout/SiteLayout";
import { EnquiryForm } from "@/components/shared/EnquiryForm";
import { HealthPackagesHtml } from "@/components/international/HealthPackagesHtml";
import { InternationalEnquiryForm } from "@/components/international/InternationalEnquiryForm";
import { DepartmentStickyNav } from "@/components/departments/DepartmentStickyNav";
import { CENTRES_OF_EXCELLENCE, SPECIALITIES } from "@/constants/navigation";

const NAV = [
  { id: "overview", label: "Overview" },
  { id: "Services", label: "Services" },
  { id: "diamondPackage", label: "Health Packages" },
  { id: "PlanYourVisit", label: "Plan Your Visit" },
  { id: "Departments", label: "Departments" },
  { id: "WhyCaritas", label: "Why Caritas?" },
  { id: "AboutCaritas", label: "About Caritas" },
  { id: "AboutKottayam", label: "About Kottayam" },
];

async function loadHealthPackagesHtml(): Promise<string> {
  try {
    const filePath = path.join(
      process.cwd(),
      "public/content/international-health-packages.html",
    );
    return await readFile(filePath, "utf-8");
  } catch {
    return "";
  }
}

export async function InternationalPatientsPage() {
  const packagesHtml = await loadHealthPackagesHtml();

  return (
    <SiteLayout>
      <section className="py-5">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-10">
              <h1 style={{ fontWeight: 600 }}>International Patients</h1>
              <h2 style={{ color: "#c71782", fontWeight: 300 }}>
                Compassionate Care Knows No Borders
              </h2>
            </div>
            <div className="col-lg-2">
              <Link className="mainheading" href="/international_patients">
                English
              </Link>{" "}
              |{" "}
              <Link href="/international_patients_arabic" style={{ color: "#000" }}>
                عربي
              </Link>
            </div>
          </div>
          <div className="row px-3">
            <div className="col-lg-8 col-md-10 col-sm-12 text-center px-0" style={{ margin: "auto 0" }}>
              <Image
                src="/img/patient-measuring-blood-pressure.png"
                alt="International patient care"
                width={900}
                height={400}
                className="img-fluid"
              />
            </div>
            <div className="col-lg-4 col-md-10 col-sm-12 px-5 py-5" style={{ backgroundColor: "#c71782" }}>
              <h4 className="text-light">
                Have Questions?
                <br />
                We&apos;re Here to Help
              </h4>
              <p className="text-light">
                Feel free to reach out, and let&apos;s embark on a journey to better health together.
              </p>
              <EnquiryForm />
            </div>
          </div>
        </div>
      </section>

      <DepartmentStickyNav items={NAV} />

      <section id="deptsections">
        <span id="overview" />
        <div className="container">
          <div className="row">
            <h3>
              Welcome to Caritas Hospital,
              <br /> Your Global Healthcare Destination
            </h3>
            <p>&nbsp;</p>
            <div className="col-lg-5">
              <Image src="/img/international2.png" alt="" width={500} height={350} style={{ width: "96%" }} />
            </div>
            <div className="col-lg-7 pt-4 mt-1">
              <p style={{ fontWeight: 500, marginBottom: 30 }}>
                At Caritas Hospital, we are dedicated to providing world-class healthcare services to patients from
                around the globe. Our commitment to excellence, compassion, and cutting-edge medical technology has made
                us a trusted choice for international patients seeking quality healthcare.
              </p>
              <p>
                Whether you are seeking specialized medical care, a comprehensive health checkup, or a second opinion,
                Caritas Hospital is your healthcare destination of choice.
              </p>
              <p>
                At Caritas Hospital, we don&apos;t just provide medical treatment; we offer a commitment to your health,
                happiness, and peace of mind.
              </p>
              <a href="#makeanenquiry">
                <button type="button" className="enqrybtn">
                  Make An Enquiry
                </button>
              </a>
            </div>
          </div>
        </div>
      </section>

      <section id="deptsections" style={{ backgroundColor: "#F4F6F6", maxWidth: "100%" }}>
        <span id="Services" />
        <div className="container mt-5">
          <div className="row">
            <div className="col-lg-6">
              <h3>
                Services for <br />
                International Patients
              </h3>
              <p>
                Caritas Hospital offers a wide range of healthcare services designed to meet the diverse needs of our
                international patients.
              </p>
              <a href="#makeanenquiry">
                <button type="button" className="enqrybtn">
                  Make An Enquiry
                </button>
              </a>
            </div>
            <div className="col-lg-5 hide_mobile">
              <h4 style={{ fontWeight: 600 }}>Comprehensive Healthcare Services</h4>
              <p className="mt-5 textxolor_pink">
                <i className="bi bi-chevron-right ms-2" />
                Emergency Service · Outpatient Services · Inpatient Services
              </p>
            </div>
          </div>
          <div className="row mt-4">
            <div className="col-md-6">
              <ol>
                <li>Medical Opinion: Provided within 24 to 42 hours.</li>
                <li>Visa Assistance: Help with visa invitation and extension.</li>
                <li>Travel Support: Airport pickup and drop facility.</li>
                <li>Language Help: Arabic and English translator available.</li>
              </ol>
            </div>
            <div className="col-md-6">
              <ol start={5}>
                <li>Accommodation & Food: Comfortable stay and customized meals.</li>
                <li>Admission & Discharge: Quick and easy process.</li>
                <li>Payment Facility: Cashless and card payment options.</li>
                <li>Tele medicine support for pre and post follow up treatment.</li>
              </ol>
            </div>
          </div>
        </div>
      </section>

      {packagesHtml ? <HealthPackagesHtml html={packagesHtml} /> : null}

      <section id="deptsections">
        <span id="PlanYourVisit" />
        <div className="container mt-5">
          <h3 className="mb-4">
            Plan Your Visit: Streamlined Care for
            <br /> International Patients
          </h3>
          <p>
            Caritas Hospital follows a well-structured process for international patients from initial inquiries to
            arrival, accommodation, and additional services.
          </p>
          <div className="row mt-4">
            <div className="col-lg-6 px-3">
              <Image
                src="/img/young-male-psysician-with-patient-measuring-blood-pressure 14.png"
                alt=""
                width={500}
                height={300}
                style={{ width: "100%" }}
              />
              <div className="col-content px-4 plan" style={{ backgroundColor: "#FAF9F9" }}>
                <h5 className="pt-4">Patient Inquiry and Initial Contact</h5>
                <ul className="custom-list">
                  <li className="mx-2">
                    Receiving patient query via WhatsApp:{" "}
                    <a href="tel:+918714673343">+91-8714673343</a>
                  </li>
                  <li className="mx-2">Treatment estimation within 24 hours.</li>
                  <li className="mx-2">Medical visa supporting documents provided.</li>
                </ul>
              </div>
            </div>
            <div className="col-lg-6 px-3">
              <Image
                src="/img/young-male-psysician-with-patient-measuring-blood-pressure 15.png"
                alt=""
                width={500}
                height={300}
                style={{ width: "100%" }}
              />
              <div className="col-content px-4 plan" style={{ backgroundColor: "#FAF9F9" }}>
                <h5 className="pt-4">Arrival and Stay</h5>
                <ul className="custom-list">
                  <li className="mx-2">Airport pickup for patient and bystanders.</li>
                  <li className="mx-2">Hospital and hotel stay arrangements.</li>
                  <li className="mx-2">Green channel facilities for smooth treatment.</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="deptsections" style={{ backgroundColor: "#F4F6F6" }}>
        <span id="WhyCaritas" />
        <div className="container mt-5 text-center">
          <h3>Voices of Our International Patients</h3>
          <p>
            Discover the stories and experiences of international patients who have entrusted Caritas Hospital with
            their healthcare journey.
          </p>
          <p className="mt-4">
            <Link href="/testimonials" style={{ color: "#C71782" }}>
              View All <i className="bi bi-chevron-right ms-2" />
            </Link>
          </p>
          <a href="#makeanenquiry">
            <button type="button" className="enqrybtn">
              Make An Enquiry
            </button>
          </a>
        </div>
      </section>

      <section
        className="mb-5"
        style={{
          backgroundImage: "url('/img/houseboat.png')",
          backgroundSize: "cover",
          height: 630,
        }}
      >
        <div className="container mt-5">
          <div className="col-lg-7">
            <h2 className="text-light">
              Travel from Many Places to
              <br /> One Place That Heals.
            </h2>
            <p className="text-light mt-4">
              When you opt for treatment at Caritas Hospital, you experience world-class care and easy access to the
              pristine landscape of Kottayam.
            </p>
          </div>
        </div>
      </section>

      <section id="deptsections">
        <span id="Departments" />
        <div className="container">
          <h3>Our Departments</h3>
          <p>
            Our Centers of Excellence and Specialities cover a wide range of medical disciplines for international
            patients.
          </p>
          <div className="row justify-content-center" id="intdept">
            <div className="col-lg-6">
              <h6 style={{ marginBottom: 30 }}>Centres of Excellence</h6>
              <ul style={{ listStyle: "none", paddingLeft: 0 }}>
                {CENTRES_OF_EXCELLENCE.map((d) => (
                  <li key={d.href}>
                    <Link href={d.href} style={{ display: "block", marginBottom: 15 }}>
                      {d.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div className="col-lg-6">
              <h6 style={{ marginBottom: 30 }}>Specialities</h6>
              <ul style={{ listStyle: "none", paddingLeft: 0 }}>
                {SPECIALITIES.map((d) => (
                  <li key={d.href}>
                    <Link href={d.href} style={{ display: "block", marginBottom: 15 }}>
                      {d.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section id="deptsections" style={{ backgroundColor: "#FAF9F9" }}>
        <span id="AboutCaritas" />
        <div className="container py-5">
          <h3>About Caritas Hospital</h3>
          <p>
            For over six decades, Caritas Hospital has been a beacon of hope and healing in Kottayam, delivering
            compassionate, world-class healthcare to patients from across India and around the globe.
          </p>
          <Link href="/about-caritas" style={{ color: "#c71782" }}>
            Learn more about Caritas <i className="bi bi-chevron-right ms-2" />
          </Link>
        </div>
      </section>

      <section id="deptsections">
        <span id="AboutKottayam" />
        <div className="container py-5">
          <h3>About Kottayam</h3>
          <p>
            Nestled in the heart of Kerala, Kottayam is known for its serene backwaters, lush greenery, and rich cultural
            heritage — an ideal setting for recovery and rejuvenation.
          </p>
        </div>
      </section>

      <InternationalEnquiryForm />
    </SiteLayout>
  );
}
