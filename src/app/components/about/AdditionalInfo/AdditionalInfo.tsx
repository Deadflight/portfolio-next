
import { Icon } from "@/shared/components/Icons/Icons";
import React, { JSX } from "react";
import { useTranslations } from "next-intl";

/**
 * Renders an article card displaying additional personal information such as location, experience, languages, and philosophy.
 *
 * @component
 * @example
 * <AdditionalInfo />
 *
 * @returns {JSX.Element} A styled card with a grid of labeled information items, each with an icon and description.
 */
export const AdditionalInfo = (): JSX.Element => {
  const t = useTranslations("about");

  return (
    <article
      className="card bg-white border-2 border-text-main/10"
      data-testid="additional-info"
    >
      <dl className="grid sm:grid-cols-2 gap-4 text-center">
        <div className="flex flex-col items-center justify-center">
          <dt className="flex items-center font-body font-bold text-text-main text-sm">
            <Icon name="Location" size={20} className="text-text-main mr-2" />
            {t("additionalInfo.location")}
          </dt>
          <dd className="font-body text-primary-brand text-xs">
            {t("additionalInfo.locationValue")}
          </dd>
        </div>
        <div className="flex flex-col items-center justify-center">
          <dt className="flex items-center font-body font-bold text-text-main text-sm">
            <Icon name="Calendar" size={20} className="text-text-main mr-2" />
            {t("additionalInfo.experience")}
          </dt>
          <dd className="font-body text-primary-brand text-xs">{t("additionalInfo.experienceValue")}</dd>
        </div>
        <div className="flex flex-col items-center justify-center">
          <dt className="flex items-center font-body font-bold text-text-main text-sm">
            <Icon name="Language" size={20} className="text-text-main mr-2" />
            {t("additionalInfo.languages")}
          </dt>
          <dd className="font-body text-primary-brand text-xs">
            {t("additionalInfo.languagesValue")}
          </dd>
        </div>
        <div className="flex flex-col items-center justify-center">
          <dt className="flex items-center font-body font-bold text-text-main text-sm">
            <Icon name="Star" size={20} className="text-text-main mr-2" />
            {t("additionalInfo.philosophy")}
          </dt>
          <dd className="font-body text-primary-brand text-xs">
            {t("additionalInfo.philosophyDetail")}
          </dd>
        </div>
      </dl>
    </article>
  );
};
