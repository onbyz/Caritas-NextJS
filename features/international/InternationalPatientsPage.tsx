import Image from "next/image";
import Link from "next/link";
import { readFile } from "fs/promises";
import path from "path";
import { SiteLayout } from "@/components/layout/SiteLayout";
import { EnquiryForm } from "@/components/shared/EnquiryForm";
import { HealthPackagesHtml } from "@/components/international/HealthPackagesHtml";
import { InternationalEnquiryForm } from "@/components/international/InternationalEnquiryForm";
import { DepartmentStickyNav } from "@/components/departments/DepartmentStickyNav";
import { YoutubeVideoCard } from "@/components/home/YoutubeVideoCard";
import {
  getTestimonialVideosResolved,
  getVideoGalleryResolved,
  type CmsVideo,
} from "@/services/cms";

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

const FEATURE_CARDS = [
  { image: "/img/DSC01597 1.png", title: "State-of-the-art Infrastructure" },
  { image: "/img/DSC01597 2.png", title: "Pick and Drop" },
  { image: "/img/DSC01597 3.png", title: "Tie-up With All Major Health Insurance Providers" },
  { image: "/img/DSC01597 4.png", title: "Helipad" },
  { image: "/img/DSC01597 5.png", title: "Translator" },
  { image: "/img/DSC01597 6.png", title: "Reach by Air" },
  { image: "/img/DSC01597 7.png", title: "Lush Green Ambience" },
];

const CENTRES_LEFT = [
  { label: "Caritas Cancer Institute", href: "/caritas-cancer-institute" },
  { label: "Caritas Heart Institute", href: "/caritas-heart-institute" },
  { label: "Caritas Neuro Sciences", href: "/caritas-neuro" },
  { label: "Critical Care Medicine", href: "/criticalcare" },
  { label: "Dermatology & Cosmetology", href: "/dermatology" },
  { label: "Emergency Medicine & Trauma Care", href: "/emergency-medicine" },
  { label: "Gastro Sciences", href: "/caritas-gastro" },
  { label: "General Medicine", href: "/caritas-general-medicine" },
  { label: "General, Minimal Access and Bariatric Surgery (General Surgery)", href: "/general-surgery" },
];

const CENTRES_RIGHT = [
  { label: "Nephrology & Renal Transplant", href: "/caritas-nephrology" },
  { label: "Obstetrics, Gynaecology and Fetal Medicine", href: "/gynaecology" },
  { label: "Orthopaedics, Joint Replacement and Arthroscopy", href: "/caritas-orthopaedics" },
  { label: "Paediatrics & Paediatrics Surgery", href: "/caritas-paediatrics" },
  { label: "Physical Medicine and Rehabilitation", href: "/physical-medicine" },
  { label: "Rheumatology", href: "/caritas-rheumatology" },
  { label: "Urology", href: "/caritas-urology" },
];

const SPECIALITIES_LEFT = [
  { label: "Anaesthesiology", href: "/anaesthesiology" },
  { label: "Community Medicine", href: "/community-medicine" },
  { label: "Dental, Oral & Maxillo Facial Surgery", href: "/dental" },
  { label: "Department of ENT & Audiology", href: "/caritas-ent-audiology" },
  { label: "Endocrinology", href: "/endocrinology" },
  { label: "Interventional Radiology, Radio Diagnosis and Imaging", href: "/interventional-radiology" },
  { label: "Neonatology", href: "/neonatology" },
];

const SPECIALITIES_RIGHT = [
  { label: "Ophthalmology", href: "/ophthalmology" },
  { label: "Pathology, Microbiology & Laboratory Medicine", href: "/pathology" },
  { label: "Plastic and Micro Vascular Surgery", href: "/plastic-microvascular" },
  { label: "Psychiatry, Counseling and Psychotherapy Services", href: "/psychiatry" },
  { label: "Pulmonology & Interventional Pulmonology", href: "/pulmonology" },
];

function VideoRow({ videos }: { videos: CmsVideo[] }) {
  return (
    <div className="row justify-content-center">
      {videos.map((v) => (
        <div className="col-lg-4 my-3" key={`${v.id}-${v.youtube_id}`}>
          <YoutubeVideoCard youtubeId={v.youtube_id} title={v.title} />
          <h5 className="mb-3 mt-3 box box1">{v.title}</h5>
        </div>
      ))}
    </div>
  );
}

