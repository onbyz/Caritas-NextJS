import Link from "next/link";
import { SiteLayout } from "@/components/layout/SiteLayout";
import { buildMetadata } from "@/lib/metadata";

export const metadata = buildMetadata({
  title: "Thank You | Caritas Hospital",
  description: "Your submission was received successfully.",
  path: "/success",
});

export default function SuccessPage() {
  return (
    <SiteLayout>
      <div style={{ textAlign: "center", marginTop: 100, marginBottom: 100 }}>
        <h1>Thank You!</h1>
        <p>Your message has been successfully submitted.</p>
        <Link href="/">Go back to Home</Link>
      </div>
    </SiteLayout>
  );
}
