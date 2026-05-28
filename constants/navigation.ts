export type NavLink = { label: string; href: string; external?: boolean };

export const CENTRES_OF_EXCELLENCE: NavLink[] = [
  { label: "Caritas Cancer Institute", href: "/caritas-cancer-institute" },
  { label: "Caritas Heart Institute", href: "/caritas-heart-institute" },
  { label: "Caritas Neuro Sciences", href: "/caritas-neuro" },
  { label: "Critical Care Medicine", href: "/criticalcare" },
  { label: "Dermatology & Cosmetology", href: "/dermatology" },
  { label: "Gastro Sciences", href: "/caritas-gastro" },
  { label: "General Medicine", href: "/caritas-general-medicine" },
  { label: "Rheumatology", href: "/caritas-rheumatology" },
  { label: "Urology", href: "/caritas-urology" },
  { label: "Nephrology & Renal", href: "/caritas-nephrology" },
  { label: "Paediatrics & Paediatrics Surgery", href: "/caritas-paediatrics" },
  { label: "Physical Medicine & Rehabilitation", href: "/physical-medicine" },
  {
    label: "Emergency Medicine & Trauma Care",
    href: "/emergency-medicine",
  },
  {
    label: "Obstetrics, Gynaecology & Fetal Medicine",
    href: "/gynaecology",
  },
  {
    label: "Orthopaedics, Joint Replacement & Arthroscopy",
    href: "/caritas-orthopaedics",
  },
  {
    label: "General, Minimal Access and Bariatric Surgery",
    href: "/general-surgery",
  },
];

export const SPECIALITIES: NavLink[] = [
  { label: "Anaesthesiology", href: "/anaesthesiology" },
  { label: "Community Medicine", href: "/community-medicine" },
  { label: "Ophthalmology", href: "/ophthalmology" },
  { label: "Neonatology", href: "/neonatology" },
  {
    label: "Infectious Disease",
    href: "/caritas-general-medicine#infectious-disease",
  },
  { label: "Endocrinology", href: "/endocrinology" },
  { label: "Dental, Oral & Maxillofacial Surgery", href: "/dental" },
  { label: "Department of ENT & Audiology", href: "/caritas-ent-audiology" },
  {
    label: "Interventional Radiology, Radio Diagnosis and Imaging",
    href: "/interventional-radiology",
  },
  {
    label: "Pathology, Microbiology & Laboratory Medicine",
    href: "/pathology",
  },
  {
    label: "Psychiatry, Counseling and Psychotherapy Services",
    href: "/psychiatry",
  },
  { label: "Pulmonology & Interventional Pulmonology", href: "/pulmonology" },
  { label: "Plastic and Microvascular Surgery", href: "/plastic-microvascular" },
];

export const ABOUT_LINKS: NavLink[] = [
  { label: "About Caritas", href: "/about-caritas" },
  { label: "Director's Message", href: "/director-message" },
  { label: "Governing Body", href: "/governing-body" },
  { label: "Milestones", href: "/milestones" },
  { label: "Awards & Achievements", href: "/achievements" },
  { label: "Careers at Caritas", href: "/career" },
  { label: "Caritas Virtual Tour", href: "/virtual-tour", external: true },
  { label: "Caritas Social Responsibility", href: "/caritas-social-responsibility" },
  { label: "Ethics Committee", href: "/ethics-committee" },
  { label: "Quality Indicator", href: "/quality-control" },
  { label: "Biomedical Waste Management (BMW)", href: "/biomedical" },
  { label: "Directions to Reach", href: "/directions" },
  { label: "Visitors Guide", href: "/visitors-guide" },
  { label: "Contact Us", href: "/contact-us" },
];

export const RESOURCE_LINKS: NavLink[] = [
  { label: "Articles to Read", href: "/articles" },
  { label: "News & Events", href: "/news-and-events" },
  { label: "Patient Testimonials", href: "/testimonials" },
  { label: "Image Gallery", href: "/gallery" },
  { label: "Video Gallery", href: "/video-gallery" },
];

