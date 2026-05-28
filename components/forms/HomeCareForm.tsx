"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

const PACKAGES = [
  { value: "Basic", label: "Basic Package" },
  { value: "BIP", label: "Basic Investigation Package" },
  { value: "EP", label: "Executive Package" },
  { value: "EIP", label: "Executive Investigation Package" },
] as const;

export function HomeCareForm() {
  const router = useRouter();
  const [status, setStatus] = useState<"idle" | "loading" | "error">("idle");

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("loading");
    const fd = new FormData(e.currentTarget);
    try {
      const res = await fetch("/api/home-care", { method: "POST", body: fd });
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
              maxLength={30}
              className="form-control"
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
              className="form-control"
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
      <div className="secondopinion row my-3">
        <div className="col-sm-12">
          <div className="input-with-symbol">
            <input
              type="tel"
              id="phone_number"
              name="phone_number"
              className="form-control"
              placeholder="Phone Number"
              required
              pattern="[0-9]{10,14}"
              title="Please enter a valid phone number (10-14 digits)"
            />
            <span className="required-symbol">*</span>
          </div>
        </div>
      </div>
      <div className="secondopinion row my-3">
        <div className="col-sm-12">
          <div className="input-with-symbol">
            <select id="package" name="package" className="form-control" required defaultValue="">
              <option value="" disabled>
                Select Home Care Packages
              </option>
              {PACKAGES.map((p) => (
                <option key={p.value} value={p.value}>
                  {p.label}
                </option>
              ))}
            </select>
            <span className="required-symbol">*</span>
          </div>
        </div>
      </div>
      <div className="row my-3">
        <div className="col-sm-12">
          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              id="homecare-tickbox"
              name="agree_terms"
              required
            />
            <label className="form-check-label" htmlFor="homecare-tickbox">
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
