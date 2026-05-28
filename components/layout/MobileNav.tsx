"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { BRAND } from "@/constants/brand";
import {
  ABOUT_LINKS,
  CENTRES_OF_EXCELLENCE,
  RESOURCE_LINKS,
  SERVICE_LINKS,
  SPECIALITIES,
} from "@/constants/navigation";
import { useMobileNav } from "@/hooks/useMobileNav";

type PanelId = "departments" | "hospitals" | "academics" | "about" | null;

export function MobileNav() {
  const { isOpen, open, close } = useMobileNav();
  const [activePanel, setActivePanel] = useState<PanelId>("departments");

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      const navbar = document.getElementById("slide-navbar");
      const toggle = document.getElementById("menu-toggle");
      if (
        isOpen &&
        navbar &&
        !navbar.contains(target) &&
        toggle &&
        !toggle.contains(target)
      ) {
        close();
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, [isOpen, close]);

  return (
    <>
      <a
        className="navbar-icon"
        id="menu-toggle"
        role="button"
        tabIndex={0}
        onClick={(e) => {
          e.preventDefault();
          isOpen ? close() : open();
        }}
        onKeyDown={(e) => e.key === "Enter" && (isOpen ? close() : open())}
      >
        <Image
          src="/img/navbar/navbar-icon.svg"
          alt="Open menu"
          width={24}
          height={24}
        />
      </a>

      <div
        id="slide-navbar"
        className={`slide-navbar${isOpen ? " active" : ""}`}
      >
        <div className="slide-navbar-content">
          <div className="navbar-contact">
            <Link href="/" onClick={close}>
              <Image
                className="nav-logo"
                src="/img/caritas-logo-65.svg"
                alt="Caritas Hospital"
                width={160}
                height={52}
              />
            </Link>
            <div className="contact-numbers">
              <button
                id="close-menu"
                type="button"
                className="close-btn"
                onClick={close}
                aria-label="Close menu"
              >
                <Image
                  src="/img/navbar/close-icon.svg"
                  alt=""
                  width={24}
                  height={24}
                />
              </button>
            </div>
          </div>

          <div className="nav-items">
            <ul className="nav-title">
              <li className="sidebar-title">
                <Link href="/doctors" onClick={close}>
                  Doctors
                </Link>
              </li>
              <li className="sidebar-title">
                <Link href="/international_patients" onClick={close}>
                  International Patients
                </Link>
              </li>
              {(
                [
                  ["departments", "Departments"],
                  ["hospitals", "Our Hospitals"],
                  ["academics", "Academics & Research"],
                  ["about", "About"],
                ] as const
              ).map(([id, label]) => (
                <li
                  key={id}
                  className={`sidebar-title${activePanel === id ? " active" : ""}`}
                  data-content={id}
                >
                  <button
                    type="button"
                    className="border-0 bg-transparent p-0 text-start w-100"
                    onClick={() => setActivePanel(id)}
                  >
                    {label}{" "}
                    <i className="fa-solid fa-chevron-right" style={{ marginTop: 5 }} />
                  </button>
                </li>
              ))}
              <li className="sidebar-title">
                <Link href="/contact-us" onClick={close}>
                  Contact Us
                </Link>
              </li>
              <li className="sidebar-title">
                <div className="action_button">
                  <a href={BRAND.bookingUrl} target="_blank" rel="noopener noreferrer">
                    <button type="button">Appointments</button>
                  </a>
                </div>
              </li>
            </ul>

            <div className="hover-content" style={{ display: "block" }}>
              {activePanel === "departments" && (
                <div id="departments">
                  <div className="dept-section">
                    <div className="dept-first-section">
                      <h6 className="hover-content-title">Centres of Excellence</h6>
                      <div className="hover-items">
                        {CENTRES_OF_EXCELLENCE.map((item) => (
                          <Link key={item.href} href={item.href} onClick={close}>
                            {item.label}
                          </Link>
                        ))}
                      </div>
                    </div>
                    <div className="dept-border" />
                    <div className="dept-second-section">
                      <h6 className="hover-content-title">Specialities</h6>
                      <div className="hover-items">
                        {SPECIALITIES.map((item) => (
                          <Link key={item.href} href={item.href} onClick={close}>
                            {item.label}
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activePanel === "about" && (
                <div id="about">
                  <div className="about-section">
                    <div className="first-section">
                      <h6>About Us</h6>
                      <div className="about-links">
                        {ABOUT_LINKS.map((item) =>
                          item.external ? (
                            <a
                              key={item.href}
                              href={item.href}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              {item.label}
                              <i className="bi bi-chevron-right" />
                            </a>
                          ) : (
                            <Link key={item.href} href={item.href} onClick={close}>
                              {item.label}
                              <i className="bi bi-chevron-right" />
                            </Link>
                          ),
                        )}
                      </div>
                    </div>
                    <div className="middle-border" />
                    <div className="second-section">
                      <h6>Services</h6>
                      {SERVICE_LINKS.map((item) => (
                        <Link key={item.href} href={item.href} onClick={close}>
                          {item.label}
                          <i className="bi bi-chevron-right" />
                        </Link>
                      ))}
                      <h6 className="mt-3">Resources</h6>
                      {RESOURCE_LINKS.map((item) => (
                        <Link key={item.href} href={item.href} onClick={close}>
                          {item.label}
                          <i className="bi bi-chevron-right" />
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {activePanel === "academics" && (
                <div id="academics">
                  <div className="academics-section">
                    <div className="first-section">
                      <h6>Academics</h6>
                      <div className="academics-data">
                        <Link href="/dnb" onClick={close}>Caritas DNB Programme</Link>
                        <Link href="/college-of-pharmacy" onClick={close}>Caritas College of Pharmacy</Link>
                        <Link href="/college-of-nursing" onClick={close}>Caritas College of Nursing</Link>
                        <Link href="/caritas-allied-health-science" onClick={close}>Caritas Allied Health Science</Link>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activePanel === "hospitals" && (
                <div id="hospitals">
                  <div className="hospital-section">
                    <div className="hospital-data">
                      <Link href="/caritas-family-hospital" onClick={close}>Caritas Family Hospital</Link>
                    </div>
                    <div className="hospital-data">
                      <Link href="/caritaskkm" onClick={close}>Caritas KMM Hospital</Link>
                    </div>
                    <div className="hospital-data">
                      <Link href="/caritas-hdp-hospital" onClick={close}>Caritas HDP Hospital</Link>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
