#!/usr/bin/env node
/**
 * Extract Django static page templates → public/content/pages/*.html + constants/pages/full-content.json
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const templatesDir = path.join(__dirname, "../../caritas_hospital/caritasapp/templates/caritasapp");
const outHtmlDir = path.join(root, "public/content/pages");
const outMeta = path.join(root, "constants/pages/full-content.json");

/** Next slug → Django template filename (without .html) */
const SLUG_TO_TEMPLATE = {
  "about-caritas": "about_caritas",
  "director-message": "director-message",
  "governing-body": "governing_body",
  milestones: "milestones",
  achievements: "achievements",
  career: "career",
  "caritas-social-responsibility": "charity",
  "ethics-committee": "ethics",
  "quality-control": "quality_control",
  biomedical: "biomedical",
  directions: "directions",
  "visitors-guide": "visitors_guide",
  "contact-us": "contact_us",
  articles: "articles",
  "news-and-events": "news_events",
  testimonials: "testimonials",
  gallery: "gallery",
  "video-gallery": "video_gallery",
  organ: "organ",
  insurance: "insurance",
  secondopinion: "secondopinion",
  "caritas-mortuary-services": "mortuary_services",
  pastoralcare: "pastoralcare",
  "caritas-home-care": "homecare",
  "health-checkup-packages": "health_package",
  "nri-health-checkup-packages": "nri_health_package",
  blood: "blood",
  "blood-bank": "blood",
  clinical: "clinical",
  "clinical-nutrition": "clinical",
  physiotherapy: "physiotherapy",
  radiology: "radiology",
};

const URL_REPLACEMENTS = [
  [/{%\s*url\s+'director_message'\s*%}/g, "/director-message"],
  [/{%\s*url\s+"director_message"\s*%}/g, "/director-message"],
  [/{%\s*url\s+'about_caritas'\s*%}/g, "/about-caritas"],
  [/{%\s*url\s+'career'\s*%}/g, "/career"],
  [/{%\s*url\s+'contact_us'\s*%}/g, "/contact-us"],
  [/{%\s*url\s+'directions'\s*%}/g, "/directions"],
  [/{%\s*url\s+'organ'\s*%}/g, "/organ"],
  [/{%\s*url\s+'radiology'\s*%}/g, "/radiology"],
  [/{%\s*url\s+'blood'\s*%}/g, "/blood-bank"],
  [/{%\s*url\s+'clinical'\s*%}/g, "/clinical-nutrition"],
  [/{%\s*url\s+'insurance'\s*%}/g, "/insurance"],
  [/{%\s*url\s+'physiotherapy'\s*%}/g, "/physiotherapy"],
  [/{%\s*url\s+'secondopinion'\s*%}/g, "/secondopinion"],
  [/{%\s*url\s+'pastoralcare'\s*%}/g, "/pastoralcare"],
  [/{%\s*url\s+'homecare'\s*%}/g, "/caritas-home-care"],
  [/{%\s*url\s+'mortuary_services'\s*%}/g, "/caritas-mortuary-services"],
  [/{%\s*url\s+'health_package'\s*%}/g, "/health-checkup-packages"],
  [/{%\s*url\s+'nri_health_package'\s*%}/g, "/nri-health-checkup-packages"],
  [/{%\s*url\s+'articles'\s*%}/g, "/articles"],
  [/{%\s*url\s+'gallery'\s*%}/g, "/gallery"],
  [/{%\s*url\s+'album_detail'\s+album\.id\s*%}/g, "/gallery"],
  [/{%\s*url\s+'detail'\s+[^%]+%}/g, "/articles"],
  [/{%\s*url\s+[^%]+%}/g, "#"],
];

function extractBlock(html) {
  const start = html.indexOf("{% block content%}");
  const alt = html.indexOf("{% block content %}");
  const s = start >= 0 ? start : alt;
  if (s < 0) return html;

  let end = html.indexOf("{% endblock %}", s);
  if (end < 0) end = html.length;

  return html.slice(s, end).replace(/^\{%\s*block content\s*%?\s*%?\}/, "").trim();
}

function djangoToHtml(fragment) {
  let h = fragment;
  h = h.replace(/\{%\s*static\s+['"]img\/([^'"]+)['"]\s*%}/g, "/img/$1");
  h = h.replace(/\{\{\s*form\.csrf_token\s*\}\}/g, "");
  h = h.replace(/\{%\s*csrf_token\s*%}/g, "");
  h = h.replace(/\{%\s*include\s+['"][^'"]+['"]\s*%}/g, "<!-- enquiry form in sidebar -->");
  for (const [re, rep] of URL_REPLACEMENTS) h = h.replace(re, rep);
  // Remove django tags
  h = h.replace(/\{%[\s\S]*?%\}/g, "");
  h = h.replace(/\{\{[\s\S]*?\}\}/g, "");
  h = h.replace(/\|\s*safe/g, "");
  h = h.replace(/\|\s*divisibleby:\d+/g, "");
  h = h.replace(/<script[\s\S]*?<\/script>/gi, "");
  h = h.replace(/\sonclick="[^"]*"/gi, "");
  return h.trim();
}

