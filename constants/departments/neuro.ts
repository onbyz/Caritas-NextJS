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
    { id: "stroke-package", label: "Stroke Package" },
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
    {
      title: "Movement disorder and Parkinson's clinic",
      content: `<p>Our comprehensive Movement Disorder, Parkinson's, and Deep Brain Stimulation Clinic offers specialized care and advanced treatment options for Parkinson's disease and a wide range of movement disorders, including dystonia, chorea, ataxia, tremor, and myoclonus.</p>
<h6>Services Include</h6>
<ul><li>Deep Brain Stimulation (DBS) surgery for conditions such as Parkinson's disease, dystonia, and tremor.</li><li>Botulinum toxin therapy for neurological disorders, including migraine and movement disorders.</li><li>EMG-guided botulinum toxin injections for precise treatment of dystonia and spasticity.</li></ul>
<p>We are dedicated to delivering personalized care to improve the quality of life for our patients.</p>`,
    },
    {
      title: "DBS treatment",
      content: `<p>Caritas offers Deep Brain Stimulation (DBS) as an advanced treatment option for selected patients with Parkinson's disease, tremor, dystonia, and related movement disorders after expert evaluation.</p>
<p><a style="color: #c71782;" href="https://caritashospital.org/caritas-deep-brain-stimulation" target="_blank" rel="noopener noreferrer">Learn more about DBS treatment</a></p>`,
    },
    {
      title: "Paediatric Neurology Clinic",
      content: `<p>The Paediatric Neurology Clinic provides expert diagnosis and treatment for neurological conditions in infants, children, and adolescents, with a focus on early intervention and long-term developmental support.</p>`,
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
  extraSections: [
    {
      id: "stroke-package",
      heading: "Stroke Package",
      html: `<div class="accordion-wrapper" style="width:90%;margin:0 auto;">
<button class="accordion">Stroke Risk Screening Package<br>
<strike style="color:rgba(199, 23, 130, 1);"><span style="color:#CCCCCC;">₹ 8,765</span></strike>
<span style="color:rgba(199, 23, 130, 1);">₹ 7,250</span>
</button>
<div class="panel">
<div class="row">
<div class="col-lg-3 pt-5 px-4" style="background-color:#FAF9F9; margin-bottom: 2rem;">
<p>At Caritas Hospital, we understand the importance of preventive healthcare, and our Stroke Risk Screening Package offers a convenient and comprehensive way to monitor your well-being of your heart and health.</p>
</div>
<div class="col-lg-9">
<p>Recommended for individuals with high BP or on BP medication, diabetes/prediabetes, high cholesterol, heart disease, overweight, family history of stroke, smoking, sleep apnea (OSA), or age 55+.</p>
<ul>
<li>Carotid Arteries <span style="color:#C71782;">(Carotid Doppler)</span></li>
<li>Kidney Function <span style="color:#C71782;">(Renal Function Test (Fasting))</span></li>
<li>Prediabetes and Diabetes
<ul>
<li>HbA1c</li>
<li>Fasting Blood Sugar</li>
<li>Post Prandial Blood Sugar</li>
</ul>
</li>
<li>Lipid Profile</li>
<li>CBC Test</li>
<li>Biomarkers Risk Stratification Biomarkers (Lipoprotein A, Apolipoprotein AI, homocysteine, Apolipoprotein (B), HsCRP)</li>
<li>Cardiac Testing for Stroke Risk <span style="color:#C71782;">(ECG & 2D Echo (Echocardiography))</span></li>
<li>Nutrition <span style="color:#C71782;">(Nutritionist Counseling)</span></li>
<li>Vision <span style="color:#C71782;">(Advanced Digital Fundoscopy)</span></li>
<li>Neurology Consultation</li>
<li>Cardiology Consultation</li>
</ul>
<h6>Enquiry / Booking: <a style="color:#C71782;" href="tel:+919645254777">+91 96452 54777</a></h6>
</div>
</div>
</div>
<hr style="width: 100%;margin:0;">
</div>`,
      bgGray: false,
    },
  ],
  doctorGroups: [
    { heading: "Neuro Medicine", doctors: [] },
    { heading: "Neuro Surgery", doctors: [] },
  ],
  articles: [],
};
