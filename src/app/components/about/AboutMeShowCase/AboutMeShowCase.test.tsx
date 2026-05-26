import React from "react";
import { screen } from "@testing-library/react";
import { AboutMeShowcase } from "./AboutMeShowCase";
import "@testing-library/jest-dom";
import { renderWithProviders } from "@/test/utils";

// Mock next-intl

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
    renderWithProviders(<AboutMeShowcase />);
    const container = screen.getByText("Sobre Mí").closest("div");
    expect(container).toHaveClass("text-center", "mb-12");
  });

  it("renders the section with id 'sobre-mi'", () => {
    renderWithProviders(<AboutMeShowcase />);
    expect(document.getElementById("sobre-mi")).toBeInTheDocument();
  });

  it("renders the main heading", () => {
    renderWithProviders(<AboutMeShowcase />);
    expect(
      screen.getByRole("heading", { name: "Sobre Mí" })
    ).toBeInTheDocument();
  });

  it("renders the call-to-action card", () => {
    renderWithProviders(<AboutMeShowcase />);
    expect(
      screen.getByText("¿Interesado en colaborar?")
    ).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Hablemos" })).toHaveAttribute(
      "href",
      "#contacto"
    );
    expect(
      screen.getByRole("link", { name: "Ver mi Trabajo" })
    ).toHaveAttribute("href", "#proyectos");
  });

  it("renders all child components", () => {
    renderWithProviders(<AboutMeShowcase />);
    expect(screen.getByTestId("MyJourney")).toBeInTheDocument();
    expect(screen.getByTestId("RolesAndEvolution")).toBeInTheDocument();
    expect(screen.getByTestId("AdditionalInfo")).toBeInTheDocument();
    expect(screen.getByTestId("CurrentFocus")).toBeInTheDocument();
    expect(screen.getByTestId("BeyondTheCode")).toBeInTheDocument();
  });
});
