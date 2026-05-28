export const HOME_STATS = [
  { end: 50, label: "Departments" },
  { end: 300, label: "Expert Doctors" },
  { end: 3000, label: "Dedicated Professionals" },
  { end: 30, label: "Medical Services" },
] as const;

export const HOME_ACCREDITATIONS = [
  {
    src: "/img/nabh-red-1.svg",
    alt: "NABH Accreditation",
    labelHtml: "NABH <br /> Accreditation",
    width: 136,
    height: 120,
  },
  {
    src: "/img/nabh-green-1.svg",
    alt: "NABH Nursing Excellence",
    labelHtml: "NABH Nursing Excellence <br /> Certification",
    width: 136,
    height: 120,
  },
  {
    src: "/img/nabl-blue-1.svg",
    alt: "NABL Accreditation",
    labelHtml: "NABL <br />Accreditation",
    width: 136,
    height: 120,
  },
  {
    src: "/img/GREAT PLACE TO WORK 2.jpg",
    alt: "Great Place to Work",
    labelHtml: "Great Place to<br /> Work Certification",
    width: 90,
    height: 120,
  },
] as const;

export const AFFILIATED_HOSPITALS = [
  {
    name: "Caritas Matha Hospital",
    image: "/img/matha-home-card.webp",
    address: "MC Road, Thellakom (P.O), Kottayam, Kerala - 686630",
    phone: "0481 2792500",
    href: "https://caritasmathahospital.com/",
    external: true,
  },
  {
    name: "Caritas Family Hospital",
    image: "/img/cfh-home-card.webp",
    address: "Karipal Building, Vadavathoor P.O, Kalathipady, Kottayam, Kerala - 686018",
    phone: "0481 2570100",
    href: "https://www.caritasfamilyhospital.com/",
    external: true,
  },
  {
    name: "Caritas KMM Hospital",
    image: "/img/kmm-home-card.webp",
    address: "Thiruvathukkal Rd, Puthenangady, Kottayam, Kerala - 686001",
    phone: "0481 2580047",
    href: "/caritaskkm",
    external: false,
  },
  {
    name: "Caritas HDP Hospital",
    image: "/img/hdp-home-card.webp",
    address: "Kaipuzha, Kottayam, Kerala - 686602",
    phone: "0481 2711418",
    href: "/caritas-hdp-hospital",
    external: false,
  },
  {
    name: "Caritas College of Nursing",
    image: "/img/nursing-home-card.webp",
    address: "Thellakom P.O., Kottayam, Kerala - 686630",
    phone: "0481 2792104, 9447216777, 9496136091",
    href: "/college-of-nursing",
    external: false,
  },
  {
    name: "Caritas College of Pharmacy",
    image: "/img/pharmacy-home-card.webp",
    address: "Caritas Educity, Ettumanoor, Kottayam, Kerala - 686631",
    phone: "0481 2960638, 9495545957, 9447600750, 9447318505",
    href: "/college-of-pharmacy",
    external: false,
  },
] as const;

export const VIRTUAL_TOUR_URL = "/virtual-tour";
