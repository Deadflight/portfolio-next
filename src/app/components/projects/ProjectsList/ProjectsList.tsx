import { IProject } from "@/shared/types/project.types";
import React, { FC } from "react";
import { ProjectCard } from "../ProjectCard/ProjectCard";

interface IProjectsListProps {
  projects: IProject[];
}
export const ProjectsList: FC<IProjectsListProps> = ({ projects }) => {
  return (
    <div className="space-y-8">
      {projects.map((project) => (
        <ProjectCard key={project.id} project={project} />
      ))}
    </div>
  );
};
