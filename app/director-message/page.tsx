import Link from "next/link";
import { ContentStaticPage } from "@/features/pages/ContentStaticPage";
import { getStaticPage } from "@/services/static-pages";
import { buildMetadata } from "@/lib/metadata";
import { notFound } from "next/navigation";

const SLUG = "director-message";

export const metadata = buildMetadata({
  title: "Director's Message | Caritas Hospital",
  description: "Message from the Director of Caritas Hospital, Kottayam.",
  path: `/${SLUG}`,
});

export default function DirectorMessagePage() {
  const page = getStaticPage(SLUG);
  if (!page) notFound();

  const sidebar = (
    <>
      <p>&nbsp;</p>
      <p>&nbsp;</p>
      <h3 className="text-light">Rev. Dr. Binu Kunnath</h3>
      <p className="text-light">Director, Caritas Hospital</p>
      <p>&nbsp;</p>
      <h6 className="text-light">
        Connect with
        <br /> Rev. Dr. Binu Kunnath on Social Media Channels
      </h6>
      <div className="row">
        <div className="col-md-12 text-light">
          <a
            style={{ color: "#fff", marginRight: 20 }}
            href="https://www.linkedin.com/in/fr-dr-binu-kunnath-a56605181/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <i className="bi bi-linkedin" style={{ fontSize: 30 }} />
          </a>
          <a
            style={{ color: "#fff", marginRight: 20 }}
            href="https://www.facebook.com/people/Fr-Dr-Binu-Kunnath/61553804964105/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <i className="bi bi-facebook" style={{ fontSize: 30 }} />
          </a>
          <a
            style={{ color: "#fff", marginRight: 20 }}
            href="https://www.instagram.com/frdrbinukunnath/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <i className="bi bi-instagram" style={{ fontSize: 30 }} />
          </a>
        </div>
      </div>
    </>
  );

  return <ContentStaticPage {...page} showEnquiry={false} sidebar={sidebar} />;
}
