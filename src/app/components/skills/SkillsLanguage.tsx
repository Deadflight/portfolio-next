import { Icon } from "@/shared/components/Icons/Icons";
import { StarRating } from "@/shared/components/StarRating/StarRating";
import { useTranslations } from "next-intl";
import React from "react";

/**
 * Renders a section displaying language proficiency information.
 *
 * This component shows a card with two language entries: Spanish and English.
 * Each entry displays a star rating, language name, proficiency level, and a brief description.
 * The section is accessible with appropriate ARIA labels and headings.
 *
 * @component
 * @example
 * <SkillsLanguage />
 */
export const SkillsLanguage = () => {
  const t = useTranslations("skills");

  return (
    <section className="mt-12" aria-labelledby="languages-title">
      <div className="card max-w-2xl mx-auto bg-background-main border-2 border-primary-brand/10 shadow-subtle">
        <header className="flex items-center mb-6">
          <Icon
            name="Globe"
            size={20}
            className="mr-3 text-text-main"
            aria-hidden="true"
          />
          <h2
            id="languages-title"
            className="text-xl font-heading font-semibold text-text-main"
          >
            {t("languages.title")}
          </h2>
        </header>
        <div className="grid sm:grid-cols-2 gap-6">
          <div
            className="text-center p-4 bg-background-main rounded-medium"
            role="region"
            aria-label={t("languages.spanish")}
          >
            <div className="flex justify-center mb-2" aria-hidden="true">
              <StarRating
                level={{
                  stars: 5,
                  color: "text-text-main",
                  bgColor: "bg-text-main",
                  label: t("languages.native"),
                  description: t("languages.spanishDescription"),
                }}
                skillName={t("languages.spanish")}
              />
            </div>
            <h3 className="font-body font-bold text-text-main mb-1">
              {t("languages.spanish")}
            </h3>
            <p className="font-body text-primary-brand text-sm">
              {t("languages.native")}
            </p>
            <p className="font-body text-primary-brand text-xs mt-1">
              {t("languages.spanishDescription")}
            </p>
          </div>
          <div
            className="text-center p-4 bg-background-main rounded-medium"
            role="region"
            aria-label={t("languages.english")}
          >
            <div className="flex justify-center mb-2" aria-hidden="true">
              <StarRating
                level={{
                  stars: 3,
                  color: "text-text-main",
                  bgColor: "bg-text-main",
                  label: t("languages.englishLevel"),
                  description: t("languages.englishDescription"),
                }}
                skillName={t("languages.english")}
              />
            </div>
            <h3 className="font-body font-bold text-text-main mb-1">
              {t("languages.english")}
            </h3>
            <p className="font-body text-primary-brand text-sm">
              {t("languages.englishLevel")}
            </p>
            <p className="font-body text-primary-brand text-xs mt-1">
              {t("languages.englishDescription")}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
