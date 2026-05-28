import type { DepartmentPageProps } from "@/features/departments/DepartmentPage";

export const neuroDepartment: DepartmentPageProps = {
  slug: "caritas-neuro",
  title: "Caritas Neuro Sciences",
  subtitle: "Best Neurology Hospital in Kerala",
  bannerImage: "/img/Neuro Sciences.png",
  navItems: [
    { id: "overview", label: "Overview" },
    { id: "treatments-procedures", label: "Treatments and Procedures" },
    { id: "doctors", label: "Doctors" },
    { id: "facilities", label: "Facilities" },
    { id: "articles", label: "Articles" },
  ],
  overview: {
    heading:
      "At Caritas Neuro Sciences, we're passionate about guiding you toward <br/>a lifetime of neuro health through expert care and innovation.",
    image: "/img/Neuro Sciences 505_357.png",
    paragraphs: [
      "Epilepsy, strokes and other muscle-related ailments are some of the most significant contributors to India's cumulative neurological disability-adjusted life years (DALYs)—such a high metric warrants immediate and accurate treatment at par with international standards. A few decades back, even basic neurological examinations were hard to find in Kerala. This prompted the philanthropists in Kerala to initiate the neurology department at Caritas hospital.",
      "Within a very short period, the quality of treatment provided by the team of neuro physicians, neurosurgeons, nurses and support staff supported by the best-in-class medical equipment earned Caritas the fame of the best neurological hospital in Kerala.",
      "Caritas Hospital's Department of Neuro Sciences offers advanced neurology, neurosurgery, spine surgery, neuro-oncology and neuro-rehabilitation services.",
    ],
    footerParagraphs: [
      "This neurology hospital is a one-stop center for all neurological issues. It has inpatient and outpatient wings, a daycare unit, dedicated neuro ICUs, neurosurgery suites, interventional neuroradiology and the most advanced imaging facilities, including nuclear medicine.",
      "The 24-hour emergency division caters to all types of neurological and neurosurgery emergencies, including complex neurotrauma and hyperacute management of stroke. It is another factor why this department makes Caritas the best neurology hospital in Kerala.",
    ],
  },
  treatmentsIntro:
    "Caritas hospital provides a broad range of neurology treatments and procedures under the supervision of experienced neuro physicians. We use various diagnostic tests to help pinpoint the cause of symptoms and guide the selection of an appropriate treatment plan.",
  treatments: [
    {
      title: "NeuroSurgery",
      content: `<p>The Department of Neurosurgery in Caritas Hospital offers a wide range of surgical procedures to treat various neurological disorders and accidents, including congenital disorders of the brain and spine, traumatic brain injury, spinal cord injuries and degenerative disc disorders.</p>
<p>This department has highly experienced neurosurgical experts and spine surgeons to perform a range of simple to complex procedures, which are:</p>
<ul><li>Micro-neuro surgery for tumours & vascular disorders</li><li>Awake craniotomy</li><li>Minimal invasive surgery for spinal disorders – IVDP, microdiscectomy</li><li>Emergency decompressive craniectomy and other emergency brain surgeries</li><li>VP shunt procedures for hydrocephalus</li></ul>`,
    },
    {
      title: "Neurology",
      content: `<p>The neurology department comprises a team of highly skilled physicians who have successfully diagnosed and treated neurological diseases, neuro infection and immunology, neuromuscular disorders and dementia.</p>
<p>Our team is always up on their heels to provide immediate care for neurological incidents like acute ischemic stroke. We have the necessary facilities and experts to conduct mechanical thrombectomy therapy for acute strokes.</p>
<p>Regarded as one of the best neurology hospitals in Kerala, the neurology department is equipped with the following facilities:</p>
<ul><li>Electroencephalogram (EEG)</li><li>Nerve Conduction Studies (NCS)</li><li>Electromyography (EMG)</li><li>Evoked Potential (VEP, SSEP, BERA)</li><li>Video EEG Monitoring</li><li>Cerebral Angiogram</li><li>Carotid Doppler</li><li>Plasmapheresis</li></ul>`,
    },
    {
      title: "Stroke Helpline",
      content: `<p>The 24*7 active stroke helpline is arguably the only facility in Kerala that provides in-hospital brain imaging (CT/MRI) services, diagnoses and treats stroke patients within 30 minutes of their arrival in the hospital.</p>
<p>The stroke helpline is equipped with the following facilities:</p>
<ul><li>CT Scanner</li><li>1.5 Tesla MRI</li><li>Hybrid Cath Lab</li><li>Dedicated Neuro ICUs</li><li>Integrated Neurosurgery Units</li></ul>`,
    },
  ],
  facilities: {
    intro:
      "The neurology department facilitates a range of diagnostics and therapeutic services such as neuropathies, neuropsychology services and others.",
    columns: [
      [
        "Outpatient Neurology Clinic (6 days a week)",
        "Stroke Unit with Facility for Thrombolysis",
        "24 hr Emergency Services",
        "Intra-arterial & Endovascular Intervention for Stroke",
      ],
      [
        "EEG Monitoring for Epilepsy",
        "Comprehensive Neuro Rehabilitation",
        "Speech and Language Therapy",
        "Comprehensive Care for Parkinson's and Movement Disorders",
      ],
    ],
  },
  doctorGroups: [
    { heading: "Neuro Medicine", doctors: [] },
    { heading: "Neuro Surgery", doctors: [] },
  ],
  articles: [],
};
