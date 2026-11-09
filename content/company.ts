import {
  Banknote,
  GraduationCap,
  HeartPulse,
  Landmark,
  RadioTower,
  Zap,
  type LucideIcon,
} from "lucide-react";

export type Industry = { name: string; detail?: string; icon: LucideIcon };

// TODO: confirm — the brief lists these 6; the current site lists 16 (see source.md).
export const industries: Industry[] = [
  { name: "Government", detail: "Local and central government", icon: Landmark },
  {
    name: "Financial services",
    detail: "Insurance, banking and clearing house",
    icon: Banknote,
  },
  { name: "Telecommunications", icon: RadioTower },
  { name: "Energy & utilities", icon: Zap },
  { name: "Healthcare", icon: HeartPulse },
  { name: "Education", icon: GraduationCap },
];

/** "Project Journey with DayzSolutions" — copy from the current site. */
export const processSteps = [
  {
    title: "Initial Consultation",
    body: "We set up an initial meeting to understand your vision, requirements and challenges, and identify the key objectives so the project aligns with your business strategy.",
  },
  {
    title: "Proposal & Agreement",
    body: "We draft a tailored proposal outlining scope, timelines and budget. Once you agree, we formalise the partnership with a detailed agreement to kick off the project.",
  },
  {
    title: "Design & Prototyping",
    body: "Our design team creates mockups and prototypes so you can see the product early, give feedback and request changes before we build.",
  },
  {
    title: "Development",
    body: "Our developers build with agile methodologies, allowing flexibility and regular updates, with testing throughout to ensure quality.",
  },
  {
    title: "Testing",
    body: "Multiple layers of checks make sure your software is bug-free and optimised for performance across all platforms and devices.",
  },
  {
    title: "Deployment & Ongoing Support",
    body: "After your final approval we launch, then keep supporting and maintaining the software so it keeps running smoothly and evolves with your business.",
  },
] as const;

export type Stat = { value: number; suffix: string; label: string };

// TODO: confirm — the current site shows conflicting numbers; the section stays hidden until this has real values.
export const stats: Stat[] = [];

export type Testimonial = { quote: string; name: string; role: string; company: string };

// TODO: confirm — add real client quotes only; the section stays hidden while empty.
export const testimonials: Testimonial[] = [];

/** "Why work with us" — copy from the current site. */
export const about = {
  // TODO: confirm — the story below is assembled from facts on the current site; add founders/team history.
  story: [
    "DayZ Solutions is a software studio in Nittambuwa, Sri Lanka, founded in 2019. We code, we design, we create and we promote — day to day solutions from A to Z.",
    "With our software proficiency at your disposal, you can attain excellence, delight your end-users and generate new revenue. Our streamlined process takes you from testing ideas to delivering scalable digital products, without the expense of a locally-sourced team.",
  ],
  values: [
    {
      title: "Scalable architecture",
      body: "Our software is designed to scale, so as your business grows your software grows with it — without performance hitches.",
    },
    {
      title: "Cross-platform",
      body: "Applications that run smoothly on iOS, Android and the web, with a consistent experience on every device.",
    },
    {
      title: "Agile delivery",
      body: "Agile methods keep us flexible during development, with iterative testing, feedback and enhancements.",
    },
    {
      title: "Data security",
      body: "Solutions that follow current industry standards and regulations so your information stays protected.",
    },
    {
      title: "Collaborative approach",
      body: "We work closely with you and fold your feedback in throughout, so deliverables meet your expectations.",
    },
    {
      title: "Comprehensive support",
      body: "Our commitment continues after launch, with ongoing support and maintenance as your software scales.",
    },
  ],
} as const;
