import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { ScrollToTopButton } from "./ScrollToTopButton";

describe("ScrollToTopButton", () => {
  beforeEach(() => {
    window.scrollTo = jest.fn();
  });

  it("renders the button with correct aria-label", () => {
    render(<ScrollToTopButton />);
    const button = screen.getByRole("button", { name: /volver arriba/i });
    expect(button).toBeInTheDocument();
  });

  it("calls window.scrollTo with correct arguments when clicked", () => {
    render(<ScrollToTopButton />);
    const button = screen.getByRole("button", { name: /volver arriba/i });
    fireEvent.click(button);
    expect(window.scrollTo).toHaveBeenCalledWith({
      top: 0,
      behavior: "smooth",
    });
  });

  it("renders the ChevronUp icon", () => {
    render(<ScrollToTopButton />);
    // Busca el icono por su título o por el nombre del icono si el componente Icon lo expone
    // Suponiendo que el Icon renderiza un elemento con aria-label, title o data-testid
    // Ajusta el selector según la implementación real del componente Icon
    const icon =
      screen.getByTestId("icon-chevronup") ||
      screen.getByLabelText(/chevronup/i) ||
      screen.getByTitle(/chevronup/i);
    expect(icon).toBeInTheDocument();
  });
});
