import { Icon } from "@/shared/components/Icons/Icons";
import React, { JSX } from "react";
import { useTranslations } from "next-intl";

/**
 * Renders an article card describing the user's professional roles and evolution.
 *
 * This component displays a section with a title and two paragraphs detailing
 * the transition from frontend specialization to full stack development, highlighting
 * key experiences at Contactemos Contact Center and Farmaloop.
 *
 * @returns {JSX.Element} The rendered RolesAndEvolution article card.
 */
export const RolesAndEvolution = (): JSX.Element => {
  const t = useTranslations("about");

  return (
    <article className="card">
      <div className="flex items-center mb-4">
        <Icon name="Lightbulb" size={20} className="text-text-main mr-3" />
        <h3 className="text-xl font-heading font-semibold text-text-main">
          {t("roles.title")}
        </h3>
      </div>
      <div className="space-y-4">
        <p className="font-body text-text-main leading-relaxed">
          {t("roles.paragraph1")}
        </p>
        <p className="font-body text-text-main leading-relaxed">
          {t("roles.paragraph2")}
        </p>
      </div>
    </article>
  );
};
