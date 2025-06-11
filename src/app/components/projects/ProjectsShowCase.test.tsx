import React from "react";
import { render, screen } from "@testing-library/react";
import { ProjectsShowCase } from "./ProjectsShowCase";
import "@testing-library/jest-dom";
import { IProject } from "@/shared/types/project.types";

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

describe("ProjectsShowCase", () => {
  it("renders the section with correct heading and description", () => {
    render(<ProjectsShowCase />);
    expect(
      screen.getByRole("heading", { name: /proyectos destacados/i })
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        /una selección de mis trabajos más recientes y significativos/i
      )
    ).toBeInTheDocument();
  });

  it("renders the ProjectsList with all project titles", () => {
    render(<ProjectsShowCase />);
    // Titles from the hardcoded projects array
    expect(screen.getByText(/Kumbio/i)).toBeInTheDocument();
    expect(screen.getByText(/Teslo Shop/i)).toBeInTheDocument();
    expect(screen.getByText(/Cryptoverse/i)).toBeInTheDocument();
    expect(screen.getByText(/Country App Angular/i)).toBeInTheDocument();
  });

  it("renders the collaboration card with correct content", () => {
    render(<ProjectsShowCase />);
    expect(
      screen.getByRole("heading", { name: /¿interesado en colaborar\?/i })
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        /estos proyectos representan mi experiencia en desarrollo full/i
      )
    ).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /contactar/i })).toHaveAttribute(
      "href",
      "#contacto"
    );
  });

  it("renders the section with correct id and classes", () => {
    render(<ProjectsShowCase />);
    const section = document.querySelector("section#proyectos");
    expect(section).toHaveAttribute("id", "proyectos");
    expect(section).toHaveClass("py-16");
    expect(section).toHaveClass("bg-white");
  });
});
