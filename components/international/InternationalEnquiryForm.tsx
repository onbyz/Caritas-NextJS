"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

const COUNTRIES = [
  "India", "United Arab Emirates", "Saudi Arabia", "Qatar", "Oman", "Kuwait",
  "Bahrain", "United States", "United Kingdom", "Canada", "Australia",
  "Germany", "France", "Singapore", "Malaysia", "Other",
];

export function InternationalEnquiryForm() {
  const router = useRouter();
  const [status, setStatus] = useState<"idle" | "loading">("idle");

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("loading");
    const formData = new FormData(e.currentTarget);
    try {
      const res = await fetch("/api/international-enquiry", {
        method: "POST",
        body: formData,
      });
      if (res.ok) router.push("/success");
    } catch {
      router.push("/success");
    }
  };

  return (
    <section id="deptsections">
      <span id="makeanenquiry" />
      <div className="container">
        <div className="row" id="makeenqry">
          <h3 className="mb-4">Make An Enquiry</h3>
          <div className="col-lg-6">
            <p>
              At Caritas Hospital, we are dedicated to providing prompt and personalized
              assistance to our international patients.
            </p>
            <p><b>Phone:</b></p>
            <p>
              International Patient Relations:{" "}
              <a href="tel:+918714673343">+91 8714673343</a>,{" "}
              <a href="tel:+919895180982">+91 9895180982</a>
            </p>
            <p>
              Email:{" "}
              <a href="mailto:ipr@caritashospital.org">ipr@caritashospital.org</a>
            </p>
            <p>
              <Link href="/directions">
                View Directions to Reach <i className="bi bi-chevron-right" />
              </Link>
            </p>
          </div>
          <div className="col-lg-5 mx-3">
            <p>Please fill up this form and submit it. Our International Patient Desk executives will contact you shortly.</p>
            <form onSubmit={handleSubmit} className="custom-form internationalform">
              <div className="form-group row mb-2">
                <div className="col-sm-12">
                  <input type="text" name="first_name" placeholder="First Name" className="form-control" required />
                </div>
              </div>
              <div className="form-group row mb-2">
                <div className="col-sm-12">
                  <input type="text" name="last_name" placeholder="Last Name" className="form-control" required />
                </div>
              </div>
              <div className="form-group row mb-2">
                <div className="col-sm-12">
                  <input type="email" name="email" className="form-control" placeholder="Email" required />
                </div>
              </div>
              <div className="form-group row mb-2">
                <div className="col-sm-12">
                  <input type="tel" name="phone_number" placeholder="Phone Number" className="form-control" required />
                </div>
              </div>
              <div className="form-group row mb-2">
                <div className="col-sm-12">
                  <select name="country" className="form-control" required defaultValue="">
                    <option value="" disabled>Select Country</option>
                    {COUNTRIES.map((c) => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="form-group row mb-2">
                <div className="col-sm-12">
                  <textarea name="message" className="form-control" placeholder="Message" rows={3} required />
                </div>
              </div>
              <div className="form-group row mt-4">
                <div className="col-sm-12 action_button">
                  <button type="submit" className="internationalformbtn" disabled={status === "loading"}>
                    {status === "loading" ? "Sending..." : "Enquire Now >"}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
