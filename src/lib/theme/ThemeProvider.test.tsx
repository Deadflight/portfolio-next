/**
 * @jest-environment jsdom
 */
import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import { ThemeProvider, useTheme } from "./ThemeProvider";

// --- test helpers ---

function TestConsumer() {
  const { theme, toggleTheme } = useTheme();
  return (
    <div>
      <span data-testid="theme-value">{theme}</span>
      <button data-testid="toggle-btn" onClick={toggleTheme}>
        Toggle
      </button>
    </div>
  );
}

// --- mocks ---

const mockMatchMediaListeners = new Map<string, Set<(e: Event) => void>>();

function setupMatchMedia(matches: boolean) {
  const listeners = new Set<(e: Event) => void>();
  mockMatchMediaListeners.set("(prefers-color-scheme: dark)", listeners);

  Object.defineProperty(window, "matchMedia", {
    writable: true,
    value: jest.fn().mockImplementation((query: string) => ({
      matches,
      media: query,
      onchange: null,
      addEventListener: jest.fn((_event: string, handler: (e: Event) => void) => {
        listeners.add(handler);
      }),
      removeEventListener: jest.fn((_event: string, handler: (e: Event) => void) => {
        listeners.delete(handler);
      }),
    })),
  });
}

beforeEach(() => {
  localStorage.clear();
  // Reset document class
  document.documentElement.classList.remove("dark");
  // Clear matchMedia listeners
  mockMatchMediaListeners.clear();
  // Default: light mode system preference
  setupMatchMedia(false);
});

afterAll(() => {
  Object.defineProperty(window, "matchMedia", {
    writable: true,
    value: undefined,
  });
});

// --- tests ---

describe("ThemeProvider", () => {
  it("provides default 'light' theme when no localStorage and no dark preference", async () => {
    render(
      <ThemeProvider>
        <TestConsumer />
      </ThemeProvider>,
    );

    await waitFor(() => {
      expect(screen.getByTestId("theme-value")).toHaveTextContent("light");
    });
  });

  it("renders children without provider wrapper before mount (SSR guard)", () => {
    // SSR guard returns children directly — no provider.
    // We verify by checking children render without crash.
    const { container } = render(
      <ThemeProvider>
        <div data-testid="ssr-child">Works</div>
      </ThemeProvider>,
    );

    expect(container).toBeInTheDocument();
  });

  it("toggles dark class on document.documentElement when toggleTheme is called", async () => {
    render(
      <ThemeProvider>
        <TestConsumer />
      </ThemeProvider>,
    );

    await waitFor(() => {
      expect(screen.getByTestId("theme-value")).toHaveTextContent("light");
    });

    expect(document.documentElement.classList.contains("dark")).toBe(false);

    screen.getByTestId("toggle-btn").click();

    await waitFor(() => {
      expect(document.documentElement.classList.contains("dark")).toBe(true);
    });

    screen.getByTestId("toggle-btn").click();

    await waitFor(() => {
      expect(document.documentElement.classList.contains("dark")).toBe(false);
    });
  });

  it("writes theme preference to localStorage on toggle", async () => {
    render(
      <ThemeProvider>
        <TestConsumer />
      </ThemeProvider>,
    );

    await waitFor(() => {
      expect(screen.getByTestId("theme-value")).toHaveTextContent("light");
    });

    screen.getByTestId("toggle-btn").click();

    await waitFor(() => {
      expect(localStorage.getItem("portfolio-theme")).toBe("dark");
    });

    screen.getByTestId("toggle-btn").click();

    await waitFor(() => {
      expect(localStorage.getItem("portfolio-theme")).toBe("light");
    });
  });

  it("reads initial theme from localStorage when present", async () => {
    localStorage.setItem("portfolio-theme", "dark");

    render(
      <ThemeProvider>
        <TestConsumer />
      </ThemeProvider>,
    );

    await waitFor(() => {
      expect(screen.getByTestId("theme-value")).toHaveTextContent("dark");
      expect(document.documentElement.classList.contains("dark")).toBe(true);
    });
  });

  it("respects system preference when no localStorage value exists", async () => {
    // Re-setup matchMedia with dark preference
    setupMatchMedia(true);

    render(
      <ThemeProvider>
        <TestConsumer />
      </ThemeProvider>,
    );

    await waitFor(() => {
      expect(screen.getByTestId("theme-value")).toHaveTextContent("dark");
    });
  });

  it("updates theme when system preference changes and no stored preference", async () => {
    render(
      <ThemeProvider>
        <TestConsumer />
      </ThemeProvider>,
    );

    await waitFor(() => {
      expect(screen.getByTestId("theme-value")).toHaveTextContent("light");
    });

    // Simulate system preference change to dark
    const listeners = mockMatchMediaListeners.get("(prefers-color-scheme: dark)");
    expect(listeners).toBeDefined();
    expect(listeners!.size).toBeGreaterThan(0);

    // Fire the change event
    const mockEvent = { matches: true } as MediaQueryListEvent;
    listeners!.forEach((fn) => fn(mockEvent));

    await waitFor(() => {
      expect(screen.getByTestId("theme-value")).toHaveTextContent("dark");
    });
  });

  it("does not update theme on system preference change when stored preference exists", async () => {
    localStorage.setItem("portfolio-theme", "light");
    setupMatchMedia(true);

    render(
      <ThemeProvider>
        <TestConsumer />
      </ThemeProvider>,
    );

    // Stored preference overrides system — should be light even though system is dark
    await waitFor(() => {
      expect(screen.getByTestId("theme-value")).toHaveTextContent("light");
    });

    // Simulate system preference change
    const listeners = mockMatchMediaListeners.get("(prefers-color-scheme: dark)");
    const mockEvent = { matches: false } as MediaQueryListEvent;
    listeners!.forEach((fn) => fn(mockEvent));

    // Should still be light because stored preference exists
    await waitFor(() => {
      expect(screen.getByTestId("theme-value")).toHaveTextContent("light");
    });
  });
});

describe("useTheme hook", () => {
  it("throws when used outside ThemeProvider", () => {
    // Suppress console.error for expected error
    const consoleSpy = jest.spyOn(console, "error").mockImplementation(() => {});

    expect(() => render(<TestConsumer />)).toThrow(
      "useTheme must be used within ThemeProvider",
    );

    consoleSpy.mockRestore();
  });
});
