import { IProject } from "@/shared/types/project.types";

export const projects: IProject[] = [
  {
    id: 1,
    title: "Kumbio",
    description: "Application for scheduling and managing appointments.",
    challenge: "Reduce user abandonment rate in appointment application",
    solution: "UX refactoring and new management modules",
    results: "Significant reduction in user abandonment rate",
    company: "Contactemos Contact Center",
    image: "/kumbio.png",
    liveUrl: "https://app.kumbio.com/login",
    githubUrl: "https://github.com/Utalkto/kumbio-app-front-application-base",
    featured: true,
    technologies: ["React", "Next.js", "TypeScript", "Material UI"],
    period: "2023",
    role: "Frontend Developer",
    teamSize: "3 people",
  },
  {
    id: 2,
    title: "Farmaloop",
    description:
      "FarmaLoop is the first online pharmacy based on circular economy focused on chronic patients. Buy your medications online in Chile.",
    challenge:
      "Develop and maintain an online pharmacy platform with a circular economy focus",
    solution:
      "Development of administrative modules, point of sale (POS) and real-time order optimization",
    results:
      "Internal modules used by +10 employees, sales in under 5 minutes and +30% operational efficiency",
    technologies: ["React", "Next.js", "TypeScript", "Node.js", "Express", "MongoDB", "AWS"],
    image: "/farmaloop.png",
    liveUrl: "https://farmaloop.cl/",
    githubUrl: "",
    featured: true,
    company: "Farmaloop",
    period: "Aug 2023 - Mar 2025",
    role: "Full Stack Developer",
    teamSize: "Startup",
  },
  {
    id: 3,
    title: "Teslo Shop",
    description:
      "E-commerce platform built with React and Next.js, optimized for SEO and performance, with payment integration and product management.",
    challenge:
      "Build a scalable and fast online store using Next.js and SEO optimization",
    solution:
      "Store development with Next.js, payment integration and SEO optimization",
    results: "Fast-loading website, optimized SEO, payment integration",
    technologies: [
      "Next.js",
      "React",
      "TypeScript",
      "Material UI",
      "Paypal API",
    ],
    image: "/teslo-shop.png",
    liveUrl: "https://nextjs-teslo-shop-nine.vercel.app/",
    githubUrl: "https://github.com/Deadflight/nextjs-teslo-shop",
    featured: true,
    company: "Personal Project",
    period: "2023",
    role: "Full Stack Developer",
    teamSize: "1 person",
  },
  {
    id: 4,
    title: "Cryptoverse",
    description:
      "Cryptocurrency web application built with React, advanced API integrations and performance optimization.",
    challenge:
      "Display cryptocurrency data including prices, charts and news",
    solution:
      "React application development with API integration, performance optimization and PWA",
    results: "Fast and responsive web application with up-to-date data",
    technologies: ["React", "TypeScript", "CSS", "REST APIs", "PWA"],
    image: "/cryptoverse.png",
    liveUrl: "https://cryptoversedeadflight.netlify.app/",
    githubUrl: "https://github.com/Deadflight/cryptoverse-react-app",
    featured: false,
    company: "Personal Project",
    period: "2022",
    role: "Frontend Developer",
    teamSize: "1 developer",
  },
];
