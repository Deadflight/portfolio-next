import React from "react";
import { render, screen } from "@testing-library/react";
import { SkillsLegend, SkillsLegendProps } from "./SkillsLegend";
// Import the unfilled star color token from the StarRating module or theme
import { UNFILLED_STAR_COLOR } from "../../../shared/components/StarRating/StarRating";

const mockProficiencyLevels: SkillsLegendProps["proficiencyLevels"] = {
  beginner: {
    label: "Principiante",
    description: "Conocimientos básicos.",
    color: "text-gray-400",
    stars: 1,
    bgColor: "bg-gray-200",
  },
  intermediate: {
    label: "Intermedio",
    description: "Buen manejo de conceptos.",
    color: "text-blue-400",
    stars: 3,
    bgColor: "bg-blue-200",
  },
  advanced: {
    label: "Avanzado",
    description: "Dominio avanzado.",
    color: "text-green-400",
    stars: 4,
    bgColor: "bg-green-200",
  },
  expert: {
    label: "Experto",
    description: "Experiencia sobresaliente.",
    color: "text-yellow-400",
    stars: 5,
    bgColor: "bg-yellow-200",
  },
};

describe("SkillsLegend", () => {
  it("renders the section and heading", () => {
    render(<SkillsLegend proficiencyLevels={mockProficiencyLevels} />);
    expect(
      screen.getByRole("heading", { name: /niveles de competencia/i })
    ).toBeInTheDocument();
    expect(screen.getByRole("region")).toBeInTheDocument();
  });

  it("renders all proficiency levels with correct labels and descriptions", () => {
    render(<SkillsLegend proficiencyLevels={mockProficiencyLevels} />);
    Object.values(mockProficiencyLevels).forEach((level) => {
      expect(screen.getByText(level.label)).toBeInTheDocument();
      expect(screen.getByText(level.description)).toBeInTheDocument();
    });
  });

  it("renders the correct number of stars for each level", () => {
    render(<SkillsLegend proficiencyLevels={mockProficiencyLevels} />);
    Object.values(mockProficiencyLevels).forEach((level) => {
      // Find the label for the level
      const label = screen.getByText(level.label);
      // Find the closest card/container div
      const card = label.closest("div");
      // Find all SVGs (stars) inside the card
      const stars = card?.querySelectorAll("svg");
      expect(stars?.length).toBe(5); // There are always 5 stars per level
    });
  });

  it("renders the correct color for filled and unfilled stars", () => {
    render(<SkillsLegend proficiencyLevels={mockProficiencyLevels} />);
    Object.entries(mockProficiencyLevels).forEach(([, level]) => {
      const label = screen.getByText(level.label);
      const card = label.closest("div");
      const stars = card?.querySelectorAll("svg");
      stars?.forEach((star, index) => {
        const className = star.parentElement?.getAttribute("class") || "";
        if (index < level.stars) {
          expect(className).toContain(level.color);
        } else {
          expect(className).toContain(UNFILLED_STAR_COLOR); // Use the imported unfilled star color token
        }
      });
    });
  });
});
