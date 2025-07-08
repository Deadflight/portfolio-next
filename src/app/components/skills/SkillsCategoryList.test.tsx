import React from "react";
import { render, screen } from "@testing-library/react";
import { SkillsCategoryList } from "./SkillsCategoryList";
import {
  ISkillExperience,
  ISkillProficiencyLevels,
  SkillIconName,
  SkillProficiencyLevel,
} from "../../../shared/types/skills.types";
import { IIconProps } from "../../../shared/types/icons.types";
import { SkillsCardProps } from "./SkillsCard";

// Mock the Icon and SkillsCard components
jest.mock("../../../shared/components/Icons/Icons", () => ({
  Icon: ({ name, ...props }: IIconProps) => (
    <span data-testid="icon" data-name={name} {...props} />
  ),
}));
jest.mock("./SkillsCard", () => ({
  SkillsCard: ({ skill }: SkillsCardProps) => (
    <li data-testid="skill-card">{skill.name}</li>
  ),
}));

const mockCategory: ISkillExperience = {
  id: "frontend",
  title: "Frontend",
  iconName: SkillIconName.Code,
  skills: [
    {
      name: "React",
      level: SkillProficiencyLevel.Advanced,
      experience: "3+ años",
      context: "Desarrollo diario en proyectos empresariales",
    },
    {
      name: "TypeScript",
      level: SkillProficiencyLevel.Intermediate,
      experience: "2+ años",
      context: "Tipado avanzado, interfaces complejas",
    },
    {
      name: "CSS",
      level: SkillProficiencyLevel.Beginner,
      experience: "1+ año",
      context: "Estilos básicos, diseño responsivo",
    },
  ],
};

const mockProficiencyLevels: ISkillProficiencyLevels = {
  expert: {
    stars: 4,
    label: "Expert",
    color: "text-red-500",
    bgColor: "bg-red-500",
    description: "Dominio total, capaz de innovar y optimizar procesos",
  },
  advanced: {
    stars: 3,
    label: "Advanced",
    color: "text-green-500",
    bgColor: "bg-green-500",
    description: "Dominio completo, capaz de enseñar y liderar",
  },
  intermediate: {
    stars: 2,
    label: "Intermediate",
    color: "text-blue-500",
    bgColor: "bg-blue-500",
    description: "Experiencia práctica, desarrollo con supervisión ocasional",
  },
  beginner: {
    stars: 1,
    label: "Beginner",
    color: "text-yellow-500",
    bgColor: "bg-yellow-500",
    description: "Conocimientos básicos, en proceso de aprendizaje",
  },
};

describe("SkillsCategoryList", () => {
  it("renders the category title and icon", () => {
    render(
      <SkillsCategoryList
        category={mockCategory}
        proficiencyLevels={mockProficiencyLevels}
      />
    );
    expect(screen.getByText("Frontend")).toBeInTheDocument();
    expect(screen.getByTestId("icon")).toHaveAttribute(
      "data-name",
      SkillIconName.Code
    );
  });

  it("renders a SkillsCard for each skill", () => {
    render(
      <SkillsCategoryList
        category={mockCategory}
        proficiencyLevels={mockProficiencyLevels}
      />
    );
    const skillCards = screen.getAllByTestId("skill-card");
    expect(skillCards).toHaveLength(3);
    expect(skillCards[0]).toHaveTextContent("React");
    expect(skillCards[1]).toHaveTextContent("TypeScript");
    expect(skillCards[2]).toHaveTextContent("CSS");
  });

  it("sorts skills by proficiency level (stars) descending", () => {
    render(
      <SkillsCategoryList
        category={mockCategory}
        proficiencyLevels={mockProficiencyLevels}
      />
    );
    const skillCards = screen.getAllByTestId("skill-card");
    // React (advanced: 3), TypeScript (intermediate: 2), CSS (beginner: 1)
    expect(skillCards[0]).toHaveTextContent("React");
    expect(skillCards[1]).toHaveTextContent("TypeScript");
    expect(skillCards[2]).toHaveTextContent("CSS");
  });

  it("sets the correct aria-labelledby attribute", () => {
    render(
      <SkillsCategoryList
        category={mockCategory}
        proficiencyLevels={mockProficiencyLevels}
      />
    );
    const article = screen.getByRole("article");
    expect(article).toHaveAttribute(
      "aria-labelledby",
      "category-title-frontend"
    );
    expect(screen.getByText("Frontend").id).toBe("category-title-frontend");
  });
});
