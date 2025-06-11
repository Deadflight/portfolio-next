import React from "react";
import { render, screen, fireEvent, within } from "@testing-library/react";
import { NavigationExperience } from "./Navigation";

// Mock the Icon component to avoid errors during tests
jest.mock("../Icons/Icons", () => ({
  Icon: ({ name, ...props }: { name: string }) => (
    <span data-testid={`icon-${name}`} {...props} />
  ),
}));

describe("NavigationExperience", () => {
  it("renders the professional brand heading", () => {
    render(<NavigationExperience />);
    expect(screen.getByText(/Carlos Correa Portfolio/i)).toBeInTheDocument();
  });

  it("renders all main navigation links in desktop mode", () => {
    render(<NavigationExperience />);
    // Desktop navigation is visible by default (lg:block)
    expect(screen.getByText("Inicio")).toBeInTheDocument();
    expect(screen.getByText("Experiencia")).toBeInTheDocument();
    expect(screen.getByText("Proyectos")).toBeInTheDocument();
    expect(screen.getByText("Sobre Mí")).toBeInTheDocument();
    expect(screen.getByText("Habilidades")).toBeInTheDocument();
    expect(screen.getByText("Contacto")).toBeInTheDocument();
  });

  it("renders navigation links with correct hrefs", () => {
    render(<NavigationExperience />);
    expect(screen.getByText("Inicio").closest("a")).toHaveAttribute(
      "href",
      "#inicio"
    );
    expect(screen.getByText("Experiencia").closest("a")).toHaveAttribute(
      "href",
      "#experiencia"
    );
    expect(screen.getByText("Proyectos").closest("a")).toHaveAttribute(
      "href",
      "#proyectos"
    );
    expect(screen.getByText("Sobre Mí").closest("a")).toHaveAttribute(
      "href",
      "#sobre-mi"
    );
    expect(screen.getByText("Habilidades").closest("a")).toHaveAttribute(
      "href",
      "#habilidades"
    );
    expect(screen.getByText("Contacto").closest("a")).toHaveAttribute(
      "href",
      "#contacto"
    );
  });

  it("toggles mobile menu when menu button is clicked", () => {
    render(<NavigationExperience />);
    const menuButton = screen.getByRole("button", {
      name: /toggle navigation menu/i,
    });

    // Mobile menu should not be visible initially
    expect(screen.queryByText("Inicio")).toBeInTheDocument(); // Desktop is always rendered
    // Simulate mobile by clicking the menu button
    fireEvent.click(menuButton);

    const mobileMenu = screen.getByTestId("mobile-menu"); // Asegúrate de tener data-testid en el contenedor del menú móvil
    // After clicking, mobile menu should render icons and links
    expect(screen.getByTestId("icon-X")).toBeInTheDocument();
    expect(within(mobileMenu).getByText("Inicio")).toBeInTheDocument();
    expect(within(mobileMenu).getByText("Experiencia")).toBeInTheDocument();
  });

  it("closes mobile menu when a link is clicked", () => {
    render(<NavigationExperience />);
    const menuButton = screen.getByRole("button", {
      name: /toggle navigation menu/i,
    });
    fireEvent.click(menuButton);

    const mobileLink = screen
      .getAllByText("Inicio")
      .find(
        (el) => el.closest("a") && el.closest("a")?.className.includes("flex")
      );
    expect(mobileLink).toBeInTheDocument();

    if (mobileLink) {
      fireEvent.click(mobileLink);
    }

    // After clicking, the mobile menu should close (icon-X disappears)
    expect(screen.queryByTestId("icon-X")).not.toBeInTheDocument();
  });
});
