"use client";

import { useMemo, useState } from "react";
import { getBiomedicalData, getQualityControlData } from "@/services/cms";

const MONTHS = [
  { value: "1", label: "January" },
  { value: "2", label: "February" },
  { value: "3", label: "March" },
  { value: "4", label: "April" },
  { value: "5", label: "May" },
  { value: "6", label: "June" },
  { value: "7", label: "July" },
  { value: "8", label: "August" },
  { value: "9", label: "September" },
  { value: "10", label: "October" },
  { value: "11", label: "November" },
  { value: "12", label: "December" },
];

function formatMonthYear(dateStr: string) {
  const d = new Date(dateStr);
  if (Number.isNaN(d.getTime())) return dateStr;
  return d.toLocaleDateString("en-GB", { year: "numeric", month: "long" });
}

function FilterControls({
  years,
  year,
  month,
  onYear,
  onMonth,
  onSubmit,
  error,
}: {
  years: number[];
  year: string;
  month: string;
  onYear: (v: string) => void;
  onMonth: (v: string) => void;
  onSubmit: () => void;
  error?: string;
}) {
  return (
    <div className="data-filter-form">
      <label className="data-filter-form__label" htmlFor="filter-year">
        Filter Data by:
      </label>
      <div className="data-filter-form__controls">
        <select
          id="filter-year"
          name="year"
          value={year}
          onChange={(e) => onYear(e.target.value)}
          className="form-select"
        >
          <option value="">Select Year</option>
          {years.map((y) => (
            <option key={y} value={String(y)}>
              {y}
            </option>
          ))}
        </select>
        <select
          id="filter-month"
          name="month"
          value={month}
          onChange={(e) => onMonth(e.target.value)}
          className="form-select"
        >
          <option value="">Select Month</option>
          {MONTHS.map((m) => (
            <option key={m.value} value={m.value}>
              {m.label}
            </option>
          ))}
        </select>
        <button type="button" className="btn enqrybtn filterbtn data-filter-form__btn" onClick={onSubmit}>
          Filter Now
        </button>
      </div>
      {error && <p className="data-filter-form__error">{error}</p>}
    </div>
  );
}

