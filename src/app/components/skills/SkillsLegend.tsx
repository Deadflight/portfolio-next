import { Icon } from "@/shared/components/Icons/Icons";
import { ISkillProficiencyLevels } from "@/shared/types/skills.types";
import React, { FC, JSX } from "react";

export interface SkillsLegendProps {
  proficiencyLevels: ISkillProficiencyLevels;
}
/**
 * Renders a legend section displaying the different skill proficiency levels.
 *
 * Each proficiency level is represented with a label, description, and a visual
 * indicator using star icons. The component is accessible and uses semantic HTML
 * for improved usability.
 *
 * @param {SkillsLegendProps} props - The props for the SkillsLegend component.
 * @param {ISkillProficiencyLevels} props.proficiencyLevels - An object containing
 *   the different skill proficiency levels, where each level includes a label,
 *   description, color, and number of stars.
 *
 * @returns {JSX.Element} The rendered SkillsLegend section.
 */
const STAR_COUNT = 5;

export const SkillsLegend: FC<SkillsLegendProps> = ({
  proficiencyLevels,
}: SkillsLegendProps): JSX.Element => {
  return (
    <section aria-labelledby="proficiency-legend-title" className="mb-12">
      <div className="card max-w-4xl mx-auto bg-background-main border-2 border-primary-brand/10 shadow-subtle">
        <h2
          id="proficiency-legend-title"
          className="text-lg font-heading font-semibold text-text-main mb-4 flex items-center"
        >
          <Icon
            name="BookOpen"
            size={20}
            className="mr-2 text-primary-brand"
            aria-hidden="true"
          />
          Niveles de Competencia
        </h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4" role="list">
          {Object.entries(proficiencyLevels).map(([key, level]) => {
            const cardClassName =
              "text-center p-3 bg-background-main rounded-medium";
            return (
              <div key={key} className={cardClassName} role="listitem">
                <div
                  className="flex justify-center mb-2"
                  aria-label={`${level.label}, ${level.stars} de ${STAR_COUNT} estrellas`}
                >
                  {[...Array(STAR_COUNT)].map((_, index) => (
                    <Icon
                      key={index}
                      name="Star"
                      size={14}
                      className={`mr-1 ${
                        index < level.stars ? level.color : "text-secondary"
                      }`}
                      aria-hidden="true"
                    />
                  ))}
                </div>
                <p className="font-body font-bold text-text-main text-sm mb-1">
                  {level.label}
                </p>
                <p className="font-body text-primary-brand text-xs leading-tight">
                  {level.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
