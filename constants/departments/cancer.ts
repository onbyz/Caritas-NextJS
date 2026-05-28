import type { DepartmentPageProps } from "@/features/departments/DepartmentPage";

export const cancerDepartment: DepartmentPageProps = {
  slug: "caritas-cancer-institute",
  title: "Caritas Cancer Institute",
  subtitle: "Top Cancer Hospital in Kerala",
  bannerImage: "/img/Cancer Institute 859X386.png",
  navItems: [
    { id: "overview", label: "Overview" },
    { id: "treatments-procedures", label: "Treatments and Procedures" },
    { id: "doctors", label: "Doctors" },
    { id: "articles", label: "Articles" },
  ],
  overview: {
    heading:
      "Together, We're Redefining Cancer Care, Providing <br/>Compassionate Guidance and Healing for a Brighter Tomorrow.",
    image: "/img/Cancer Institute (3).png",
    paragraphs: [
      "Quality medical care was a distant dream for communities across central Kerala, let alone a specialized centre to deal with morbid ailments like cancer. Government hospitals' limited medical oncology treatments were no match for the growing cancer treatment needs. People had to wait for a long duration to receive proper treatment.",
      "The cancer centre was built within the Caritas Hospital Campus. It initially started functioning as a surgical oncology department in January 2000. Under Metropolitan Mar Kuriakose Kunnasserry, the cancer centre was redesigned and relaunched as Caritas Cancer Institute on 24th February 2003.",
    ],
  },
  treatmentsIntro:
    "Caritas Cancer Institute provides comprehensive oncology services, including diagnosis, treatment and follow-up care for all types of cancers and supportive care such as patient education and support for people diagnosed with life-threatening illnesses.",
  treatments: [
    {
      title: "Medical Oncology",
      content: `<p>It is one of the oldest departments of this cancer hospital in Kerala. The medical oncology department comprises a team of highly specialized doctors, nurses and support staff who provide targeted and evidence-based diagnosis and treatment regimens.</p>
<h6><b>Facilities and Services</b></h6>
<ul><li>Day Care Chemotherapy</li><li>Diagnosis/Screening of Cancer</li><li>Counselling including emotional support</li><li>Stem Cell Transplantation</li><li>End-of-Life Care</li><li>Autologous Peripheral Blood Stem Cell Transplantation</li></ul>`,
    },
    {
      title: "Radiation Oncology",
      content: `<p>The radiation oncology department dispenses radiation practices strictly compliant with AERB guidelines, housing experienced radiation oncologists, physicists, nurses, radiation therapists and nutritionists.</p>
<h6><b>Facilities and Services</b></h6>
<p><b>Teletherapy:</b> 2D Conventional, 3D Conformal, Static and Dynamic IMRT, RapidArc</p>
<p><b>Brachytherapy:</b> Interstitial, Intracavitary, Intraluminal, Mould</p>
<p><b>Concurrent Chemotherapy</b></p>`,
    },
    {
      title: "Surgical Oncology",
      content: `<p>This was the first specialized cancer department launched in Caritas Hospital 22 years ago. The surgical oncology team has successfully conducted over 16,000 minor and major surgeries to date.</p>
<h6><b>Facilities and Services</b></h6>
<ul><li>Dedicated operation theatres</li><li>Postoperative care ICUs, wards, and rooms</li><li>Diagnosis and staging workup</li><li>Surgical management for head and neck, breast, GI, hepatobiliary, genitourinary, gynaecological, lung, and musculoskeletal cancers</li></ul>`,
    },
    {
      title: "Nuclear Medicine",
      content: `<p>World-class infrastructure including PET-CT and gamma camera imaging. The department provides personalised medical care and radionuclide therapy.</p>
<h6><b>Facilities and Services</b></h6>
<ul><li>Whole-body FDG PET-CT Scan for Oncology Patients</li><li>Radioactive Iodine Therapy</li><li>Lu PSMA Therapy for Metastatic Prostate Cancer</li><li>Myocardial FDG PET Scan</li></ul>`,
    },
    {
      title: "Psycho-oncology",
      content: `<p>Psycho-oncologists, psychiatrists and counsellors provide emotional support to adults and children diagnosed with cancer.</p>
<ul><li>Family Counselling</li><li>Couple Therapy</li><li>Individual Counselling and Therapy</li><li>Bereavement Counselling</li></ul>`,
    },
    {
      title: "Pain and Palliative Care",
      content: `<p>Catering to patients who could no longer respond to curative treatments, helping manage cancer-related pains and symptoms.</p>
<ul><li>Inpatient Care</li><li>Palliative Home Care</li><li>Community-based Cancer Awareness programs</li><li>Pain Management</li><li>Integrative Oncology Care</li></ul>`,
    },
    {
      title: "Community Oncology",
      content: `<p>Propagates awareness about cancers that can be cured if detected at early stages through mass education and cancer detection camps.</p>
<ul><li>Cancer Registry</li><li>Cancer Awareness</li><li>Cancer Prevention</li><li>Early Cancer Detection</li><li>Cancer Screening</li><li>Tobacco Control</li></ul>`,
    },
  ],
  doctorGroups: [
    { heading: "Radiation Oncology", doctors: [] },
    { heading: "Medical Oncology", doctors: [] },
    { heading: "Surgical Oncology", doctors: [] },
    { heading: "Palliative Oncology", doctors: [] },
  ],
  articles: [],
};
