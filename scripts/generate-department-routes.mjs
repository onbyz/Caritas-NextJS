#!/usr/bin/env node
/**
 * Scaffolds Next.js page.tsx files for department routes not yet migrated.
 * Usage: node scripts/generate-department-routes.mjs
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const appDir = path.join(__dirname, "..", "app");

const ROUTES = [
  "caritas-cancer-institute",
  "caritas-heart-institute",
  "caritas-gastro",
  "caritas-orthopaedics",
  "caritas-nephrology",
  "caritas-urology",
  "caritas-rheumatology",
  "caritas-paediatrics",
  "caritas-general-medicine",
  "caritas-ent-audiology",
  "endocrinology",
  "neonatology",
  "ophthalmology",
  "emergency-medicine",
  "dental",
  "pathology",
  "psychiatry",
  "plastic-microvascular",
  "pulmonology",
  "gynaecology",
  "dermatology",
  "anaesthesiology",
  "physical-medicine",
  "criticalcare",
  "general-surgery",
  "radiology",
  "blood-bank",
  "clinical-nutrition",
  "physiotherapy",
];

const template = (slug, title) => `import { PlaceholderPage } from "@/components/shared/PlaceholderPage";
import { buildMetadata } from "@/lib/metadata";

export const metadata = buildMetadata({
  title: "${title}",
  description: "${title} at Caritas Hospital, Kottayam.",
  path: "/${slug}",
});

export default function Page() {
  return (
    <PlaceholderPage
      title="${title}"
      djangoTemplate="caritasapp/${slug.replace(/-/g, "_")}.html"
    />
  );
}
`;

for (const slug of ROUTES) {
  const dir = path.join(appDir, slug);
  const pageFile = path.join(dir, "page.tsx");
  if (fs.existsSync(pageFile)) continue;
  const title = slug
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(pageFile, template(slug, title));
  console.log("Created", pageFile);
}

console.log("Done.");
