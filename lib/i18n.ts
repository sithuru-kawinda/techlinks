export type Lang = "en" | "si";

export const en = {
  "nav.home": "Home",
  "nav.technicians": "Technicians",
  "nav.about": "About Us",
  "nav.contact": "Contact",
  "nav.admin": "Admin",
  "nav.find": "Find a Technician",
  "nav.menu": "Toggle menu",
  "footer.blurb":
    "TechLinks connects homes and businesses with verified electricians, plumbers, AC and solar specialists. Connect, hire, get it done.",
  "footer.company": "Company",
  "footer.join": "Join as a Technician",
  "footer.categories": "Categories",
  "footer.touch": "Get in touch",
  "footer.touchText":
    "Questions, partnerships or want to list your services? Send us an enquiry and we will get back to you.",
  "footer.contactUs": "Contact Us",
  "footer.rights": "© 2026 TechLinks. All rights reserved.",
} as const;

export type Key = keyof typeof en;

export const si: Record<Key, string> = {
  "nav.home": "මුල් පිටුව",
  "nav.technicians": "තාක්ෂණික ශිල්පීන්",
  "nav.about": "අප ගැන",
  "nav.contact": "සම්බන්ධ වන්න",
  "nav.admin": "පරිපාලක",
  "nav.find": "ශිල්පියෙකු සොයන්න",
  "nav.menu": "මෙනුව",
  "footer.blurb":
    "TechLinks මඟින් නිවාස සහ ව්‍යාපාර සත්‍යාපිත විදුලි කාර්මිකයන්, ජල නළ කාර්මිකයන්, AC සහ සූර්ය බලශක්ති විශේෂඥයන් සමඟ සම්බන්ධ කරයි. සම්බන්ධ වන්න, කුලියට ගන්න, වැඩේ ඉවර කරගන්න.",
  "footer.company": "සමාගම",
  "footer.join": "ශිල්පියෙකු ලෙස සම්බන්ධ වන්න",
  "footer.categories": "ප්‍රවර්ග",
  "footer.touch": "අප හා සම්බන්ධ වන්න",
  "footer.touchText":
    "ප්‍රශ්න, හවුල්කාරිත්ව හෝ ඔබේ සේවා ලැයිස්තුගත කිරීමට අවශ්‍යද? අපට විමසුමක් එවන්න, අපි ඔබව සම්බන්ධ කරගන්නෙමු.",
  "footer.contactUs": "අපව සම්බන්ධ කරගන්න",
  "footer.rights": "© 2026 TechLinks. සියලුම හිමිකම් ඇවිරිණි.",
};

export const dictionaries: Record<Lang, Record<Key, string>> = { en, si };

export const tradeSi: Record<string, string> = {
  Electrician: "විදුලි කාර්මික",
  "Master Electrician": "ප්‍රධාන විදුලි කාර්මික",
  "Solar Installer": "සූර්ය බලශක්ති ස්ථාපක",
  "AC Technician": "AC කාර්මික",
  "CCTV Specialist": "CCTV විශේෂඥ",
  "Licensed Plumber": "බලපත්‍රලාභී ජල නළ කාර්මික",
  "Industrial Electrician": "කාර්මික විදුලි කාර්මික",
  "Appliance Repair Expert": "ගෘහ උපකරණ අලුත්වැඩියා විශේෂඥ",
  "HVAC Technician": "HVAC කාර්මික",
  "Pipe & Drainage Specialist": "නළ සහ ජලාපවහන විශේෂඥ",
  "Solar & Battery Engineer": "සූර්ය සහ බැටරි ඉංජිනේරු",
  "Security Systems Installer": "ආරක්ෂණ පද්ධති ස්ථාපක",
  "Residential Electrician": "නිවාස විදුලි කාර්මික",
};

export const citySi: Record<string, string> = {
  Colombo: "කොළඹ",
  Kandy: "මහනුවර",
  Galle: "ගාල්ල",
  Negombo: "මීගමුව",
  Nugegoda: "නුගේගොඩ",
};

export const rateSi = (rate: string) => rate.replace("Contact for rate", "ගාස්තුව සඳහා අමතන්න").replace("Rs.", "රු.").replace("/hr", "/පැයට");

/** Server-side validation messages from app/contact/actions.ts. */
export const errorSi: Record<string, string> = {
  "Please enter your name.": "කරුණාකර ඔබේ නම ඇතුළත් කරන්න.",
  "Enter a valid email address.": "වලංගු ඊමේල් ලිපිනයක් ඇතුළත් කරන්න.",
  "Enter a valid phone number.": "වලංගු දුරකථන අංකයක් ඇතුළත් කරන්න.",
  "Choose a topic.": "මාතෘකාවක් තෝරන්න.",
  "Tell us a little more (at least 10 characters).": "කරුණාකර තව ටිකක් විස්තර කරන්න (අවම අක්ෂර 10ක්).",
  "Please keep your message under 2000 characters.": "කරුණාකර ඔබේ පණිවිඩය අක්ෂර 2000ට අඩුවෙන් තබන්න.",
};

export const topicSi: Record<string, string> = {
  "Find a technician": "ශිල්පියෙකු සොයන්න",
  "Join as a technician": "ශිල්පියෙකු ලෙස සම්බන්ධ වන්න",
  "Partnership or business": "හවුල්කාරිත්වය හෝ ව්‍යාපාරික",
  "Feedback or support": "ප්‍රතිපෝෂණ හෝ සහාය",
  "Something else": "වෙනත් දෙයක්",
};
