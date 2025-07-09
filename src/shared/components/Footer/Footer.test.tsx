import React from "react";
import { render, screen } from "@testing-library/react";
import { Footer } from "./Footer";
import { IIconProps } from "../../../shared/types/icons.types";

// Mock dependencies
jest.mock("../Icons/Icons", () => ({
  Icon: ({ name, size, className }: IIconProps) => (
    <span
      data-testid="icon"
      data-name={name}
      data-size={size}
      className={className}
    />
  ),
}));
jest.mock("../ScrollToTopButton/ScrollToTopButton", () => ({
  ScrollToTopButton: () => (
    <button data-testid="scroll-to-top">Scroll to Top</button>
  ),
}));
jest.mock("../../../constants/contactInformation", () => ({
  contactInformation: {
    email: "test@example.com",
    phone: "+1234567890",
  },
}));

describe("Footer", () => {
  beforeEach(() => {
    render(<Footer />);
  });

  it("renders the Portfolio heading", () => {
    expect(screen.getByText("Portfolio")).toBeInTheDocument();
  });

  it("renders the description about the developer", () => {
    expect(screen.getByText(/Desarrollador Full Stack/i)).toBeInTheDocument();
  });

  it("renders all quick navigation links", () => {
    const links = [
      { href: "#inicio", text: "Inicio" },
      { href: "#experiencia", text: "Experiencia" },
      { href: "#proyectos", text: "Proyectos" },
      { href: "#sobre-mi", text: "Sobre Mí" },
      { href: "#habilidades", text: "Habilidades" },
      { href: "#contacto", text: "Contacto" },
    ];
    links.forEach(({ href, text }) => {
      const link = screen.getByRole("link", { name: text });
      expect(link).toHaveAttribute("href", href);
    });
  });

  it("renders contact email and phone", () => {
    const emailLink = screen.getByRole("link", { name: /Enviar correo/i });
    expect(emailLink).toHaveAttribute("href", "mailto:test@example.com");
    expect(emailLink).toHaveTextContent("test@example.com");

    const phoneLink = screen.getByRole("link", { name: /Llamar al/i });
    expect(phoneLink).toHaveAttribute("href", "tel:+1234567890");
    expect(phoneLink).toHaveTextContent("+1234567890");
  });

  it("renders 'Trabajo Remoto' text", () => {
    expect(screen.getByText("Trabajo Remoto")).toBeInTheDocument();
  });

  it("renders copyright with current year", () => {
    const year = new Date().getFullYear();
    expect(
      screen.getByText(new RegExp(`© ${year} Portfolio`))
    ).toBeInTheDocument();
  });

  it("renders the heart icon", () => {
    const icon = screen.getByTestId("icon");
    expect(icon).toHaveAttribute("data-name", "Heart");
  });

  it("renders the ScrollToTopButton", () => {
    expect(screen.getByTestId("scroll-to-top")).toBeInTheDocument();
  });
});
