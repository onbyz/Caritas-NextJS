import { DoctorsPageAnimated } from "@/components/doctors/DoctorsPageAnimated";
import { SiteLayout } from "@/components/layout/SiteLayout";
import { buildMetadata } from "@/lib/metadata";
import {
  filterDoctors,
  getDoctorDepartmentOptions,
  getMergedDoctors,
} from "@/services/doctors";

export const metadata = buildMetadata({
  title: "Find a Doctor | Caritas Hospital",
  description: "Search and find specialist doctors at Caritas Hospital, Kottayam.",
  path: "/doctors",
});

export default async function DoctorsPage({
  searchParams,
}: {
  searchParams: Promise<{ search?: string; department?: string }>;
}) {
  const { search, department } = await searchParams;
  const [doctors, departments] = await Promise.all([
    getMergedDoctors(),
    getDoctorDepartmentOptions(),
  ]);
  const filtered = filterDoctors(doctors, { search, department });
  const hasFilters = Boolean(search?.trim() || department?.trim());

  return (
    <SiteLayout>
      <DoctorsPageAnimated
        doctors={doctors}
        departments={departments}
        initialSearch={search}
        initialDepartment={department}
        hasFilters={hasFilters}
        filtered={filtered}
        search={search}
        department={department}
      />
    </SiteLayout>
  );
}
