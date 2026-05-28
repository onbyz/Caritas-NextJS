"use client";

import Script from "next/script";
import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

const RECAPTCHA_SITE_KEY = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;

export function ContactUsForm() {
  const router = useRouter();
  const [status, setStatus] = useState<"idle" | "loading">("idle");

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("loading");
    const formData = new FormData(e.currentTarget);

    if (formData.get("additional_field")) {
      router.push("/success");
      return;
    }

    try {
      const res = await fetch("/api/contact-us", { method: "POST", body: formData });
      if (res.ok) router.push("/success");
    } catch {
      router.push("/success");
    }
  };

  return (
    <>
      {RECAPTCHA_SITE_KEY ? (
        <Script src="https://www.google.com/recaptcha/api.js" async defer />
      ) : null}
      <form onSubmit={handleSubmit} className="custom-form">
        <input type="hidden" name="additional_field" id="additional_field" />
        <div className="secondopinion row mb-2">
          <div className="col-sm-12 my-2">
            <div className="input-with-symbol">
              <input
                type="text"
                id="first_name"
                placeholder="First Name"
                name="first_name"
                className="form-control"
                required
                pattern="[A-Za-z]+"
              />
              <span className="required-symbol">*</span>
            </div>
          </div>
        </div>
        <div className="secondopinion row mb-2">
          <div className="col-sm-12 my-2">
            <div className="input-with-symbol">
              <input
                type="text"
                id="last_name"
                placeholder="Last Name"
                name="last_name"
                className="form-control"
                required
                pattern="[A-Za-z]+"
              />
              <span className="required-symbol">*</span>
            </div>
          </div>
        </div>
        <div className="secondopinion row mb-2">
          <div className="col-sm-6 my-2">
            <div className="input-with-symbol">
              <input
                type="email"
                id="email"
                name="email"
                className="form-control"
                required
                pattern="^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$"
                placeholder="Email"
              />
              <span className="required-symbol">*</span>
            </div>
          </div>
          <div className="col-sm-6 my-2">
            <div className="input-with-symbol">
              <input
                type="tel"
                id="phone_number"
                name="phone_number"
                placeholder="Phone Number"
                className="form-control"
                required
                pattern="[0-9]{10,14}"
                title="Please enter a valid phone number"
              />
              <span className="required-symbol">*</span>
            </div>
          </div>
        </div>
        <div className="secondopinion row mb-2">
          <div className="col-sm-12 my-2">
            <div className="input-with-symbol">
              <textarea
                id="message"
                name="message"
                className="form-control"
                required
                placeholder="Message Query"
                rows={2}
                cols={40}
                style={{ border: "1px solid #000" }}
              />
              <span className="required-symbol" style={{ marginLeft: 5, paddingBottom: 20 }}>
                *
              </span>
            </div>
          </div>
        </div>
        <div className="form-check">
          <input className="form-check-input" type="checkbox" id="tickbox" name="agree_terms" required />
          <label className="form-check-label" htmlFor="tickbox">
            By ticking, I agree to the Terms and Conditions, and I am giving my consent to
            receive updates through email and SMS.
          </label>
        </div>
        {RECAPTCHA_SITE_KEY ? (
          <div className="secondopinion row mb-2 g-recaptcha" data-sitekey={RECAPTCHA_SITE_KEY} />
        ) : null}
        <div className="form-grp row mt-4">
          <div className="col-sm-12">
            <button type="submit" className="enqrybtn" disabled={status === "loading"}>
              {status === "loading" ? "Submitting…" : "Submit Now"}
            </button>
          </div>
        </div>
      </form>
    </>
  );
}
