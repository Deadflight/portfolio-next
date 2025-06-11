import { IProject } from "@/shared/types/project.types";
import { ProjectsList } from "./ProjectsList/ProjectsList";

const projects: IProject[] = [
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
    id: 3,
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
  {
    id: 4,
    title: "Country App Angular",
    description:
      "Aplicación Angular para consultar información de países, con módulos de gestión y optimización UX.",
    challenge: "Desarrollar una aplicación Angular para consultar países",
    solution: "Aplicación Angular con integración de APIs y optimización UX",
    results:
      "Aplicación web responsiva y rápida, con datos actualizados de países",
    technologies: [
      "Angular",
      "TypeScript",
      "Tailwind CSS",
      "DaisyUI",
      "RxJS",
      "REST APIs",
    ],
    image: "/country-app-angular.png",
    liveUrl: "https://angular-country-basic.netlify.app/",
    githubUrl: "https://github.com/Deadflight/country-app-angular",
    featured: false,
    company: "Personal Project",
    period: "2025",
    role: "Desarrollador Frontend",
    teamSize: "1 persona",
  },
];

export const ProjectsShowCase = () => {
  return (
    <section id="proyectos" className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-h2 font-heading font-bold text-text-main mb-4">
            Proyectos Destacados
          </h2>
          <p className="text-lg font-body text-primary-brand max-w-2xl mx-auto font-medium">
            Una selección de mis trabajos más recientes y significativos, con
            impacto medible en las organizaciones
          </p>
        </div>

        <ProjectsList projects={projects} />

        <div className="text-center mt-12">
          <div className="card max-w-2xl mx-auto bg-white border-2 border-text-main/10">
            <h3 className="text-xl font-heading font-semibold text-text-main mb-4">
              ¿Interesado en colaborar?
            </h3>
            <p className="font-body text-primary-brand leading-relaxed mb-4 font-medium">
              Estos proyectos representan mi experiencia en desarrollo full
              stack. Si tienes un proyecto similar o quieres discutir una
              oportunidad, me encantaría conversar contigo.
            </p>
            <a href="#contacto" className="btn-primary">
              Contactar
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
