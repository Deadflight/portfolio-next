import { test, expect } from "@playwright/test";

test.describe("About (Sobre Mí)", () => {
  test("La sección principal se renderiza correctamente", async ({ page }) => {
    await page.goto("/es#sobre-mi");
    await expect(page.getByRole("heading", { name: "Sobre Mí" })).toBeVisible();
    await expect(
      page.getByText("Mi historia personal")
    ).toBeVisible();
  });

  test("Se muestra la historia personal y evolución profesional", async ({
    page,
  }) => {
    await page.goto("/es#sobre-mi");
    await expect(
      page.getByRole("heading", { name: "Mi Viaje" })
    ).toBeVisible();
    await expect(
      page.getByRole("heading", { name: "Roles y Evolución" })
    ).toBeVisible();
    await expect(
      page.getByText(
        /Mi pasión por la tecnología comenzó cuando creé mi primer sitio web/i
      )
    ).toBeVisible();
    await expect(
      page.getByText(
        /A lo largo de los años, he trabajado en diversos proyectos/i
      )
    ).toBeVisible();
  });

  test("Se muestra la información adicional (ubicación, experiencia, idiomas, filosofía)", async ({
    page,
  }) => {
    await page.goto("/es#sobre-mi");
    const aboutSection = page.locator("#sobre-mi");
    const aditionalInfoCard = aboutSection.getByTestId("additional-info");
    await expect(aditionalInfoCard.getByText("Ubicación")).toBeVisible();
    await expect(aditionalInfoCard.getByText("Trabajo Remoto")).toBeVisible();

    await expect(aditionalInfoCard.getByText("Experiencia")).toBeVisible();
    await expect(aditionalInfoCard.getByText("3+ Años")).toBeVisible();
    await expect(aditionalInfoCard.getByText("Idiomas")).toBeVisible();
    await expect(
      aditionalInfoCard.getByText("Español (Nativo), Inglés (B1)")
    ).toBeVisible();
    await expect(aditionalInfoCard.getByText("Filosofía")).toBeVisible();
    await expect(
      aditionalInfoCard.getByText(
        /El código limpio y la accesibilidad no son opcionales/i
      )
    ).toBeVisible();
  });

  test("Se muestra el enfoque actual y filosofía personal", async ({
    page,
  }) => {
    await page.goto("/es#sobre-mi");
    await expect(
      page.getByRole("heading", { name: "Enfoque Actual" })
    ).toBeVisible();
    await expect(
      page.getByText(
        /Actualmente estoy profundizando mis conocimientos en/i
      )
    ).toBeVisible();
    await expect(
      page.getByRole("heading", { name: "Más Allá del Código" })
    ).toBeVisible();
    await expect(
      page.getByText(
        /Cuando no estoy programando, me encontrarás/i
      )
    ).toBeVisible();
  });

  test("Se muestra el llamado a la acción y enlaces", async ({ page }) => {
    await page.goto("/es#sobre-mi");
    await expect(
      page.getByRole("heading", { name: "¿Te gustaría trabajar conmigo?" })
    ).toBeVisible();
    await expect(
      page.getByText(
        /Estoy siempre abierto a nuevos desafíos y oportunidades de colaboración/i
      )
    ).toBeVisible();
    await expect(page.getByRole("link", { name: "Hablemos" })).toHaveAttribute(
      "href",
      "#contacto"
    );
    await expect(
      page.getByRole("link", { name: "Ver Mi Trabajo" })
    ).toHaveAttribute("href", "#proyectos");
  });

  test("La sección 'Sobre Mí' es responsive (mobile y desktop)", async ({
    page,
  }) => {
    // Mobile
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto("/es#sobre-mi");
    await expect(page.getByRole("heading", { name: "Sobre Mí" })).toBeVisible();
    // Desktop
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.goto("/es#sobre-mi");
    await expect(page.getByRole("heading", { name: "Sobre Mí" })).toBeVisible();
  });
});
