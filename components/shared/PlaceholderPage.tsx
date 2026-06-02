import { SectionReveal } from "@/components/motion/SectionReveal";
import { SiteLayout } from "@/components/layout/SiteLayout";
import Link from "next/link";

type PlaceholderPageProps = {
  title: string;
  djangoTemplate?: string;
};

/** Temporary page shell — content migration in progress */
export function PlaceholderPage({ title, djangoTemplate }: PlaceholderPageProps) {
  return (
    <SiteLayout>
      <SectionReveal as="section" className="py-5">
        <div className="container text-center">
          <h1 style={{ fontWeight: 600 }}>{title}</h1>
          <p className="mt-3">
            This page is being migrated from the Django site. Layout and navigation
            are active; full content will match the original design shortly.
          </p>
          {djangoTemplate && (
            <p className="text-muted small">Source template: {djangoTemplate}</p>
          )}
          <Link href="/" className="btn btn-primary mt-4" style={{ backgroundColor: "#c71782", border: "none" }}>
            Back to Home
          </Link>
        </div>
      </SectionReveal>
    </SiteLayout>
  );
}
