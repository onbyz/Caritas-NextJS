#!/usr/bin/env node
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const templates = "/home/ashwin/caritas/caritas_hospital/caritasapp/templates/caritasapp";
const outPath = path.join(root, "constants/departments/full-content.ts");

const extracted = JSON.parse(
  fs.readFileSync(path.join(root, "constants/departments/extracted.json"), "utf8"),
);

extracted["caritas-paediatrics"].banner = "paediatrics-banner.webp";

const gastro = extracted["caritas-gastro"];
const gl = gastro.plainList;
gastro.columns = [gl.slice(0, 15), gl.slice(15)];

const gm = fs.readFileSync(path.join(templates, "caritas_generalmedicine.html"), "utf8");
extracted["caritas-general-medicine"].overviewParagraphs = [
  ...gm.matchAll(/font-weight:500[^>]*>([\s\S]*?)<\/p>/gi),
].map((m) => m[1].replace(/<[^>]+>/g, "").replace(/\s+/g, " ").trim()).filter((p) => p.length > 30);

extracted["emergency-medicine"].columns = [
  [
    "Airway Management including intubation",
    "Needle Decompression/Chest Tube Insertion",
    "Pericardiocentesis",
    "Cardioversion/Defibrillation",
    "Cardio pulmonary resuscitation",
    "Transcutaneous pacing",
    "Central line placement",
    "Intraosseous (IO) Access",
    "Point-of-Care Ultrasound (POCUS)",
    "Lumbar Puncture",
    "Wound repairs including suturing",
    "Foreign Body Removal",
    "Fracture & Dislocation Management",
    "Procedural Sedation etc.",
  ],
];
extracted["emergency-medicine"].highlights = [
  "24x7 Medical emergency",
  "24x7 Surgical emergency",
  "24x7 Paediatric Emergency",
  "Rapid Chest pain care",
  "Rapid Stroke care",
  "Polytrauma care",
];
delete extracted["emergency-medicine"].treatIntro;
delete extracted["caritas-nephrology"].treatIntro;

const gp = extracted["caritas-gastro"].overviewParagraphs.filter(
  (p) => !p.includes("&nbsp") && p.length > 10,
);
const liver = gp.pop();
extracted["caritas-gastro"].overviewParagraphs = gp;
extracted["caritas-gastro"].footerHeading = "Surgical Gastroenterology & Liver Transplant";
extracted["caritas-gastro"].footerParagraphs = [
  liver,
  "We specialize in the latest diagnostic and surgical treatments for luminal gastroenterology, hepato-pancreato-biliary diseases, and esophageal dysfunctions. Our department is well-equipped with advanced facilities in GI Pathology and GI Oncology, ensuring that our patients receive the highest standard of care and comprehensive solutions for their gastrointestinal health needs.",
];

extracted.dermatology.overviewParagraphs.push(
  "Whether you require medical treatment for dermatological conditions or seek cosmetic dermatology services, Caritas Hospital's Department of Dermatology is here to deliver excellence in care, utilizing the latest advancements in the field to promote healthy, radiant skin.",
);

const entHtml = fs.readFileSync(path.join(templates, "caritas_ENT.html"), "utf8");
const entOv = entHtml.slice(
  entHtml.indexOf('id="overview"'),
  entHtml.indexOf('id="treatments-procedures"'),
);
extracted["caritas-ent-audiology"].overviewParagraphs = [
  (entOv.match(/<p>\s*The Department[\s\S]*?<\/p>/) || [])[0]
    ?.replace(/<[^>]+>/g, "")
    .trim(),
].filter(Boolean);
const entUl = entOv.match(/<ul>\s*([\s\S]*?)<\/ul>/i);
extracted["caritas-ent-audiology"].overviewList = entUl
  ? [...entUl[1].matchAll(/<li>([\s\S]*?)<\/li>/g)].map((m) =>
      m[1].replace(/<[^>]+>/g, "").replace(/\s+/g, " ").trim(),
    )
  : [];
