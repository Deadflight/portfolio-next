import React from "react";
import { renderWithI18n as render, screen } from "@/test/utils";
import { ContactInformation } from "./ContactInformation";
import { IIconProps } from "../../../shared/types/icons.types";
import { SocialLinkProps } from "../../../shared/components/SocialLink/SocialLink";
import { ContactInformationSocialLinks } from "../../../shared/types/contact.types";
import "@testing-library/jest-dom";

jest.mock("../../../shared/components/Icons/Icons", () => ({
  Icon: ({ name, size, className }: IIconProps) => (
    <span data-testid={`icon-${name}`} className={className}>
      {name}-{size}
    </span>
  ),
  SvgIcons: { Twitter: {}, GitHub: {}, LinkedIn: {} },
}));

jest.mock("../../../shared/components/SocialLink/SocialLink", () => ({
  SocialLink: ({ href, ariaLabel, children }: SocialLinkProps) => (
    <a href={href} aria-label={ariaLabel} data-testid="social-link">
      {children}
    </a>
  ),
}));

describe("ContactInformation", () => {
  const socialLinks: ContactInformationSocialLinks[] = [
    { linkUrl: "https://github.com/username", linkLabel: "GitHub", linkIcon: "GitHub" },
    { linkUrl: "https://linkedin.com/in/username", linkLabel: "Linkedin", linkIcon: "Linkedin" },
  ];

  it("renders contact information headings", () => {
    render(<ContactInformation socialLinks={socialLinks} />);
    expect(screen.getByText("Información de contacto")).toBeInTheDocument();
    expect(screen.getByText("Seguime en redes")).toBeInTheDocument();
  });

  it("renders email, phone, portfolio, and availability", () => {
    render(<ContactInformation socialLinks={socialLinks} />);
    expect(screen.getByText("Email")).toBeInTheDocument();
    expect(screen.getByText(/correamillancarlos@gmail.com/i)).toBeInTheDocument();
    expect(screen.getByText("Teléfono")).toBeInTheDocument();
    expect(screen.getByText(/\+584248599166/i)).toBeInTheDocument();
    expect(screen.getByText("Portfolio")).toBeInTheDocument();
    expect(screen.getByText(/www.carlos-correa.com/i)).toBeInTheDocument();
    expect(screen.getAllByText("Disponible para proyectos freelance").length).toBeGreaterThan(0);
  });

  it("renders the correct icons for contact info", () => {
    render(<ContactInformation socialLinks={socialLinks} />);
    expect(screen.getByTestId("icon-Mail")).toBeInTheDocument();
    expect(screen.getByTestId("icon-Phone")).toBeInTheDocument();
    expect(screen.getByTestId("icon-Globe")).toBeInTheDocument();
    expect(screen.getByTestId("icon-MapPin")).toBeInTheDocument();
  });

  it("renders social links with correct href and aria-label", () => {
    render(<ContactInformation socialLinks={socialLinks} />);
    const links = screen.getAllByTestId("social-link");
    expect(links).toHaveLength(socialLinks.length);
    socialLinks.forEach((link, idx) => {
      expect(links[idx]).toHaveAttribute("href", link.linkUrl);
      expect(links[idx]).toHaveAttribute("aria-label", link.linkLabel);
    });
  });

  it("renders the correct icons for social links", () => {
    render(<ContactInformation socialLinks={socialLinks} />);
    expect(screen.getByTestId("icon-GitHub")).toBeInTheDocument();
    expect(screen.getByTestId("icon-Linkedin")).toBeInTheDocument();
  });
});