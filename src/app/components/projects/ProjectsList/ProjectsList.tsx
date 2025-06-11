import { IProject } from "@/shared/types/project.types";
import React, { FC, JSX } from "react";
import { ProjectCard } from "../ProjectCard/ProjectCard";

interface IProjectsListProps {
  projects: IProject[];
}
/**
 * Renders a list of project cards.
 *
 * @component
 * @param {IProjectsListProps} props - The props for the ProjectsList component.
 * @param {Array<Project>} props.projects - An array of project objects to display.
 * @returns {JSX.Element} A container with a list of ProjectCard components.
 */
export const ProjectsList: FC<IProjectsListProps> = ({
  projects,
}): JSX.Element => {
  return (
    <div className="space-y-8">
      {projects.map((project) => (
        <ProjectCard key={project.id} project={project} />
      ))}
    </div>
  );
};
