import { DepartmentPage } from "@/features/departments/DepartmentPage";
import { buildMetadata } from "@/lib/metadata";
import { getDepartmentPage } from "@/services/departments";
import { notFound } from "next/navigation";

const SLUG = "dental";

export async function generateMetadata() {
  const data = await getDepartmentPage(SLUG);
  if (!data) return {};
  return buildMetadata({
    title: `${data.title} | Caritas Hospital`,
    description: data.subtitle,
    path: `/${SLUG}`,
  });
}

export default async function Page() {
  const data = await getDepartmentPage(SLUG);
  if (!data) notFound();
  return <DepartmentPage {...data} />;
}
