import { navigationConfig } from "@/constants/navigationConfig";
import { test, expect } from "@playwright/test";

const navigationLinks = navigationConfig.mainNavigation.map((link) => ({
  label: link.label,
  sectionId: link.href.replace("#", ""),
}));

test.describe("Navegación principal del portafolio", () => {
  test("El menú hamburguesa aparece y funciona en móvil", async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 800 }); // Simula móvil
    await page.goto("/es");
    const menuButton = page.getByRole("button", {
      name: /alternar menú/i,
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
    await page.goto("/es");

    for (const link of navigationLinks) {
      const navLink = page.getByTestId(`nav-link-${link.sectionId}`);
      await expect(navLink).toBeVisible();
      await navLink.click();
      const section = page.locator(`#${link.sectionId}`);
      await expect(section).toBeVisible();
      // Verifica que el hash de la URL cambió
      await expect(page).toHaveURL(new RegExp(`#${link.sectionId}`));
    }
  });

  test("Los enlaces del menú tienen texto descriptivo y son accesibles por teclado", async ({
    page,
  }) => {
    await page.goto("/es");
    for (const link of navigationLinks) {
      const navLink = page.getByTestId(`nav-link-${link.sectionId}`);
      // Verifica que el enlace esté visible y tenga texto
      await expect(navLink).toBeVisible();
      const textContent = await navLink.textContent();
      expect(textContent?.trim()).toBeTruthy();
      // Verifica que el enlace tenga un href válido
      await expect(navLink).toHaveAttribute("href", `#${link.sectionId}`);
    }
  });
});
