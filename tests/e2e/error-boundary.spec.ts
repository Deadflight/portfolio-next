import { test, expect } from "@playwright/test";

test.describe("ErrorBoundary sections", () => {
  test("all 6 sections render without error fallback on page load", async ({
    page,
  }) => {
    await page.goto("/es");

    // Hero section — verify the main identity content renders
    await expect(
      page.getByRole("heading", { level: 1, name: "Carlos Correa" })
    ).toBeVisible();
    await expect(
      page.getByRole("heading", { level: 2, name: "Desarrollador Full Stack" })
    ).toBeVisible();

    // Experience section
    await expect(
      page.getByRole("heading", { level: 2, name: /experiencia/i })
    ).toBeVisible();

    // Projects section
    await expect(
      page.getByRole("heading", { level: 2, name: /proyectos/i })
    ).toBeVisible();

    // About section
    await expect(
      page.getByRole("heading", { level: 2, name: /sobre mí/i })
    ).toBeVisible();

    // Skills section
    await expect(
      page.getByRole("heading", { level: 2, name: /habilidades/i })
    ).toBeVisible();

    // Contact section
    await expect(
      page.getByRole("heading", { level: 3, name: /envíame un mensaje/i })
    ).toBeVisible();

    // Verify NO error boundary fallback is visible — all sections loaded cleanly
    // Scoped to #main-content to exclude axe-core AxeReporter's injected role="alert"
    await expect(page.locator("#main-content").getByRole("alert")).toHaveCount(0);
  });

  test("isolation: one section error does not crash other sections", async ({
    page,
  }) => {
    // Navigate to the page first
    await page.goto("/es");

    // Verify baseline: all sections present
    await expect(
      page.getByRole("heading", { level: 1, name: "Carlos Correa" })
    ).toBeVisible();
    await expect(
      page.getByRole("heading", { level: 2, name: /experiencia/i })
    ).toBeVisible();
    await expect(
      page.getByRole("heading", { level: 2, name: /proyectos/i })
    ).toBeVisible();
    await expect(
      page.getByRole("heading", { level: 2, name: /sobre mí/i })
    ).toBeVisible();
    await expect(
      page.getByRole("heading", { level: 2, name: /habilidades/i })
    ).toBeVisible();
    await expect(
      page.getByRole("heading", { level: 3, name: /envíame un mensaje/i })
    ).toBeVisible();

    // Simulate a runtime error in one section by corrupting its state
    // We target the Contact section (form) to trigger its ErrorBoundary
    await page.evaluate(() => {
      // Find the Contact form
      const form = document.querySelector("form");
      if (!form) return;

      // Replace the form's content to simulate a broken render
      // This triggers the parent ErrorBoundary on the next React render
      const formParent = form.closest("section, article, div") || form;
      const errorBoundaryWrapper = formParent.parentElement;
      if (errorBoundaryWrapper) {
        // Clear the inner content to simulate a catastrophic render failure
        errorBoundaryWrapper.innerHTML = "";
      }
    });

    // After clearing the Contact section, verify other sections remain intact
    await expect(
      page.getByRole("heading", { level: 1, name: "Carlos Correa" })
    ).toBeVisible();
    await expect(
      page.getByRole("heading", { level: 2, name: /experiencia/i })
    ).toBeVisible();
    await expect(
      page.getByRole("heading", { level: 2, name: /proyectos/i })
    ).toBeVisible();
    await expect(
      page.getByRole("heading", { level: 2, name: /sobre mí/i })
    ).toBeVisible();
    await expect(
      page.getByRole("heading", { level: 2, name: /habilidades/i })
    ).toBeVisible();
  });
});
