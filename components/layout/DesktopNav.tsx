"use client";

import Image from "next/image";
import Link from "next/link";
import { BRAND } from "@/constants/brand";
import {
  ABOUT_LINKS,
  ACADEMICS_MENU_ITEMS,
  CENTRES_OF_EXCELLENCE,
  RESOURCE_LINKS,
  SERVICE_LINKS,
  SPECIALITIES,
} from "@/constants/navigation";
import { useDesktopMenu } from "@/hooks/useDesktopMenu";

const coeCol1 = CENTRES_OF_EXCELLENCE.slice(0, 9);
const coeCol2 = CENTRES_OF_EXCELLENCE.slice(9);
const specCol1 = SPECIALITIES.slice(0, 8);
const specCol2 = SPECIALITIES.slice(8);
const academicsRow1 = ACADEMICS_MENU_ITEMS.slice(0, 3);
const academicsRow2 = ACADEMICS_MENU_ITEMS.slice(3, 6);

export function DesktopNav() {
  useDesktopMenu();

  return (
    <div className="main mobile-hidden desktop-navbar">
      <nav id="cbp-hrmenu" className="cbp-hrmenu" role="navigation" aria-label="Main Navigation">
        <ul role="menubar">
          <li className="dropmenu">
            <a
              role="menuitem"
              href="#"
              aria-haspopup="true"
              tabIndex={0}
              style={{ paddingBottom: 30, paddingTop: 20 }}
              onClick={(e) => e.preventDefault()}
            >
              Departments<i className="bi bi-chevron-down ms-2" />
            </a>
            <div className="cbp-hrsub">
              <div className="cbp-hrsub-inner">
                <div className="col-lg-2 border-end px-4" style={{ width: "28%" }}>
                  <div className="column-content">
                    <Image
                      src="/img/dept-dropdown-img.png"
                      alt="doctor and nurses"
                      width={200}
                      height={150}
                      style={{ width: "auto", height: "auto", maxWidth: "100%" }}
                    />
                    <h4>Our Speciality</h4>
                    <p style={{ fontSize: 14, textAlign: "justify", fontWeight: 500 }}>
                      We are home to 43 broad specialities with the best-in-the country
                      healthcare professionals whose motto is to treat a patient&apos;s ailment
                      and help them get back to daily life as fast as possible.
                    </p>
                  </div>
                </div>
                <div className="col-lg-2" style={{ width: "20%" }}>
                  <div className="column-content">
                    <h6 className="mb-2">Centres of Excellence</h6>
                    <ul className="drp" style={{ listStyle: "none" }}>
                      {coeCol1.map((item) => (
                        <li key={item.href}>
                          <Link href={item.href}>{item.label}</Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                <div className="col-lg-2 border-end" style={{ width: "17%" }}>
                  <div className="column-content">
                    <ul>
                      <li className="mb-4" />
                      {coeCol2.map((item) => (
                        <li key={item.href}>
                          <Link href={item.href}>{item.label}</Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                <div className="col-lg-2" style={{ width: "18%" }}>
                  <div className="column-content">
                    <h6 className="mb-2">Specialities</h6>
                    <ul style={{ listStyle: "none" }}>
                      {specCol1.map((item) => (
                        <li key={item.href}>
                          <Link href={item.href}>{item.label}</Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                <div className="col-lg-2" style={{ width: "17%" }}>
                  <div className="column-content">
                    <ul className="drp" style={{ listStyle: "none" }}>
                      <li className="mb-4" />
                      {specCol2.map((item) => (
                        <li key={item.href}>
                          <Link href={item.href}>{item.label}</Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </li>

          <li>
            <Link role="menuitem" href="/doctors">
              Doctors
            </Link>
          </li>

          <li className="dropmenu">
            <a
              role="menuitem"
              href="#"
              aria-haspopup="true"
              tabIndex={0}
              style={{ paddingBottom: 30, paddingTop: 20 }}
              onClick={(e) => e.preventDefault()}
            >
              Our Hospitals<i className="bi bi-chevron-down ms-2" />
            </a>
            <div className="cbp-hrsub">
              <div className="cbp-hrsub-inner">
                <div className="col-lg-3 border-end px-4" style={{ width: "30%" }}>
                  <div className="column-content">
                    <Image
                      src="/img/our-hospitals-dropdown-img.png"
                      alt="our hospitals"
                      width={220}
                      height={140}
                    />
                    <h4>Compassionate Care, Medical Excellence.</h4>
                    <p style={{ fontSize: 14, textAlign: "justify", fontWeight: 500 }}>
                      Explore our network of exceptional healthcare institutions committed
                      to providing compassionate and comprehensive medical services.
                    </p>
                  </div>
                </div>
                {[
                  {
                    img: "/img/matha-navbar-img.jpg",
                    name: "Caritas Matha Hospital",
                    href: "https://caritasmathahospital.com/",
                    external: true,
                    address: "MC Road, Thellakom (P.O), Kottayam, Kerala - 686630",
                    phone: "0481 2792500",
                  },
                  {
                    img: "/img/family hospital (1) 1.png",
                    name: "Caritas Family Hospital",
                    href: "https://www.caritasfamilyhospital.com/",
                    external: true,
                    address: "Karipal Building, Vadavathoor P.O, Kalathipady, Kottayam, Kerala - 686018",
                    phone: "0481 2570100",
                  },
                  {
                    img: "/img/kmm hospital 1.png",
                    name: "Caritas KMM Hospital",
                    href: "/caritaskkm",
                    address: "Thiruvathukkal Rd, Puthenangady Kottayam, Kerala - 686001",
                    phone: "0481 2580047",
                  },
                  {
                    img: "/img/hdp hospital 1.png",
                    name: "Caritas HDP Hospital",
                    href: "/caritas-hdp-hospital",
                    address: "Kaipuzha, Kottayam, Kerala - 686602",
                    phone: "0481 2711418",
                  },
                ].map((h) => (
                  <div key={h.name} className="col-lg-2">
                    <div className="column-content">
                      <Image src={h.img} alt={h.name} width={160} height={100} />
                      <p />
                      <p>
                        {h.external ? (
                          <a target="_blank" rel="noopener noreferrer" href={h.href} className="menuheading">
                            {h.name}
                          </a>
                        ) : (
                          <Link href={h.href} className="menuheading">
                            {h.name}
                          </Link>
                        )}
                      </p>
                      <p style={{ fontSize: 13, lineHeight: 1.4 }}>{h.address}</p>
                      <p>{h.phone}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </li>

          <li>
            <Link
              role="menuitem"
              href="/international_patients"
              style={{ paddingBottom: 30, paddingTop: 20 }}
            >
              International Patients
            </Link>
          </li>

          <li className="dropmenu">
            <a
              role="menuitem"
              href="#"
              aria-haspopup="true"
              tabIndex={0}
              style={{ paddingBottom: 30, paddingTop: 20 }}
              onClick={(e) => e.preventDefault()}
            >
              Academics & Research<i className="bi bi-chevron-down ms-2" />
            </a>
            <div className="cbp-hrsub">
              <div className="cbp-hrsub-inner">
                <div className="col-lg-4 border-end px-4" style={{ width: "30%" }}>
                  <div className="column-content">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src="/img/academics-navbar.jpg" alt="doctor and nurses" />
                    <h4>Advancing Knowledge, Transforming Healthcare </h4>
                    <p style={{ fontSize: 14, textAlign: "justify", fontWeight: 500 }}>
                      Explore our pioneering endeavours in academics and research at Caritas, where
                      innovation meets education to shape the future of healthcare. Uncover
                      breakthroughs, scholarly excellence, and the driving force behind our commitment
                      to advancing medical knowledge for the benefit of all.
                    </p>
                  </div>
                </div>
                <div className="col-lg-6 border-end">
                  <div className="column-content px-5">
                    <h6 className="mb-4">Academics</h6>
                    <div className="row">
                      {academicsRow1.map((a) => (
                        <div key={a.href} className="col-lg-4">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img src={a.img} alt="doctor and nurses" />
                          <p className="my-3">
                            <Link
                              className="menuheading my-3"
                              href={a.href}
                              style={{ fontSize: 14 }}
                            >
                              {a.label}
                            </Link>
                          </p>
                        </div>
                      ))}
                    </div>
                    <div className="row">
                      {academicsRow2.map((a) => (
                        <div key={a.href} className="col-lg-4">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={a.img}
                            alt={a.href === "/caritas-internship" ? "Caritas Internship" : "doctor and nurses"}
                          />
                          <p className="my-3">
                            <Link
                              className="menuheading my-3"
                              href={a.href}
                              style={{ fontSize: 14 }}
                            >
                              {a.label}
                            </Link>
                          </p>
                        </div>
                      ))}
                    </div>
                    <div className="row">
                      <div className="col-lg-6">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src="/img/paramedical 1.png" alt="doctor and nurses" />
                        <p className="my-3">
                          <Link
                            className="menuheading my-3"
                            href="/caritas-neuroscience-drnb"
                            style={{ fontSize: 14 }}
                          >
                            Caritas Neuroscience DrNB Program
                          </Link>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-lg-2">
                  <div className="column-content px-4">
                    <h6 className="mb-4">Research</h6>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src="/img/nursing 2.png" alt="doctor and nurses" />
                    <p className="my-3">
                      <Link className="menuheading my-3" href="/research-development">
                        Research &
                        <br />
                        Development Cell
                      </Link>
                    </p>
                    <h6 className="mt-3">Resources</h6>
                    <ul style={{ listStyle: "none" }}>
                      {RESOURCE_LINKS.map((r) => (
                        <li key={r.href}>
                          <Link href={r.href}>{r.label}</Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </li>

          <li className="dropmenu">
            <Link
              role="menuitem"
              href="/about-caritas"
              aria-haspopup="true"
              tabIndex={0}
              style={{ paddingBottom: 30, paddingTop: 20 }}
            >
              About<i className="bi bi-chevron-down ms-2" />
            </Link>
            <div className="cbp-hrsub">
              <div className="cbp-hrsub-inner">
                <div className="col-lg-3 border-end px-4" style={{ width: "30%" }}>
                  <div className="column-content">
                    <Image src="/img/about-dropdown-img.png" alt="about" width={200} height={140} />
                    <h4>Committed to Your Wellbeing</h4>
                    <p style={{ fontSize: 14, textAlign: "justify", fontWeight: 500 }}>
                      Caritas Hospital operates on charity and pursuit of excellence.
                    </p>
                  </div>
                </div>
                <div className="col-lg-2">
                  <div className="column-content px-4">
                    <h6 className="mb-2">About us</h6>
                    <ul className="drp" style={{ listStyle: "none" }}>
                      {ABOUT_LINKS.slice(0, 9).map((item) => (
                        <li key={item.href}>
                          {item.external ? (
                            <a href={item.href} target="_blank" rel="noopener noreferrer">
                              {item.label}
                            </a>
                          ) : (
                            <Link href={item.href}>{item.label}</Link>
                          )}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                <div className="col-lg-3 border-end">
                  <div className="column-content px-4">
                    <ul>
                      <li className="mb-4" />
                      {ABOUT_LINKS.slice(9).map((item) => (
                        <li key={item.href}>
                          <Link href={item.href}>{item.label}</Link>
                        </li>
                      ))}
                    </ul>
                    <h6 className="mb-2 mt-2">Resources</h6>
                    <ul style={{ listStyle: "none" }}>
                      {RESOURCE_LINKS.map((r) => (
                        <li key={r.href}>
                          <Link href={r.href}>{r.label}</Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                <div className="col-lg-3">
                  <div className="column-content px-4">
                    <h6 className="mb-2">Services</h6>
                    <ul style={{ listStyle: "none" }}>
                      {SERVICE_LINKS.map((s) => (
                        <li key={s.href}>
                          <Link href={s.href}>{s.label}</Link>
                        </li>
                      ))}
                    </ul>
                    <p className="mt-3">
                      <Link href="/contact-us" style={{ fontWeight: 600, color: "#c71782" }}>
                        Contact Us
                      </Link>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </li>

          <li>
            <div className="action_button">
              <a href={BRAND.bookingUrl} target="_blank" rel="noopener noreferrer">
                <button type="button" id="openFormButton">
                  Appointments
                </button>
              </a>
            </div>
          </li>
        </ul>
      </nav>
    </div>
  );
}
