import { test, expect } from "@playwright/test";

test.describe("Carga principal del portafolio", () => {
  test("La página principal carga correctamente y muestra información clave", async ({
    page,
  }) => {
    await page.goto("/");

    // Verifica que el título principal (nombre) esté visible
    await expect(
      page.getByRole("heading", { level: 1, name: "Carlos Correa" })
    ).toBeVisible();

    // Verifica que el subtítulo (título profesional) esté visible
    await expect(
      page.getByRole("heading", { level: 2, name: "Desarrollador Full Stack" })
    ).toBeVisible();

    // Verifica que la propuesta de valor esté visible
    await expect(
      page.getByText(
        "Más de 3 años de experiencia creando aplicaciones web escalables con React, Node.js y AWS. Especializado en entornos ágiles y desarrollo de soluciones centradas en el usuario."
      )
    ).toBeVisible();
  });
});