export function BiomedicalWastePanel() {
  const rows = getBiomedicalData();
  const years = useMemo(
    () =>
      [...new Set(rows.map((r) => new Date(r.month_year).getFullYear()))].sort(
        (a, b) => b - a,
      ),
    [rows],
  );
  const [year, setYear] = useState("");
  const [month, setMonth] = useState("");
  const [error, setError] = useState("");
  const [result, setResult] = useState<(typeof rows)[0] | null>(null);

  function handleFilter() {
    if (!year || !month) {
      setError("Please select both year and month.");
      setResult(null);
      return;
    }
    const match = rows.find((r) => {
      const d = new Date(r.month_year);
      return d.getFullYear() === Number(year) && d.getMonth() + 1 === Number(month);
    });
    if (!match) {
      setError("No data found for the selected month.");
      setResult(null);
      return;
    }
    setError("");
    setResult(match);
  }

  return (
    <section className="data-filter-section">
      <div className="container">
        <h3 className="mb-4">
          Real-time Biomedical Waste
          <br />
          Management Data
        </h3>
        <FilterControls
          years={years}
          year={year}
          month={month}
          onYear={setYear}
          onMonth={setMonth}
          onSubmit={handleFilter}
          error={error}
        />
        {result && (
          <div className="row my-5 biomedical-results" style={{ fontSize: "x-large" }}>
            <h3>{formatMonthYear(result.month_year)}</h3>
            <p>&nbsp;</p>
            <div className="col-6 col-lg-2 mb-3" style={{ borderRight: "1px solid #C71782" }}>
              <p>Total Bags</p>
              <h2>{result.total_bags}</h2>
            </div>
            <div className="col-6 col-lg-2 mb-3">
              <p>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/img/Ellipse 151.png" className="img-fluid mx-2" alt="" width={16} height={16} />
                Yellow Bags
              </p>
              <h2 className="mx-4">{result.yellow_bags}</h2>
            </div>
            <div className="col-6 col-lg-2 mb-3">
              <p>
                <img src="/img/Ellipse 152.png" className="img-fluid mx-2" alt="" width={16} height={16} />
                Red Bags
              </p>
              <h2 className="mx-4">{result.red_bags}</h2>
            </div>
            <div className="col-6 col-lg-2 mb-3">
              <p>
                <img src="/img/Ellipse 153.png" className="img-fluid mx-2" alt="" width={16} height={16} />
                White Bags
              </p>
              <h2 className="mx-4">{result.white_bags}</h2>
            </div>
            <div className="col-6 col-lg-2 mb-3">
              <p>
                <img src="/img/Ellipse 154.png" className="img-fluid mx-2" alt="" width={16} height={16} />
                Brownish Yellow Bags
              </p>
              <h2 className="mx-4">{result.brownish_yellow_bags}</h2>
            </div>
            <div className="col-6 col-lg-2 mb-3">
              <p>
                <img src="/img/Ellipse 155.png" className="img-fluid mx-2" alt="" width={16} height={16} />
                Blue Bags
              </p>
              <h2 className="mx-4">{result.blue_bags}</h2>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

export function QualityControlPanel() {
  const rows = getQualityControlData();
  const years = useMemo(
    () =>
      [...new Set(rows.map((r) => new Date(r.month_year).getFullYear()))].sort(
        (a, b) => b - a,
      ),
    [rows],
  );
  const [year, setYear] = useState("");
  const [month, setMonth] = useState("");
  const [error, setError] = useState("");
  const [result, setResult] = useState<(typeof rows)[0] | null>(null);

  function handleFilter() {
    if (!year || !month) {
      setError("Please select both year and month.");
      setResult(null);
      return;
    }
    const match = rows.find((r) => {
      const d = new Date(r.month_year);
      return d.getFullYear() === Number(year) && d.getMonth() + 1 === Number(month);
    });
    if (!match) {
      setError("No data found for the selected month.");
      setResult(null);
      return;
    }
    setError("");
    setResult(match);
  }

  const metrics = result
    ? [
        { label: "Average Length of Stay of Patients (In Days)", value: result.average_length },
        { label: "Patient Satisfaction Index", value: result.patient_satisfaction },
        { label: "Catheter Associated Urinary Tract Infection (CAUTI) Rate", value: result.cauti },
        { label: "Ventilator Associated Pneumonia (VAP) Rate", value: result.vap },
        { label: "Central Line Associated Blood Stream Infection (CLABSI) Rate", value: result.clabsi },
        { label: "Surgical Site Infection (SSI) Rate", value: result.ssi },
        {
          label: "Pressure Ulcers developed after admission Rate",
          value: result.pressure_ulcers_afteradmission,
        },
        { label: "Compliance to Hand Hygiene", value: result.compliance_hand_hygiene },
      ]
    : [];

  return (
    <section className="data-filter-section">
      <div className="container">
        <h3>Transparency in Quality</h3>
        <p className="mb-4">
          At Caritas Hospital, we believe in complete transparency when it comes to our commitment
          to quality healthcare. To uphold this commitment, we provide realtime access to our
          Quality Indicators.
        </p>
        <FilterControls
          years={years}
          year={year}
          month={month}
          onYear={setYear}
          onMonth={setMonth}
          onSubmit={handleFilter}
          error={error}
        />
        {result && (
          <div className="row mt-5 quality-results">
            <h3 className="mb-4">{formatMonthYear(result.month_year)}</h3>
            {metrics.map((m) => (
              <div key={m.label} className="col-lg-3 col-md-6 mb-4">
                <div className="p-4" style={{ background: "#FAF9F9", minHeight: "100%" }}>
                  <p dangerouslySetInnerHTML={{ __html: m.label.replace(/ \n /g, " ") }} />
                  <h3>{m.value}</h3>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
