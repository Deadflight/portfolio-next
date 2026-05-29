import React from "react";
import {
  renderWithI18n,
  render,
  screen,
  fireEvent,
  within,
  AllTheProviders,
} from "@/test/utils";
import { NavigationExperience } from "./Navigation";
import * as navigation from "@/i18n/navigation";

jest.mock("../Icons/Icons", () => ({
  Icon: ({ name, ...props }: { name: string }) => (
    <span data-testid={`icon-${name}`} {...props} />
  ),
}));

jest.mock("@/lib/theme/ThemeToggle", () => ({
  ThemeToggle: () => <button data-testid="theme-toggle-mock">Toggle</button>,
}));

const mockReplace = jest.fn();
jest.mock("@/i18n/navigation", () => ({
  usePathname: jest.fn(() => "/"),
  useRouter: jest.fn(() => ({ replace: mockReplace })),
}));

describe("NavigationExperience", () => {
  it("renders the professional brand heading", () => {
    renderWithI18n(<NavigationExperience />);
    expect(screen.getByText(/Carlos Correa/i)).toBeInTheDocument();
  });

  it("renders all main navigation links in desktop mode", () => {
    renderWithI18n(<NavigationExperience />);
    expect(screen.getByTestId("nav-link-home")).toBeInTheDocument();
    expect(screen.getByTestId("nav-link-experience")).toBeInTheDocument();
    expect(screen.getByTestId("nav-link-projects")).toBeInTheDocument();
    expect(screen.getByTestId("nav-link-about")).toBeInTheDocument();
    expect(screen.getByTestId("nav-link-skills")).toBeInTheDocument();
    expect(screen.getByTestId("nav-link-contact")).toBeInTheDocument();
  });

  it("renders navigation links with correct hrefs", () => {
    renderWithI18n(<NavigationExperience />);
    expect(screen.getByTestId("nav-link-home")).toHaveAttribute("href", "#home");
    expect(screen.getByTestId("nav-link-experience")).toHaveAttribute("href", "#experience");
    expect(screen.getByTestId("nav-link-projects")).toHaveAttribute("href", "#projects");
    expect(screen.getByTestId("nav-link-about")).toHaveAttribute("href", "#about");
    expect(screen.getByTestId("nav-link-skills")).toHaveAttribute("href", "#skills");
    expect(screen.getByTestId("nav-link-contact")).toHaveAttribute("href", "#contact");
  });

  it("toggles mobile menu when menu button is clicked", () => {
    renderWithI18n(<NavigationExperience />);

    // Mobile menu should not be visible initially
    expect(screen.queryByTestId("mobile-menu")).not.toBeInTheDocument();

    const menuButton = screen.getByRole("button", { name: /Alternar menú/i });
    fireEvent.click(menuButton);

    // Mobile menu should be visible after clicking
    expect(screen.getByTestId("mobile-menu")).toBeInTheDocument();
  });

  it("closes mobile menu when a link is clicked", () => {
    renderWithI18n(<NavigationExperience />);
    const menuButton = screen.getByRole("button", { name: /Alternar menú/i });
    fireEvent.click(menuButton);

    // Mobile menu is now open
    const mobileMenu = screen.getByTestId("mobile-menu");
    expect(mobileMenu).toBeInTheDocument();

    // Click on a mobile link (within the mobile menu)
    const mobileLink = within(mobileMenu).getByTestId("nav-link-home");
    fireEvent.click(mobileLink);

    // Mobile menu should close
    expect(screen.queryByTestId("mobile-menu")).not.toBeInTheDocument();
  });
});

describe("Language Switcher", () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  it("shows 'EN' toggle when current locale is Spanish", () => {
    renderWithI18n(<NavigationExperience />);
    expect(screen.getByTestId("locale-switcher")).toHaveTextContent("EN");
  });

  it("shows 'ES' toggle when current locale is English", () => {
    render(<NavigationExperience />, { wrapper: AllTheProviders });
    expect(screen.getByTestId("locale-switcher")).toHaveTextContent("ES");
  });

  it("has correct aria-label for language toggle (Spanish)", () => {
    renderWithI18n(<NavigationExperience />);
    expect(screen.getByTestId("locale-switcher")).toHaveAttribute(
      "aria-label",
      "Cambiar idioma"
    );
  });

  it("has correct aria-label for language toggle (English)", () => {
    render(<NavigationExperience />, { wrapper: AllTheProviders });
    expect(screen.getByTestId("locale-switcher")).toHaveAttribute(
      "aria-label",
      "Toggle language"
    );
  });

  it("calls router.replace with next locale on click (ES→EN)", () => {
    const mockReplace = jest.fn();
    (navigation.useRouter as jest.Mock).mockReturnValue({ replace: mockReplace });

    renderWithI18n(<NavigationExperience />);
    fireEvent.click(screen.getByTestId("locale-switcher"));

    expect(mockReplace).toHaveBeenCalledWith("/", { locale: "en" });
  });

  it("renders locale switcher in mobile menu", () => {
    renderWithI18n(<NavigationExperience />);
    const menuButton = screen.getByRole("button", { name: /Alternar menú/i });
    fireEvent.click(menuButton);
    expect(screen.getByTestId("locale-switcher-mobile")).toBeInTheDocument();
    expect(screen.getByTestId("locale-switcher-mobile")).toHaveTextContent("EN");
  });
});