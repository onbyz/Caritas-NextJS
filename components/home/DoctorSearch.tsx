import { DoctorFindPanel } from "@/components/doctors/DoctorFindPanel";
import { FadeIn } from "@/components/shared/FadeIn";
import { getDoctorDepartmentOptions } from "@/services/doctors";

export async function DoctorSearch() {
  const departments = await getDoctorDepartmentOptions();

  return (
    <section>
      <FadeIn>
        <DoctorFindPanel departments={departments} />
      </FadeIn>
    </section>
  );
}
