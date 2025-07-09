import React from "react";
import { render, screen } from "@testing-library/react";
import { SocialProfileLinks } from "./SocialProfileLinks";
import "@testing-library/jest-dom";

// Mock the Icon component
jest.mock("../../../../shared/components/Icons/Icons", () => ({
  Icon: ({ name, size }: { name: string; size: number }) => (
    <span data-testid="icon" data-name={name} data-size={size} />
  ),
}));

describe("SocialProfileLinks", () => {
  it("renders a nav with correct aria-label", () => {
    render(<SocialProfileLinks />);
    const nav = screen.getByRole("navigation", {
      name: /professional social profiles/i,
    });
    expect(nav).toBeInTheDocument();
  });

  it("renders all social profile links", () => {
    render(<SocialProfileLinks />);
    const links = screen.getAllByRole("link");
    expect(links).toHaveLength(3);
  });

  it("renders GitHub link with correct attributes", () => {
    render(<SocialProfileLinks />);
    const githubLink = screen.getByRole("link", {
      name: /github/i,
    });
    expect(githubLink).toHaveAttribute("href", "https://github.com/Deadflight");
    expect(githubLink).toHaveAttribute("target", "_blank");
    expect(githubLink).toHaveAttribute("rel", "noopener noreferrer");
    expect(
      githubLink.querySelector('[data-testid="icon"][data-name="GitHub"]')
    ).toBeInTheDocument();
  });

  it("renders LinkedIn link with correct attributes", () => {
    render(<SocialProfileLinks />);
    const linkedinLink = screen.getByRole("link", {
      name: /linkedin/i,
    });
    expect(linkedinLink).toHaveAttribute(
      "href",
      "https://linkedin.com/in/carloscorreamillan"
    );
    expect(linkedinLink).toHaveAttribute("target", "_blank");
    expect(linkedinLink).toHaveAttribute("rel", "noopener noreferrer");
    expect(
      linkedinLink.querySelector('[data-testid="icon"][data-name="Linkedin"]')
    ).toBeInTheDocument();
  });

  it("renders Email link with correct attributes", () => {
    render(<SocialProfileLinks />);
    const emailLink = screen.getByRole("link", {
      name: /email/i,
    });
    expect(emailLink).toHaveAttribute(
      "href",
      "mailto:correamillancarlos@gmail.com"
    );
    expect(emailLink).not.toHaveAttribute("target");
    expect(emailLink).not.toHaveAttribute("rel");
    expect(
      emailLink.querySelector('[data-testid="icon"][data-name="Mail"]')
    ).toBeInTheDocument();
  });
});
