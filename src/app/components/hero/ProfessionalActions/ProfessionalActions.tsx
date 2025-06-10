import { Icon } from "@/shared/components/Icons/Icons";

export const ProfessionalActions = () => {
  return (
    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
      <a
        href="#proyectos"
        className="btn-primary"
        aria-label="View my projects"
        role="link"
      >
        Ver Proyectos
      </a>
      <a
        href="/cv-carlos-correa.pdf"
        download
        className="btn-secondary flex items-center"
        aria-label="Download my complete professional resume"
        role="link"
      >
        <Icon name="Download" size={16} className="mr-2" />
        Descargar CV
      </a>
    </div>
  );
};
