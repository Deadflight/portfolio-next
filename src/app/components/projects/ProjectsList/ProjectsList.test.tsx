import React from "react";
import { render, screen } from "@testing-library/react";
import { ProjectsList } from "./ProjectsList";
import { IProject } from "@/shared/types/project.types";
import "@testing-library/jest-dom";
import { mockProjects } from "@/shared/mocks/projects";

// Mock ProjectCard
jest.mock("../ProjectCard/ProjectCard", () => ({
  ProjectCard: ({ project }: { project: IProject }) => (
    <div data-testid="project-card">{project.title}</div>
  ),
}));

describe("ProjectsList", () => {
  it("renders a ul with className 'space-y-8'", () => {
    const { container } = render(<ProjectsList projects={mockProjects} />);
    const ul = container.querySelector("ul.space-y-8");
    expect(ul).toBeInTheDocument();
  });

  it("renders a ProjectCard for each project", () => {
    render(<ProjectsList projects={mockProjects} />);
    const cards = screen.getAllByTestId("project-card");
    expect(cards).toHaveLength(mockProjects.length);
    expect(cards[0]).toHaveTextContent("Project One");
    expect(cards[1]).toHaveTextContent("Project Two");
  });

  it("renders nothing if projects array is empty", () => {
    render(<ProjectsList projects={[]} />);
    expect(screen.queryByTestId("project-card")).toBeNull();
  });
});
