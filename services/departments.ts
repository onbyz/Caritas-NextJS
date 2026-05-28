import { cancerDepartment } from "@/constants/departments/cancer";
import { criticalCareDepartment } from "@/constants/departments/criticalcare";
import { heartDepartment } from "@/constants/departments/heart";

import { DEPARTMENT_FULL_CONTENT } from "@/constants/departments/full-content";

import { neuroDepartment } from "@/constants/departments/neuro";

import { DEPARTMENT_REGISTRY } from "@/constants/departments/registry";

import type { DepartmentPageProps } from "@/features/departments/DepartmentPage";

import { sanityClient, isSanityConfigured, urlFor } from "@/lib/sanity/client";

import { departmentBySlugQuery } from "@/lib/sanity/queries";

import {

  getDepartmentDoctorGroups,

  type SanityDoctorGroup,

} from "@/services/doctors";

import { applyDepartmentArticles } from "@/services/department-articles";



const RICH_FALLBACK: Record<string, DepartmentPageProps> = {

  "caritas-neuro": neuroDepartment,

  "caritas-cancer-institute": cancerDepartment,
  "caritas-heart-institute": heartDepartment,
  criticalcare: criticalCareDepartment,

};



async function attachDoctors(

  page: DepartmentPageProps,

  sanityDoctorGroups?: SanityDoctorGroup[] | null,

): Promise<DepartmentPageProps> {

  const groups = await getDepartmentDoctorGroups(page.slug, sanityDoctorGroups);

  const withDoctors =

    groups?.some((g) => g.doctors.length > 0)

      ? { ...page, doctorGroups: groups }

      : page;

  return applyDepartmentArticles(withDoctors);

}



async function localFallback(slug: string): Promise<DepartmentPageProps | null> {

  const full = DEPARTMENT_FULL_CONTENT[slug];

  if (full) return attachDoctors({ ...full });

  const seed = DEPARTMENT_REGISTRY[slug];

  if (!seed) return null;

  return attachDoctors({ ...seed });

}



type SanityDepartmentDoc = {

  name: string;

  slug: string;

  heroTitle?: string;

  heroSubtitle?: string;

  bannerImage?: { asset: { _ref: string } };

  overviewHeading?: string;

  overviewImage?: { asset: { _ref: string } };

  overviewParagraphs?: string[];

  overviewFooterParagraphs?: string[];

  treatmentsIntro?: string;

  treatments?: { title: string; content: string }[];

  facilitiesIntro?: string;

  facilitiesCol1?: string[];

  facilitiesCol2?: string[];

  navItems?: { id: string; label: string }[];

  doctorGroups?: SanityDoctorGroup[];

};



export async function getDepartmentPage(

  slug: string,

): Promise<DepartmentPageProps | null> {

  const richBase = RICH_FALLBACK[slug];

  const rich = richBase ? await attachDoctors({ ...richBase }) : null;

  const fallback = await localFallback(slug);



  if (!isSanityConfigured || !sanityClient) {

    return rich ?? fallback;

  }



  try {

    const doc = await sanityClient.fetch<SanityDepartmentDoc | null>(

      departmentBySlugQuery,

      { slug },

    );



    if (!doc) return rich ?? fallback;



    const base = await attachDoctors(

      { ...(rich ?? fallback!) },

      doc.doctorGroups,

    );

    if (!base) return null;



    const page = applyDepartmentArticles({

      ...base,

      slug: doc.slug,

      title: doc.heroTitle ?? doc.name ?? base.title,

      subtitle: doc.heroSubtitle ?? base.subtitle,

      bannerImage: doc.bannerImage

        ? urlFor(doc.bannerImage).width(900).url()

        : base.bannerImage,

      overview: {

        ...base.overview,

        heading: doc.overviewHeading ?? base.overview.heading,

        image: doc.overviewImage

          ? urlFor(doc.overviewImage).width(500).url()

          : base.overview.image,

        paragraphs: doc.overviewParagraphs?.length

          ? doc.overviewParagraphs

          : base.overview.paragraphs,

        footerParagraphs:

          doc.overviewFooterParagraphs ?? base.overview.footerParagraphs,

      },

      treatmentsIntro: doc.treatmentsIntro ?? base.treatmentsIntro,

      treatments: doc.treatments?.length ? doc.treatments : base.treatments,

      treatmentLists: base.treatmentLists,

      treatmentsCustomHtml: base.treatmentsCustomHtml,

      facilities: base.facilities,

      extraSections: base.extraSections,

      doctorsAnchorId: base.doctorsAnchorId,

      doctorGroups: base.doctorGroups,

      navItems: doc.navItems ?? base.navItems,

    });

    if (slug === "caritas-paediatrics") {
      const blocked =
        "Visit Caritas Matha Hospital for Comprehensive Pediatric Care and Surgical Interventions for Children";
      page.overview.paragraphs = (page.overview.paragraphs ?? []).filter(
        (p) => !p.includes(blocked),
      );
    }

    if (slug === "pulmonology") {
      const blockedStarts = [
        "Comprehensive Respiratory Care for All Ages",
        "The pulmonology department in Caritas Hospital",
        "The primary purpose of the pulmonology department",
      ];
      page.overview.paragraphs = (page.overview.paragraphs ?? []).filter(
        (p) => !blockedStarts.some((s) => p.trim().startsWith(s)),
      );
    }

    return page;

  } catch {

    return rich ?? fallback;

  }

}

