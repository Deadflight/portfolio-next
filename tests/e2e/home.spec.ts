import { socialLinks } from "@/constants/socialLinks";
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

  test("Los enlaces de redes sociales están visibles y funcionan correctamente", async ({
    page,
  }) => {
    await page.goto("/");
    // Verifica que los enlaces de redes sociales estén visibles
    for (const profile of socialLinks) {
      const socialLink = page.getByRole("link", {
        name: profile.ariaLabel,
      });
      await expect(socialLink).toBeVisible();

      // Verifica que el enlace abra la URL correcta
      await expect(socialLink).toHaveAttribute("href", profile.url);

      // Verifica que el enlace abra en una nueva pestaña si no es un correo electrónico
      if (profile.platform !== "email") {
        await expect(socialLink).toHaveAttribute("target", "_blank");
        await expect(socialLink).toHaveAttribute("rel", "noopener noreferrer");
      } else {
        await expect(socialLink).not.toHaveAttribute("target");
        await expect(socialLink).not.toHaveAttribute("rel");
      }
    }
  });
});
