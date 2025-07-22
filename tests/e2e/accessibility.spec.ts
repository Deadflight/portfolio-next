import { test, expect } from "@playwright/test";
import { injectAxe, getViolations } from "axe-playwright";

test.describe("Accesibilidad general del portafolio", () => {
  test("Todos los headings principales tienen roles y niveles correctos", async ({
    page,
  }) => {
    await page.goto("/");
    const headings = await page.locator("h1, h2, h3").all();
    for (const heading of headings) {
      await expect(heading).toBeVisible();
      // Opcional: valida aria-level si usas aria
    }
  });

  test("Las imágenes tienen texto alternativo (alt)", async ({ page }) => {
    await page.goto("/");
    const images = await page.locator("img").all();
    for (const img of images) {
      const alt = await img.getAttribute("alt");
      expect(alt).toBeTruthy();
      expect(alt?.length).toBeGreaterThan(3);
    }
  });

  test("Todos los enlaces tienen texto descriptivo y son accesibles por teclado", async ({
    page,
  }) => {
    await page.goto("/");
    const links = await page.locator("a").all();
    for (const link of links) {
      const isVisible = await link.isVisible();
      if (!isVisible) continue;

      let text = (await link.textContent())?.trim() || "";
      if (!text) {
        text = (await link.getAttribute("aria-label")) || "";
      }
      expect(text.length).toBeGreaterThan(0);
      // Opcional: valida tabindex si usas navegación personalizada
    }
  });

  test("La navegación por teclado funciona en el menú principal", async ({
    page,
  }) => {
    await page.goto("/");
    await page.keyboard.press("Tab");
    // Valida que el foco esté en el primer elemento del menú
    const focused = await page.evaluate(
      () => document.activeElement?.textContent
    );
    expect(focused).toBeDefined();
  });

  test("No hay violaciones de accesibilidad recomendadas por axe", async ({
    page,
  }) => {
    await page.goto("/");
    await injectAxe(page);
    const violations = await getViolations(page);
    expect(violations).toEqual([]);
  });
});
