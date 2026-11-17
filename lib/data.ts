export const contactPhone = { display: "+94 77 775 1783", href: "tel:+94777751783" };

export const categories = [
  { slug: "electrician", blurb: "Wiring, repairs, lighting and safety checks", name: "Electricians", count: 128, icon: "bolt" },
  { slug: "plumber", blurb: "Leaks, pipes, taps and bathroom fittings", name: "Plumbers", count: 94, icon: "drop" },
  { slug: "ac-repair", blurb: "Installation, servicing and gas refills", name: "AC & Cooling", count: 76, icon: "snow" },
  { slug: "solar", blurb: "Panels, inverters and battery systems", name: "Solar Installers", count: 41, icon: "sun" },
  { slug: "cctv", blurb: "Cameras, alarms and access control", name: "CCTV & Security", count: 58, icon: "cam" },
  { slug: "appliance", blurb: "Washers, fridges, ovens and more", name: "Appliance Repair", count: 83, icon: "gear" },
] as const;

export type IconName = (typeof categories)[number]["icon"];

export type Technician = {
  id: string;
  name: string;
  trade: string;
  category: (typeof categories)[number]["slug"];
  city: string;
  jobs: number;
  rate: string;
  initials: string;
  hue: string;
  featured?: boolean;
  /** hidden from the public site when false; undefined counts as active */
  active?: boolean;
  phone?: string;
  email?: string;
  bio?: string;
};

export const hues = [
  "from-brand to-brand-dark",
  "from-blue-800 to-slate-950",
  "from-teal-700 to-teal-950",
  "from-indigo-700 to-indigo-950",
];

// Starting data only. The live list is stored in data/technicians.json and managed from /admin.
export const seedTechnicians: Technician[] = [
  { id: "1", name: "Nuwan Perera", trade: "Master Electrician", category: "electrician", city: "Colombo", jobs: 312, rate: "Rs. 2,500/hr", initials: "NP", hue: hues[0], featured: true },
  { id: "2", name: "Kasun Silva", trade: "Solar Installer", category: "solar", city: "Kandy", jobs: 187, rate: "Rs. 3,000/hr", initials: "KS", hue: hues[1], featured: true },
  { id: "3", name: "Ruwan Fernando", trade: "AC Technician", category: "ac-repair", city: "Galle", jobs: 254, rate: "Rs. 2,200/hr", initials: "RF", hue: hues[2], featured: true },
  { id: "4", name: "Dilani Jayasuriya", trade: "CCTV Specialist", category: "cctv", city: "Negombo", jobs: 140, rate: "Rs. 2,800/hr", initials: "DJ", hue: hues[3], featured: true },
  { id: "5", name: "Saman Kumara", trade: "Licensed Plumber", category: "plumber", city: "Nugegoda", jobs: 201, rate: "Rs. 2,000/hr", initials: "SK", hue: hues[0] },
  { id: "6", name: "Chamara Bandara", trade: "Industrial Electrician", category: "electrician", city: "Kandy", jobs: 98, rate: "Rs. 2,300/hr", initials: "CB", hue: hues[1] },
  { id: "7", name: "Tharindu Wickrama", trade: "Appliance Repair Expert", category: "appliance", city: "Colombo", jobs: 176, rate: "Rs. 1,800/hr", initials: "TW", hue: hues[2] },
  { id: "8", name: "Nimali Rathnayake", trade: "HVAC Technician", category: "ac-repair", city: "Nugegoda", jobs: 133, rate: "Rs. 2,400/hr", initials: "NR", hue: hues[3] },
  { id: "9", name: "Pradeep Gunasekara", trade: "Pipe & Drainage Specialist", category: "plumber", city: "Galle", jobs: 87, rate: "Rs. 1,900/hr", initials: "PG", hue: hues[0] },
  { id: "10", name: "Ishara Jayawardena", trade: "Solar & Battery Engineer", category: "solar", city: "Colombo", jobs: 221, rate: "Rs. 3,200/hr", initials: "IJ", hue: hues[1] },
  { id: "11", name: "Malith Senanayake", trade: "Security Systems Installer", category: "cctv", city: "Kandy", jobs: 112, rate: "Rs. 2,600/hr", initials: "MS", hue: hues[2] },
  { id: "12", name: "Hasini Weerasinghe", trade: "Residential Electrician", category: "electrician", city: "Negombo", jobs: 149, rate: "Rs. 2,200/hr", initials: "HW", hue: hues[3] },
];

export const steps = [
  { title: "Search", body: "Tell us the job and your area. Filter by trade, rating and price." },
  { title: "Compare", body: "Read verified reviews and check each technician's profile and past work." },
  { title: "Book", body: "Contact your pick by call or WhatsApp and agree on a time that suits you." },
  { title: "Relax", body: "A vetted professional arrives, fixes it, and you rate the job." },
];

export const stats = [
  { value: "480+", label: "Verified technicians" },
  { value: "12k", label: "Jobs completed" },
  { value: "4.8", label: "Average rating" },
];
