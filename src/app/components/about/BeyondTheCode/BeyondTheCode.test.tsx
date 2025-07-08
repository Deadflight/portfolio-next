import React from "react";
import { render, screen } from "@testing-library/react";
import { BeyondTheCode } from "./BeyondTheCode";
import "@testing-library/jest-dom";
import { IIconProps } from "@/shared/types/icons.types";

// Mock the Icon component
jest.mock("../../../../shared/components/Icons/Icons", () => ({
  Icon: (props: IIconProps) => <span data-testid="icon" {...props} />,
}));

describe("BeyondTheCode", () => {
  it("renders the card article", () => {
    render(<BeyondTheCode />);
    expect(screen.getByRole("article")).toBeInTheDocument();
  });

  it("renders the heading with correct text", () => {
    render(<BeyondTheCode />);
    expect(
      screen.getByRole("heading", { name: /más allá del código/i })
    ).toBeInTheDocument();
  });

  it("renders the Icon component", () => {
    render(<BeyondTheCode />);
    expect(screen.getByTestId("icon")).toBeInTheDocument();
    expect(screen.getByTestId("icon")).toHaveAttribute("name", "Coffee");
  });

  it("renders the main paragraph", () => {
    render(<BeyondTheCode />);
    expect(
      screen.getByText(/más allá del desarrollo, busco crecer/i)
    ).toBeInTheDocument();
  });

  it("renders all list items with correct text", () => {
    render(<BeyondTheCode />);
    const items = [
      /aprender y experimentar con tecnologías emergentes/i,
      /mejorar mi inglés para comunicarme con fluidez/i,
      /curiosear en nuevos retos y desafíos tecnológicos/i,
      /disfrutar de la cocina, juegos de rol, rpg y estrategia/i,
    ];
    items.forEach((text) => {
      expect(screen.getByText(text)).toBeInTheDocument();
    });
  });

  it("renders four bullet points", () => {
    render(<BeyondTheCode />);
    expect(screen.getAllByRole("listitem")).toHaveLength(4);
  });
});
