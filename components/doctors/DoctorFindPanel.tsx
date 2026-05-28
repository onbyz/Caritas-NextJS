"use client";

import { useRouter } from "next/navigation";
import { FormEvent } from "react";
import type { DoctorDepartmentOption } from "@/services/doctors";

type DoctorFindPanelProps = {
  departments: DoctorDepartmentOption[];
  initialSearch?: string;
  initialDepartment?: string;
  /** Doctors listing page: native GET to /doctors. Homepage: client navigation. */
  submitOnPage?: boolean;
};

export function DoctorFindPanel({
  departments,
  initialSearch = "",
  initialDepartment = "",
  submitOnPage = false,
}: DoctorFindPanelProps) {
  const router = useRouter();

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    if (submitOnPage) return;
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const search = String(fd.get("search") ?? "").trim();
    const dept = String(fd.get("department") ?? "").trim();
    const params = new URLSearchParams();
    if (search) params.set("search", search);
    if (dept) params.set("department", dept);
    const q = params.toString();
    router.push(q ? `/doctors?${q}` : "/doctors");
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-2 mt-4">
          <h5 style={{ fontWeight: 600 }}>
            Find a Doctor/
            <br />
            Search Specialties
          </h5>
        </div>
        <div className="col-md-6 mt-4">
          <form
            id="search-form"
            className="doctor-find-form"
            role="search"
            method={submitOnPage ? "get" : "post"}
            action={submitOnPage ? "/doctors" : undefined}
            onSubmit={handleSubmit}
          >
            <div
              className="input-group rounded-search"
              style={{
                borderRadius: 25,
                boxShadow: "0px 0px 4px 0px rgba(0,0,0,0.25)",
                overflow: "hidden",
              }}
            >
              <span className="input-group-btn">
                <button
                  type="submit"
                  className="btn search-btn"
                  style={{
                    borderTopLeftRadius: 20,
                    borderBottomLeftRadius: 20,
                    border: "none",
                  }}
                  aria-label="Search doctors"
                >
                  <i className="fa fa-search" />
                </button>
              </span>
              <input
                id="search-input"
                type="text"
                name="search"
                className="form-control search-form"
                placeholder="Search..."
                defaultValue={initialSearch}
                style={{
                  borderTopRightRadius: 20,
                  borderBottomRightRadius: 20,
                  border: "none",
                  boxShadow: "none",
                }}
              />
            </div>
          </form>
        </div>
        <div className="col-lg-4">
          <div className="row mb-4">
            <div className="col-md-12 mt-4">
              {submitOnPage ? (
                <select
                  id="department-filter"
                  name="department"
                  className="form-select"
                  defaultValue={initialDepartment}
                  form="search-form"
                  onChange={(e) => {
                    const params = new URLSearchParams(window.location.search);
                    const search = params.get("search") ?? "";
                    const next = new URLSearchParams();
                    if (search) next.set("search", search);
                    if (e.target.value) next.set("department", e.target.value);
                    const q = next.toString();
                    router.push(q ? `/doctors?${q}` : "/doctors");
                  }}
                >
                  <option value="">All Departments</option>
                  {departments.map((dept) => (
                    <option key={dept.name} value={dept.name}>
                      {dept.name}
                    </option>
                  ))}
                </select>
              ) : (
                <select
                  id="department-filter"
                  name="department"
                  className="form-select"
                  defaultValue=""
                  form="search-form"
                >
                  <option value="">All Departments</option>
                  {departments.map((dept) => (
                    <option key={dept.name} value={dept.name}>
                      {dept.name}
                    </option>
                  ))}
                </select>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