/** Remove Django dynamic filter sections — replaced by React panels */
function stripDoctorsSection(html) {
  const start = html.indexOf('<span id="doctors">');
  if (start < 0) return html;
  const sectionStart = html.lastIndexOf("<section", start);
  const nextSection = html.indexOf("<section", start + 20);
  if (sectionStart >= 0 && nextSection > sectionStart) {
    return html.slice(0, sectionStart) + html.slice(nextSection);
  }
  return html;
}

function stripTransplantVideos(html) {
  const videoIdx = html.indexOf("<h3>Transplant Videos</h3>");
  if (videoIdx < 0) return html;
  const sectionStart = html.lastIndexOf("<section", videoIdx);
  if (sectionStart >= 0) return html.slice(0, sectionStart).trim();
  return html;
}

function stripSecondOpinionMain(html) {
  const idx = html.indexOf('<section id="deptsections">');
  const linksIdx = html.lastIndexOf('style="width: 90%; margin: 0 auto"');
  if (linksIdx > 0) {
    const sectionStart = html.lastIndexOf("<section", linksIdx);
    const tail = sectionStart > 0 ? html.slice(sectionStart) : "";
    if (idx >= 0) return html.slice(idx, sectionStart > idx ? sectionStart : undefined).trim();
    return tail;
  }
  if (idx >= 0) return html.slice(idx).trim();
  return html;
}

function stripDynamicSections(html, slug) {
  if (slug === "biomedical") {
    const idx = html.indexOf("Real-time Biomedical");
    if (idx > 0) {
      const sectionStart = html.lastIndexOf("<section", idx);
      if (sectionStart >= 0) return html.slice(0, sectionStart).trim();
    }
  }
  if (slug === "quality-control") {
    const idx = html.indexOf("Transparency in Quality");
    if (idx > 0) {
      const sectionStart = html.lastIndexOf("<section", idx);
      if (sectionStart >= 0) return html.slice(0, sectionStart).trim();
    }
  }
  return html;
}

function parseHero(html) {
  const h1 = html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/i);
  const h2 = html.match(/<h2[^>]*>([\s\S]*?)<\/h2>/i);
  const banner = html.match(/static\s+['"]img\/([^'"]+)['"]/);
  const clean = (s) =>
    s
      ?.replace(/<[^>]+>/g, "")
      .replace(/\s+/g, " ")
      .trim() ?? "";
  return {
    title: clean(h1?.[1]) || undefined,
    subtitle: clean(h2?.[1]) || undefined,
    bannerImage: banner ? `/img/${banner[1]}` : undefined,
  };
}

function stripDuplicateHero(html) {
  // Remove first hero section (title + optional banner row) — rendered by ContentStaticPage
  let h = html;
  const firstSectionEnd = h.indexOf("</section>");
  if (h.trimStart().startsWith("<section") && firstSectionEnd > 0) {
    const first = h.slice(0, firstSectionEnd + "</section>".length);
    if (first.includes("<h1")) {
      h = h.slice(firstSectionEnd + "</section>".length).trim();
    }
  }
  return h;
}

const meta = {};

fs.mkdirSync(outHtmlDir, { recursive: true });

for (const [slug, templateName] of Object.entries(SLUG_TO_TEMPLATE)) {
  const filePath = path.join(templatesDir, `${templateName}.html`);
  if (!fs.existsSync(filePath)) {
    console.warn("Missing template:", filePath);
    continue;
  }
  const raw = fs.readFileSync(filePath, "utf8");
  const block = extractBlock(raw);
  const hero = parseHero(block);
  let body = stripDuplicateHero(djangoToHtml(block));
  body = stripDynamicSections(body, slug);
  if (slug === "clinical-nutrition" || slug === "clinical") {
    body = stripDoctorsSection(body);
  }
  if (slug === "organ") {
    body = stripTransplantVideos(body);
  }
  if (slug === "secondopinion") {
    body = "";
  }

  const htmlPath = `/content/pages/${slug}.html`;
  fs.writeFileSync(path.join(outHtmlDir, `${slug}.html`), body, "utf8");

  const hasEnquiry = block.includes("enquiry_form") || block.includes("Enquiry");
  const hasBanner = /col-lg-8[\s\S]*static\s+['"]img\//.test(block.slice(0, 2500));

  meta[slug] = {
    slug,
    title: hero.title,
    subtitle: hero.subtitle,
    bannerImage: hero.bannerImage,
    showEnquiry: hasEnquiry,
    hasHeroBanner: hasBanner,
    contentPath: htmlPath,
  };
  console.log("OK", slug, hero.bannerImage ?? "(no banner)");
}

fs.writeFileSync(outMeta, JSON.stringify(meta, null, 2), "utf8");
console.log("Wrote", outMeta);
