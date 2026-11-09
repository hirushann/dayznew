import {
  Bot,
  Code2,
  Globe,
  LayoutTemplate,
  Network,
  PenTool,
  ShieldCheck,
  Smartphone,
  type LucideIcon,
} from "lucide-react";

export type Offering = { title: string; body?: string };

export type Service = {
  slug: string;
  title: string;
  /** One line for cards. */
  summary: string;
  /** Opening paragraph on the detail page. */
  intro: string;
  icon: LucideIcon;
  offerings: Offering[];
  tools?: string[];
};

// All copy is from the current site (content/source.md), lightly edited for length.
// TODO: confirm — IT consultancy and digital marketing are in the brief but have no copy on the current site.
export const services: Service[] = [
  {
    slug: "custom-development",
    title: "Custom Development",
    summary:
      "Software tailored to your unique business needs, built for innovation, efficiency and scalability.",
    intro:
      "We harness innovation and expert craftsmanship to deliver custom software that turns your business challenges into competitive advantages. Our developers build software that meets your unique needs and exceeds expectations, with scalability, security and efficiency built in.",
    icon: Code2,
    offerings: [
      {
        title: "Product design & development",
        body: "We turn ideas into market-ready products, combining creative design with robust development.",
      },
      {
        title: "Refactoring & reengineering",
        body: "We update and optimise legacy systems without disrupting existing functionality, boosting performance and scalability.",
      },
      {
        title: "ERP, CRM & HRM integration",
        body: "We integrate and customise business systems to streamline operations and improve data connectivity.",
      },
      {
        title: "AI development",
        body: "Smart, scalable systems that use machine learning and data analysis to drive decision-making and efficiency.",
      },
    ],
    tools: ["Google Cloud", "MariaDB", "Kotlin", "Swift", "React", ".NET"],
  },
  {
    slug: "web-development",
    title: "Web Development",
    summary:
      "Responsive, high-performance websites that deliver seamless experiences across all devices.",
    intro:
      "Our web development services give your business cutting-edge websites with outstanding user experiences. Combining modern aesthetics with functional design, we make sure your site performs seamlessly on every device — whether you're launching a new product, overhauling your current site or growing engagement.",
    icon: Globe,
    offerings: [
      {
        title: "UI/UX product design",
        body: "Engaging, intuitive and visually stunning interfaces, optimised for user satisfaction and conversion.",
      },
      {
        title: "Front-end development",
        body: "Beautiful, interactive front-ends that are fast, responsive and accessible across all devices and platforms.",
      },
      {
        title: "Full-stack development",
        body: "Complete solutions from back-end to front-end: robust, scalable and efficient applications tailored to your objectives.",
      },
      {
        title: "Laravel development",
        body: "Custom Laravel applications, e-commerce platforms, RESTful APIs and extensions — modern, secure and scalable.",
      },
    ],
    tools: ["React", "Laravel", "WordPress", "WooCommerce"],
  },
  {
    slug: "mobile-app-development",
    title: "Mobile App Development",
    summary:
      "Tailored iOS, Android and cross-platform apps that enhance engagement, functionality and growth.",
    intro:
      "Elevate your brand, captivate users and accelerate revenue. We bring deep mobile expertise and turn your vision into delightful apps that scale fast.",
    icon: Smartphone,
    offerings: [
      {
        title: "Native iOS apps",
        body: "We turn your concepts into beautiful, functional and easy-to-use iOS apps.",
      },
      {
        title: "Native Android apps",
        body: "Robust applications designed to thrive in the vast and varied Android ecosystem.",
      },
      {
        title: "Cross-platform apps",
        body: "Broad reach and cost efficiency: versatile apps that run smoothly on every platform from one codebase.",
      },
      {
        title: "Hybrid apps",
        body: "Web technologies that perform seamlessly across platforms while reducing development cost.",
      },
    ],
    tools: ["Kotlin", "Swift", "React Native", "Ionic", "Flutter"],
  },
  {
    slug: "software-testing-qa",
    title: "Software Testing & QA",
    summary:
      "Manual, automated and performance testing so your applications are robust, reliable and ready to ship.",
    intro:
      "Quality is the backbone of any successful software. Our QA engineers bring precision, expertise and a proactive approach to every project, with end-to-end QA consulting, manual testing and automation to get your product market-ready.",
    icon: ShieldCheck,
    offerings: [
      { title: "Manual testing" },
      { title: "Web app testing" },
      { title: "Test automation" },
      { title: "Performance testing" },
      { title: "Mobile testing" },
      { title: "User testing" },
      { title: "Desktop testing" },
      { title: "UI/UX testing" },
    ],
    tools: ["Postman", "Jira", "Apache JMeter", "Cypress", "TestRail", "Selenium"],
  },
  {
    slug: "ui-ux-design",
    title: "UI/UX Design",
    summary:
      "Engaging, intuitive and visually striking interfaces, optimised for user satisfaction and conversion.",
    // TODO: confirm — the current site has only one line on UI/UX; expand with real process/tools (e.g. Figma).
    intro:
      "Elevate your digital presence with UI/UX design that is engaging, intuitive and visually stunning — optimised for user satisfaction and conversion.",
    icon: PenTool,
    offerings: [
      {
        title: "Design & prototyping",
        body: "Mockups and prototypes that give you a feel for the final product early, so feedback shapes the design before we build.",
      },
      {
        title: "Seamless user experience",
        body: "User-centric designs that are easy to navigate, load quickly and work across all devices.",
      },
    ],
  },
  {
    slug: "wordpress-woocommerce",
    title: "WordPress & WooCommerce",
    summary:
      "Theme and plugin development, online stores, payment gateways and speed optimisation.",
    intro:
      "WordPress has become the most popular open-source content management system, chosen by businesses of every size for its versatility, scalability and limitless customisation. We build, customise and optimise WordPress and WooCommerce sites that grow with you.",
    icon: LayoutTemplate,
    offerings: [
      {
        title: "Theme development & customisation",
        body: "Plugin development, LMS, payment gateways, speed optimisation and much more.",
      },
      {
        title: "Woo Express development",
        body: "Custom e-commerce stores with seamless integration, optimised for conversion.",
      },
      {
        title: "Page builder sites",
        body: "Fully customised websites built with marketing in mind to bring you the most business.",
      },
      {
        title: "SEO optimised",
        body: "Search-friendly from the start to improve visibility and drive organic traffic.",
      },
    ],
    tools: ["WordPress", "WooCommerce"],
  },
  {
    slug: "ai-development",
    title: "AI Development",
    summary:
      "Smart, scalable systems that use machine learning and data analysis to drive better decisions.",
    // TODO: confirm — expand with real AI project examples.
    intro:
      "We specialise in artificial intelligence solutions, developing smart, scalable systems that harness machine learning and data analysis to drive decision-making and efficiency.",
    icon: Bot,
    offerings: [],
  },
  {
    slug: "erp-crm-hrm-integration",
    title: "ERP, CRM & HRM Integration",
    summary:
      "Integrate and customise business systems to connect your data and streamline workflows.",
    // TODO: confirm — expand with real systems integrated.
    intro:
      "We integrate and customise ERP, CRM and HRM systems to streamline operations, enhance data connectivity and improve workflow efficiency across your organisation.",
    icon: Network,
    offerings: [],
  },
];

export const getService = (slug: string) => services.find((s) => s.slug === slug);
