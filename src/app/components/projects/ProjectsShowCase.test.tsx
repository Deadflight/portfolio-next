import React from "react";
import { renderWithI18n as render, screen } from "@/test/utils";
import { ProjectsShowCase } from "./ProjectsShowCase";
import "@testing-library/jest-dom";
import { IProject } from "@/shared/types/project.types";
import { mockProjects } from "@/shared/mocks/projects";

// Mock ProjectsList to isolate ProjectsShowCase tests
jest.mock("./ProjectsList/ProjectsList", () => ({
  ProjectsList: ({ projects }: { projects: IProject[] }) => (
    <div data-testid="projects-list">
      {projects.map((project) => (
        <div key={project.id} data-testid="project-title">
          {project.title}
        </div>
      ))}
    </div>
  ),
}));

const renderComponent = () =>
  render(<ProjectsShowCase projects={mockProjects} />);

describe("ProjectsShowCase", () => {
  it("renders the section with correct heading and description", () => {
    renderComponent();
    expect(
      screen.getByRole("heading", { name: /Proyectos/i })
    ).toBeInTheDocument();
    expect(
      screen.getByText(/Una selección de mis proyectos más recientes/i)
    ).toBeInTheDocument();
  });

  it("renders the ProjectsList with all project titles from props", () => {
    renderComponent();
    expect(screen.getByText(/Project One/i)).toBeInTheDocument();
    expect(screen.getByText(/Project Two/i)).toBeInTheDocument();
  });

  it("renders the collaboration card with correct content", () => {
    renderComponent();
    expect(
      screen.getByRole("heading", { name: /¿Trabajamos juntos/i })
    ).toBeInTheDocument();
    expect(
      screen.getByText(/¿Interesado en colaborar o tenés un proyecto en mente/i)
    ).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /Contáctame/i })).toHaveAttribute(
      "href",
      "#contact"
    );
  });

  it("renders the section with correct id and classes", () => {
    renderComponent();
    const section = document.querySelector("section#projects");
    expect(section).toHaveAttribute("id", "projects");
    expect(section).toHaveClass("py-16");
    expect(section).toHaveClass("bg-white");
  });
});