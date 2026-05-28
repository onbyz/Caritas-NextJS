import type { getMergedDoctors, mergedToDeptDoctor } from "@/services/doctors";
import type { DoctorDepartmentOption } from "@/services/doctors";

export type DoctorCardDoctor = Awaited<ReturnType<typeof getMergedDoctors>>[number];
export type DoctorCardView = ReturnType<typeof mergedToDeptDoctor>;
export type { DoctorDepartmentOption };
