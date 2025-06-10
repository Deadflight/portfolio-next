import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import ProfessionalIdentityHero from "./index";
import { IIconProps } from "@/shared/types/icons.types";

// Mock child components
jest.mock("../ProfessionalActions", () => ({
  ProfessionalActions: () => <div data-testid="professional-actions" />,
}));
jest.mock("../SocialProfileLinks", () => ({
  SocialProfileLinks: () => <div data-testid="social-profile-links" />,
}));
jest.mock("../../../../shared/components/icons", () => ({
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
  it("renders the section with correct id and aria-label", () => {
    render(<ProfessionalIdentityHero />);
    const section = screen.getByRole("region", {
      name: /professional introduction and brand statement/i,
    });
    expect(section).toBeInTheDocument();
    expect(section).toHaveAttribute("id", "inicio");
  });

  it("renders the full name, professional title, and value proposition", () => {
    render(<ProfessionalIdentityHero />);
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
        /más de 3 años de experiencia creando aplicaciones web escalables con react, node\.js y aws\./i
      )
    ).toBeInTheDocument();
  });

  it("renders ProfessionalActions and SocialProfileLinks components", () => {
    render(<ProfessionalIdentityHero />);
    expect(screen.getByTestId("professional-actions")).toBeInTheDocument();
    expect(screen.getByTestId("social-profile-links")).toBeInTheDocument();
  });

  it("renders the ChevronDown icon with correct props", () => {
    render(<ProfessionalIdentityHero />);
    const icon = screen.getByTestId("icon");
    expect(icon).toHaveAttribute("data-name", "ChevronDown");
    expect(icon).toHaveAttribute("data-size", "28");
    expect(icon).toHaveClass("text-accent");
    expect(icon).toHaveClass("mx-auto");
  });

  it("renders the bouncing animation container", () => {
    render(<ProfessionalIdentityHero />);
    const bounceDiv = screen
      .getByLabelText(/professional introduction and brand statement/i)
      .querySelector(".animate-bounce");
    expect(bounceDiv).toBeInTheDocument();
    expect(bounceDiv).toHaveAttribute("aria-hidden", "true");
  });
});
