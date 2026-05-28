import React from "react";
import { renderWithI18n as render, screen } from "@/test/utils";
import { CurrentFocus } from "./CurrentFocus";
import "@testing-library/jest-dom";
import { IIconProps } from "@/shared/types/icons.types";

// Mock next-intl

// Mock the Icon component
jest.mock("../../../../shared/components/Icons/Icons", () => ({
  Icon: ({ name, size, className }: IIconProps) => (
    <svg
      data-testid="icon"
      data-name={name}
      data-size={size}
      className={className}
    />
  ),
}));

describe("CurrentFocus", () => {
  it("renders the card container", () => {
    render(<CurrentFocus />);
    expect(screen.getByRole("article")).toHaveClass("card");
  });

  it("renders the main heading", () => {
    render(<CurrentFocus />);
    expect(screen.getByText("Enfoque Actual")).toBeInTheDocument();
  });

  it("renders the icon with correct props", () => {
    render(<CurrentFocus />);
    const icon = screen.getByTestId("icon");
    expect(icon).toHaveAttribute("data-name", "Heart");
    expect(icon).toHaveAttribute("data-size", "20");
    expect(icon).toHaveClass("text-red-500 mr-3");
  });

  it("renders the main description paragraph", () => {
    render(<CurrentFocus />);
    expect(
      screen.getByText(/Actualmente estoy profundizando mis conocimientos en:/i)
    ).toBeInTheDocument();
  });

  it("renders all section headings", () => {
    render(<CurrentFocus />);
    expect(screen.getByText("Enfoque Actual")).toBeInTheDocument();
    const nextjsElements = screen.getAllByText("Next.js 15 y React Server Components");
    expect(nextjsElements.length).toBeGreaterThanOrEqual(1);
    expect(screen.getByText("Accesibilidad web (WCAG AAA)")).toBeInTheDocument();
  });

  it("renders all section descriptions", () => {
    render(<CurrentFocus />);
    expect(
      screen.getByText("Optimización de rendimiento web")
    ).toBeInTheDocument();
  });

  it("renders the space-y-4 container", () => {
    render(<CurrentFocus />);
    const container = document.querySelector(".space-y-4");
    expect(container).toBeInTheDocument();
  });
});
