#!/usr/bin/env node
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const djangoTemplatesDir = path.join(__dirname, "../../caritas_hospital/caritasapp/templates/caritasapp");
const appDir = path.join(root, "app");
const pagesContentDir = path.join(root, "public/content/pages");

function listFilesRec(dir, ext = ".html") {
  const out = [];
  const stack = [dir];
  while (stack.length) {
    const d = stack.pop();
    if (!fs.existsSync(d)) continue;
    for (const ent of fs.readdirSync(d, { withFileTypes: true })) {
      const p = path.join(d, ent.name);
      if (ent.isDirectory()) stack.push(p);
      else if (p.endsWith(ext)) out.push(p);
    }
  }
  return out;
}

const djangoTemplates = listFilesRec(djangoTemplatesDir).map((p) => path.basename(p));
const nextPages = listFilesRec(appDir, "page.tsx").map((p) =>
  p.replace(`${appDir}/`, "").replace(/\/page\.tsx$/, ""),
);
const placeholderPages = listFilesRec(appDir, "page.tsx")
  .filter((p) => fs.readFileSync(p, "utf8").includes("PlaceholderPage"))
  .map((p) => p.replace(`${appDir}/`, "").replace(/\/page\.tsx$/, ""));
const staticHtml = listFilesRec(pagesContentDir).map((p) => path.basename(p));

console.log("=== Migration Audit ===");
console.log(`Django templates (caritasapp): ${djangoTemplates.length}`);
console.log(`Next.js routes (app/*/page.tsx): ${nextPages.length}`);
console.log(`Static extracted HTML pages: ${staticHtml.length}`);
console.log("");
console.log(`Placeholder routes remaining: ${placeholderPages.length}`);
if (placeholderPages.length) {
  placeholderPages.forEach((r) => console.log(`- ${r}`));
}
