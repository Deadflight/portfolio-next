import React from "react";
import { render, screen } from "@testing-library/react";
import { SkillsExperienceShowCase } from "./SkillsExperienceShowCase";
import { SkillsLegendProps } from "./SkillsLegend";
import { SkillsCategoryListProps } from "./SkillsCategoryList";

// Mock child components to isolate SkillsExperienceShowCase
jest.mock("./SkillsLegend", () => ({
  SkillsLegend: ({ proficiencyLevels }: SkillsLegendProps) => (
    <div data-testid="skills-legend">
      {Object.keys(proficiencyLevels).join(",")}
    </div>
  ),
}));
jest.mock("./SkillsLanguage", () => ({
  SkillsLanguage: () => <div data-testid="skills-language">SkillsLanguage</div>,
}));
jest.mock("./SkillsLearning", () => ({
  SkillsLearning: () => <div data-testid="skills-learning">SkillsLearning</div>,
}));
jest.mock("./SkillsCategoryList", () => ({
  SkillsCategoryList: ({ category }: SkillsCategoryListProps) => (
    <div data-testid={`category-${category.id}`}>{category.title}</div>
  ),
}));

describe("SkillsExperienceShowCase", () => {
  it("renders the main section and headings", () => {
    render(<SkillsExperienceShowCase />);
    // Use a more specific name to avoid ambiguity
    expect(
      screen.getByRole("region", { name: /habilidades técnicas/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: /habilidades técnicas/i })
    ).toBeInTheDocument();
    expect(
      screen.getByText(/mi experiencia práctica en tecnologías/i)
    ).toBeInTheDocument();
  });

  it("renders the proficiency legend", () => {
    render(<SkillsExperienceShowCase />);
    expect(screen.getByTestId("skills-legend")).toBeInTheDocument();
    expect(screen.getByTestId("skills-legend").textContent).toMatch(
      /expert|advanced|intermediate|beginner/i
    );
  });

  it("renders all skill categories", () => {
    render(<SkillsExperienceShowCase />);
    // These titles are from the skillCategories array in the component
    expect(screen.getByTestId("category-languages")).toHaveTextContent(
      /languages/i
    );
    expect(
      screen.getByTestId("category-frontend-development")
    ).toHaveTextContent(/frontend development/i);
    expect(
      screen.getByTestId("category-backend-development")
    ).toHaveTextContent(/backend development/i);
    expect(screen.getByTestId("category-databases")).toHaveTextContent(
      /bases de datos/i
    );
    expect(screen.getByTestId("category-cloud-devops")).toHaveTextContent(
      /cloud & devops/i
    );
    expect(screen.getByTestId("category-project-management")).toHaveTextContent(
      /gestión de proyectos/i
    );
  });

  it("renders the SkillsLanguage and SkillsLearning sections", () => {
    render(<SkillsExperienceShowCase />);
    expect(screen.getByTestId("skills-language")).toBeInTheDocument();
    expect(screen.getByTestId("skills-learning")).toBeInTheDocument();
  });
});
