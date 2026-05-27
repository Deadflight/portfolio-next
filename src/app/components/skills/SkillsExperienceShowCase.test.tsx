import React from "react";
import { renderWithI18n as render, screen } from "@/test/utils";
import { SkillsExperienceShowCase } from "./SkillsExperienceShowCase";
import { SkillsLegendProps } from "./SkillsLegend";
import { SkillsCategoryListProps } from "./SkillsCategoryList";
import {
  proficiencyLevels,
  skillCategories,
} from "@/constants/data/es/skills.data";

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

const renderComponent = () =>
  render(
    <SkillsExperienceShowCase
      proficiencyLevels={proficiencyLevels}
      skillCategories={skillCategories}
    />
  );

describe("SkillsExperienceShowCase", () => {
  it("renders the main section and headings", () => {
    renderComponent();
    expect(document.getElementById("skills")).toBeInTheDocument();
    expect(screen.getByText("Habilidades")).toBeInTheDocument();
    expect(
      screen.getByText(/Mi stack técnico y nivel de experiencia/i)
    ).toBeInTheDocument();
  });

  it("renders the proficiency legend", () => {
    renderComponent();
    expect(screen.getByTestId("skills-legend")).toBeInTheDocument();
    expect(screen.getByTestId("skills-legend").textContent).toMatch(
      /expert|advanced|intermediate|beginner/i
    );
  });

  it("renders all skill categories", () => {
    renderComponent();
    expect(screen.getByTestId("category-languages")).toHaveTextContent(
      /Lenguajes/i
    );
    expect(
      screen.getByTestId("category-frontend-development")
    ).toHaveTextContent(/Desarrollo Frontend/i);
    expect(
      screen.getByTestId("category-backend-development")
    ).toHaveTextContent(/Desarrollo Backend/i);
    expect(screen.getByTestId("category-databases")).toHaveTextContent(
      /Bases de Datos/i
    );
    expect(screen.getByTestId("category-cloud-devops")).toHaveTextContent(
      /Cloud & DevOps/i
    );
    expect(screen.getByTestId("category-project-management")).toHaveTextContent(
      /Gestión de Proyectos/i
    );
  });

  it("renders the SkillsLanguage and SkillsLearning sections", () => {
    renderComponent();
    expect(screen.getByTestId("skills-language")).toBeInTheDocument();
    expect(screen.getByTestId("skills-learning")).toBeInTheDocument();
  });
});
