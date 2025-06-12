import React from "react";
import { render, screen } from "@testing-library/react";
import { AdditionalInfo } from "./AdditionalInfo";
import "@testing-library/jest-dom";

// Mock the Icon component
jest.mock("../../../../shared/components/Icons/Icons", () => ({
  Icon: ({ name, ...props }: { name: string }) => (
    <span data-testid={`icon-${name}`} {...props} />
  ),
}));

describe("AdditionalInfo", () => {
  beforeEach(() => {
    render(<AdditionalInfo />);
  });

  it("renders the card container", () => {
    expect(screen.getByRole("article")).toBeInTheDocument();
  });

  it("renders all info sections", () => {
    expect(screen.getByText("Ubicación")).toBeInTheDocument();
    expect(screen.getByText("Trabajo Remoto")).toBeInTheDocument();

    expect(screen.getByText("Experiencia")).toBeInTheDocument();
    expect(screen.getByText("3+ Años")).toBeInTheDocument();

    expect(screen.getByText("Idiomas")).toBeInTheDocument();
    expect(
      screen.getByText("Español (Nativo), Inglés (B1)")
    ).toBeInTheDocument();

    expect(screen.getByText("Filosofía")).toBeInTheDocument();
    expect(
      screen.getByText(
        /Hacer las cosas bien y con buena actitud, buscando siempre dar ese paso extra./
      )
    ).toBeInTheDocument();
  });

  it("renders all icons", () => {
    expect(screen.getByTestId("icon-Location")).toBeInTheDocument();
    expect(screen.getByTestId("icon-Calendar")).toBeInTheDocument();
    expect(screen.getByTestId("icon-Language")).toBeInTheDocument();
    expect(screen.getByTestId("icon-Star")).toBeInTheDocument();
  });
});
