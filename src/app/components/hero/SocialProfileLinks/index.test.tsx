import React from "react";
import { render, screen } from "@testing-library/react";
import { SocialProfileLinks } from "./index";
import "@testing-library/jest-dom";

// Mock the Icon component
jest.mock("../../../../shared/components/icons", () => ({
  Icon: ({ name, size }: { name: string; size: number }) => (
    <span data-testid={`icon-${name.toLowerCase()}`} data-size={size} />
  ),
}));

describe("SocialProfileLinks", () => {
  it("renders a nav with aria-label", () => {
    render(<SocialProfileLinks />);
    expect(
      screen.getByRole("navigation", { name: /professional social profiles/i })
    ).toBeInTheDocument();
  });

  it("renders all social profile links with correct aria-labels", () => {
    render(<SocialProfileLinks />);
    expect(
      screen.getByLabelText("Perfil de GitHub de Carlos Correa")
    ).toBeInTheDocument();
    expect(
      screen.getByLabelText("Perfil de LinkedIn de Carlos Correa")
    ).toBeInTheDocument();
    expect(
      screen.getByLabelText("Enviar email a Carlos Correa")
    ).toBeInTheDocument();
  });

  it("renders links with correct hrefs", () => {
    render(<SocialProfileLinks />);
    expect(screen.getByLabelText(/github/i).closest("a")).toHaveAttribute(
      "href",
      "https://github.com/Deadflight"
    );
    expect(screen.getByLabelText(/linkedin/i).closest("a")).toHaveAttribute(
      "href",
      "https://linkedin.com/in/carloscorreamillan"
    );
    expect(screen.getByLabelText(/email/i).closest("a")).toHaveAttribute(
      "href",
      "mailto:correamillancarlos@gmail.com"
    );
  });

  it("renders icons with correct names and sizes", () => {
    render(<SocialProfileLinks />);
    expect(screen.getByTestId("icon-github")).toHaveAttribute(
      "data-size",
      "28"
    );
    expect(screen.getByTestId("icon-linkedin")).toHaveAttribute(
      "data-size",
      "28"
    );
    expect(screen.getByTestId("icon-mail")).toHaveAttribute("data-size", "28");
  });

  it("opens external links in a new tab with rel attributes, but not email", () => {
    render(<SocialProfileLinks />);
    const githubLink = screen.getByLabelText(/github/i).closest("a");
    const linkedinLink = screen.getByLabelText(/linkedin/i).closest("a");
    const emailLink = screen.getByLabelText(/email/i).closest("a");

    expect(githubLink).toHaveAttribute("target", "_blank");
    expect(githubLink).toHaveAttribute("rel", "noopener noreferrer");

    expect(linkedinLink).toHaveAttribute("target", "_blank");
    expect(linkedinLink).toHaveAttribute("rel", "noopener noreferrer");

    expect(emailLink).not.toHaveAttribute("target");
    expect(emailLink).not.toHaveAttribute("rel");
  });
});
