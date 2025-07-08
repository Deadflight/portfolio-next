import React from "react";
import { render, screen } from "@testing-library/react";
import { SkillsLanguage } from "./SkillsLanguage";
import { within } from "@testing-library/react";

// Mock the Icon component
jest.mock("../../../shared/components/Icons/Icons", () => ({
  Icon: ({ name, ...props }: { name: string }) => (
    <span data-testid={`icon-${name}`} {...props} />
  ),
}));

describe("SkillsLanguage", () => {
  beforeEach(() => {
    render(<SkillsLanguage />);
  });

  it("renders the section with the correct title", () => {
    expect(
      screen.getByRole("heading", { name: /idiomas/i, level: 2 })
    ).toBeInTheDocument();
  });

  it("renders Español card with 5 stars", () => {
    const spanishRegion = screen.getByRole("region", { name: "Español" });
    expect(spanishRegion).toBeInTheDocument();
    expect(
      within(spanishRegion).getByRole("heading", { name: "Español", level: 3 })
    ).toBeInTheDocument();
    expect(within(spanishRegion).getByText(/nativo/i)).toBeInTheDocument();
    expect(
      within(spanishRegion).getByText(/comunicación profesional/i)
    ).toBeInTheDocument();
    expect(within(spanishRegion).getAllByTestId("icon-Star")).toHaveLength(5);
  });

  it("renders Inglés card with 5 stars, 3 colored", () => {
    const englishRegion = screen.getByRole("region", { name: "Inglés" });
    expect(englishRegion).toBeInTheDocument();
    expect(
      within(englishRegion).getByRole("heading", { name: "Inglés", level: 3 })
    ).toBeInTheDocument();
    expect(
      within(englishRegion).getByText(/b1 - intermedio/i)
    ).toBeInTheDocument();
    expect(
      within(englishRegion).getByText(/comunicación técnica escrita/i)
    ).toBeInTheDocument();
    const stars = within(englishRegion).getAllByTestId("icon-Star");
    expect(stars).toHaveLength(5);
    // Check className for colored stars
    const coloredStars = stars.filter((star) =>
      (star as HTMLElement).className?.includes("text-text-main")
    );
    expect(coloredStars).toHaveLength(3);
  });

  it("renders the Globe icon in the header", () => {
    expect(screen.getByTestId("icon-Globe")).toBeInTheDocument();
  });

  it("has accessible regions for each language", () => {
    const regions = screen.getAllByRole("region");
    const languageRegions = regions.filter(
      (region) =>
        region.getAttribute("aria-label") === "Español" ||
        region.getAttribute("aria-label") === "Inglés"
    );
    expect(languageRegions).toHaveLength(2);
    expect(languageRegions[0]).toHaveAttribute("aria-label", "Español");
    expect(languageRegions[1]).toHaveAttribute("aria-label", "Inglés");
  });
});
