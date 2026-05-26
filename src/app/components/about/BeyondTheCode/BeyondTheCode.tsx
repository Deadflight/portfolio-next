"use client";
import { Icon } from "@/shared/components/Icons/Icons";
import React, { JSX } from "react";
import { useTranslations } from "next-intl";

/**
 * Renders the "Más Allá del Código" (Beyond the Code) card component.
 *
 * This component displays a section highlighting personal and professional growth
 * beyond software development. It includes a title with an icon, a descriptive paragraph,
 * and a list of interests and goals such as learning new technologies, improving English,
 * exploring new challenges, and enjoying hobbies like cooking and role-playing games.
 *
 * @returns {JSX.Element} The rendered BeyondTheCode card component.
 */
export const BeyondTheCode = (): JSX.Element => {
  const t = useTranslations("about");
  const beyondCodeItems = t.raw("beyondCode.items");

  return (
    <article className="card">
      <div className="flex items-center mb-4">
        <Icon name="Coffee" size={20} className="text-text-main mr-3" />
        <h3 className="text-xl font-heading font-semibold text-text-main">
          {t("beyondCode.title")}
        </h3>
      </div>
      <div className="space-y-4">
        <p className="font-body text-text-main leading-relaxed">
          {t("beyondCode.description")}
        </p>
        <ul className="space-y-2">
          {Array.isArray(beyondCodeItems) &&
            beyondCodeItems.map((item: string, idx: number) => (
              <li
                key={idx}
                className="flex items-center font-body text-text-main text-sm"
              >
                <span className="w-2 h-2 bg-text-main rounded-full mr-3 flex-shrink-0" />
                {item}
              </li>
            ))}
        </ul>
      </div>
    </article>
  );
};
