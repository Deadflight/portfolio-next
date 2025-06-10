import { IWorkExperience } from "@/shared/types/workExperience.types";
import React, { FC } from "react";
import { WorkExperienceCard } from "../WorkExperienceCard/WorkExperienceCard";

interface IWorkExperienceListProps {
  workExperiences: IWorkExperience[];
}

export const WorkExperienceList: FC<IWorkExperienceListProps> = ({
  workExperiences,
}) => {
  return (
    <div className="space-y-8">
      {workExperiences.map((experience) => (
        <WorkExperienceCard key={experience.id} workExperience={experience} />
      ))}
    </div>
  );
};
