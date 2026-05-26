import React from "react";
import { render, screen } from "@testing-library/react";
import { Footer } from "./Footer";
import { IIconProps } from "../../../shared/types/icons.types";

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
    email: "carlos@correa.dev",
    phone: "+34612345678",
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
    expect(screen.getByTestId("footer-link-inicio")).toHaveAttribute("href", "#inicio");
    expect(screen.getByTestId("footer-link-experiencia")).toHaveAttribute("href", "#experiencia");
    expect(screen.getByTestId("footer-link-proyectos")).toHaveAttribute("href", "#proyectos");
    expect(screen.getByTestId("footer-link-sobre-mi")).toHaveAttribute("href", "#sobre-mi");
    expect(screen.getByTestId("footer-link-habilidades")).toHaveAttribute("href", "#habilidades");
    expect(screen.getByTestId("footer-link-contacto")).toHaveAttribute("href", "#contacto");
  });

  it("renders contact email and phone", () => {
    const emailLink = screen.getByRole("link", { name: /contact.email: carlos@correa.dev/i });
    expect(emailLink).toHaveAttribute("href", "mailto:carlos@correa.dev");
    expect(emailLink).toHaveTextContent("carlos@correa.dev");

    const phoneLink = screen.getByRole("link", { name: /contact.phone: \+34 612 345 678/i });
    expect(phoneLink).toHaveAttribute("href", "tel:+34612345678");
    expect(phoneLink).toHaveTextContent("+34 612 345 678");
  });

  it("renders 'Trabajo Remoto' text", () => {
    expect(screen.getByText("Trabajo Remoto")).toBeInTheDocument();
  });

  it("renders copyright with current year", () => {
    const year = new Date().getFullYear();
    expect(
      screen.getByText(new RegExp(`© ${year} Carlos Correa. Todos los derechos reservados.`))
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