export const SERVICE_LINKS: NavLink[] = [
  { label: "Radiology & Laboratory", href: "/radiology" },
  { label: "Blood Bank", href: "/blood-bank" },
  { label: "Clinical Nutrition", href: "/clinical-nutrition" },
  { label: "Organ Transplant Programme", href: "/organ" },
  { label: "Insurance Partners", href: "/insurance" },
  { label: "Physiotherapy", href: "/physiotherapy" },
  { label: "Second Opinion", href: "/secondopinion" },
  { label: "Caritas Mortuary Services", href: "/caritas-mortuary-services" },
  { label: "Pastoral Care", href: "/pastoralcare" },
  { label: "Caritas Home Care", href: "/caritas-home-care" },
  { label: "Health Checkup Packages", href: "/health-checkup-packages" },
  { label: "NRI Health Checkup Packages", href: "/nri-health-checkup-packages" },
];

export const QUICK_SERVICES: NavLink[] = [
  {
    label: "Book an Appointment",
    href: "https://booking.caritashospital.org/schedule/OnlineAppointmentBooking/OnlineAppointmentBooking.aspx",
    external: true,
  },
  { label: "Video Consultation", href: "/video-consultation" },
  { label: "Health Checkup Packages", href: "/health-checkup-packages" },
  { label: "Visitor Guides", href: "/visitors-guide" },
  { label: "Careers", href: "/career" },
];

export const FOOTER_CONTACT = {
  ambulance: "+91 (0) 9496555200",
  appointments: "+91 (0) 9496555300",
  information: "0481-2790025 to 29",
  informationDisplay: "+91 (0) 481-2790025 to 29",
  healthCheckup: "+91 (0) 9496555900",
  address: "Caritas Hospital, Thellakom P.O, Kottayam-686630",
  email: "mail@caritashospital.org",
  feedback: "patientfeedback@caritashospital.org",
} as const;

/** Footer widget columns — matches Django base.html footer-second */
export const FOOTER_ABOUT_LINKS: NavLink[] = [
  { label: "About Caritas", href: "/about-caritas" },
  { label: "Director's Message", href: "/director-message" },
  { label: "Governing Body", href: "/governing-body" },
  { label: "Milestones", href: "/milestones" },
  { label: "Awards & Achievements", href: "/achievements" },
  { label: "Careers at Caritas", href: "/career" },
  { label: "Contact Us", href: "/contact-us" },
  { label: "Caritas Social Responsibility", href: "/caritas-social-responsibility" },
  { label: "Biomedical Waste Management(BMW)", href: "/biomedical" },
  { label: "Quality Indicator", href: "/quality-control" },
];

export const FOOTER_EDUCATION_LINKS: NavLink[] = [
  { label: "Caritas DNB Programme", href: "/dnb" },
  { label: "Caritas College of Nursing", href: "/college-of-nursing" },
  { label: "Caritas College of Pharmacy", href: "/college-of-pharmacy" },
  { label: "Caritas Allied Health Science", href: "/caritas-allied-health-science" },
  { label: "Caritas Certificate Programme", href: "/caritas-fellowship-programme" },
];

export const FOOTER_HOSPITAL_LINKS: NavLink[] = [
  {
    label: "Caritas Matha Hospital",
    href: "https://caritasmathahospital.com/",
    external: true,
  },
  {
    label: "Caritas Family Hospital",
    href: "https://www.caritasfamilyhospital.com/",
    external: true,
  },
  { label: "Caritas HDP Hospital", href: "/caritas-hdp-hospital" },
  { label: "Caritas KMM Hospital", href: "/caritaskkm" },
];

export const FOOTER_SERVICE_LINKS: NavLink[] = [
  { label: "Radiology & Laboratory", href: "/radiology" },
  { label: "Blood Bank", href: "/blood-bank" },
  { label: "Clinical Nutrition", href: "/clinical-nutrition" },
  { label: "Organ Transplant Programme", href: "/organ" },
  { label: "Insurance Partners", href: "/insurance" },
  { label: "Second Opinion", href: "/secondopinion" },
  { label: "Caritas Mortuary Services", href: "/caritas-mortuary-services" },
  { label: "Pastoral Care", href: "/pastoralcare" },
  { label: "Caritas Home Care", href: "/caritas-home-care" },
  { label: "Health Checkup Packages", href: "/health-checkup-packages" },
  { label: "NRI Health Checkup Packages", href: "/nri-health-checkup-packages" },
];

export const FOOTER_USEFUL_LINKS: NavLink[] = [
  { label: "Find a Doctor", href: "/doctors" },
  { label: "International Patients", href: "/international_patients" },
  { label: "Ethics Committee", href: "/ethics-committee" },
];
