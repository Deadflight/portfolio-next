import { Icon } from "@/shared/components/Icons/Icons";
import React, { JSX } from "react";
import { useTranslations } from "next-intl";

/**
 * Renders an article card describing the current professional focus.
 *
 * The `CurrentFocus` component displays a summary of the developer's main areas of expertise,
 * including user-centered development, scalable solutions, international collaboration, and measurable impact.
 * It highlights key technologies such as React, Next.js, Node.js, TypeScript, Express, AWS, and MongoDB.
 *
 * @returns {JSX.Element} The rendered article card with current focus details.
 */
export const CurrentFocus = (): JSX.Element => {
  const t = useTranslations("about");

  return (
    <article className="card">
      <div className="flex items-center mb-4">
        <Icon name="Heart" size={20} className="text-red-500 mr-3" />
        <h3 className="text-xl font-heading font-semibold text-text-main">
          {t("currentFocus.title")}
        </h3>
      </div>
      <div className="space-y-4">
        <p className="font-body text-text-main leading-relaxed">
          {t("currentFocus.description")}
        </p>
        <div className="space-y-3">
          <div>
            <h4 className="font-body font-bold text-text-main mb-2">
              {t("currentFocus.topics.nextjs")}
            </h4>
            <p className="font-body text-primary-brand text-sm leading-relaxed">
              {t("currentFocus.topics.performance")}
            </p>
          </div>
          <div>
            <h4 className="font-body font-bold text-text-main mb-2">
              {t("currentFocus.topics.accessibility")}
            </h4>
            <p className="font-body text-primary-brand text-sm leading-relaxed">
              {t("currentFocus.topics.nextjs")}
            </p>
          </div>
        </div>
      </div>
    </article>
  );
};
