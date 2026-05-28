import { InternationalPatientsPage } from "@/features/international/InternationalPatientsPage";
import { buildMetadata } from "@/lib/metadata";

export const metadata = buildMetadata({
  title: "International Patients | Caritas Hospital Kottayam",
  description:
    "World-class healthcare for international patients at Caritas Hospital, Kottayam. Visa assistance, travel support, health packages and dedicated patient relations.",
  path: "/international_patients",
});

export default function Page() {
  return <InternationalPatientsPage />;
}
