/** Maps Next.js department slugs to Django template doctor group headings + specialization filters */
export const DEPARTMENT_DOCTOR_GROUPS: Record<
  string,
  { heading: string; specializations: string[] }[]
> = {
  dermatology: [
    { heading: "Dermatology & Cosmetology", specializations: ["Dermatology & Cosmetology"] },
  ],
  "caritas-gastro": [
    { heading: "Gastroenterology", specializations: ["Gastroenterology"] },
    { heading: "Surgical Gastroenterology", specializations: ["Surgical Gastroenterology"] },
  ],
  "caritas-general-medicine": [
    { heading: "General Medicine", specializations: ["General Medicine"] },
    { heading: "Infectious Disease", specializations: ["Infectious Disease"] },
  ],
  "caritas-rheumatology": [
    { heading: "Rheumatology", specializations: ["Rheumatology"] },
  ],
  "caritas-urology": [{ heading: "Urology", specializations: ["Urology"] }],
  "caritas-nephrology": [{ heading: "Nephrology", specializations: ["Nephrology"] }],
  "caritas-paediatrics": [
    { heading: "Paediatrics", specializations: ["Paediatrics"] },
    { heading: "Paediatric Surgery", specializations: ["Paediatric Surgery"] },
  ],
  "physical-medicine": [
    {
      heading: "Physical Medicine & Rehabilitation",
      specializations: ["Physical Medicine & Rehabilitation"],
    },
  ],
  "emergency-medicine": [
    {
      heading: "Emergency Medicine & Trauma Care",
      specializations: ["Emergency Medicine & Trauma Care"],
    },
  ],
  gynaecology: [
    { heading: "Obstetrics & Gynaecology", specializations: ["Obstetrics & Gynaecology"] },
  ],
  "caritas-orthopaedics": [{ heading: "Orthopaedics", specializations: ["Orthopaedics"] }],
  "general-surgery": [{ heading: "General Surgery", specializations: ["General Surgery"] }],
  anaesthesiology: [{ heading: "Anaesthesiology", specializations: ["Anaesthesiology"] }],
  "community-medicine": [
    { heading: "Community Medicine", specializations: ["Community Medicine"] },
  ],
  ophthalmology: [{ heading: "Ophthalmology", specializations: ["Ophthalmology"] }],
  neonatology: [{ heading: "Neonatology", specializations: ["Neonatology"] }],
  endocrinology: [{ heading: "Endocrinology", specializations: ["Endocrinology"] }],
  dental: [
    {
      heading: "Dental, Oral & Maxillofacial Surgery",
      specializations: ["Dental, Oral & Maxillo Facial Surgery"],
    },
    { heading: "Pedodontics", specializations: ["Pedodontics"] },
    { heading: "Endodontics", specializations: ["Endodontics"] },
    { heading: "Periodontics", specializations: ["Periodontics"] },
    { heading: "Orthodontics", specializations: ["Orthodontics"] },
    { heading: "Prosthodontics", specializations: ["Prosthodontics"] },
  ],
  "caritas-ent-audiology": [
    { heading: "ENT & Audiology", specializations: ["ENT & Audiology"] },
  ],
  "interventional-radiology": [
    { heading: "Radiology", specializations: ["Radiology"] },
    { heading: "Interventional Radiology", specializations: ["Interventional Radiology"] },
  ],
  pathology: [
    { heading: "Microbiology", specializations: ["Microbiology"] },
    { heading: "Biochemistry", specializations: ["Biochemistry"] },
    { heading: "Transfusion Medicine", specializations: ["Transfusion Medicine"] },
  ],
  psychiatry: [
    { heading: "Psychiatry & Psychology", specializations: ["Psychiatry & Psychology"] },
    { heading: "Psychologists", specializations: ["Psychologists"] },
  ],
  pulmonology: [
    {
      heading: "Pulmonology & Interventional Pulmonology",
      specializations: ["Pulmonology & Interventional Pulmonology"],
    },
  ],
  "plastic-microvascular": [
    {
      heading: "Plastic Surgery & Micro Vascular Surgery",
      specializations: ["Plastic Surgery & Micro Vascular Surgery"],
    },
  ],
  "caritas-neuro": [
    { heading: "Neuro Medicine", specializations: ["Neuro Medicine"] },
    { heading: "Neuro Surgery", specializations: ["Neuro Surgery"] },
  ],
  "caritas-cancer-institute": [
    { heading: "Radiation Oncology", specializations: ["Radiation Oncology"] },
    { heading: "Medical Oncology", specializations: ["Medical Oncology"] },
    { heading: "Surgical Oncology", specializations: ["Surgical Oncology"] },
    { heading: "Clinical Haematology", specializations: ["Clinical Haematology"] },
    { heading: "Gynaecologic Oncology", specializations: ["Gynaecologic Oncology"] },
    { heading: "Paediatric Oncology", specializations: ["Paediatric Oncology"] },
    { heading: "Palliative Oncology", specializations: ["Palliative Oncology"] },
  ],
};
