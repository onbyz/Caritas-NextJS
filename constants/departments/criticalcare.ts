import type { DepartmentPageProps } from "@/features/departments/DepartmentPage";

export const criticalCareDepartment: DepartmentPageProps = {
  slug: "criticalcare",
  title: "Critical Care Medicine",
  subtitle: "Critical Care Hospital in Kerala",
  bannerImage: "/img/critical care.jpg",
  navItems: [
    { id: "overview", label: "Overview" },
    { id: "treatments-procedures", label: "Treatments and Procedures" },
    { id: "dedicated-doctors", label: "Doctors" },
    { id: "articles", label: "Articles" },
  ],
  doctorsAnchorId: "dedicated-doctors",
  overview: {
    heading: "Where Every Second Counts,<br/> We Care for Life",
    image: "/img/critical care 2.jpg",
    paragraphs: [
      "Critical care services meet the needs of patients facing an immediate life-threatening health condition specifically that in which vital system organs are at risk of failing.",
      "Using advanced therapeutic, monitoring and diagnostic technology, the objective of critical care is to maintain organ system functioning and improve the patient's condition such that his or her underlying injury or illness can then be treated.",
      "The critical care team at Caritas Hospital is committed to provide the highest possible standards of critical care for all patients treated in the ICUs.",
    ],
    footerHeading: "Caritas Critical Care Team consists of:",
    listInColumn: [
      "Trained Critical Care Physicians",
      "Duty Doctors",
      "Staff Nurses",
      "Physiotherapists",
      "Dieticians",
    ],
  },
  treatmentLists: {
    column1: [
      "20 bedded Medical ICU",
      "Hemodynamic Monitoring",
      "Mechanical Ventilation (Invasive & Non-invasive)",
      "Renal Replacement Therapy (Continuous & Intermittent)",
      "Bronchoscopy",
      "Tracheostomy",
    ],
    column2: [
      "Post Procedure Monitoring (ERCP, PTBD, PTCs, TACE, BAE)",
      "End of Life Care",
      "Code Blue Management",
      "Consultations for critically ill patients in other ICUs (Emergency ICU, Neuro CCU, Surgical ICU).",
      "Hemodynamics stabilization, airway management and ventilatory management for patients in other ICUs (Emergency ICU, Neuro CCU, Surgical ICU).",
    ],
    listsWidth: "90%",
  },
  doctorGroups: [{ heading: "Critical Care", doctors: [] }],
  articles: [],
};
