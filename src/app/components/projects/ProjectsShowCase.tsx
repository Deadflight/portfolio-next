import { ProjectsList } from "./ProjectsList/ProjectsList";

const projects = [
  {
    id: 1,
    title: "Sistema POS para Farmaloop",
    description:
      "Sistema de punto de venta completo que redujo el tiempo promedio de venta a menos de 5 minutos, optimizando las operaciones de farmacia.",
    challenge: "Crear un sistema eficiente para ventas directas en farmacia",
    solution: "Interfaz intuitiva con React y backend robusto con Node.js",
    results: "Tiempo de venta reducido a <5 min, 100 pedidos/hora procesados",
    technologies: ["React", "Node.js", "TypeScript", "MongoDB", "Express"],
    image: "/dummy_image.png",
    liveUrl: null, // Proyecto privado
    githubUrl: null, // Proyecto privado
    featured: true,
    company: "Farmaloop",
    period: "2023-2024",
    role: "Desarrollador Full Stack",
    teamSize: "3 desarrolladores",
  },
  {
    id: 2,
    title: "Plataforma Administrativa Interna",
    description:
      "Plataforma web para gestión de datos y operaciones de clientes, utilizada por más de 10 empleados diariamente en Farmaloop.",
    challenge: "Centralizar la gestión de datos de clientes y operaciones",
    solution: "Dashboard administrativo con módulos especializados",
    results: "Eficiencia operativa aumentada en 30%, +10 usuarios activos",
    technologies: ["React", "Redux", "Node.js", "MongoDB", "AWS"],
    image: "/dummy_image.png",
    liveUrl: null,
    githubUrl: null,
    featured: true,
    company: "Farmaloop",
    period: "2023-2024",
    role: "Desarrollador Full Stack",
    teamSize: "5 personas",
  },
  {
    id: 3,
    title: "Optimización de E-commerce B2B",
    description:
      "Desarrollo de módulos e integraciones para e-commerce utilizando Shopify API, mejorando tiempos de carga en 20%.",
    challenge: "Mejorar rendimiento y funcionalidad de tienda online",
    solution: "Optimización con Next.js y integraciones API avanzadas",
    results: "20% mejora en tiempos de carga, 15% reducción código base",
    technologies: ["Next.js", "Shopify API", "Apollo Server", "GraphQL"],
    image: "/dummy_image.png",
    liveUrl: "https://ejemplo.com",
    githubUrl: null, // Proyecto de cliente
    featured: true,
    company: "CheshTech Digital Agency",
    period: "2022-2023",
    role: "Desarrollador Frontend",
    teamSize: "4 desarrolladores",
  },
  {
    id: 4,
    title: "Sistema de Gestión de Citas SaaS",
    description:
      "Solución de errores críticos y desarrollo de módulos para gestión de clientes, sedes y citas en aplicación SaaS.",
    challenge: "Reducir tasa de abandono en aplicación de citas",
    solution: "Refactorización UX y nuevos módulos de gestión",
    results: "Reducción significativa en tasa de abandono de usuarios",
    technologies: ["React", "JavaScript", "CSS", "REST APIs"],
    image: "/dummy_image.png",
    liveUrl: null,
    githubUrl: null,
    featured: false,
    company: "Contactemos Contact Center",
    period: "2023",
    role: "Desarrollador Frontend",
    teamSize: "6 personas",
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
