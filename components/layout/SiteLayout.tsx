import type { ReactNode } from "react";
import { GlobalScrollMotion } from "@/components/motion/GlobalScrollMotion";
import { Footer } from "./Footer";
import { Header } from "./Header";
import { LegacyScripts } from "./LegacyScripts";
import { TopBar } from "./TopBar";

type SiteLayoutProps = {
  children: ReactNode;
};

export function SiteLayout({ children }: SiteLayoutProps) {
  return (
    <>
      <TopBar />
      <Header />
      <div className="site-main">{children}</div>
      <GlobalScrollMotion />
      <Footer />
      <LegacyScripts />
    </>
  );
}
