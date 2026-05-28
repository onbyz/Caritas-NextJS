"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { SiteLayout } from "@/components/layout/SiteLayout";
import { EnquiryForm } from "@/components/shared/EnquiryForm";

type Job = {
  id: string;
  job_title: string;
  department: string;
  qualification: string;
  experience: string;
  job_discription: string;
  key_responsibilities: string;
  preferred_skills: string;
};

export function OpenPositionsPage({ jobs }: { jobs: Job[] }) {
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return jobs;
    return jobs.filter(
      (j) =>
        j.job_title.toLowerCase().includes(q) ||
        j.department.toLowerCase().includes(q) ||
        j.qualification.toLowerCase().includes(q),
    );
  }, [jobs, query]);

  return (
    <SiteLayout>
      <section className="py-5">
        <div className="container">
          <div className="row justify-content-center text-center">
            <h1 style={{ fontWeight: 600 }}>Open Positions</h1>
            <h2 style={{ color: "#c71782", fontWeight: 300 }}>Join Our Team, Transform Lives</h2>
          </div>
          <p className="text-center mt-3">
            Not finding the right job openings?{" "}
            <a href="#apply-now" style={{ color: "#0072BC", fontWeight: 600 }}>
              Click Here
            </a>{" "}
            to share your resume with us.
          </p>
          <div className="row justify-content-center my-4">
            <div className="col-md-8">
              <input
                type="search"
                className="form-control"
                placeholder="Search jobs..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                aria-label="Search jobs"
              />
            </div>
          </div>
          {filtered.length === 0 ? (
            <p className="text-center text-danger">No matching positions found.</p>
          ) : (
            filtered.map((job) => (
              <div key={job.id} className="mb-4 pb-3 border-bottom">
                <h4 style={{ color: "#c71782" }}>{job.job_title}</h4>
                <p>
                  <strong>Department:</strong> {job.department}
                </p>
                {job.qualification && (
                  <p>
                    <strong>Qualification:</strong> {job.qualification}
                  </p>
                )}
                {job.experience && (
                  <p>
                    <strong>Experience:</strong> {job.experience}
                  </p>
                )}
                {job.job_discription && <p>{job.job_discription}</p>}
              </div>
            ))
          )}
        </div>
      </section>
      <section id="apply-now" className="py-5" style={{ background: "#faf9f9" }}>
        <div className="container">
          <div className="row g-4">
            <div className="col-lg-6">
              <h3>Share Your Resume</h3>
              <p>Submit your details and our HR team will contact you when a suitable role opens.</p>
            </div>
            <div className="col-lg-6 px-4 py-4" style={{ backgroundColor: "#c71782" }}>
              <EnquiryForm />
            </div>
          </div>
          <p className="mt-4">
            <Link href="/career" style={{ color: "#c71782" }}>
              ← Back to Careers
            </Link>
          </p>
        </div>
      </section>
    </SiteLayout>
  );
}
