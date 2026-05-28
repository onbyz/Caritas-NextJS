import legacyDoctors from "@/constants/doctors.json";
import type { DeptDoctor } from "@/components/departments/DoctorGrid";
import { DEPARTMENT_DOCTOR_GROUPS } from "@/constants/departments/department-doctor-map";
import { sanityClient, isSanityConfigured, urlFor } from "@/lib/sanity/client";
import { allDoctorsQuery } from "@/lib/sanity/queries";

export type LegacyDoctor = {
  id: string;
  name: string;
  designation: string;
  specialization: string;
  image: string;
  appointmentEnabled: boolean;
  order: string;
  departmentName?: string;
  departmentUrl?: string;
};

type SanityDoctorDoc = {
  _id: string;
  name: string;
  slug: { current: string };
  legacyId?: string;
  designation?: string;
  specialization?: string;
  image?: { asset: { _ref: string } };
  legacyImagePath?: string;
  order?: number;
  appointmentEnabled?: boolean;
  isVisible?: boolean;
};

type MergedDoctor = LegacyDoctor & {
  slug: string;
  imageUrl: string;
  source: "legacy" | "sanity";
};

function parseOrder(order: string | number | undefined): number {
  if (typeof order === "number") return order;
  const n = parseInt(String(order ?? ""), 10);
  return Number.isFinite(n) ? n : 999;
}

function legacyToMerged(d: LegacyDoctor): MergedDoctor {
  return {
    ...d,
    slug: d.id,
    imageUrl: d.image,
    source: "legacy",
  };
}

function sanityImageUrl(doc: SanityDoctorDoc): string | undefined {
  if (!doc.image?.asset?._ref || !sanityClient) return undefined;
  try {
    return urlFor(doc.image).width(400).height(400).url();
  } catch {
    return undefined;
  }
}

function sanityToMerged(doc: SanityDoctorDoc, base?: LegacyDoctor): MergedDoctor {
  const id = doc.legacyId || doc._id;
  const imageUrl =
    sanityImageUrl(doc) ??
    doc.legacyImagePath ??
    base?.image ??
    "/media/doctors/Default.png";
  const normalizedImageUrl =
    id === "25dd0e208ac749e4ae434e236483fa24" ? "/media/doctors/Default.png" : imageUrl;

  return {
    id,
    name: doc.name,
    designation: doc.designation ?? base?.designation ?? "",
    specialization: doc.specialization ?? base?.specialization ?? "",
    departmentName: base?.departmentName ?? "",
    departmentUrl: base?.departmentUrl ?? "",
    image: normalizedImageUrl,
    imageUrl: normalizedImageUrl,
    appointmentEnabled: doc.appointmentEnabled ?? base?.appointmentEnabled ?? true,
    order: String(doc.order ?? base?.order ?? "999"),
    slug: doc.slug?.current ?? id,
    source: "sanity",
  };
}

/** All doctors: legacy JSON defaults, overridden/extended by Sanity documents. */
export async function getMergedDoctors(): Promise<MergedDoctor[]> {
  const byId = new Map<string, MergedDoctor>();

  for (const d of legacyDoctors as LegacyDoctor[]) {
    byId.set(d.id, legacyToMerged(d));
  }

  if (isSanityConfigured && sanityClient) {
    try {
      const sanityDocs = await sanityClient.fetch<SanityDoctorDoc[]>(allDoctorsQuery);
      for (const doc of sanityDocs) {
        if (doc.isVisible === false) {
          if (doc.legacyId) byId.delete(doc.legacyId);
          continue;
        }
        const base = doc.legacyId ? byId.get(doc.legacyId) : undefined;
        const merged = sanityToMerged(doc, base);
        if (doc.legacyId) byId.delete(doc.legacyId);
        byId.set(merged.id, merged);
      }
    } catch {
      // use legacy only
    }
  }

  return [...byId.values()].sort(
    (a, b) => parseOrder(a.order) - parseOrder(b.order) || a.name.localeCompare(b.name),
  );
}

