import { test, expect } from "@playwright/test";

test.describe("About (Sobre Mí)", () => {
  test("La sección principal se renderiza correctamente", async ({ page }) => {
    await page.goto("/#sobre-mi");
    await expect(page.getByRole("heading", { name: "Sobre Mí" })).toBeVisible();
    await expect(
      page.getByText(
        "Desarrollador de software enfocado en soluciones alineadas a las reglas de negocio, con pasión por crear experiencias digitales que realmente aporten valor."
      )
    ).toBeVisible();
  });

  test("Se muestra la historia personal y evolución profesional", async ({
    page,
  }) => {
    await page.goto("/#sobre-mi");
    await expect(
      page.getByRole("heading", { name: "Mi Viaje en el Desarrollo" })
    ).toBeVisible();
    await expect(
      page.getByRole("heading", { name: "Roles y Evolución" })
    ).toBeVisible();
    await expect(
      page.getByText(/Inicié como desarrollador freelance en Upwork/i)
    ).toBeVisible();
    await expect(
      page.getByText(
        /Mi evolución profesional me ha llevado desde el desarrollo frontend/i
      )
    ).toBeVisible();
  });

  test("Se muestra la información adicional (ubicación, experiencia, idiomas, filosofía)", async ({
    page,
  }) => {
    await page.goto("/#sobre-mi");
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
      aditionalInfoCard.getByText(/Hacer las cosas bien y con buena actitud/i)
    ).toBeVisible();
  });

  test("Se muestra el enfoque actual y filosofía personal", async ({
    page,
  }) => {
    await page.goto("/#sobre-mi");
    await expect(
      page.getByRole("heading", { name: "Mi Enfoque Actual" })
    ).toBeVisible();
    await expect(
      page.getByText(
        /Mi enfoque actual se basa en el desarrollo centrado en el usuario/i
      )
    ).toBeVisible();
    await expect(
      page.getByRole("heading", { name: "Más Allá del Código" })
    ).toBeVisible();
    await expect(
      page.getByText(
        /Más allá del desarrollo, busco crecer tanto en lo profesional como en lo personal/i
      )
    ).toBeVisible();
  });

  test("Se muestra el llamado a la acción y enlaces", async ({ page }) => {
    await page.goto("/#sobre-mi");
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
    await page.goto("/#sobre-mi");
    await expect(page.getByRole("heading", { name: "Sobre Mí" })).toBeVisible();
    // Desktop
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.goto("/#sobre-mi");
    await expect(page.getByRole("heading", { name: "Sobre Mí" })).toBeVisible();
  });
});
