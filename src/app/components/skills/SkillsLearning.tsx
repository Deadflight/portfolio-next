import { Icon } from "@/shared/components/Icons/Icons";
import { useTranslations } from "next-intl";
import React, { JSX } from "react";
/**
 * Renders a section highlighting the user's ongoing learning topics and commitment to continuous improvement.
 *
 * Displays a card with a trophy icon, a heading, a descriptive paragraph, and a list of current learning subjects,
 * each accompanied by a rocket icon. The section is styled for visual emphasis and accessibility.
 *
 * @returns {JSX.Element} The SkillsLearning section component.
 *
 * @example
 * <SkillsLearning />
 */
export const SkillsLearning = (): JSX.Element => {
  const t = useTranslations("skills");

  return (
    <section className="mt-12 text-center" aria-labelledby="learning-title">
      <div className="card max-w-3xl mx-auto bg-background-main border-2 border-primary-brand/10 shadow-subtle">
        <header className="flex items-center justify-center mb-4">
          <Icon
            name="Trophy"
            size={20}
            className="mr-3 text-text-main"
            aria-hidden="true"
          />
          <h2
            id="learning-title"
            className="text-xl font-heading font-semibold text-text-main"
          >
            {t("learning.title")}
          </h2>
        </header>
        <p className="font-body text-primary-brand leading-relaxed mb-6 font-medium">
          {t("learning.description")}
        </p>
        <ul
          className="flex flex-wrap justify-center gap-2"
          aria-label={t("learning.title")}
        >
          {(t.raw("learning.topics") as string[]).map(
            (tech: string) => (
              <li
                key={tech}
                className="px-3 py-1 bg-background-main border border-accent/30 text-text-main text-sm font-body rounded-full flex items-center"
              >
                <Icon
                  name="Rocket"
                  size={12}
                  className="mr-1 text-primary-brand"
                  aria-hidden="true"
                />
                {tech}
              </li>
            )
          )}
        </ul>
      </div>
    </section>
  );
};
