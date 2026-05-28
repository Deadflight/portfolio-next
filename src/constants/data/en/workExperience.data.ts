import { IWorkExperience } from "@/shared/types/workExperience.types";

export const workExperienceData: IWorkExperience[] = [
  {
    id: 1,
    position: "Full Stack Developer",
    company: {
      name: "Farmaloop",
      industry: "Startup, E-commerce, Pharmacy",
      location: "Remote",
    },
    businessPeriod: {
      start: "August 2023",
      end: "March 2025",
      duration: "1 year, 7 months",
      current: false,
    },
    businessImpact: [
      "Developed and maintained key modules of the internal administrative platform used by more than 10 employees to manage customer data and operations.",
      "Implemented a point of sale (POS) system for direct sales, reducing average sales time to under 5 minutes.",
      "Optimized the real-time order processing module, handling up to 100 orders/hour and increasing operational efficiency by 30%.",
    ],
    technologyStack: [
      "React",
      "Node.js",
      "TypeScript",
      "MongoDB",
      "AWS",
      "Express",
      "Redux",
    ],
    professionalReference: {
      name: "Cristian Olivares",
      email: "cristian.olivares@farmaloop.cl",
      phone: "+56945190245",
    },
  },
  {
    id: 2,
    position: "Frontend Developer",
    company: {
      name: "Contactemos Contact Center",
      industry: "SaaS, B2B",
      location: "Remote",
    },
    businessPeriod: {
      start: "February 2023",
      end: "August 2023",
      duration: "7 months",
      current: false,
    },
    businessImpact: [
      "Fixed critical bugs in the appointment scheduling application, significantly reducing the user abandonment rate.",
      "Developed complete modules for customer, location and appointment management, improving end-user experience.",
      "Proposed and implemented features that increased SaaS system usability, receiving positive feedback from the product team.",
    ],
    technologyStack: ["React", "JavaScript", "CSS", "REST APIs", "Git"],
  },
  {
    id: 3,
    position: "Frontend Developer",
    company: {
      name: "CheshTech Digital Agency",
      industry: "Digital Agency, B2B",
      location: "Seattle, Washington (Remote)",
    },
    businessPeriod: {
      start: "April 2022",
      end: "February 2023",
      duration: "11 months",
      current: false,
    },
    businessImpact: [
      "Designed key interfaces and pages using Next.js and Gatsby.js for high-performance B2B websites.",
      "Refactored code in existing applications, improving readability and reducing codebase size by 15%.",
      "Improved loading times by up to 20% through advanced performance optimization techniques.",
      "Developed e-commerce modules and integrations using Shopify API and Apollo Server.",
    ],
    technologyStack: [
      "Next.js",
      "Gatsby.js",
      "React",
      "TypeScript",
      "Shopify API",
      "Apollo Server",
      "GraphQL",
    ],
  },
  {
    id: 4,
    position: "Frontend Developer Freelance",
    company: {
      name: "Upwork",
      industry: "Freelance",
      location: "London, United Kingdom (Remote)",
    },
    businessPeriod: {
      start: "December 2021",
      end: "May 2022",
      duration: "6 months",
      current: false,
    },
    businessImpact: [
      "Built interactive React components to display audio data through REST APIs, creating intuitive and responsive interfaces.",
      "Diagnosed and fixed critical API connection bugs, improving application stability.",
      "Gained valuable experience working with agile methodologies and management tools like Jira in international teams.",
    ],
    technologyStack: ["React", "JavaScript", "REST APIs", "Jira", "Git"],
  },
];
