/**
 * @jest-environment jsdom
 */
import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { ThemeToggle } from "./ThemeToggle";

// --- mocks ---

const mockToggleTheme = jest.fn();

jest.mock("@/lib/theme/ThemeProvider", () => ({
  useTheme: jest.fn(),
}));

jest.mock("next-intl", () => ({
  useTranslations: () => (key: string) => {
    const translations: Record<string, string> = {
      toggleDarkMode: "Toggle dark mode",
      lightMode: "Light mode",
      darkMode: "Dark mode",
    };
    return translations[key] || key;
  },
}));

const { useTheme } = jest.requireMock("@/lib/theme/ThemeProvider");

beforeEach(() => {
  mockToggleTheme.mockClear();
  useTheme.mockClear();
});

// --- tests ---

describe("ThemeToggle", () => {
  it("renders Sun icon (circle) when theme is dark", () => {
    useTheme.mockReturnValue({ theme: "dark", toggleTheme: mockToggleTheme });
    render(<ThemeToggle />);

    const button = screen.getByRole("switch");
    // Sun icon contains a <circle> (sun center); Moon has only a <path>
    expect(button.querySelector("svg circle")).toBeInTheDocument();
    expect(button.querySelector("svg path")).not.toBeInTheDocument();
  });

  it("renders Moon icon (path) when theme is light", () => {
    useTheme.mockReturnValue({ theme: "light", toggleTheme: mockToggleTheme });
    render(<ThemeToggle />);

    const button = screen.getByRole("switch");
    // Moon icon contains a <path> (crescent); Sun has no path
    expect(button.querySelector("svg path")).toBeInTheDocument();
    expect(button.querySelector("svg circle")).not.toBeInTheDocument();
  });

  it("has role='switch' and aria-checked=true when dark", () => {
    useTheme.mockReturnValue({ theme: "dark", toggleTheme: mockToggleTheme });
    render(<ThemeToggle />);

    const button = screen.getByRole("switch");
    expect(button).toHaveAttribute("aria-checked", "true");
  });

  it("has aria-checked=false when light", () => {
    useTheme.mockReturnValue({ theme: "light", toggleTheme: mockToggleTheme });
    render(<ThemeToggle />);

    expect(screen.getByRole("switch")).toHaveAttribute("aria-checked", "false");
  });

  it("calls toggleTheme() on click", () => {
    useTheme.mockReturnValue({ theme: "light", toggleTheme: mockToggleTheme });
    render(<ThemeToggle />);

    fireEvent.click(screen.getByRole("switch"));
    expect(mockToggleTheme).toHaveBeenCalledTimes(1);
  });

  it("has aria-label from i18n common.toggleDarkMode", () => {
    useTheme.mockReturnValue({ theme: "light", toggleTheme: mockToggleTheme });
    render(<ThemeToggle />);

    expect(screen.getByRole("switch")).toHaveAttribute(
      "aria-label",
      "Toggle dark mode",
    );
  });

  it("sets title to 'Light mode' when dark (switching to light)", () => {
    useTheme.mockReturnValue({ theme: "dark", toggleTheme: mockToggleTheme });
    render(<ThemeToggle />);

    expect(screen.getByRole("switch")).toHaveAttribute("title", "Light mode");
  });

  it("sets title to 'Dark mode' when light (switching to dark)", () => {
    useTheme.mockReturnValue({ theme: "light", toggleTheme: mockToggleTheme });
    render(<ThemeToggle />);

    expect(screen.getByRole("switch")).toHaveAttribute("title", "Dark mode");
  });

  it("is a native button element for keyboard accessibility", () => {
    useTheme.mockReturnValue({ theme: "light", toggleTheme: mockToggleTheme });
    render(<ThemeToggle />);

    expect(screen.getByRole("switch").tagName).toBe("BUTTON");
  });
});
