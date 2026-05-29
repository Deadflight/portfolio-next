import { test, expect } from "@playwright/test";

test.describe("Dark mode", () => {
  test("respects system preference on first visit", async ({ page }) => {
    // Emulate dark mode
    await page.emulateMedia({ colorScheme: "dark" });
    await page.goto("/");

    // Check dark class is applied
    await expect(page.locator("html")).toHaveClass(/dark/);
  });

  test("persists toggle preference across reload", async ({ page }) => {
    await page.goto("/es");

    // Should start in light mode (no system preference)
    await expect(page.locator("html")).not.toHaveClass(/dark/);

    // Set dark mode via localStorage, reload, and verify
    await page.evaluate(() => {
      localStorage.setItem("portfolio-theme", "dark");
    });
    await page.reload();
    await expect(page.locator("html")).toHaveClass(/dark/);

    // Reset to light
    await page.evaluate(() => {
      localStorage.setItem("portfolio-theme", "light");
    });
    await page.reload();
    await expect(page.locator("html")).not.toHaveClass(/dark/);
  });

  test("toggle button exists in desktop nav with correct ARIA", async ({ page }) => {
    await page.goto("/es");

    // The desktop nav is visible at 1280x720 viewport
    const toggle = page.getByTestId("theme-toggle");
    await expect(toggle).toBeVisible();
    await expect(toggle).toHaveAttribute("role", "switch");
    await expect(toggle).toHaveAttribute("aria-label", "Cambiar modo oscuro");
    // Starts in light mode → aria-checked is false and Moon icon is shown
    await expect(toggle).toHaveAttribute("aria-checked", "false");
    await expect(toggle).toHaveAttribute("title", "Modo oscuro");
  });

  test("clicking toggle switches theme and updates ARIA state", async ({ page }) => {
    // Set clear localStorage state: light mode
    await page.goto("/es");
    await page.evaluate(() => localStorage.setItem("portfolio-theme", "light"));
    await page.reload();

    await expect(page.locator("html")).not.toHaveClass(/dark/);

    const toggle = page.getByTestId("theme-toggle");
    await expect(toggle).toHaveAttribute("aria-checked", "false");

    // Click to toggle to dark
    await toggle.click();
    await expect(page.locator("html")).toHaveClass(/dark/);
    await expect(toggle).toHaveAttribute("aria-checked", "true");
    await expect(toggle).toHaveAttribute("title", "Modo claro");

    // Click to toggle back to light
    await toggle.click();
    await expect(page.locator("html")).not.toHaveClass(/dark/);
    await expect(toggle).toHaveAttribute("aria-checked", "false");
    await expect(toggle).toHaveAttribute("title", "Modo oscuro");
  });
});
