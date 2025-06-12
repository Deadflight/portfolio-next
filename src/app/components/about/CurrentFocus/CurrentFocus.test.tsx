import React from "react";
import { render, screen } from "@testing-library/react";
import { CurrentFocus } from "./CurrentFocus";
import "@testing-library/jest-dom";
import { IIconProps } from "@/shared/types/icons.types";

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
    expect(screen.getByText("Mi Enfoque Actual")).toBeInTheDocument();
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
      screen.getByText(
        /Mi enfoque actual se basa en el desarrollo centrado en el usuario/i
      )
    ).toBeInTheDocument();
  });

  it("renders all section headings", () => {
    render(<CurrentFocus />);
    expect(screen.getByText("Soluciones Escalables")).toBeInTheDocument();
    expect(screen.getByText("Colaboración Internacional")).toBeInTheDocument();
    expect(screen.getByText("Impacto Medible")).toBeInTheDocument();
  });

  it("renders all section descriptions", () => {
    render(<CurrentFocus />);
    expect(
      screen.getByText(/Diseño arquitecturas que crecen con el negocio/i)
    ).toBeInTheDocument();
    expect(
      screen.getByText(/Experiencia trabajando remotamente con equipos/i)
    ).toBeInTheDocument();
    expect(
      screen.getByText(/Cada proyecto busca resultados concretos/i)
    ).toBeInTheDocument();
  });

  it("renders the space-y-4 container", () => {
    render(<CurrentFocus />);
    const container = document.querySelector(".space-y-4");
    expect(container).toBeInTheDocument();
  });
});
