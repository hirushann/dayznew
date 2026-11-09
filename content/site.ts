// Real details from content/source.md (current site). Anything not in the source is marked TODO.

export const site = {
  name: "DayZ Solutions",
  url: "https://dayzsolutions.com", // TODO: confirm production domain/path once /newdayz/ is replaced
  tagline: "Day to day solutions from A to Z.",
  motto: "We code, we design, we create, we promote.",
  description:
    "DayZ Solutions is a software development studio in Sri Lanka building custom software, web and mobile apps, UI/UX and QA for growing businesses.",
  founded: 2019,
  email: "info@dayzsolutions.com",
  phone: null as string | null, // TODO: confirm — no phone number on the current site
  address: {
    street: "No 66/5/1A Webadagalle",
    locality: "Nittambuwa",
    region: "Western Province",
    postalCode: "11880",
    country: "LK",
  },
  timezone: "Asia/Colombo",
  hours: [
    { days: "Monday – Friday", time: "9:00 – 20:00" },
    { days: "Saturday", time: "9:00 – 15:00" },
  ],
  socials: {
    facebook: null as string | null, // TODO: confirm URL
    linkedin: null as string | null, // TODO: confirm URL
  },
} as const;

export const nav = [
  { label: "Services", href: "/services" },
  { label: "Work", href: "/work" },
  { label: "Products", href: "/products/ezearch" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
] as const;

/** Technologies named on the current site (logo strips on the service pages). */
export const techStack = [
  "React",
  "Flutter",
  "Kotlin",
  "Swift",
  "Ionic",
  ".NET",
  "Laravel",
  "WordPress",
  "WooCommerce",
  "Google Cloud",
  "MariaDB",
  "Selenium",
  "Cypress",
  "Postman",
  "JMeter",
  "Jira",
] as const;
