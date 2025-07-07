import {
  ISkillExperience,
  ISkillProficiencyLevels,
  SkillIconName,
  SkillProficiencyLevel,
} from "@/shared/types/skills.types";
import { SkillsLegend } from "./SkillsLegend";
import { SkillsLanguage } from "./SkillsLanguage";
import { SkillsLearning } from "./SkillsLearning";
import { SkillsCategoryList } from "./SkillsCategoryList";

// Define proficiency levels with clear descriptions (using design system classes)
const proficiencyLevels: ISkillProficiencyLevels = {
  expert: {
    label: "Experto",
    description: "Dominio completo, capaz de liderar proyectos y mentoría",
    color: "text-text-main",
    bgColor: "bg-success",
    stars: 5,
  },
  advanced: {
    label: "Avanzado",
    description: "Uso profesional diario, solución independiente de problemas",
    color: "text-text-main",
    bgColor: "bg-text-main",
    stars: 4,
  },
  intermediate: {
    label: "Intermedio",
    description: "Experiencia práctica, desarrollo con supervisión ocasional",
    color: "text-text-main",
    bgColor: "bg-primary-brand",
    stars: 3,
  },
  beginner: {
    label: "Principiante",
    description: "Conocimientos básicos, en proceso de aprendizaje",
    color: "text-text-main",
    bgColor: "bg-accent",
    stars: 2,
  },
};

const skillCategories: ISkillExperience[] = [
  {
    id: "languages",
    title: "Languages",
    iconName: SkillIconName.Code,
    skills: [
      {
        name: "JavaScript",
        level: SkillProficiencyLevel.Expert,
        experience: "3+ años",
        context:
          "Desarrollo diario en proyectos empresariales, ES6+, programación funcional",
      },
      {
        name: "TypeScript",
        level: SkillProficiencyLevel.Expert,
        experience: "2+ años",
        context:
          "Tipado avanzado, interfaces complejas, integración en proyectos grandes",
      },
      {
        name: "C++",
        level: SkillProficiencyLevel.Beginner,
        experience: "6 meses",
        context:
          "Conocimientos básicos, estructuras de datos, programación orientada a objetos",
      },
    ],
  },
  {
    id: "frontend-development",
    title: "Frontend Development",
    iconName: SkillIconName.Globe,
    skills: [
      {
        name: "React",
        level: SkillProficiencyLevel.Expert,
        experience: "3+ años",
        context:
          "Desarrollo diario en proyectos empresariales, componentes complejos, hooks avanzados",
      },
      {
        name: "Next.js",
        level: SkillProficiencyLevel.Advanced,
        experience: "2+ años",
        context:
          "SSR, SSG, API routes, optimización de rendimiento en producción",
      },
      {
        name: "Tailwind CSS",
        level: SkillProficiencyLevel.Expert,
        experience: "2+ años",
        context:
          "Sistemas de diseño, componentes reutilizables, responsive design",
      },
      {
        name: "Redux",
        level: SkillProficiencyLevel.Advanced,
        experience: "2+ años",
        context:
          "Gestión de estado complejo, Redux Toolkit, middleware personalizado",
      },
      {
        name: "React Query",
        level: SkillProficiencyLevel.Intermediate,
        experience: "1+ año",
        context:
          "Cache de datos, sincronización servidor-cliente, optimistic updates",
      },
      {
        name: "Angular",
        level: SkillProficiencyLevel.Intermediate,
        experience: "6 meses",
        context: "Componentes, servicios, routing, formularios reactivos",
      },
    ],
  },
  {
    id: "backend-development",
    title: "Backend Development",
    iconName: SkillIconName.Server,
    skills: [
      {
        name: "Node.js",
        level: SkillProficiencyLevel.Expert,
        experience: "3+ años",
        context:
          "APIs REST, microservicios, procesamiento de datos en tiempo real",
      },
      {
        name: "Express.js",
        level: SkillProficiencyLevel.Advanced,
        experience: "3+ años",
        context:
          "Middleware personalizado, autenticación, manejo de errores avanzado",
      },
      {
        name: "NestJS",
        level: SkillProficiencyLevel.Intermediate,
        experience: "1+ año",
        context: "Arquitectura modular, decoradores, inyección de dependencias",
      },
      {
        name: "REST APIs",
        level: SkillProficiencyLevel.Expert,
        experience: "3+ años",
        context: "Diseño de APIs escalables, documentación, versionado",
      },
      {
        name: "GraphQL",
        level: SkillProficiencyLevel.Intermediate,
        experience: "1+ año",
        context: "Resolvers, schemas, optimización de queries",
      },
      {
        name: "Apollo Server",
        level: SkillProficiencyLevel.Intermediate,
        experience: "1+ año",
        context: "Integración con bases de datos, cache, subscriptions",
      },
    ],
  },
  {
    id: "databases",
    title: "Bases de Datos",
    iconName: SkillIconName.Database,
    skills: [
      {
        name: "MongoDB",
        level: SkillProficiencyLevel.Advanced,
        experience: "2+ años",
        context:
          "Modelado de datos, agregaciones complejas, índices, replicación",
      },
      {
        name: "PostgreSQL",
        level: SkillProficiencyLevel.Intermediate,
        experience: "1+ año",
        context: "Queries complejas, relaciones, procedimientos almacenados",
      },
      {
        name: "DynamoDB",
        level: SkillProficiencyLevel.Intermediate,
        experience: "1+ año",
        context: "Diseño NoSQL, partitioning, integración con AWS",
      },
    ],
  },
  {
    id: "cloud-devops",
    title: "Cloud & DevOps",
    iconName: SkillIconName.Cloud,
    skills: [
      {
        name: "AWS",
        level: SkillProficiencyLevel.Intermediate,
        experience: "1+ año",
        context: "EC2, S3, Lambda, API Gateway, CloudWatch, despliegues",
      },
      {
        name: "Docker",
        level: SkillProficiencyLevel.Intermediate,
        experience: "1+ año",
        context: "Containerización, docker-compose, optimización de imágenes",
      },
      {
        name: "CI/CD",
        level: SkillProficiencyLevel.Intermediate,
        experience: "1+ año",
        context:
          "GitHub Actions, pipelines automatizados, testing automatizado",
      },
      {
        name: "Git",
        level: SkillProficiencyLevel.Expert,
        experience: "3+ años",
        context:
          "Flujos de trabajo complejos, resolución de conflictos, Git Flow",
      },
    ],
  },
  {
    id: "project-management",
    title: "Gestión de Proyectos",
    iconName: SkillIconName.Settings,
    skills: [
      {
        name: "Agile/Scrum",
        level: SkillProficiencyLevel.Advanced,
        experience: "2+ años",
        context:
          "Sprints, retrospectivas, estimaciones, trabajo en equipo distribuido",
      },
      {
        name: "Kanban",
        level: SkillProficiencyLevel.Advanced,
        experience: "2+ años",
        context:
          "Flujo continuo, métricas de rendimiento, optimización de procesos",
      },
      {
        name: "Jira",
        level: SkillProficiencyLevel.Advanced,
        experience: "2+ años",
        context: "Configuración de proyectos, reportes, automatizaciones",
      },
    ],
  },
];

