import { WorkExperienceList } from "./WorkExperienceList/WorkExperienceList";
import { FC, JSX } from "react";
import { IWorkExperience } from "@/shared/types/workExperience.types";
import { useTranslations } from "next-intl";
import { DownloadLink } from "../shared/DownloadLink/DownloadLink";

interface IWorkExperienceShowcaseProps {
  workExperienceData: IWorkExperience[];
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
  workExperienceData,
}): JSX.Element => {
  const t = useTranslations("experience");

  return (
    <section id="experience" className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
      <article className="max-w-6xl mx-auto">
        <header className="text-center mb-12">
          <h2 className="text-h2 font-heading font-bold text-text-main mb-4">
            {t("title")}
          </h2>
          <p className="text-lg font-body text-primary-brand max-w-2xl mx-auto font-medium">
            {t("subtitle")}
          </p>
        </header>

        <WorkExperienceList workExperiences={workExperienceData} />

        <div className="text-center mt-12">
          <div className="card max-w-2xl mx-auto">
            <h3 className="text-xl font-heading font-semibold text-text-main mb-4">
              {t("detailsTitle")}
            </h3>
            <p className="font-body text-primary-brand leading-relaxed mb-4 font-medium">
              {t("detailsDescription")}
            </p>
            <DownloadLink />
          </div>
        </div>
      </article>
    </section>
  );
};
