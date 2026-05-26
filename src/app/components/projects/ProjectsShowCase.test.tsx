import React from "react";
import { screen } from "@testing-library/react";
import { ProjectsShowCase } from "./ProjectsShowCase";
import "@testing-library/jest-dom";
import { renderWithProviders } from "@/test/utils";
import { IProject } from "@/shared/types/project.types";

// Mock next-intl

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
    renderWithProviders(<ProjectsShowCase />);
    expect(
      screen.getByRole("heading", { name: /Proyectos/i })
    ).toBeInTheDocument();
    expect(
      screen.getByText(/Una selección de mis proyectos más recientes/i)
    ).toBeInTheDocument();
  });

  it("renders the ProjectsList with all project titles", () => {
    renderWithProviders(<ProjectsShowCase />);
    expect(screen.getByText(/Kumbio/i)).toBeInTheDocument();
    expect(screen.getByText(/Farmaloop/i)).toBeInTheDocument();
    expect(screen.getByText(/Teslo Shop/i)).toBeInTheDocument();
    expect(screen.getByText(/Cryptoverse/i)).toBeInTheDocument();
  });

  it("renders the collaboration card with correct content", () => {
    renderWithProviders(<ProjectsShowCase />);
    expect(
      screen.getByRole("heading", { name: /¿Trabajamos juntos/i })
    ).toBeInTheDocument();
    expect(
      screen.getByText(/¿Interesado en colaborar o tenés un proyecto en mente/i)
    ).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /Contactame/i })).toHaveAttribute(
      "href",
      "#contacto"
    );
  });

  it("renders the section with correct id and classes", () => {
    renderWithProviders(<ProjectsShowCase />);
    const section = document.querySelector("section#proyectos");
    expect(section).toHaveAttribute("id", "proyectos");
    expect(section).toHaveClass("py-16");
    expect(section).toHaveClass("bg-white");
  });
});