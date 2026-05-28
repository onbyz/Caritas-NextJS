import { ContentStaticPage } from "@/features/pages/ContentStaticPage";
import { SecondOpinionForm } from "@/components/forms/SecondOpinionForm";
import { ServiceQuickLinks } from "@/components/shared/ServiceQuickLinks";
import type { StaticPageFullContent } from "@/constants/pages/full-content";

export function SecondOpinionPage({ page }: { page: StaticPageFullContent }) {
  return (
    <ContentStaticPage {...page} contentHtml={undefined}>
      <style>{`
        @media (max-width: 768px) {
          #dob-field { flex-direction: inherit; }
        }
      `}</style>
      <section id="deptsections">
        <span id="overview" />
        <div className="container">
          <div className="row">
            <h3>
              Caritas Second Opinion: Your Path to Informed Choices, Delivered in 24
              Hours.
            </h3>
            <p>&nbsp;</p>
            <p>
              This is a special paid service provided by Caritas Hospital. Information
              regarding the second opinion will be delivered within 24 hours after
              consulting with the respective department/consultant.
            </p>
          </div>

          <div className="row">
            <div className="col-lg-7">
              <h3>Book Your Consultation</h3>
              <p>&nbsp;</p>
              <SecondOpinionForm />
              <p>&nbsp;</p>
              <p>
                <b>
                  <a href="tel:+918129222106">+91 81292 22106</a> - Connect with us,
                  and we&apos;ll help you schedule your Second Opinion appointment at a
                  time that fits your schedule.
                </b>
              </p>
            </div>
            <div className="col-lg-4 p-5" style={{ background: "#faf9f9" }}>
              <h6>Availability of Service</h6>
              <p>
                This service is available only from Monday to Friday 10.00 AM to 4.00
                PM.
              </p>
              <h6>How it Works?</h6>
              <p>
                To access our Second Opinion service at Caritas Hospital, follow these
                simple steps to make your payment:
              </p>
              <ol>
                <li className="mb-4">
                  <b>Visit Our Online Payment Portal:</b> Start by visiting our secure
                  online payment portal.
                </li>
                <li className="mb-4">
                  <b>Select &quot;Second Opinion&quot;:</b> In the portal, choose the
                  designated &quot;Second Opinion&quot; section for payment processing.
                </li>
                <li className="mb-4">
                  <b>Payment Amount:</b> A payment of ₹500 (Within India) or ₹1000
                  (International) is required to access the Second Opinion service.
                </li>
                <li className="mb-4">
                  <b>Furnish Your Details:</b> After completing the payment, please
                  provide the necessary details in the form alongside.
                </li>
              </ol>
            </div>
          </div>
        </div>
      </section>
      <ServiceQuickLinks activeHref="/secondopinion" />
    </ContentStaticPage>
  );
}
