import React from "react";
import { render, screen } from "@testing-library/react";
import { RolesAndEvolution } from "./RolesAndEvolution";
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

describe("RolesAndEvolution", () => {
  it("renders the article card with the correct title", () => {
    render(<RolesAndEvolution />);
    expect(
      screen.getByRole("heading", { name: /Roles y Evolución/i })
    ).toBeInTheDocument();
  });

  it("renders the Icon with correct props", () => {
    render(<RolesAndEvolution />);
    const icon = screen.getByTestId("icon");
    expect(icon).toHaveAttribute("data-name", "Lightbulb");
    expect(icon).toHaveAttribute("data-size", "20");
    expect(icon).toHaveClass("text-text-main");
  });

  it("renders both paragraphs with expected content", () => {
    render(<RolesAndEvolution />);
    expect(
      screen.getByText(
        /Mi evolución profesional me ha llevado desde el desarrollo frontend/i
      )
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        /En Farmaloop, lideré el desarrollo de sistemas complejos/i
      )
    ).toBeInTheDocument();
  });

  it("renders the article with the card class", () => {
    render(<RolesAndEvolution />);
    expect(screen.getByRole("article")).toHaveClass("card");
  });
});