export async function InternationalPatientsPage() {
  const packagesHtml = await loadHealthPackagesHtml();
  const [internationalTestimonials, patientTestimonials] = await Promise.all([
    getVideoGalleryResolved(),
    getTestimonialVideosResolved(),
  ]);

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

      <section>
        <div className="container mt-5">
          <div className="row">
            {FEATURE_CARDS.map((item) => (
              <div className="col-lg-3 col-md-6 mb-3" key={item.title}>
                <Image src={item.image} style={{ width: "100%", height: "auto" }} width={320} height={220} alt={item.title} />
                <p style={{ fontSize: 18, marginTop: 15 }}>{item.title}</p>
              </div>
            ))}
          </div>
          <div>
            <a href="#makeanenquiry">
              <button type="button" className="enqrybtn">
                Make An Enquiry
              </button>
            </a>
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
          <VideoRow videos={internationalTestimonials.slice(0, 3)} />
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
              <hr style={{ width: "85%", margin: "20px 0px" }} />
              <div className="row">
                <div className="col-lg-6">
                  <ul style={{ listStyle: "none", paddingLeft: 0 }}>
                    {CENTRES_LEFT.map((d) => (
                      <li key={d.href}>
                        <Link href={d.href} style={{ display: "block", marginBottom: 15 }}>
                          {d.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="col-lg-6">
                  <ul style={{ listStyle: "none", paddingLeft: 0 }}>
                    {CENTRES_RIGHT.map((d) => (
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
            <div className="col-lg-6">
              <h6 style={{ marginBottom: 30 }}>Specialities</h6>
              <hr style={{ width: "85%", margin: "20px 0px" }} />
              <div className="row">
                <div className="col-lg-6">
                  <ul style={{ listStyle: "none", paddingLeft: 0 }}>
                    {SPECIALITIES_LEFT.map((d) => (
                      <li key={d.href}>
                        <Link href={d.href} style={{ display: "block", marginBottom: 15 }}>
                          {d.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="col-lg-6">
                  <ul style={{ listStyle: "none", paddingLeft: 0 }}>
                    {SPECIALITIES_RIGHT.map((d) => (
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
          </div>
        </div>
      </section>

      <section id="deptsections" style={{ backgroundColor: "#F4F6F6" }}>
        <div className="container mt-5 text-center">
          <h3>Voices of Our Patients</h3>
          <p>
            Discover the stories and experiences of patients who have entrusted Caritas Hospital with their healthcare
            journey.
          </p>
          <VideoRow videos={patientTestimonials.slice(0, 3)} />
          <p style={{ textAlign: "center" }}>
            <a href="#makeanenquiry">
              <button type="button" className="enqrybtn">
                Make An Enquiry
              </button>
            </a>
          </p>
        </div>
      </section>

      <section>
        <div className="container mt-5">
          <h3>Why Choose Caritas Hospital Kottayam</h3>
          <p>
            When you choose Caritas Kottayam, you are choosing a healthcare partner dedicated to your well-being,
            happiness, and peace of mind.
          </p>
          <div className="row mt-5">
            <div className="col-lg-2">
              <h6 style={{ color: "#C71782" }}>Accreditations</h6>
            </div>
            <div className="col-lg-4">
              <p>National Accreditations:</p>
              <ul>
                <li>NABH since 2015 (twice re-accredited)</li>
                <li>NABH for nursing excellence (since 2019)</li>
                <li>NABH for ethics committee and NABL molecular diagnostics</li>
              </ul>
            </div>
            <div className="col-lg-3">
              <p>Government Recognitions:</p>
              <ul>
                <li>Eat Right Campus - Govt of India</li>
                <li>Mother & Baby Friendly Hospital - Govt of Kerala</li>
              </ul>
            </div>
            <div className="col-lg-3">
              <p>Other Certifications:</p>
              <ul>
                <li>EpiHC certified</li>
                <li>Center of Quality Promotion</li>
                <li>Great Place to Work</li>
              </ul>
            </div>
          </div>
          <hr style={{ border: "1px solid #C71782", opacity: "100%", margin: "40px 0" }} />
          <div className="row">
            <div className="col-lg-2">
              <h6 style={{ color: "#C71782" }}>Capacity & Services</h6>
            </div>
            <div className="col-lg-10">
              <p>Capacity to cater more than 55,000 inpatients and 600,000 outpatients per year.</p>
            </div>
          </div>
          <hr style={{ border: "1px solid #C71782", opacity: "100%", margin: "40px 0" }} />
          <div className="row">
            <div className="col-lg-2">
              <h6 style={{ color: "#C71782" }}>Highlights</h6>
            </div>
            <div className="col-lg-4">
              <ul>
                <li>All major accreditations</li>
                <li>Air ambulance availability</li>
                <li>Kerala&apos;s first digital PET CT</li>
              </ul>
            </div>
            <div className="col-lg-4">
              <ul>
                <li>AI-powered 384-slice CT Scan</li>
                <li>Linear Accelerator</li>
                <li>Neuro microscope with navigation</li>
              </ul>
            </div>
          </div>
          <hr style={{ border: "1px solid #C71782", opacity: "100%", margin: "40px 0" }} />
          <div className="row">
            <div className="col-lg-2">
              <h6 style={{ color: "#C71782" }}>Cutting-Edge Services</h6>
            </div>
            <div className="col-lg-4">
              <ul>
                <li>Dedicated WhatsApp services</li>
                <li>Contactless patient registration and appointment kiosks</li>
              </ul>
            </div>
            <div className="col-lg-4">
              <ul>
                <li>Scalp cooling machine</li>
                <li>Online appointment system with payment gateway integration</li>
                <li>SMS alert integration</li>
              </ul>
            </div>
          </div>
          <hr style={{ border: "1px solid #C71782", opacity: "100%", margin: "40px 0" }} />
          <div className="row">
            <div className="col-lg-2">
              <h6 style={{ color: "#C71782" }}>Medical Service</h6>
            </div>
            <div className="col-lg-10">
              <p>Quality services with more than 200 dedicated doctors.</p>
            </div>
          </div>
          <div>
            <a href="#makeanenquiry">
              <button type="button" className="enqrybtn">
                Make An Enquiry
              </button>
            </a>
          </div>
        </div>
      </section>

      <section id="deptsections" style={{ backgroundColor: "#FAF9F9" }}>
        <span id="AboutCaritas" />
        <div className="container mt-5">
          <div className="row">
            <div className="col-lg-3">
              <Image src="/img/carith 1 (3).png" className="img-fluid" alt="caritas hospital" width={346} height={360} />
            </div>
            <div className="col-lg-1" />
            <div className="col-lg-8">
              <h3>About Caritas Hospital Kottayam</h3>
              <p>
                Caritas Hospital, run by the Catholic diocese of Kottayam, is a charitable institution committed to
                leading patients to good health and happiness with the motto &quot;Kenotic love saves life&quot;.
              </p>
              <p>
                Founded in 1962 as a 50-bed hospital, Caritas has grown into a multispecialty centre with 600+ beds
                and 134 ICU beds while continuing its mission of affordable, high-quality care.
              </p>
              <p>
                <Link style={{ color: "#0072BC" }} href="/about-caritas">
                  Read More <i className="bi bi-chevron-right" />
                </Link>
              </p>
            </div>
          </div>
          <div className="row mt-4">
            <div className="col-lg-5">
              <h1 style={{ color: "#C71782", fontWeight: 900 }}>Navigate Through the Numbers.</h1>
              <hr />
              <div className="row">
                <div className="col-lg-4">
                  <h3 style={{ color: "#C71782" }}>
                    655 <span style={{ fontWeight: 400 }}>Beds</span>
                  </h3>
                </div>
                <div className="col-lg-4">
                  <h3 style={{ color: "#C71782" }}>
                    134 <span style={{ fontWeight: 400 }}>ICUs</span>
                  </h3>
                </div>
                <div className="col-lg-4">
                  <h3 style={{ color: "#C71782" }}>
                    12 <span style={{ fontWeight: 400 }}>OTs</span>
                  </h3>
                </div>
              </div>
            </div>
            <div className="col-lg-7">
              <div className="row">
                <div className="col-lg-3 col-6 mb-3"><strong>60+</strong><p>Glorious Years</p></div>
                <div className="col-lg-3 col-6 mb-3"><strong>24 x 7</strong><p>Expert Care</p></div>
                <div className="col-lg-3 col-6 mb-3"><strong>16</strong><p>Centres of Excellence</p></div>
                <div className="col-lg-3 col-6 mb-3"><strong>43</strong><p>Major Departments</p></div>
                <div className="col-lg-3 col-6 mb-3"><strong>30+</strong><p>Allied Services</p></div>
                <div className="col-lg-3 col-6 mb-3"><strong>200+</strong><p>Expert Doctors</p></div>
                <div className="col-lg-3 col-6 mb-3"><strong>3000+</strong><p>Dedicated Staff</p></div>
                <div className="col-lg-3 col-6 mb-3"><strong>700000</strong><p>Patient Footfall/Year</p></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="deptsections">
        <span id="AboutKottayam" />
        <div className="container mt-5">
          <h3>About Kottayam</h3>
          <div className="row">
            <div className="col-lg-6">
              <p>
                Kottayam is located between Trivandrum and Kochi and is known as the land of letters, legends, latex
                and lakes. Panoramic backwaters, paddy fields, hills, and rich cultural heritage make it ideal for
                recovery and rejuvenation.
              </p>
              <p>
                It is a major trade center for spices and rubber and has a strong legacy in print media and education.
                The city achieved 100% literacy early and continues to be one of Kerala&apos;s most important hubs.
              </p>
            </div>
            <div className="col-lg-6">
              <p>
                Top sightseeing places include Kumarakom Bird Sanctuary, Island of Pathiramanal, Illikkal Kallu,
                Marmala Waterfalls, and scenic backwater routes.
              </p>
              <p>
                With excellent connectivity and peaceful surroundings, Kottayam remains one of Kerala&apos;s preferred
                medical tourism destinations.
              </p>
            </div>
          </div>
          <hr style={{ border: "1px solid #C71782", opacity: "100%", margin: "40px 0" }} />
        </div>
      </section>

      <InternationalEnquiryForm />
    </SiteLayout>
  );
}