extracted["caritas-ent-audiology"].footerHeading = "Audiology";
extracted["caritas-ent-audiology"].footerParagraphs = [...entOv.matchAll(/<p>([\s\S]*?)<\/p>/gi)]
  .map((m) => m[1].replace(/<[^>]+>/g, "").replace(/\s+/g, " ").trim())
  .filter((p) => p.length > 40)
  .slice(-3);

const I = (f) => `/img/${f}`;

function buildProps(slug, d) {
  const nav = d.nav.filter((n) => !String(n.label).toLowerCase().includes("conditional"));
  const props = {
    slug,
    title: d.h1,
    subtitle: d.h2,
    bannerImage: I(d.banner),
    navItems: nav,
    doctorsAnchorId: "dedicated-doctors",
    overview: {
      heading: d.overviewHeading,
      ...(d.overviewImage ? { image: I(d.overviewImage) } : {}),
      paragraphs: (d.overviewParagraphs || []).filter(
        (p) => p && p.length > 15 && !p.includes("&nbsp"),
      ),
      ...(d.overviewList?.length ? { listInColumn: d.overviewList } : {}),
      ...(d.footerHeading ? { footerHeading: d.footerHeading } : {}),
      ...(d.footerParagraphs ? { footerParagraphs: d.footerParagraphs } : {}),
    },
    doctorGroups: [],
    articles: [],
  };

  if (slug === "caritas-nephrology") {
    props.treatmentsCustomHtml = `<div class="row justify-content-center" style="width:90%;margin:0 auto;"><div class="col-lg-12"><h5 class="px-0">Services offered</h5><ul><li>Hemodialysis for acute chronic renal failures</li><li>Peritoneal dialysis</li><li>CRRT (continuous Veno-venous hemodialysis)</li><li>Plasma exchange</li><li>AV FISTULA creation, fistulogram, and percutaneous interventions</li><li>Insertion of CAPD catheter and tunneled catheter for hemodialysis</li><li>Renal biopsy</li></ul><h5>Renal transplantation</h5><p>&nbsp;</p><h5>Rehabilitation and counselling</h5><p>The department successfully runs a Renal Transplantation Programme, which was the first of its kind in the region when it came into existence in 2012. We undertake both Live Donor and Deceased Renal Transplantations.</p><p>To know more about Caritas Transplantation Programme <a href="/organ">Click here</a></p></div></div>`;
    return props;
  }

  if (slug === "emergency-medicine") {
    props.treatmentsCustomHtml = `<div class="row"><ul style="margin-left:5%;">${d.columns[0].map((i) => `<li>${i}</li>`).join("")}</ul></div><div class="row"><h5>Highlights </h5><ul style="margin-left:5%;">${d.highlights.map((i) => `<li>${i}</li>`).join("")}</ul></div>`;
    return props;
  }

  if (slug === "endocrinology") {
    props.treatmentsCustomHtml = `<div class="row mt-3">Specialized diabetes treatment services:<br/><br/><ul>${d.plainList.slice(0, 8).map((i) => `<li>${i}</li>`).join("")}</ul>The Endocrinology Department of Caritas Hospital also provides treatment for:<br/><br/><ul>${d.plainList.slice(8).map((i) => `<li>${i}</li>`).join("")}</ul></div>`;
    return props;
  }

  if (slug === "ophthalmology") {
    props.facilities = {
      heading: "Facilities Offered",
      anchorId: "treatments-procedures",
      bgGray: true,
      html: `<div class="row justify-content-center" style="margin:0 auto;width:80%;"><div class="col-lg-6"><strong>Cataract & IOL Implantation Services</strong><ul><li>Operating Microscope Carl Zeiss (Germany)</li><li>Sovereign phacoemulsification system with White Star (USA)</li><li>Biometry-Sonomed (USA) F</li><li>Fully automated surgical chair</li><li>Keratometer</li></ul><strong>General Ophthalmology</strong><ul><li>Goldman Applanation Tonometer</li><li>Ophthalmic examination units</li><li>Slit Lamp Biomicroscope</li><li>Autorefractometer (Canon)</li><li>Indirect Ophthalmoscopes (Heine)</li></ul></div><div class="col-lg-6"><strong>Cataract surgery</strong><ul><li>Topical phacoemulsification (Painless cataract surgery without injection)</li><li>Toric intraocular lenses (Correcting astigmatism)</li><li>Multifocal intraocular lens (for distance or near vision)</li><li>Pediatric cataract surgery</li></ul><strong>Squint correction surgeries</strong><ul><li>Horizontal squint surgery</li><li>Vertical squint surgery</li><li>Pediatric squint surgery</li><li>Adult squint surgery</li><li>Complicated squint surgery</li></ul></div></div>`,
    };
    return props;
  }

  if (slug === "anaesthesiology") {
    props.facilities = {
      heading: "Facilities Offered",
      anchorId: "treatments-procedures",
      bgGray: true,
      columns: [
        [
          "Latest anesthesia workstations and monitors",
          "Ventilators",
          "Ultrasound-guided line insertion and nerve blocks",
        ],
        [
          "Echo machine",
          "Gadgets for difficult intubations including fiber-optic bronchoscope, video laryngoscope and intubating LMA.",
        ],
      ],
    };
    return props;
  }

  if (slug === "community-medicine") {
    props.overview.paragraphs = props.overview.paragraphs.filter(
      (p) => !p.includes("Book An Appointment"),
    );
    props.overview.footerHeading = "Services Provided";
    props.overview.listInColumn = [
      "Provision of medical support to adopted community block with designated community projects- Nalpathimala Karuthal community project",
      "Technical and medical support to health camps, health awareness programs and health exhibition",
      "Provision of health care services to the underserved population through sustainable health care delivery models- Caritas Lifeboat",
      "School health programs including health screening",
      "Collaboration with local self government and involvement in LSG health projects- eg. CAN Kottayam mammogram project",
      "Capacity Building of local people",
      "Collaborative activities with Government / Non-government agencies to support and implement health programs",
      "Community based palliative home care services",
    ];
    return props;
  }

  if (slug === "neonatology") {
    props.treatmentLists = {
      intro:
        "Our Neonatology Department offers a wide array of specialized treatments and procedures to ensure the well-being of our youngest patients",
      column1: d.plainList.slice(0, 9),
    };
    props.facilities = {
      heading: "Facilities Offered",
      intro:
        "The Neonatology Department at Caritas Hospital is equipped with state-of-the-art facilities to ensure the well-being of our newborn patients.",
      columns: [d.plainList.slice(9, 16), []],
    };
    return props;
  }

  if (slug === "gynaecology") return props;

  if (slug === "psychiatry") {
    if (d.treatIntro) props.treatmentsIntro = d.treatIntro;
    props.treatmentLists = { column1: d.plainList.slice(0, 5) };
    props.extraSections = [
      {
        id: "psychological-services",
        heading: "Caritas Psychological Services (CPS)",
        html: `<p class="text-center mb-5 mt-3">CPS started functioning from 1st September 1992. We offer Psychological assessments, counseling and psychotherapy for children, adolescents, adults, couples and families</p><div class="row justify-content-center" style="width:90%;margin:0 auto;"><h6 style="padding: 10px;">Child guidance</h6><ul style="margin-left:5%;"><li>Assessment for children with learning disabilities and remedial teaching.</li><li>Assessment and therapy for children with attention deficit hyperactivity disorders.</li><li>Psychotherapy for children with emotional problems like anxiety, phobias, uncontrollable anger, temper tantrums, acute stress reactions, depression, dissociative disorders.</li><li>Counseling and psychotherapy for children with conduct disorders, oppositional defiant disorders, adjustment problems, risk behaviors and all addictive behaviors.</li></ul><h6 style="padding: 10px;">Counseling for adults and families</h6><ul style="margin-left:5%;"><li>Adults with emotional and behavioral problems, adjustment problems, personality disorders, relationship conflicts, risk behaviors, acute stress reactions etc, are helped by using appropriate psychotherapies.</li><li>Marital conflicts and family adjustment problems are helped through family therapy sessions.</li><li>Premarital Counselling – Guidance for couples before marriage on health, family planning, and emotional well-being to build a strong and healthy relationship.</li></ul><h6 style="padding: 10px;">Adolescent service</h6><ul style="margin-left:5%;"><li>Psychological assessment</li><li>Individual therapy for school-related issues, addiction, conduct/behavioral issues, sex education, and promotion of emotional well-being</li><li>Life skill education</li><li>Parent management training</li><li>Management of risk-taking behavior in adolescents</li></ul></div>`,
      },
    ];
    return props;
  }

  if (slug === "caritas-orthopaedics") {
    props.treatmentsIntro = d.treatIntro;
    props.treatmentsCustomHtml = `<div class="row justify-content-center" style="width:90%;margin:0 auto;"><div class="col-lg-12"><ul><li>Total Knee Arthroplasty</li><li>Total Hip Arthroplasty</li><li>Total Shoulder Arthroplasty (Normal & Reverse Shoulder)</li><li>Total Elbow Arthroplasty</li><li>Arthroscopy of Knee, Shoulder and Ankle:</li></ul><div class="row"><div class="col-lg-4"><ul><li>Single bundle ACL and PCL reconstruction</li><li>Microfracture</li><li>Arthroscopic Assisted Fracture Fixation</li><li>Bankart's repair</li><li>Subacromial decompression</li><li>Mini open rotator cuff repair</li></ul></div><div class="col-lg-4"><ul><li>Arthroscopic rotator cuff repair</li><li>Ankle fusion</li><li>Management of nonunion and bone loss with Illizarov technique</li><li>Tumour surgeries limb salvage with custom made prosthesis</li><li>Correction of limb deformities</li></ul></div><div class="col-lg-4"><ul><li>Osteotomies for deformity correction, nonunion and correction of misalignment (HTO)</li><li>Paediatric Orthopaedics (Fractures and Deformities)</li><li>All type of complications fracture fixations</li><li>Polytrauma Management</li></ul></div></div></div></div><div style="margin: 3rem 0;"><h3 style="display:flex;justify-content:center;align-items:center;">Robotic Surgery</h3><h4 style="font-weight:600;margin:2rem 0;display:flex;justify-content:center;align-items:center;">First robotic centre in kerala for hip and knee replacement surgery</h4><div class="ortho-robotic-surgery"><div class="ortho-robotic-surgery-content"><h5 style="font-size:20px;font-weight:600;line-height:28px;">Caritas Smart Robotic Surgery</h5><ul><li>FDA-approved CT-based robotic system</li><li>Data insights for personalized knee and hip surgeries</li></ul><h5 style="font-size:20px;font-weight:600;line-height:28px;">Highlights</h5><ul><li>Higher Precision</li><li>Smaller Incision</li><li>Quick Recovery</li><li>Less Pain Minimal Ligament Release</li></ul></div><div class="ortho-robotic-surgery-img"><img src="/img/robotics-surgery-img.png" alt="Robotic surgery" style="max-width:100%;height:auto;" /></div></div></div>`;
    return props;
  }

  if (d.treatIntro) props.treatmentsIntro = d.treatIntro;
  const c1 = d.columns?.[0] || [];
  const c2 = d.columns?.[1] || [];
  if (c1.length || c2.length) {
    props.treatmentLists = { column1: c1, ...(c2.length ? { column2: c2 } : {}) };
    if (d.treatIntro) props.treatmentLists.intro = d.treatIntro;
    if (slug === "caritas-gastro") props.treatmentLists.listsWidth = "90%";
  } else if (
    d.plainList?.length > 2 &&
    !["gynaecology", "anaesthesiology", "community-medicine", "ophthalmology"].includes(slug)
  ) {
    const half = Math.ceil(d.plainList.length / 2);
    props.treatmentLists = {
      column1: d.plainList.slice(0, half),
      column2: d.plainList.slice(half),
    };
  }
  return props;
}

const lines = [
  'import type { DepartmentPageProps } from "@/features/departments/DepartmentPage";',
  "",
  "export const DEPARTMENT_FULL_CONTENT: Record<string, DepartmentPageProps> = {",
];
for (const slug of Object.keys(extracted)) {
  const props = buildProps(slug, extracted[slug]);
  lines.push(
    `  ${JSON.stringify(slug)}: ${JSON.stringify(props, null, 2).split("\n").join("\n  ")},`,
  );
}
lines.push("};", "");
fs.writeFileSync(outPath, lines.join("\n"));
console.log("wrote", outPath);
