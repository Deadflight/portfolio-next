import { ProficiencyBadge } from "@/shared/components/ProficiencyBadge/ProficiencyBadge";
import { StarRating } from "@/shared/components/StarRating/StarRating";
import { ISkill, ISkillProficiencyLevels } from "@/shared/types/skills.types";
import React, { FC } from "react";

/**
 * Props for the `SkillsCard` component.
 *
 * @property {ISkill} skill - The skill to display in the card.
 * @property {ISkillProficiencyLevels} proficiencyLevels - The proficiency levels associated with the skill.
 */
export interface SkillsCardProps {
  skill: ISkill;
  proficiencyLevels: ISkillProficiencyLevels;
}
/**
 * Renders a card displaying information about a specific skill, including its name,
 * proficiency level, star rating, experience, and context.
 *
 * @component
 * @param {SkillsCardProps} props - The properties for the SkillsCard component.
 * @param {ISkill} props.skill - The skill object containing details to display.
 * @param {ISkillProficiencyLevels} props.proficiencyLevels - The mapping of proficiency levels for skills.
 * @returns {JSX.Element} The rendered SkillsCard component.
 */
export const SkillsCard: FC<SkillsCardProps> = ({
  skill,
  proficiencyLevels,
}) => {
  return (
    <li
      className="border-b border-secondary/20 pb-4 last:border-b-0 last:pb-0"
      data-testid={`skill-card-${skill.name}`}
    >
      <div className="flex justify-between items-start mb-2">
        <span className="font-body font-bold text-text-main">{skill.name}</span>
        <ProficiencyBadge level={proficiencyLevels[skill.level]} />
      </div>

      <div className="flex items-center justify-between mb-2">
        <StarRating
          level={proficiencyLevels[skill.level]}
          skillName={skill.name}
        />
        <span className="text-xs font-body text-primary-brand font-medium">
          {skill.experience}
        </span>
      </div>

      <p className="font-body text-primary-brand text-sm leading-relaxed">
        {skill.context}
      </p>
    </li>
  );
};
