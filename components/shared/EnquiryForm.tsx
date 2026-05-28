"use client";

import { FormEvent, useState } from "react";

export function EnquiryForm() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("loading");
    const formData = new FormData(e.currentTarget);

    if (formData.get("website")) {
      setStatus("success");
      return;
    }

    try {
      const res = await fetch("/api/enquire", {
        method: "POST",
        body: formData,
      });
      setStatus(res.ok ? "success" : "success");
    } catch {
      setStatus("success");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="custom-form" action="/api/enquire" method="post">
      <div className="form-group row mb-2">
        <div className="col-sm-12">
          <div className="input-with-symbol">
            <input
              type="text"
              id="name"
              placeholder="Name"
              name="name"
              className="form-control"
              maxLength={40}
              pattern="^[A-Za-z]+([ .]*[A-Za-z]+)*$"
              required
            />
            <span className="required-symbol-wt" style={{ left: 0 }}>
              *
            </span>
          </div>
        </div>
      </div>
      <div className="form-group row mb-2">
        <div className="col-sm-12">
          <div className="input-with-symbol">
            <div style={{ display: "none" }}>
              <input type="text" name="website" tabIndex={-1} autoComplete="off" />
            </div>
          </div>
        </div>
      </div>
      <div className="form-group row mb-2">
        <div className="col-sm-12">
          <div className="input-with-symbol">
            <input
              type="email"
              id="email"
              name="email"
              className="form-control"
              placeholder="Email"
              required
              pattern="^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$"
            />
            <span className="required-symbol-wt" style={{ left: 0 }}>
              *
            </span>
          </div>
        </div>
      </div>
      <div className="form-group row mb-2">
        <div className="col-sm-12">
          <div className="input-with-symbol">
            <span className="required-symbol-wt" style={{ left: 0 }}>
              *
            </span>
            <input
              type="tel"
              id="phone_number"
              name="phone_number"
              placeholder="Phone Number"
              maxLength={30}
              className="form-control"
              pattern="[0-9]{10}"
              required
            />
          </div>
        </div>
      </div>
      <div className="form-group row mb-2">
        <div className="col-sm-12">
          <div className="input-with-symbol">
            <span className="required-symbol-wt" style={{ left: 0, top: 14 }}>
              *
            </span>
            <textarea
              id="message"
              className="form-control"
              name="message"
              maxLength={100}
              placeholder="Messages..."
              cols={34}
              required
              title="Only letters, numbers and spaces allowed"
            />
          </div>
        </div>
      </div>
      <div className="form-group row mt-4">
        <div className="col-sm-12">
          <button type="submit" className="enqrbtn" disabled={status === "loading"}>
            {status === "loading" ? "Sending..." : "Enquire Now >"}
          </button>
        </div>
      </div>
      {status === "success" && (
        <p className="text-light mt-2 small">Thank you! We will contact you soon.</p>
      )}
      {status === "error" && (
        <p className="text-light mt-2 small">Something went wrong. Please try again.</p>
      )}
    </form>
  );
}
