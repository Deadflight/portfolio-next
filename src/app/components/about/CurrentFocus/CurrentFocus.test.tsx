import React from "react";
import { screen } from "@testing-library/react";
import { CurrentFocus } from "./CurrentFocus";
import "@testing-library/jest-dom";
import { renderWithProviders } from "@/test/utils";
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
    renderWithProviders(<CurrentFocus />);
    expect(screen.getByRole("article")).toHaveClass("card");
  });

  it("renders the main heading", () => {
    renderWithProviders(<CurrentFocus />);
    expect(screen.getByText("Mi Enfoque Actual")).toBeInTheDocument();
  });

  it("renders the icon with correct props", () => {
    renderWithProviders(<CurrentFocus />);
    const icon = screen.getByTestId("icon");
    expect(icon).toHaveAttribute("data-name", "Heart");
    expect(icon).toHaveAttribute("data-size", "20");
    expect(icon).toHaveClass("text-red-500 mr-3");
  });

  it("renders the main description paragraph", () => {
    renderWithProviders(<CurrentFocus />);
    expect(
      screen.getByText(/Mi enfoque actual se basa en el desarrollo centrado en el usuario/i)
    ).toBeInTheDocument();
  });

  it("renders all section headings", () => {
    renderWithProviders(<CurrentFocus />);
    expect(screen.getByText("Mi Enfoque Actual")).toBeInTheDocument();
    const soluciones = screen.getAllByText("Soluciones Escalables");
    expect(soluciones.length).toBeGreaterThanOrEqual(1);
    expect(screen.getByText("Colaboración Internacional")).toBeInTheDocument();
  });

  it("renders all section descriptions", () => {
    renderWithProviders(<CurrentFocus />);
    expect(
      screen.getByText(/Diseño arquitecturas que crecen con el negocio/i)
    ).toBeInTheDocument();
  });

  it("renders the space-y-4 container", () => {
    renderWithProviders(<CurrentFocus />);
    const container = document.querySelector(".space-y-4");
    expect(container).toBeInTheDocument();
  });
});
