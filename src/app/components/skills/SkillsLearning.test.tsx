import React from "react";
import { render, screen } from "@testing-library/react";
import { SkillsLearning } from "./SkillsLearning";

// Mock the Icon component to avoid dependency on its implementation
jest.mock("../../../shared/components/Icons/Icons", () => ({
  Icon: ({ name, ...props }: { name: string }) => (
    <span data-testid={`icon-${name}`} {...props} />
  ),
}));

describe("SkillsLearning", () => {
  it("renders the section with the correct heading", () => {
    render(<SkillsLearning />);
    const heading = screen.getByRole("heading", {
      name: /aprendizaje continuo/i,
    });
    expect(heading).toBeInTheDocument();
  });

  it("renders the trophy icon in the header", () => {
    render(<SkillsLearning />);
    const trophyIcon = screen.getByTestId("icon-Trophy");
    expect(trophyIcon).toBeInTheDocument();
  });

  it("renders the descriptive paragraph", () => {
    render(<SkillsLearning />);
    expect(
      screen.getByText(/La tecnología evoluciona constantemente, y yo también/i)
    ).toBeInTheDocument();
  });

  it("renders all current learning topics with rocket icons", () => {
    render(<SkillsLearning />);
    const topics = ["Microservicios", "Testing Avanzado", "Angular", "MCP"];
    topics.forEach((topic) => {
      expect(screen.getByText(topic)).toBeInTheDocument();
    });
    // There should be as many rocket icons as topics
    expect(screen.getAllByTestId("icon-Rocket")).toHaveLength(topics.length);
  });

  it("sets aria attributes for accessibility", () => {
    render(<SkillsLearning />);
    const section = screen.getByRole("region", { hidden: true });
    expect(section).toHaveAttribute("aria-labelledby", "learning-title");
    const ul = screen.getByRole("list");
    expect(ul).toHaveAttribute("aria-label", "Temas de aprendizaje actual");
  });
});
