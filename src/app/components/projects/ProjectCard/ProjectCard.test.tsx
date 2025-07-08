import React from "react";
import { render, screen } from "@testing-library/react";
import { ProjectCard } from "./ProjectCard";
import "@testing-library/jest-dom";
import { mockProjects } from "@/shared/mocks/projects";
import { IIconProps } from "@/shared/types/icons.types";
import { IProject } from "@/shared/types/project.types";

// Mock next/image
jest.mock("next/image", () => {
  const MockNextImage = (props: React.ImgHTMLAttributes<HTMLImageElement>) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img {...props} alt={props.alt} />
  );
  MockNextImage.displayName = "MockNextImage";
  return MockNextImage;
});

// Mock Icon component
jest.mock("../../../../shared/components/Icons/Icons", () => ({
  Icon: ({ name, ...props }: IIconProps) => (
    <span data-testid={`icon-${name}`} {...props} />
  ),
}));

const baseProject = mockProjects[0];

describe("ProjectCard", () => {
  it("renders project title, description, and company", () => {
    render(<ProjectCard project={baseProject} />);
    expect(screen.getByText(baseProject.title)).toBeInTheDocument();
    expect(screen.getByText(baseProject.description)).toBeInTheDocument();
    expect(screen.getByText(baseProject.company)).toBeInTheDocument();
  });

  it("renders project image with correct alt", () => {
    render(<ProjectCard project={baseProject} />);
    expect(
      screen.getByAltText(
        `Captura de pantalla del proyecto ${baseProject.title}`
      )
    ).toBeInTheDocument();
  });

  it("renders featured badge if project is featured", () => {
    render(<ProjectCard project={{ ...baseProject, featured: true }} />);
    expect(screen.getByText("Proyecto Destacado")).toBeInTheDocument();
  });

  it("renders the right class for featured project", () => {
    const { container } = render(
      <ProjectCard project={{ ...baseProject, featured: true }} />
    );
    expect(container.firstChild).toHaveClass("border-2 border-text-main/20");
  });

  it("does not render border class if project is not featured", () => {
    const { container } = render(
      <ProjectCard project={{ ...baseProject, featured: false }} />
    );
    expect(container.firstChild).not.toHaveClass("border-2");
    expect(container.firstChild).not.toHaveClass("border-text-main/20");
  });

  it("renders challenge, solution, and results", () => {
    render(<ProjectCard project={baseProject} />);
    expect(screen.getByText("Desafío:")).toBeInTheDocument();
    expect(screen.getByText(baseProject.challenge)).toBeInTheDocument();
    expect(screen.getByText("Solución:")).toBeInTheDocument();
    expect(screen.getByText(baseProject.solution)).toBeInTheDocument();
    expect(screen.getByText("Resultados:")).toBeInTheDocument();
    expect(screen.getByText(baseProject.results)).toBeInTheDocument();
  });

  it("renders all technologies", () => {
    render(<ProjectCard project={baseProject} />);
    baseProject.technologies.forEach((tech) => {
      expect(screen.getByText(tech)).toBeInTheDocument();
    });
  });

  it("renders live and github links with correct rel and target", () => {
    render(<ProjectCard project={baseProject} />);
    const liveLink = screen.getByText("Ver Proyecto").closest("a");
    const githubLink = screen.getByText("Código").closest("a");
    expect(liveLink).toHaveAttribute("href", baseProject.liveUrl);
    expect(liveLink).toHaveAttribute("target", "_blank");
    expect(liveLink).toHaveAttribute("rel", "noopener noreferrer");
    expect(githubLink).toHaveAttribute("href", baseProject.githubUrl);
    expect(githubLink).toHaveAttribute("target", "_blank");
    expect(githubLink).toHaveAttribute("rel", "noopener noreferrer");
  });

  it("renders private project message if no links", () => {
    const project: IProject = {
      ...baseProject,
      liveUrl: null,
      githubUrl: null,
    };
    render(<ProjectCard project={project} />);
    expect(screen.getByText("Proyecto privado de cliente")).toBeInTheDocument();
  });

  it("renders placeholder image if image is missing", () => {
    const project: IProject = { ...baseProject, image: "" };
    render(<ProjectCard project={project} />);
    expect(
      screen.getByAltText(
        `Captura de pantalla del proyecto ${baseProject.title}`
      )
    ).toHaveAttribute("src", "/placeholder.svg");
  });

  it("renders icons for Calendar, Users, ChartLine, Eye, and GitHub", () => {
    render(<ProjectCard project={baseProject} />);
    expect(screen.getByTestId("icon-Calendar")).toBeInTheDocument();
    expect(screen.getByTestId("icon-Users")).toBeInTheDocument();
    expect(screen.getByTestId("icon-ChartLine")).toBeInTheDocument();
    expect(screen.getByTestId("icon-Eye")).toBeInTheDocument();
    expect(screen.getByTestId("icon-GitHub")).toBeInTheDocument();
  });

  it("renders only github link if liveUrl is missing", () => {
    const project: IProject = {
      ...baseProject,
      liveUrl: null,
      githubUrl: "https://github.com/test-repo",
    };
    render(<ProjectCard project={project} />);
    expect(screen.queryByText("Ver Proyecto")).not.toBeInTheDocument();
    const githubLink = screen.getByText("Código").closest("a");
    expect(githubLink).toHaveAttribute("href", project.githubUrl!);
  });

  it("renders only live link if githubUrl is missing", () => {
    const project: IProject = {
      ...baseProject,
      liveUrl: "https://test-live.com",
      githubUrl: null,
    };
    render(<ProjectCard project={project} />);
    expect(screen.queryByText("Código")).not.toBeInTheDocument();
    const liveLink = screen.getByText("Ver Proyecto").closest("a");
    expect(liveLink).toHaveAttribute("href", project.liveUrl!);
  });
});
