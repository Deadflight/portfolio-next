import { IProject } from "@/shared/types/project.types";

export const projects: IProject[] = [
  {
    id: 1,
    title: "Kumbio",
    description: "Aplicación para agendar y gestionar citas.",
    challenge: "Reducir tasa de abandono en aplicación de citas",
    solution: "Refactorización UX y nuevos módulos de gestión",
    results: "Reducción significativa en tasa de abandono de usuarios",
    company: "Contactemos Contact Center",
    image: "/kumbio.png",
    liveUrl: "https://app.kumbio.com/login",
    githubUrl: "https://github.com/Utalkto/kumbio-app-front-application-base",
    featured: true,
    technologies: ["React", "Next.js", "TypeScript", "Material UI"],
    period: "2023",
    role: "Desarrollador Frontend",
    teamSize: "3 personas",
  },
  {
    id: 2,
    title: "Farmaloop",
    description:
      "FarmaLoop es la primera farmacia online basada en economia circular y enfocada en pacientes cronicos. Compra online tus medicamentos en Chile.",
    challenge:
      "Desarrollar y mantener una plataforma de farmacia online con enfoque en economia circular",
    solution:
      "Desarrollo de modulos administrativos, punto de venta (POS) y optimizacion de pedidos en tiempo real",
    results:
      "Modulos internos usados por +10 empleados, ventas en menos de 5 minutos y eficiencia operativa +30%",
    technologies: ["React", "Next.js", "TypeScript", "Node.js", "Express", "MongoDB", "AWS"],
    image: "/farmaloop.png",
    liveUrl: "https://farmaloop.cl/",
    githubUrl: "",
    featured: true,
    company: "Farmaloop",
    period: "Ago 2023 - Mar 2025",
    role: "Desarrollador Full Stack",
    teamSize: "Startup",
  },
  {
    id: 3,
    title: "Teslo Shop",
    description:
      "Plataforma E-commerce React con Next.js, optimizada para SEO y rendimiento, con integración de pagos y gestión de productos.",
    challenge:
      "Crear una tienda online escalable y rápida usando Next.js y optimización SEO",
    solution:
      "Desarrollo de tienda con Next.js, integración de pagos y optimización SEO",
    results: "Website con carga rápida, SEO optimizado, integración de pagos",
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
    role: "Desarrollador Full Stack",
    teamSize: "1 persona",
  },
  {
    id: 4,
    title: "Cryptoverse",
    description:
      "Aplicación web de criptomonedas con React, integraciones API avanzadas y optimización de rendimiento.",
    challenge:
      "Mostrar datos de criptomonedas, como precios, gráficos y noticias",
    solution:
      "Desarrollo de aplicación React con integración de APIs, optimización de rendimiento y PWA",
    results: "Aplicación web rápida y responsiva, con datos actualizados",
    technologies: ["React", "TypeScript", "CSS", "REST APIs", "PWA"],
    image: "/cryptoverse.png",
    liveUrl: "https://cryptoversedeadflight.netlify.app/",
    githubUrl: "https://github.com/Deadflight/cryptoverse-react-app",
    featured: false,
    company: "Personal Project",
    period: "2022",
    role: "Desarrollador Frontend",
    teamSize: "1 desarrollador",
  },
  // {
  //   id: 5,
  //   title: "Country App Angular",
  //   description:
  //     "Aplicación Angular para consultar información de países, con módulos de gestión y optimización UX.",
  //   challenge: "Desarrollar una aplicación Angular para consultar países",
  //   solution: "Aplicación Angular con integración de APIs y optimización UX",
  //   results:
  //     "Aplicación web responsiva y rápida, con datos actualizados de países",
  //   technologies: [
  //     "Angular",
  //     "TypeScript",
  //     "Tailwind CSS",
  //     "DaisyUI",
  //     "RxJS",
  //     "REST APIs",
  //   ],
  //   image: "/country-app-angular.png",
  //   liveUrl: "https://angular-country-basic.netlify.app/",
  //   githubUrl: "https://github.com/Deadflight/country-app-angular",
  //   featured: false,
  //   company: "Personal Project",
  //   period: "2025",
  //   role: "Desarrollador Frontend",
  //   teamSize: "1 persona",
  // },
];
