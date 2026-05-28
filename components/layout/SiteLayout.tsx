import type { ReactNode } from "react";
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
      {children}
      <Footer />
      <LegacyScripts />
    </>
  );
}