export function mergedToDeptDoctor(d: MergedDoctor): DeptDoctor {
  return {
    id: d.id,
    name: d.name,
    designation: d.designation || undefined,
    imageUrl: d.imageUrl,
    slug: d.slug,
    appointmentEnabled: d.appointmentEnabled,
  };
}

export type SanityDoctorGroup = {
  heading?: string;
  doctors?: SanityDoctorDoc[];
};

/** Department doctors: Sanity manual groups win; else auto-group by specialization. */
export async function getDepartmentDoctorGroups(
  slug: string,
  sanityGroups?: SanityDoctorGroup[] | null,
): Promise<{ heading: string; doctors: DeptDoctor[] }[] | undefined> {
  const forceConfigForSlug = new Set([
    "caritas-general-medicine",
    "caritas-paediatrics",
    "caritas-rheumatology",
    "pathology",
  ]);

  const manual =
    sanityGroups?.filter((g) => g.heading && (g.doctors?.length ?? 0) > 0) ?? [];

  if (manual.length > 0 && !forceConfigForSlug.has(slug)) {
    const allLegacy = new Map(
      (legacyDoctors as LegacyDoctor[]).map((d) => [d.id, d]),
    );
    return manual.map((g) => ({
      heading: g.heading!,
      doctors: (g.doctors ?? [])
        .filter((d) => d.isVisible !== false)
        .map((doc) => {
          const base = doc.legacyId ? allLegacy.get(doc.legacyId) : undefined;
          return mergedToDeptDoctor(sanityToMerged(doc, base));
        }),
    }));
  }

  const config = DEPARTMENT_DOCTOR_GROUPS[slug];
  if (!config) return undefined;

  const all = await getMergedDoctors();
  return config.map(({ heading, specializations, departmentNames, doctorIds }) => ({
    heading,
    doctors: all
      .filter((d) => {
        if (doctorIds?.length) {
          return doctorIds.includes(d.id);
        }
        if (departmentNames?.length) {
          return departmentNames.includes(d.departmentName ?? "");
        }
        if (specializations?.length) {
          return specializations.includes(d.specialization);
        }
        return false;
      })
      .map(mergedToDeptDoctor),
  }));
}

export async function getDoctorById(id: string): Promise<MergedDoctor | null> {
  const all = await getMergedDoctors();
  return all.find((d) => d.id === id || d.slug === id) ?? null;
}

export type DoctorDepartmentOption = {
  name: string;
  url: string;
  count: number;
};

/** Departments that have at least one visible doctor (matches Django doctors view). */
export async function getDoctorDepartmentOptions(): Promise<DoctorDepartmentOption[]> {
  const doctors = await getMergedDoctors();
  const byName = new Map<string, DoctorDepartmentOption>();

  for (const d of doctors) {
    const name = d.departmentName?.trim();
    if (!name) continue;
    const existing = byName.get(name);
    if (existing) {
      existing.count += 1;
    } else {
      byName.set(name, {
        name,
        url: d.departmentUrl?.trim() ?? "",
        count: 1,
      });
    }
  }

  return [...byName.values()].sort((a, b) => a.name.localeCompare(b.name));
}

export function filterDoctors(
  doctors: MergedDoctor[],
  opts: { search?: string; department?: string },
): MergedDoctor[] {
  let list = doctors;
  const department = opts.department?.trim();
  const search = opts.search?.trim().toLowerCase();

  if (department) {
    list = list.filter((d) => d.departmentName === department);
  }

  if (search) {
    list = list.filter(
      (d) =>
        d.name.toLowerCase().includes(search) ||
        d.specialization.toLowerCase().includes(search) ||
        d.designation.toLowerCase().includes(search) ||
        (d.departmentName?.toLowerCase().includes(search) ?? false),
    );
  }

  return list;
}
