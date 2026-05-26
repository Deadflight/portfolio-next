import React from "react";
import { screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { renderWithProviders } from "@/test/utils";
import { IIconProps } from "@/shared/types/icons.types";
import { ProfessionalIdentityHero } from "./ProfessionalIdentityHero";

// Mock next-intl

// Mock child components
jest.mock("../ProfessionalActions/ProfessionalActions", () => ({
  ProfessionalActions: () => <div data-testid="professional-actions" />,
}));
jest.mock("../SocialProfileLinks/SocialProfileLinks", () => ({
  SocialProfileLinks: () => <div data-testid="social-profile-links" />,
}));
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

describe("ProfessionalIdentityHero", () => {
  it("renders the section with correct id", () => {
    renderWithProviders(<ProfessionalIdentityHero />);
    const section = document.getElementById("inicio");
    expect(section).toBeInTheDocument();
  });

  it("renders the full name, professional title, and value proposition", () => {
    renderWithProviders(<ProfessionalIdentityHero />);
    expect(
      screen.getByRole("heading", { level: 1, name: /carlos correa/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", {
        level: 2,
        name: /desarrollador full stack/i,
      })
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        /Más de 3 años de experiencia creando aplicaciones web escalables con react, node\.js y aws/i
      )
    ).toBeInTheDocument();
  });

  it("renders ProfessionalActions and SocialProfileLinks components", () => {
    renderWithProviders(<ProfessionalIdentityHero />);
    expect(screen.getByTestId("professional-actions")).toBeInTheDocument();
    expect(screen.getByTestId("social-profile-links")).toBeInTheDocument();
  });

  it("renders the ChevronDown icon with correct props", () => {
    renderWithProviders(<ProfessionalIdentityHero />);
    const icon = screen.getByTestId("icon");
    expect(icon).toHaveAttribute("data-name", "ChevronDown");
    expect(icon).toHaveAttribute("data-size", "28");
    expect(icon).toHaveClass("text-accent");
    expect(icon).toHaveClass("mx-auto");
  });

  it("renders the bouncing animation container", () => {
    renderWithProviders(<ProfessionalIdentityHero />);
    const section = document.getElementById("inicio");
    const bounceDiv = section?.querySelector(".animate-bounce");
    expect(bounceDiv).toBeInTheDocument();
  });
});
