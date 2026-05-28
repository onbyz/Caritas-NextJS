"use client";

import { FormEvent, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { COUNTRIES } from "@/constants/countries";
import secondOpinionData from "@/constants/second-opinion.json";

type DoctorOption = {
  id: string;
  name: string;
  departmentId: string;
};

export function SecondOpinionForm() {
  const router = useRouter();
  const { departments, doctors } = secondOpinionData;
  const [departmentId, setDepartmentId] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "error">("idle");

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("loading");
    const fd = new FormData(e.currentTarget);
    try {
      const res = await fetch("/api/book-consultation", { method: "POST", body: fd });
      const data = (await res.json()) as { ok?: boolean; redirect?: string };
      if (res.ok && data.redirect) {
        router.push(data.redirect);
        return;
      }
      if (res.ok) {
        router.push("/success");
        return;
      }
      setStatus("error");
    } catch {
      setStatus("error");
    }
  };

  const visibleDoctors = useMemo(() => {
    if (!departmentId) return [];
    return (doctors as DoctorOption[]).filter((d) => d.departmentId === departmentId);
  }, [departmentId, doctors]);

  const maxDob = useMemo(() => {
    const d = new Date();
    d.setDate(d.getDate() - 1);
    return d.toISOString().slice(0, 10);
  }, []);

  return (
    <form onSubmit={handleSubmit} className="custom-form">
      <div className="secondopinion row my-3">
        <div className="col-sm-12">
          <div className="input-with-symbol">
            <input
              type="text"
              id="first_name"
              placeholder="First Name"
              name="first_name"
              className="form-control"
              autoComplete="given-name"
              maxLength={30}
              pattern="^[A-Za-z]{1,}[\.]{0,1}[A-Za-z]{0,}$"
              required
            />
            <span className="required-symbol">*</span>
          </div>
        </div>
      </div>
      <div className="secondopinion row my-3">
        <div className="col-sm-12">
          <div className="input-with-symbol">
            <input
              type="text"
              id="last_name"
              placeholder="Last Name"
              name="last_name"
              maxLength={30}
              pattern="^[A-Za-z]{1,}[\.]{0,1}[A-Za-z]{0,}$"
              className="form-control"
              required
            />
            <span className="required-symbol">*</span>
          </div>
        </div>
      </div>
      <div className="gender-selection my-4">
        <label htmlFor="male">
          <input type="radio" id="male" name="gender" value="M" required />
          Male &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        </label>
        <label htmlFor="female">
          <input type="radio" id="female" name="gender" value="F" required />
          Female &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        </label>
        <label htmlFor="other">
          <input type="radio" id="other" name="gender" value="O" required />
          I don&apos;t want to specify
        </label>
      </div>
      <div className="secondopinion row mb-2">
        <div className="col-sm-12">
          <div className="input-with-symbol">
            <input
              type="email"
              id="email"
              name="email"
              className="form-control"
              placeholder="Email"
              required
            />
            <span className="required-symbol">*</span>
          </div>
        </div>
      </div>
      <div className="secondopinion row mb-2">
        <div className="col-sm-6 my-2">
          <div className="input-with-symbol">
            <select id="country" name="country" className="form-control" required defaultValue="">
              <option value="" disabled>
                Select Country
              </option>
              {COUNTRIES.map((c) => (
                <option key={c.code} value={c.code}>
                  {c.name}
                </option>
              ))}
            </select>
            <span className="required-symbol">*</span>
          </div>
        </div>
        <div className="col-sm-6 my-2">
          <div className="input-with-symbol">
            <input
              type="tel"
              id="phone_number"
              name="phone_number"
              className="form-control"
              required
              placeholder="Phone Number"
              maxLength={30}
              pattern="[0-9]{10}"
            />
            <span
              style={{
                position: "absolute",
                left: 0,
                top: "45%",
                transform: "translateY(-50%)",
                color: "red",
                fontSize: 15,
              }}
            >
              *
            </span>
          </div>
        </div>
      </div>
      <div className="secondopinion row mb-2">
        <div className="col-sm-6 my-2">
          <div className="d-flex" id="dob-field">
            <label
              htmlFor="dob"
              className="date-placeholder mr-2"
              style={{ textAlign: "left", whiteSpace: "nowrap", padding: 8 }}
            >
              DOB
            </label>
            <input
              type="date"
              id="dob"
              name="dob"
              className="form-control"
              min="1900-01-01"
              max={maxDob}
              required
            />
            <span className="required-symbol">*</span>
          </div>
        </div>
        <div className="col-sm-6 my-2">
          <div className="input-with-symbol">
            <input
              type="text"
              id="op_number"
              name="op_number"
              className="form-control"
              placeholder="Hospital OP Number (If available)"
            />
          </div>
        </div>
      </div>
      <div className="secondopinion row mb-2">
        <div className="col-sm-6 my-2">
          <div className="input-with-symbol">
            <select
              name="department"
              id="department"
              className="form-control"
              required
              value={departmentId}
              onChange={(e) => setDepartmentId(e.target.value)}
            >
              <option value="" disabled>
                Select Department
              </option>
              {departments.map((d) => (
                <option key={d.id} value={d.id}>
                  {d.name}
                </option>
              ))}
            </select>
            <span
              style={{
                position: "absolute",
                left: 0,
                top: "45%",
                transform: "translateY(-50%)",
                color: "red",
                fontSize: 15,
              }}
            >
              *
            </span>
          </div>
        </div>
        <div className="col-sm-6 my-2">
          <select name="doctor" id="doctor" className="form-control" required defaultValue="">
            <option value="" disabled>
              Select Doctor
            </option>
            {visibleDoctors.map((d) => (
              <option key={d.id} value={d.id}>
                {d.name}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="my-3">
        <textarea
          id="message"
          name="message"
          className="form-control"
          placeholder="Please Provide details of your medical issue, past treatment, or specific queries for our review"
          rows={4}
        />
      </div>
      <div className="row mb-2">
        <div className="col-sm-12 my-2">
          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              id="tickbox"
              name="agree_terms"
              required
            />
            <label className="form-check-label" htmlFor="tickbox">
              By ticking, I agree to the Terms and Conditions, and I am giving my consent
              to receive updates through email and SMS.
            </label>
          </div>
        </div>
      </div>
      <div className="form-grp row mt-4">
        <div className="col-sm-12">
          <button type="submit" className="enqrybtn" disabled={status === "loading"}>
            {status === "loading" ? "Submitting…" : "Submit Now"}
          </button>
        </div>
      </div>
      {status === "error" && (
        <p className="text-danger mt-2 small">Something went wrong. Please try again.</p>
      )}
    </form>
  );
}
