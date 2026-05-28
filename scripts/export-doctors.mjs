#!/usr/bin/env node
/**
 * Export visible doctors from Django sqlite into constants/doctors.json
 * Usage: node scripts/export-doctors.mjs
 */
import { execSync } from "child_process";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
execSync("python3 scripts/export-doctors.py", { cwd: path.join(__dirname, ".."), stdio: "inherit" });
