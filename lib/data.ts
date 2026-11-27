export const contactPhone = { display: "+94 77 775 1783", href: "tel:+94777751783" };
export const contactEmail = { display: "contact@techlinks.lk", href: "mailto:contact@techlinks.lk" };

export const categories = [
  { slug: "electrician", blurb: "Wiring, repairs, lighting and safety checks", name: "Electricians", nameSi: "විදුලි කාර්මිකයන්", blurbSi: "රැහැන් ඇදීම, අලුත්වැඩියා, ආලෝකකරණය සහ ආරක්ෂණ පරීක්ෂාවන්", count: 100, icon: "bolt" },
  { slug: "plumber", blurb: "Leaks, pipes, taps and bathroom fittings", name: "Plumbers", nameSi: "ජල නළ කාර්මිකයන්", blurbSi: "කාන්දු, නළ, ටැප් සහ නාන කාමර උපාංග", count: 0, icon: "drop" },
  { slug: "ac-repair", blurb: "Installation, servicing and gas refills", name: "AC & Cooling", nameSi: "AC සහ සිසිලන", blurbSi: "ස්ථාපනය, සේවාව සහ ගෑස් පිරවීම", count: 0, icon: "snow" },
  { slug: "solar", blurb: "Panels, inverters and battery systems", name: "Solar Installers", nameSi: "සූර්ය බලශක්ති ස්ථාපකයන්", blurbSi: "පැනල, ඉන්වර්ටර් සහ බැටරි පද්ධති", count: 0, icon: "sun" },
  { slug: "cctv", blurb: "Cameras, alarms and access control", name: "CCTV & Security", nameSi: "CCTV සහ ආරක්ෂණ", blurbSi: "කැමරා, අනතුරු ඇඟවීම් සහ ප්‍රවේශ පාලනය", count: 0, icon: "cam" },
  { slug: "appliance", blurb: "Washers, fridges, ovens and more", name: "Appliance Repair", nameSi: "ගෘහ උපකරණ අලුත්වැඩියා", blurbSi: "රෙදි සෝදන, ශීතකරණ, උදුන් සහ තවත්", count: 0, icon: "gear" },
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
export const seedTechnicians: Technician[] = [];

export const steps = [
  { title: "Search", body: "Tell us the job and your area. Filter by trade, rating and price.", titleSi: "සොයන්න", bodySi: "කාර්යය සහ ඔබේ ප්‍රදේශය අපට කියන්න. වෘත්තිය, ශ්‍රේණිගත කිරීම සහ මිල අනුව පෙරන්න." },
  { title: "Compare", body: "Read verified reviews and check each technician's profile and past work.", titleSi: "සසඳන්න", bodySi: "සත්‍යාපිත සමාලෝචන කියවා, එක් එක් ශිල්පියාගේ පැතිකඩ සහ කළ වැඩ පරීක්ෂා කරන්න." },
  { title: "Book", body: "Contact your pick by call or WhatsApp and agree on a time that suits you.", titleSi: "වෙන්කරන්න", bodySi: "ඔබ තෝරාගත් අයට ඇමතුමකින් හෝ WhatsApp මඟින් සම්බන්ධ වී ඔබට ගැලපෙන වේලාවක් එකඟ වන්න." },
  { title: "Relax", body: "A vetted professional arrives, fixes it, and you rate the job.", titleSi: "නිදහසේ සිටින්න", bodySi: "පරීක්ෂාගත වෘත්තිකයෙක් පැමිණ එය නිවැරදි කරයි, ඔබ වැඩය ශ්‍රේණිගත කරන්න." },
];

export const stats = [
  { value: "100", label: "ECSL-registered electricians", labelSi: "සත්‍යාපිත ශිල්පීන්" },
  { value: "12k", label: "Jobs completed", labelSi: "සම්පූර්ණ කළ රැකියා" },
  { value: "4.8", label: "Average rating", labelSi: "සාමාන්‍ය ශ්‍රේණිගත කිරීම" },
];
