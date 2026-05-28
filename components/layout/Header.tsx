"use client";

import Image from "next/image";
import Link from "next/link";
import { BRAND } from "@/constants/brand";
import { DesktopNav } from "./DesktopNav";
import { MobileNav } from "./MobileNav";

export function Header() {
  return (
    <header id="header" className="d-flex align-items-center">
      <div className="container tab-desktop-menu mt-2 mt-dm-0">
        <div className="logocontainer">
          <Link href="/">
            <Image
              src="/img/caritas-logo-65.svg"
              alt="Caritas Hospital logo"
              width={200}
              height={65}
              className="nav-logo-mobile"
              priority
            />
          </Link>
        </div>

        {/* Tablet / mobile slide menu */}
        <div className="main tab-navbar">
          <nav role="navigation" aria-label="Main Navigation">
            <div className="action_button">
              <a
                href={BRAND.bookingUrl}
                target="_blank"
                rel="noopener noreferrer"
                style={{ marginRight: "16px" }}
                className="d-none d-md-block"
              >
                <button type="button" id="openFormButton">
                  Appointments
                </button>
              </a>
            </div>
            <MobileNav />
          </nav>
        </div>

        {/* Desktop horizontal mega menu */}
        <DesktopNav />
      </div>
    </header>
  );
}
