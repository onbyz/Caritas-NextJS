"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { FormEvent, useCallback, useEffect, useRef, useState } from "react";
import { useDebouncedEffect } from "@/lib/hooks/useDebouncedEffect";
import type { DoctorDepartmentOption } from "@/services/doctors";

const SEARCH_DEBOUNCE_MS = 400;

type DoctorFindPanelProps = {
  departments: DoctorDepartmentOption[];
  initialSearch?: string;
  initialDepartment?: string;
  /** @deprecated Kept for API compatibility; behavior is the same on all pages. */
  submitOnPage?: boolean;
};

function buildDoctorsPath(search: string, department: string): string {
  const params = new URLSearchParams();
  const q = search.trim();
  const d = department.trim();
  if (q) params.set("search", q);
  if (d) params.set("department", d);
  const query = params.toString();
  return query ? `/doctors?${query}` : "/doctors";
}

export function DoctorFindPanel({
  departments,
  initialSearch = "",
  initialDepartment = "",
}: DoctorFindPanelProps) {
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);

  const [search, setSearch] = useState(initialSearch);
  const [department, setDepartment] = useState(initialDepartment);
  const [isDebouncing, setIsDebouncing] = useState(false);
  const skipSearchDebounceRef = useRef(false);
  const departmentRef = useRef(department);

  const hasSearchText = Boolean(search.trim());
  const hasDepartment = Boolean(department.trim());
  const hasActiveFilters = hasSearchText || hasDepartment;

  departmentRef.current = department;

  useEffect(() => {
    setSearch(initialSearch ?? "");
    setDepartment(initialDepartment ?? "");
  }, [initialSearch, initialDepartment]);

  const navigate = useCallback(
    (nextSearch: string, nextDepartment: string) => {
      router.push(buildDoctorsPath(nextSearch, nextDepartment), { scroll: false });
    },
    [router],
  );

  useDebouncedEffect(
    () => {
      if (skipSearchDebounceRef.current) {
        skipSearchDebounceRef.current = false;
        setIsDebouncing(false);
        return;
      }
      setIsDebouncing(false);
      navigate(search, departmentRef.current);
    },
    [search, navigate],
    SEARCH_DEBOUNCE_MS,
  );

  const handleDepartmentChange = (value: string) => {
    skipSearchDebounceRef.current = true;
    setIsDebouncing(false);
    setDepartment(value);
    navigate(search, value);
  };

  const handleClearSearch = () => {
    skipSearchDebounceRef.current = true;
    setIsDebouncing(false);
    setSearch("");
    navigate("", department);
    inputRef.current?.focus();
  };

  const handleClearAll = () => {
    skipSearchDebounceRef.current = true;
    setIsDebouncing(false);
    setSearch("");
    setDepartment("");
    navigate("", "");
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    skipSearchDebounceRef.current = true;
    setIsDebouncing(false);
    navigate(search, department);
  };

  return (
    <div className="container mt-5 doctors-find-panel">
      <div className="row justify-content-center align-items-start">
        <motion.div
          className="col-md-2 mt-4"
          initial={{ opacity: 0, x: -12 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
        >
          <h5 style={{ fontWeight: 600 }}>
            Find a Doctor/
            <br />
            Search Specialties
          </h5>
        </motion.div>

        <motion.div
          className="col-md-6 mt-4"
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1], delay: 0.28 }}
        >
          <form
            id="search-form"
            className="doctor-find-form"
            role="search"
            onSubmit={handleSubmit}
          >
            <div
              className={`input-group rounded-search doctors-search-group${isDebouncing ? " is-searching" : ""}`}
            >
              <button
                type="submit"
                className="btn search-btn doctors-search-submit"
                aria-label="Search doctors"
              >
                <i className="fa fa-search" aria-hidden />
              </button>

              <input
                ref={inputRef}
                id="search-input"
                type="text"
                name="search"
                className="form-control search-form doctors-search-input"
                placeholder="Search by name, specialty, department..."
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setIsDebouncing(true);
                }}
                autoComplete="off"
              />

              <AnimatePresence>
                {hasSearchText ? (
                  <motion.button
                    key="clear-search"
                    type="button"
                    className="btn doctors-search-clear-append"
                    onClick={handleClearSearch}
                    aria-label="Clear search"
                    initial={{ opacity: 0, width: 0 }}
                    animate={{ opacity: 1, width: "auto" }}
                    exit={{ opacity: 0, width: 0 }}
                    transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <i className="bi bi-x-lg" aria-hidden />
                  </motion.button>
                ) : null}
              </AnimatePresence>
            </div>

            <AnimatePresence>
              {isDebouncing && hasSearchText ? (
                <motion.p
                  key="searching-hint"
                  className="doctors-search-hint mb-0 mt-2"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  Searching…
                </motion.p>
              ) : null}
            </AnimatePresence>
          </form>
        </motion.div>

        <motion.div
          className="col-lg-4 mt-4"
          initial={{ opacity: 0, x: 12 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: 0.34 }}
        >
          <select
            id="department-filter"
            name="department"
            className="form-select doctors-dept-select"
            value={department}
            onChange={(e) => handleDepartmentChange(e.target.value)}
          >
            <option value="">All Departments</option>
            {departments.map((dept) => (
              <option key={dept.name} value={dept.name}>
                {dept.name}
              </option>
            ))}
          </select>

          <AnimatePresence>
            {hasActiveFilters ? (
              <motion.div
                key="reset-wrap"
                className="doctors-reset-wrap"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
              >
                <button
                  type="button"
                  className="btn btn-link doctors-reset-link p-0"
                  onClick={handleClearAll}
                >
                  Reset all filters
                </button>
              </motion.div>
            ) : null}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
}
