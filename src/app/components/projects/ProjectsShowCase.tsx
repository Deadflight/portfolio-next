import { projects } from "@/constants/projects";
import { ProjectsList } from "./ProjectsList/ProjectsList";
import { JSX } from "react";

/**
 * Renders a showcase section highlighting featured projects.
 *
 * Displays a title, description, a list of projects via the `ProjectsList` component,
 * and a call-to-action card inviting collaboration.
 *
 * @component
 * @example
 * ```tsx
 * <ProjectsShowCase />
 * ```
 *
 * @returns {JSX.Element} The rendered projects showcase section.
 */
export const ProjectsShowCase = (): JSX.Element => {
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
