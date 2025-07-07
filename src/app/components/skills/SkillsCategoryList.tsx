import { Icon } from "@/shared/components/Icons/Icons";
import {
  ISkillExperience,
  ISkillProficiencyLevels,
} from "@/shared/types/skills.types";
import React, { FC, JSX } from "react";
import { SkillsCard } from "./SkillsCard";

export interface SkillsCategoryListProps {
  category: ISkillExperience;
  proficiencyLevels: ISkillProficiencyLevels;
}
/**
 * Renders a list of skills within a specific category, displaying each skill as a card.
 * The skills are sorted by their proficiency level in descending order.
 *
 * @param {SkillsCategoryListProps} props - The props for the component.
 * @param {ISkillExperience} props.category - The skill category containing the list of skills and metadata.
 * @param {ISkillProficiencyLevels} props.proficiencyLevels - The mapping of proficiency levels to their details (e.g., stars).
 *
 * @returns {JSX.Element} The rendered skills category list component.
 */
export const SkillsCategoryList: FC<SkillsCategoryListProps> = ({
  category,
  proficiencyLevels,
}: SkillsCategoryListProps): JSX.Element => {
  return (
    <article
      className="card bg-background-main border border-primary-brand/10 rounded-medium shadow-subtle"
      aria-labelledby={`category-title-${category.id}`}
    >
      <header className="flex items-center mb-6">
        <Icon
          name={category.iconName}
          size={20}
          className="text-text-main mr-3"
          aria-hidden="true"
        />
        <h3
          id={`category-title-${category.id}`}
          className="text-lg font-heading font-semibold text-text-main"
        >
          {category.title}
        </h3>
      </header>
      <ul className="space-y-6">
        {category.skills
          .sort(
            (a, b) =>
              proficiencyLevels[b.level].stars -
              proficiencyLevels[a.level].stars
          )
          .map((skill) => (
            <SkillsCard
              proficiencyLevels={proficiencyLevels}
              skill={skill}
              key={`${category.id}-${skill.name}`}
            />
          ))}
      </ul>
    </article>
  );
};
