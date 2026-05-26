import React from "react";
import { screen } from "@testing-library/react";
import { SkillsExperienceShowCase } from "./SkillsExperienceShowCase";
import { SkillsLegendProps } from "./SkillsLegend";
import { SkillsCategoryListProps } from "./SkillsCategoryList";
import { renderWithProviders } from "@/test/utils";

// Mock next-intl

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
    renderWithProviders(<SkillsExperienceShowCase />);
    expect(document.getElementById("habilidades")).toBeInTheDocument();
    expect(screen.getByText("Habilidades")).toBeInTheDocument();
    expect(
      screen.getByText(/Mi stack técnico y nivel de experiencia/i)
    ).toBeInTheDocument();
  });

  it("renders the proficiency legend", () => {
    renderWithProviders(<SkillsExperienceShowCase />);
    expect(screen.getByTestId("skills-legend")).toBeInTheDocument();
    expect(screen.getByTestId("skills-legend").textContent).toMatch(
      /expert|advanced|intermediate|beginner/i
    );
  });

  it("renders all skill categories", () => {
    renderWithProviders(<SkillsExperienceShowCase />);
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
      /Gestión de Proyectos/i
    );
  });

  it("renders the SkillsLanguage and SkillsLearning sections", () => {
    renderWithProviders(<SkillsExperienceShowCase />);
    expect(screen.getByTestId("skills-language")).toBeInTheDocument();
    expect(screen.getByTestId("skills-learning")).toBeInTheDocument();
  });
});
