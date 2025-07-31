import { IWorkExperience } from "@/shared/types/workExperience.types";
import React, { FC } from "react";
import { WorkExperienceCard } from "../WorkExperienceCard/WorkExperienceCard";

export interface IWorkExperienceListProps {
  workExperiences: IWorkExperience[];
}

/**
 * Renders a list of work experience cards.
 *
 * @param workExperiences - An array of work experience objects to display.
 * @returns A React component displaying each work experience in a card layout.
 */
export const WorkExperienceList: FC<IWorkExperienceListProps> = ({
  workExperiences,
}) => {
  return (
    <ul className="space-y-8">
      {workExperiences.length === 0 ? (
        <li className="text-gray-500" aria-live="polite">
          Work experience items will be populated dynamically.
        </li>
      ) : (
        workExperiences.map((experience) => (
          <WorkExperienceCard key={experience.id} workExperience={experience} />
        ))
      )}
    </ul>
  );
};
