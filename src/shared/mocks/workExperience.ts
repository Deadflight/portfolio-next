import { IWorkExperience } from "../types/workExperience.types";

export const workExperienceMockData: IWorkExperience[] = [
  {
    id: 1,
    position: "Desarrollador Full Stack",
    company: {
      name: "Farmaloop",
      industry: "Startup, E-commerce, Farmacia",
      location: "Remoto",
    },
    businessPeriod: {
      start: "Agosto 2023",
      end: "Marzo 2025",
      duration: "1 año, 7 meses",
      current: false,
    },
    businessImpact: [
      "Desarrollé y mantuve módulos clave de la plataforma administrativa interna utilizada por más de 10 empleados para gestionar datos y operaciones de clientes.",
      "Implementé un sistema de punto de venta (POS) para ventas directas, reduciendo el tiempo promedio de venta a menos de 5 minutos.",
      "Optimicé el módulo de pedidos en tiempo real, procesando hasta 100 pedidos/hora y aumentando la eficiencia operativa en un 30%.",
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
    position: "Desarrollador Frontend",
    company: {
      name: "Contactemos Contact Center",
      industry: "SaaS, B2B",
      location: "Remoto",
    },
    businessPeriod: {
      start: "Febrero 2023",
      end: "Agosto 2023",
      duration: "7 meses",
      current: false,
    },
    businessImpact: [
      "Solucioné errores críticos en la aplicación de programación de citas, reduciendo significativamente la tasa de abandono de usuarios.",
      "Desarrollé módulos completos para gestión de clientes, sedes y citas, mejorando la experiencia del usuario final.",
      "Propuse e implementé funcionalidades que aumentaron la usabilidad del sistema SaaS, recibiendo feedback positivo del equipo de producto.",
    ],
    technologyStack: ["React", "JavaScript", "CSS", "REST APIs", "Git"],
  },
  {
    id: 3,
    position: "Desarrollador Frontend",
    company: {
      name: "CheshTech Digital Agency",
      industry: "Agencia Digital, B2B",
      location: "Seattle, Washington (Remoto)",
    },
    businessPeriod: {
      start: "Abril 2022",
      end: "Febrero 2023",
      duration: "11 meses",
      current: false,
    },
    businessImpact: [
      "Diseñé interfaces y páginas clave usando Next.js y Gatsby.js para sitios web B2B de alto rendimiento.",
      "Refactoricé código en aplicaciones existentes, mejorando la legibilidad y reduciendo el tamaño del código base en un 15%.",
      "Mejoré los tiempos de carga hasta en un 20% mediante técnicas avanzadas de optimización de rendimiento.",
      "Desarrollé módulos e integraciones para e-commerce utilizando Shopify API y Apollo Server.",
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
    position: "Desarrollador Frontend Freelance",
    company: {
      name: "Upwork",
      industry: "Freelance",
      location: "Londres, Reino Unido (Remoto)",
    },
    businessPeriod: {
      start: "Diciembre 2021",
      end: "Mayo 2022",
      duration: "6 meses",
      current: false,
    },
    businessImpact: [
      "Construí componentes interactivos con React para mostrar datos de audio mediante APIs REST, creando interfaces intuitivas y responsivas.",
      "Diagnostiqué y solucioné errores críticos de conexión con APIs backend, mejorando la estabilidad de las aplicaciones.",
      "Adquirí experiencia valiosa trabajando con metodologías ágiles y herramientas de gestión como Jira en equipos internacionales.",
    ],
    technologyStack: ["React", "JavaScript", "REST APIs", "Jira", "Git"],
  },
];
