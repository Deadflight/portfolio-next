import React from "react";
import { render, screen } from "@testing-library/react";
import { Contact } from "./Contact";
import { ContactInformationProps } from "./ContactInformation";

jest.mock("./ContactInformation", () => ({
  ContactInformation: ({ socialLinks }: ContactInformationProps) => (
    <div data-testid="contact-information">
      {socialLinks.map((link) => (
        <span key={link.linkLabel}>{link.linkLabel}</span>
      ))}
    </div>
  ),
}));

jest.mock("./ContactForm", () => ({
  ContactForm: () => <form data-testid="contact-form" />,
}));

jest.mock("../../../constants/contactInformation", () => ({
  contactInformation: {
    github: "https://github.com/test",
    linkedin: "https://linkedin.com/in/test",
  },
}));

describe("Contact", () => {
  it("renders section with correct id and classes", () => {
    const { container } = render(<Contact />);
    const section = container.querySelector("#contacto");
    expect(section).not.toBeNull();
    expect(section).toHaveClass("py-16");
  });

  it("renders heading and description", () => {
    render(<Contact />);
    expect(
      screen.getByRole("heading", { name: /contacto/i })
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        /¿Tienes un proyecto en mente\? Me encantaría escuchar sobre él/i
      )
    ).toBeInTheDocument();
  });

  it("renders ContactInformation with social links", () => {
    render(<Contact />);
    expect(screen.getByTestId("contact-information")).toBeInTheDocument();
    expect(screen.getByText("GitHub")).toBeInTheDocument();
    expect(screen.getByText("LinkedIn")).toBeInTheDocument();
  });

  it("renders ContactForm", () => {
    render(<Contact />);
    expect(screen.getByTestId("contact-form")).toBeInTheDocument();
  });
});
