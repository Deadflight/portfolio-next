import { Icon } from "@/shared/components/Icons/Icons";
import { WorkExperienceList } from "./WorkExperienceList/WorkExperienceList";
import { FC, JSX } from "react";
import { IWorkExperience } from "@/shared/types/workExperience.types";

interface IWorkExperienceShowcaseProps {
  workExpirienceData: IWorkExperience[];
}
/**
 * Displays a showcase section for work experience, including a list of professional experiences
 * and a call-to-action to download the full CV. The section features a header, a list of work
 * experiences, and a card with additional details and a download link.
 *
 * @component
 * @example
 * <WorkExperienceShowcase />
 *
 * @returns {JSX.Element} The rendered work experience showcase section.
 */
export const WorkExperienceShowcase: FC<IWorkExperienceShowcaseProps> = ({
  workExpirienceData,
}): JSX.Element => {
  return (
    <section id="experiencia" className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-6xl mx-auto">
        <header className="text-center mb-12">
          <h2 className="text-h2 font-heading font-bold text-text-main mb-4">
            Experiencia Laboral
          </h2>
          <p className="text-lg font-body text-primary-brand max-w-2xl mx-auto font-medium">
            Mi trayectoria profesional en el desarrollo de software
          </p>
        </header>

        <WorkExperienceList workExperiences={workExpirienceData} />

        <div className="text-center mt-12">
          <div className="card max-w-2xl mx-auto">
            <h3 className="text-xl font-heading font-semibold text-text-main mb-4">
              ¿Buscas más detalles?
            </h3>
            <p className="font-body text-primary-brand leading-relaxed mb-4 font-medium">
              Mi CV completo incluye información adicional sobre
              certificaciones, formación académica y proyectos personales.
            </p>
            <a
              href="/cv-carlos-correa.pdf"
              download
              className="btn-secondary inline-flex items-center"
            >
              <Icon name="Download" size={16} className="mr-2" />
              Descargar CV Completo
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
