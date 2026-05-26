"use client";
import { Icon } from "@/shared/components/Icons/Icons";
import React, { JSX } from "react";
import { useTranslations } from "next-intl";

/**
 * Renders an article card describing the developer's journey.
 *
 * The `MyJourney` component displays a brief narrative about the author's experience
 * as a freelance developer and their professional growth at CheshTech Digital Agency.
 * It includes a heading with an icon and two descriptive paragraphs.
 *
 * @returns {JSX.Element} The rendered article element containing the journey details.
 */
export const MyJourney = (): JSX.Element => {
  const t = useTranslations("about");

  return (
    <article className="card">
      <div className="flex items-center mb-4">
        <Icon name="Code" size={20} className="text-text-main mr-3" />
        <h3 className="text-xl font-heading font-semibold text-text-main">
          {t("myJourney.title")}
        </h3>
      </div>
      <div className="space-y-4">
        <p className="font-body text-text-main leading-relaxed">
          {t("myJourney.paragraph1")}
        </p>
        <p className="font-body text-text-main leading-relaxed">
          {t("myJourney.paragraph2")}
        </p>
      </div>
    </article>
  );
};
