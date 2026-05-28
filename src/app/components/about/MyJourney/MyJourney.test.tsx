import React from "react";
import { renderWithI18n as render, screen } from "@/test/utils";
import { MyJourney } from "./MyJourney";
import "@testing-library/jest-dom";
import { IIconProps } from "@/shared/types/icons.types";

// Mock next-intl

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
      name: /Mi Viaje/i,
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
      screen.getByText(/Mi pasión por la tecnología comenzó cuando creé mi primer sitio web a los 15 años/i)
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        /A lo largo de los años, he trabajado en diversos proyectos/i
      )
    ).toBeInTheDocument();
  });
});
