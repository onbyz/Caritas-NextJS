"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { BRAND } from "@/constants/brand";
import {
  ABOUT_LINKS,
  CENTRES_OF_EXCELLENCE,
  FOOTER_EDUCATION_LINKS,
  FOOTER_HOSPITAL_LINKS,
  RESOURCE_LINKS,
  SERVICE_LINKS,
  SPECIALITIES,
} from "@/constants/navigation";
import { useMobileNav } from "@/hooks/useMobileNav";

type PanelId = "departments" | "hospitals" | "academics" | "about" | null;

export function MobileNav() {
  const { isOpen, open, close } = useMobileNav();
  const [activePanel, setActivePanel] = useState<PanelId>("departments");
  const [isPhoneMenu, setIsPhoneMenu] = useState(false);
  const [openSubmenu, setOpenSubmenu] = useState<string | null>(null);
  const [openSubsubmenu, setOpenSubsubmenu] = useState<string | null>(null);

  useEffect(() => {
    const media = window.matchMedia("(max-width: 768px)");
    const update = () => setIsPhoneMenu(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

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
            {isPhoneMenu ? (
              <ul className="menu-list mobile-view-menu">
                <li className="menu-item">
                  <a
                    className={`menu-link has-submenu${openSubmenu === "departments" ? " active" : ""}`}
                    role="button"
                    onClick={() =>
                      setOpenSubmenu((prev) => (prev === "departments" ? null : "departments"))
                    }
                  >
                    Departments <i className="fa-solid fa-chevron-right" />
                  </a>
                  <ul className={`submenu${openSubmenu === "departments" ? " active" : ""}`}>
                    <li className="submenu-item submenu-parent">
                      <a
                        className={`submenu-link has-subsubmenu${openSubsubmenu === "centres" ? " active" : ""}`}
                        role="button"
                        onClick={() =>
                          setOpenSubsubmenu((prev) => (prev === "centres" ? null : "centres"))
                        }
                      >
                        Centres of Excellence <i className="fa-solid fa-chevron-right" />
                      </a>
                      <ul className={`subsubmenu${openSubsubmenu === "centres" ? " active" : ""}`}>
                        {CENTRES_OF_EXCELLENCE.map((item) => (
                          <li key={item.href} className="subsubmenu-item">
                            <Link href={item.href} className="subsubmenu-link" onClick={close}>
                              {item.label}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </li>
                    <li className="submenu-item submenu-parent">
                      <a
                        className={`submenu-link has-subsubmenu${openSubsubmenu === "specialities" ? " active" : ""}`}
                        role="button"
                        onClick={() =>
                          setOpenSubsubmenu((prev) => (prev === "specialities" ? null : "specialities"))
                        }
                      >
                        Specialities <i className="fa-solid fa-chevron-right" />
                      </a>
                      <ul
                        className={`subsubmenu${openSubsubmenu === "specialities" ? " active" : ""}`}
                      >
                        {SPECIALITIES.map((item) => (
                          <li key={item.href} className="subsubmenu-item">
                            <Link href={item.href} className="subsubmenu-link" onClick={close}>
                              {item.label}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </li>
                  </ul>
                </li>

                <li className="menu-item">
                  <Link href="/doctors" className="menu-link" onClick={close}>
                    Doctors
                  </Link>
                </li>
                <li className="menu-item">
                  <Link href="/international_patients" className="menu-link" onClick={close}>
                    International Patients
                  </Link>
                </li>

                <li className="menu-item">
                  <a
                    className={`menu-link has-submenu${openSubmenu === "hospitals" ? " active" : ""}`}
                    role="button"
                    onClick={() => setOpenSubmenu((prev) => (prev === "hospitals" ? null : "hospitals"))}
                  >
                    Our Hospitals <i className="fa-solid fa-chevron-right" />
                  </a>
                  <ul className={`submenu${openSubmenu === "hospitals" ? " active" : ""}`}>
                    {FOOTER_HOSPITAL_LINKS.map((item) => (
                      <li key={item.href} className="submenu-item">
                        {item.external ? (
                          <a href={item.href} target="_blank" rel="noopener noreferrer" className="submenu-link">
                            {item.label}
                          </a>
                        ) : (
                          <Link href={item.href} className="submenu-link" onClick={close}>
                            {item.label}
                          </Link>
                        )}
                      </li>
                    ))}
                  </ul>
                </li>

                <li className="menu-item">
                  <a
                    className={`menu-link has-submenu${openSubmenu === "academics" ? " active" : ""}`}
                    role="button"
                    onClick={() => setOpenSubmenu((prev) => (prev === "academics" ? null : "academics"))}
                  >
                    Academics & Research <i className="fa-solid fa-chevron-right" />
                  </a>
                  <ul className={`submenu${openSubmenu === "academics" ? " active" : ""}`}>
                    {FOOTER_EDUCATION_LINKS.map((item) => (
                      <li key={item.href} className="submenu-item">
                        <Link href={item.href} className="submenu-link" onClick={close}>
                          {item.label}
                        </Link>
                      </li>
                    ))}
                    <li className="submenu-item">
                      <Link href="/articles" className="submenu-link" onClick={close}>
                        Articles to Read
                      </Link>
                    </li>
                  </ul>
                </li>

                <li className="menu-item">
                  <a
                    className={`menu-link has-submenu${openSubmenu === "about" ? " active" : ""}`}
                    role="button"
                    onClick={() => setOpenSubmenu((prev) => (prev === "about" ? null : "about"))}
                  >
                    About <i className="fa-solid fa-chevron-right" />
                  </a>
                  <ul className={`submenu${openSubmenu === "about" ? " active" : ""}`}>
                    {ABOUT_LINKS.map((item) => (
                      <li key={item.href} className="submenu-item">
                        {item.external ? (
                          <a href={item.href} target="_blank" rel="noopener noreferrer" className="submenu-link">
                            {item.label}
                          </a>
                        ) : (
                          <Link href={item.href} className="submenu-link" onClick={close}>
                            {item.label}
                          </Link>
                        )}
                      </li>
                    ))}
                    {SERVICE_LINKS.map((item) => (
                      <li key={item.href} className="submenu-item">
                        <Link href={item.href} className="submenu-link" onClick={close}>
                          {item.label}
                        </Link>
                      </li>
                    ))}
                    {RESOURCE_LINKS.map((item) => (
                      <li key={item.href} className="submenu-item">
                        <Link href={item.href} className="submenu-link" onClick={close}>
                          {item.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </li>

                <li className="menu-item">
                  <Link href="/contact-us" className="menu-link" onClick={close}>
                    Contact Us
                  </Link>
                </li>

                <li className="menu-item">
                  <div className="action_button my-4">
                    <a href={BRAND.bookingUrl} target="_blank" rel="noopener noreferrer">
                      <button type="button">Appointments</button>
                    </a>
                  </div>
                </li>
              </ul>
            ) : (
              <>
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
                    <div id="departments" className="menu-panel">
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
                    <div id="about" className="menu-panel">
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
                    <div id="academics" className="menu-panel">
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
                    <div id="hospitals" className="menu-panel">
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
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
