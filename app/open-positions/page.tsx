import { OpenPositionsPage } from "@/features/pages/OpenPositionsPage";
import { getCareers } from "@/services/cms";
import { buildMetadata } from "@/lib/metadata";

export const metadata = buildMetadata({
  title: "Open Positions | Caritas Hospital",
  description: "Explore current job openings at Caritas Hospital, Kottayam.",
  path: "/open-positions",
});

export default function Page() {
  return <OpenPositionsPage jobs={getCareers()} />;
}
