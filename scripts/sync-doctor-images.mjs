#!/usr/bin/env node
/**
 * Copy all doctor photos into public/media/doctors (self-contained, no symlink).
 * Source: ../caritas_hospital/caritasapp/media/doctors (while Django repo still exists)
 */
import { cpSync, existsSync, mkdirSync } from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const sources = [
  path.join(__dirname, "../../caritas_hospital/caritasapp/media/doctors"),
  path.join(__dirname, "../../caritas_hospital/staticfiles/doctors"),
];
const dest = path.join(root, "public/media/doctors");

const source = sources.find((s) => existsSync(s));
if (!source) {
  console.error("No doctor media source found. Copy images manually to public/media/doctors/");
  process.exit(1);
}

mkdirSync(dest, { recursive: true });
cpSync(source, dest, { recursive: true, force: true });
console.log(`Synced doctor images from ${source} → ${dest}`);
