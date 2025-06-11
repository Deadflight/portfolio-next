import { Icon } from "@/shared/components/Icons/Icons";

/**
 * Renders a set of professional action buttons for the hero section.
 *
 * This component displays two primary actions:
 * - A button to navigate to the "Proyectos" (Projects) section of the page.
 * - A button to download the user's complete professional resume (CV) as a PDF.
 *
 * Both buttons are styled for accessibility and responsiveness, adapting their layout
 * for different screen sizes.
 *
 * @component
 * @example
 * <ProfessionalActions />
 */
export const ProfessionalActions = () => {
  return (
    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
      <a
        href="#proyectos"
        className="btn-primary"
        aria-label="View my projects"
      >
        Ver Proyectos
      </a>
      <a
        href="/cv-carlos-correa.pdf"
        download
        className="btn-secondary flex items-center"
        aria-label="Download my complete professional resume"
      >
        <Icon name="Download" size={16} className="mr-2" />
        Descargar CV
      </a>
    </div>
  );
};
