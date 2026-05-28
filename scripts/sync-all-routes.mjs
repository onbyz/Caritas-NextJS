#!/usr/bin/env node
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const appDir = path.join(__dirname, "..", "app");

const DEPARTMENT_SLUGS = [
  "caritas-cancer-institute",
  "caritas-heart-institute",
  "caritas-neuro",
  "criticalcare",
  "dermatology",
  "caritas-gastro",
  "caritas-general-medicine",
  "caritas-rheumatology",
  "caritas-urology",
  "caritas-nephrology",
  "caritas-paediatrics",
  "physical-medicine",
  "emergency-medicine",
  "gynaecology",
  "caritas-orthopaedics",
  "general-surgery",
  "anaesthesiology",
  "community-medicine",
  "ophthalmology",
  "neonatology",
  "endocrinology",
  "dental",
  "caritas-ent-audiology",
  "interventional-radiology",
  "pathology",
  "psychiatry",
  "pulmonology",
  "plastic-microvascular",
];

const STATIC_SLUGS = [
  "about-caritas",
  "director-message",
  "governing-body",
  "milestones",
  "achievements",
  "career",
  "caritas-social-responsibility",
  "ethics-committee",
  "quality-control",
  "biomedical",
  "directions",
  "visitors-guide",
  "contact-us",
  "articles",
  "news-and-events",
  "testimonials",
  "gallery",
  "video-gallery",
  "organ",
  "insurance",
  "secondopinion",
  "caritas-mortuary-services",
  "pastoralcare",
  "caritas-home-care",
  "health-checkup-packages",
  "nri-health-checkup-packages",
  "radiology",
  "blood-bank",
  "clinical-nutrition",
  "physiotherapy",
];

const deptPage = (slug) => `import { DepartmentPage } from "@/features/departments/DepartmentPage";
import { buildMetadata } from "@/lib/metadata";
import { getDepartmentPage } from "@/services/departments";
import { notFound } from "next/navigation";

const SLUG = "${slug}";

export async function generateMetadata() {
  const data = await getDepartmentPage(SLUG);
  if (!data) return {};
  return buildMetadata({
    title: \`\${data.title} | Caritas Hospital\`,
    description: data.subtitle,
    path: \`/\${SLUG}\`,
  });
}

export default async function Page() {
  const data = await getDepartmentPage(SLUG);
  if (!data) notFound();
  return <DepartmentPage {...data} />;
}
`;

const staticPage = (slug) => `import { renderStaticPage } from "@/features/pages/renderStaticPage";
import { STATIC_PAGE_REGISTRY } from "@/constants/pages/registry";
import { getStaticPage } from "@/services/static-pages";
import { buildMetadata } from "@/lib/metadata";
import { notFound } from "next/navigation";

const SLUG = "${slug}";
const config = STATIC_PAGE_REGISTRY[SLUG];

export const metadata = buildMetadata({
  title: \`\${getStaticPage(SLUG)?.title ?? config?.title ?? SLUG} | Caritas Hospital\`,
  description: getStaticPage(SLUG)?.subtitle ?? config?.subtitle ?? "",
  path: \`/\${SLUG}\`,
});

export default function Page() {
  if (!getStaticPage(SLUG)) notFound();
  return renderStaticPage(SLUG);
}
`;

for (const slug of DEPARTMENT_SLUGS) {
  const dir = path.join(appDir, slug);
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(path.join(dir, "page.tsx"), deptPage(slug));
  console.log("dept", slug);
}

for (const slug of STATIC_SLUGS) {
  if (slug === "director-message") continue;
  if (slug === "contact-us") continue;
  const dir = path.join(appDir, slug);
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(path.join(dir, "page.tsx"), staticPage(slug));
  console.log("static", slug);
}

console.log("Done.");
