#!/usr/bin/env node
/**
 * One-time import: creates/updates Sanity doctor documents from constants/doctors.json.
 * Images stay on /media/doctors/* (legacyImagePath). Upload photos in Studio to override.
 *
 * Requires: SANITY_API_TOKEN, NEXT_PUBLIC_SANITY_PROJECT_ID, NEXT_PUBLIC_SANITY_DATASET
 * Usage: node scripts/sanity-import-doctors.mjs
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { createClient } from "@sanity/client";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const doctors = JSON.parse(
  fs.readFileSync(path.join(root, "constants/doctors.json"), "utf8"),
);

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production";
const token = process.env.SANITY_API_TOKEN;

if (!projectId || !token) {
  console.error("Set NEXT_PUBLIC_SANITY_PROJECT_ID and SANITY_API_TOKEN");
  process.exit(1);
}

const client = createClient({
  projectId,
  dataset,
  apiVersion: "2024-01-01",
  token,
  useCdn: false,
});

function slugify(name) {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 96);
}

let created = 0;
let updated = 0;

for (const d of doctors) {
  const slug = slugify(d.name);
  const existing = await client.fetch(
    `*[_type == "doctor" && legacyId == $legacyId][0]._id`,
    { legacyId: d.id },
  );

  const doc = {
    _type: "doctor",
    name: d.name,
    slug: { _type: "slug", current: slug },
    legacyId: d.id,
    designation: d.designation,
    specialization: d.specialization,
    legacyImagePath: d.image,
    order: parseInt(d.order, 10) || 999,
    appointmentEnabled: d.appointmentEnabled,
    isVisible: true,
  };

  if (existing) {
    await client.patch(existing).set(doc).commit();
    updated++;
  } else {
    await client.create({ ...doc, _id: `doctor-${d.id.replace(/-/g, "")}` });
    created++;
  }
}

console.log(`Sanity doctors: ${created} created, ${updated} updated (${doctors.length} total).`);