/**
 * SkillsExperienceShowCase displays categorized technical skills, proficiency levels,
 * language abilities, and ongoing learning topics in a visually organized showcase.
 *
 * Usage: Place this component within a page to present a detailed overview of technical
 * competencies and experience.
 */
export const SkillsExperienceShowCase = () => {
  return (
    <section
      id="habilidades"
      className="py-16 px-4 sm:px-6 lg:px-8 bg-background-main"
      aria-labelledby="skills-title"
    >
      <div className="max-w-6xl mx-auto">
        <header className="text-center mb-12">
          <h1
            id="skills-title"
            className="text-h2 font-heading font-bold text-text-main mb-4"
          >
            Habilidades Técnicas
          </h1>
          <p className="text-lg font-body text-primary-brand max-w-2xl mx-auto font-medium">
            Mi experiencia práctica en tecnologías y herramientas para crear
            soluciones completas
          </p>
        </header>

        {/* Proficiency Legend */}
        <SkillsLegend proficiencyLevels={proficiencyLevels} />

        <section aria-labelledby="skills-categories-title">
          <h2 id="skills-categories-title" className="sr-only">
            Categorías de habilidades
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {skillCategories.map((category) => (
              <SkillsCategoryList
                category={category}
                proficiencyLevels={proficiencyLevels}
                key={category.id}
              />
            ))}
          </div>
        </section>

        {/* Languages Section */}
        <SkillsLanguage />

        {/* Learning Section */}
        <SkillsLearning />
      </div>
    </section>
  );
};
