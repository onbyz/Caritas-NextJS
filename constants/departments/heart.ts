import type { DepartmentPageProps } from "@/features/departments/DepartmentPage";

export const heartDepartment: DepartmentPageProps = {
  slug: "caritas-heart-institute",
  title: "Caritas Heart Institute",
  subtitle: "Best Cardiology Hospital In Kerala",
  bannerImage: "/img/heart-institute-banner.png",
  navItems: [
    { id: "overview", label: "Overview" },
    { id: "treatments-procedures", label: "Treatments and Procedures" },
    { id: "dedicated-doctors", label: "Doctors" },
    { id: "articles", label: "Articles" },
  ],
  doctorsAnchorId: "dedicated-doctors",
  overview: {
    heading:
      "At Caritas Heart Institute, we're passionate about guiding you toward a lifetime of heart health through expert care and innovation.",
    image: "/img/image 1 6.png",
    paragraphs: [
      "Caritas Heart Institute traces its origin to Caritas Hospital & Institute of Health Sciences, which has been providing exemplary cardiology care for over 37 years.",
      "We specialize in cardiac emergency care and non-invasive cardiac services - especially ECHO cardiography, research, and preventive cardiac education. Eventually, the treatments and technology evolved into highly advanced, targeted, evidence-based cardiology care. This led to the foundation of the Caritas heart institute in 2011 as a one-stop care centre for comprehensive heart care.",
      "Equipped with some of the best facilities and experts in the region, our expertise in interventional cardiology and cardiac surgery has made Caritas Heart Institute the best cardiology hospital in Kerala.",
    ],
  },
  treatmentsIntro:
    "At Caritas Hospital, our Heart Institute offers advanced Cardiology and Cardiothoracic Surgery services under one roof.",
  treatments: [
    {
      title: "Non-invasive Cardiology",
      content:
        "<p>The non-invasive cardiology department of Caritas Heart Institute comprises state-of-the-art facilities such as outpatient clinics, ECG, echocardiography, Holter monitors, treadmills and advanced medical equipment including heart rhythm clinic, heart failure clinic, lifestyle clinic, etc.</p><p>The ECHO team has crossed the milestone of performing over three lakh cardiac procedures successfully over the years. The team is backed by high-end medical equipment that empowers the team to make critical medical decisions and provide high diagnostic quality treatment.</p>",
    },
    {
      title: "Interventional Cardiology",
      content:
        "<p>Our hybrid cath lab is the first of its kind in Kerala and among the few extremely advanced cath labs in the country. The lab has enabled surgeons and paediatric cardiologists to conduct more than 40,000 interventional procedures.</p><ul><li>Advanced intracoronary imaging facilities like OCT and IVUS.</li><li>Complex, high-risk interventional procedures (CHIP).</li><li>Heart valve replacement without open heart surgery (TAVI/TRIC and related interventions).</li></ul>",
    },
    {
      title: "Division of Cardiovascular and Thoracic Surgery (CVTS)",
      content:
        "<p>Our CVTS division set benchmarks by being among the first in Kerala to perform keyhole heart bypass and valve repair/replacement surgeries with excellent outcomes.</p><ul><li>Coronary Artery Bypass Grafting (CABG)</li><li>Heart Valve Repair and Replacement</li><li>Aortic aneurysm/dissection repair</li><li>Thoracic and peripheral vascular procedures</li><li>ECMO support and thoracic trauma interventions</li></ul>",
    },
    {
      title: "Heart Transplant Program",
      content:
        "<p>Caritas Heart Institute has the infrastructure and expertise to deliver end-to-end pre and post heart transplant care with a multidisciplinary heart team model.</p>",
    },
    {
      title: "Electrophysiology",
      content:
        "<p>Comprehensive heart rhythm services including electrophysiology study, 2D/3D ablations, pacemaker implantation, ICD, CRT and dedicated arrhythmia clinics.</p><ul><li>Management of bradycardia, tachycardia, AF, flutter, PVC, VT, WPW and genetic arrhythmias.</li><li>Advanced outpatient rhythm diagnostics with ECG and extended monitoring.</li></ul>",
    },
  ],
  doctorGroups: [
    { heading: "Cardiology & Interventional Cardiology", doctors: [] },
    { heading: "Cardio Thoracic & Vascular Surgery", doctors: [] },
  ],
  articles: [],
};
