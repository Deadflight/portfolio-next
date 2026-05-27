import { Icon } from "@/shared/components/Icons/Icons";
import { useTranslations } from "next-intl";

/**
 * Renders a set of professional action buttons for the hero section.
 *
 * This component displays two primary actions:
 * - A button to navigate to the Projects section of the page.
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
  const t = useTranslations("hero");

  return (
    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
      <a
        href="#projects"
        className="btn-primary"
        aria-label={t("viewProjects")}
      >
        {t("viewProjects")}
      </a>
      <a
        href="/cv-carlos-correa.pdf"
        download
        className="btn-secondary flex items-center"
        aria-label={t("downloadCv")}
      >
        <Icon name="Download" size={16} className="mr-2" />
        {t("downloadCv")}
      </a>
    </div>
  );
};
