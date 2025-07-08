import React from "react";
import { render, screen } from "@testing-library/react";
import { SkillsCard } from "./SkillsCard";
import {
  ISkill,
  ISkillProficiency,
  ISkillProficiencyLevels,
  SkillProficiencyLevel,
} from "../../../shared/types/skills.types";

// Mock child components
jest.mock(
  "../../..//shared/components/ProficiencyBadge/ProficiencyBadge",
  () => ({
    ProficiencyBadge: ({ level }: { level: ISkillProficiency }) => (
      <div data-testid="proficiency-badge">{level.label}</div>
    ),
  })
);
jest.mock("../../../shared/components/StarRating/StarRating", () => ({
  StarRating: ({
    level,
    skillName,
  }: {
    level: ISkillProficiency;
    skillName: string;
  }) => (
    <div data-testid="star-rating">
      {skillName}-{level.label}
    </div>
  ),
}));

describe("SkillsCard", () => {
  const proficiencyLevels: ISkillProficiencyLevels = {
    beginner: {
      label: "Beginner",
      stars: 2,
      color: "text-accent",
      description: "Basic knowledge, in the process of learning",
      bgColor: "bg-accent",
    },
    intermediate: {
      label: "Intermediate",
      stars: 3,
      color: "text-primary-brand",
      description:
        "Practical experience, development with occasional supervision",
      bgColor: "bg-primary-brand",
    },
    advanced: {
      label: "Advanced",
      stars: 4,
      color: "text-text-main",
      description: "Daily professional use, independent problem solving",
      bgColor: "bg-text-main",
    },
    expert: {
      label: "Expert",
      stars: 5,
      color: "text-success",
      description:
        "Complete mastery, capable of leading projects and mentoring",
      bgColor: "bg-success",
    },
  };

  const skill: ISkill = {
    name: "TypeScript",
    level: SkillProficiencyLevel.Advanced,
    experience: "3 years",
    context: "Used for building scalable web applications.",
  };

  it("renders skill name", () => {
    render(<SkillsCard skill={skill} proficiencyLevels={proficiencyLevels} />);
    expect(screen.getByText("TypeScript")).toBeInTheDocument();
  });

  it("renders ProficiencyBadge with correct level", () => {
    render(<SkillsCard skill={skill} proficiencyLevels={proficiencyLevels} />);
    expect(screen.getByTestId("proficiency-badge")).toHaveTextContent(
      "Advanced"
    );
  });

  it("renders StarRating with correct props", () => {
    render(<SkillsCard skill={skill} proficiencyLevels={proficiencyLevels} />);
    expect(screen.getByTestId("star-rating")).toHaveTextContent(
      "TypeScript-Advanced"
    );
  });

  it("renders experience", () => {
    render(<SkillsCard skill={skill} proficiencyLevels={proficiencyLevels} />);
    expect(screen.getByText("3 years")).toBeInTheDocument();
  });

  it("renders context", () => {
    render(<SkillsCard skill={skill} proficiencyLevels={proficiencyLevels} />);
    expect(
      screen.getByText("Used for building scalable web applications.")
    ).toBeInTheDocument();
  });
});
