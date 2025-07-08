import React from "react";
import { render, screen } from "@testing-library/react";
import { MyJourney } from "./MyJourney";
import "@testing-library/jest-dom";
import { IIconProps } from "@/shared/types/icons.types";

// Mock the Icon component
jest.mock("../../../../shared/components/Icons/Icons", () => ({
  Icon: ({ name, size, className }: IIconProps) => (
    <span
      data-testid="icon"
      data-name={name}
      data-size={size}
      className={className}
    />
  ),
}));

describe("MyJourney", () => {
  it("renders the card article", () => {
    render(<MyJourney />);
    const article = screen.getByRole("article");
    expect(article).toBeInTheDocument();
    expect(article).toHaveClass("card");
  });

  it("renders the heading with correct text", () => {
    render(<MyJourney />);
    const heading = screen.getByRole("heading", {
      name: /mi viaje en el desarrollo/i,
    });
    expect(heading).toBeInTheDocument();
    expect(heading).toHaveClass(
      "text-xl",
      "font-heading",
      "font-semibold",
      "text-text-main"
    );
  });

  it("renders the Icon component with correct props", () => {
    render(<MyJourney />);
    const icon = screen.getByTestId("icon");
    expect(icon).toBeInTheDocument();
    expect(icon).toHaveAttribute("data-name", "Code");
    expect(icon).toHaveAttribute("data-size", "20");
    expect(icon).toHaveClass("text-text-main", "mr-3");
  });

  it("renders both journey paragraphs", () => {
    render(<MyJourney />);
    expect(
      screen.getByText(/Inicié como desarrollador freelance en Upwork/i)
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        /Posteriormente, en CheshTech Digital Agency \(Seattle\)/i
      )
    ).toBeInTheDocument();
  });
});
