import React from "react";
import { screen, fireEvent, within } from "@testing-library/react";
import { NavigationExperience } from "./Navigation";
import { renderWithProviders } from "@/test/utils";

jest.mock("../Icons/Icons", () => ({
  Icon: ({ name, ...props }: { name: string }) => (
    <span data-testid={`icon-${name}`} {...props} />
  ),
}));

describe("NavigationExperience", () => {
  it("renders the professional brand heading", () => {
    renderWithProviders(<NavigationExperience />);
    expect(screen.getByText(/Carlos Correa/i)).toBeInTheDocument();
  });

  it("renders all main navigation links in desktop mode", () => {
    renderWithProviders(<NavigationExperience />);
    expect(screen.getByTestId("nav-link-inicio")).toBeInTheDocument();
    expect(screen.getByTestId("nav-link-experiencia")).toBeInTheDocument();
    expect(screen.getByTestId("nav-link-proyectos")).toBeInTheDocument();
    expect(screen.getByTestId("nav-link-sobre-mi")).toBeInTheDocument();
    expect(screen.getByTestId("nav-link-habilidades")).toBeInTheDocument();
    expect(screen.getByTestId("nav-link-contacto")).toBeInTheDocument();
  });

  it("renders navigation links with correct hrefs", () => {
    renderWithProviders(<NavigationExperience />);
    expect(screen.getByTestId("nav-link-inicio")).toHaveAttribute("href", "#inicio");
    expect(screen.getByTestId("nav-link-experiencia")).toHaveAttribute("href", "#experiencia");
    expect(screen.getByTestId("nav-link-proyectos")).toHaveAttribute("href", "#proyectos");
    expect(screen.getByTestId("nav-link-sobre-mi")).toHaveAttribute("href", "#sobre-mi");
    expect(screen.getByTestId("nav-link-habilidades")).toHaveAttribute("href", "#habilidades");
    expect(screen.getByTestId("nav-link-contacto")).toHaveAttribute("href", "#contacto");
  });

  it("toggles mobile menu when menu button is clicked", () => {
    renderWithProviders(<NavigationExperience />);
    
    // Mobile menu should not be visible initially
    expect(screen.queryByTestId("mobile-menu")).not.toBeInTheDocument();
    
    const menuButton = screen.getByRole("button", { name: /Alternar menú/i });
    fireEvent.click(menuButton);
    
    // Mobile menu should be visible after clicking
    expect(screen.getByTestId("mobile-menu")).toBeInTheDocument();
  });

  it("closes mobile menu when a link is clicked", () => {
    renderWithProviders(<NavigationExperience />);
    const menuButton = screen.getByRole("button", { name: /Alternar menú/i });
    fireEvent.click(menuButton);
    
    // Mobile menu is now open
    const mobileMenu = screen.getByTestId("mobile-menu");
    expect(mobileMenu).toBeInTheDocument();
    
    // Click on a mobile link (within the mobile menu)
    const mobileLink = within(mobileMenu).getByTestId("nav-link-inicio");
    fireEvent.click(mobileLink);
    
    // Mobile menu should close
    expect(screen.queryByTestId("mobile-menu")).not.toBeInTheDocument();
  });
});