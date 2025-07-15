import { navigationConfig } from "@/constants/navigationConfig";
import { test, expect } from "@playwright/test";

const navigationLinks = navigationConfig.mainNavigation.map((link) => ({
  label: link.label,
  sectionId: link.href.replace("#", ""),
}));

test.describe("Navegación principal del portafolio", () => {
  test("El menú hamburguesa aparece y funciona en móvil", async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 800 }); // Simula móvil
    await page.goto("/");
    const menuButton = page.getByRole("button", {
      name: /toggle navigation menu/i,
    });
    await expect(menuButton).toBeVisible();
    // Accesibilidad: verifica aria-label y aria-expanded
    expect(await menuButton.getAttribute("aria-label")).toBeTruthy();
    const ariaExpanded = await menuButton.getAttribute("aria-expanded");
    expect(
      ariaExpanded && ["true", "false"].includes(ariaExpanded)
    ).toBeTruthy();

    // Abre el menú
    await menuButton.click();
    const mobileMenu = page.getByTestId("mobile-menu");
    await expect(mobileMenu).toBeVisible();

    // Verifica que los enlaces sean visibles solo dentro del menú móvil
    for (const link of navigationLinks) {
      const navLink = mobileMenu.getByTestId(`nav-link-${link.sectionId}`);
      await expect(navLink).toBeVisible();
    }
    // Cierra el menú
    await menuButton.click();
    await expect(mobileMenu).not.toBeVisible();
  });
  test("Los enlaces del menú navegan correctamente a cada sección", async ({
    page,
  }) => {
    await page.goto("/");

    for (const link of navigationLinks) {
      const navLink = page.getByTestId(`nav-link-${link.sectionId}`);
      await expect(navLink).toBeVisible();
      await navLink.click();
      const section = page.locator(`#${link.sectionId}`);
      await expect(section).toBeVisible();
      // Opcional: puedes verificar que el hash de la URL cambió
      // await expect(page).toHaveURL(new RegExp(`#${link.sectionId}`));
    }
  });

  test("Los enlaces del menú tienen atributos de accesibilidad", async ({
    page,
  }) => {
    await page.goto("/");
    for (const link of navigationLinks) {
      const navLink = page.getByTestId(`nav-link-${link.sectionId}`);
      // Accesibilidad: verifica que tenga title
      const title = await navLink.getAttribute("title");
      expect(title).toBeTruthy();
    }
  });
});
