import React from "react";
import { render, screen } from "@testing-library/react";
import { AboutMeShowcase } from "./AboutMeShowCase";
import "@testing-library/jest-dom";

// Mock child components to isolate AboutMeShowcase
jest.mock("../MyJourney/MyJourney", () => ({
  MyJourney: () => <div data-testid="MyJourney" />,
}));
jest.mock("../RolesAndEvolution/RolesAndEvolution", () => ({
  RolesAndEvolution: () => <div data-testid="RolesAndEvolution" />,
}));
jest.mock("../AdditionalInfo/AdditionalInfo", () => ({
  AdditionalInfo: () => <div data-testid="AdditionalInfo" />,
}));
jest.mock("../CurrentFocus/CurrentFocus", () => ({
  CurrentFocus: () => <div data-testid="CurrentFocus" />,
}));
jest.mock("../BeyondTheCode/BeyondTheCode", () => ({
  BeyondTheCode: () => <div data-testid="BeyondTheCode" />,
}));

describe("AboutMeShowcase", () => {
  it("renders the main container with correct class", () => {
    render(<AboutMeShowcase />);
    const container = screen.getByText("Sobre Mí").closest("div");
    expect(container).toHaveClass("text-center", "mb-12");
  });

  it("renders the section with id 'sobre-mi'", () => {
    render(<AboutMeShowcase />);
    expect(document.getElementById("sobre-mi")).toBeInTheDocument();
  });

  it("renders the main heading", () => {
    render(<AboutMeShowcase />);
    expect(
      screen.getByRole("heading", { name: "Sobre Mí" })
    ).toBeInTheDocument();
  });

  it("renders the call-to-action card", () => {
    render(<AboutMeShowcase />);
    expect(
      screen.getByText("¿Te gustaría trabajar conmigo?")
    ).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Hablemos" })).toHaveAttribute(
      "href",
      "#contacto"
    );
    expect(
      screen.getByRole("link", { name: "Ver Mi Trabajo" })
    ).toHaveAttribute("href", "#proyectos");
  });

  it("renders all child components", () => {
    render(<AboutMeShowcase />);
    expect(screen.getByTestId("MyJourney")).toBeInTheDocument();
    expect(screen.getByTestId("RolesAndEvolution")).toBeInTheDocument();
    expect(screen.getByTestId("AdditionalInfo")).toBeInTheDocument();
    expect(screen.getByTestId("CurrentFocus")).toBeInTheDocument();
    expect(screen.getByTestId("BeyondTheCode")).toBeInTheDocument();
  });
});
