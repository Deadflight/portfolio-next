import { Icon } from "@/shared/components/Icons/Icons";
import { IProject } from "@/shared/types/project.types";
import Image from "next/image";
import React, { FC } from "react";

interface IProjectCardProps {
  project: IProject;
}

export const ProjectCard: FC<IProjectCardProps> = ({ project }) => {
  return (
    <div
      className={`card ${
        project.featured ? "border-2 border-text-main/20" : ""
      }`}
    >
      <div className="grid lg:grid-cols-2 gap-8 items-start">
        {/* Imagen del proyecto */}
        <div className="relative overflow-hidden rounded-lg">
          <Image
            src={project.image || "/placeholder.svg"}
            alt={`Captura de pantalla del proyecto ${project.title}`}
            className="w-full object-cover"
            width={400}
            height={250}
          />
          {project.featured && (
            <div className="absolute top-4 left-4">
              <span className="px-3 py-1 bg-text-main text-white text-xs font-body font-bold rounded-full">
                Proyecto Destacado
              </span>
            </div>
          )}
        </div>

        {/* Información del proyecto */}
        <div className="space-y-4">
          <div>
            <h3 className="text-2xl font-heading font-bold text-text-main mb-2">
              {project.title}
            </h3>
            <div className="flex flex-wrap items-center gap-4 text-sm font-body text-primary-brand mb-3">
              <div className="flex items-center">
                <Icon name="Calendar" size={14} className="mr-1" />
                {project.period}
              </div>
              <div className="flex items-center">
                <Icon name="Users" size={14} className="mr-1" />
                {project.teamSize}
              </div>
              <span className="px-2 py-1 bg-background-main rounded-sm font-medium">
                {project.company}
              </span>
            </div>
            <p className="font-body text-text-main leading-relaxed mb-4">
              {project.description}
            </p>
          </div>

          {/* Detalles del proyecto */}
          <div className="space-y-3">
            <div>
              <h4 className="font-body font-bold text-text-main text-sm mb-1">
                Desafío:
              </h4>
              <p className="font-body text-primary-brand text-sm">
                {project.challenge}
              </p>
            </div>
            <div>
              <h4 className="font-body font-bold text-text-main text-sm mb-1">
                Solución:
              </h4>
              <p className="font-body text-primary-brand text-sm">
                {project.solution}
              </p>
            </div>
            <div className="flex items-start">
              <Icon
                name="ChartLine"
                size={16}
                className="text-success mr-2 mt-0.5"
              />
              <div>
                <h4 className="font-body font-bold text-text-main text-sm mb-1">
                  Resultados:
                </h4>
                <p className="font-body text-success text-sm font-medium">
                  {project.results}
                </p>
              </div>
            </div>
          </div>

          {/* Tecnologías */}
          <div>
            <h4 className="font-body font-bold text-text-main text-sm mb-2">
              Tecnologías utilizadas:
            </h4>
            <div className="flex flex-wrap gap-2">
              {project.technologies.map((tech) => (
                <span
                  key={tech}
                  className="px-3 py-1 bg-background-main border border-accent/30 text-text-main text-sm font-body font-medium rounded-lg"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Enlaces */}
          <div className="flex space-x-4 pt-2">
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="link-text flex items-center"
              >
                <Icon name="Eye" size={14} className="mr-1" />
                Ver Proyecto
              </a>
            )}
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="link-text flex items-center"
              >
                <Icon name="GitHub" size={14} className="mr-1" />
                Código
              </a>
            )}
            {!project.liveUrl && !project.githubUrl && (
              <span className="text-success text-sm font-body italic">
                Proyecto privado de cliente
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
