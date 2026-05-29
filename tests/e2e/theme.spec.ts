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
});
