import { test, expect } from "@playwright/test";

const contactSelectors = {
  form: "form",
  name: "input[name='name']",
  email: "input[name='email']",
  message: "textarea[name='message']",
  subject: "input[name='subject']",
  submit: "button[type='submit']",
  success: ".text-success",
  error: ".text-error",
};

test.describe("Formulario de contacto", () => {
  test("El formulario valida los campos y muestra errores", async ({
    page,
  }) => {
    await page.goto("/#contacto");
    await page.click(contactSelectors.submit);
    // Verifica que cada mensaje de error esperado esté visible
    await expect(page.getByText("El nombre es obligatorio")).toBeVisible();
    await expect(
      page.getByText("Debe ser un correo electrónico válido")
    ).toBeVisible();
    await expect(page.getByText("El asunto es obligatorio")).toBeVisible();
    await expect(page.getByText("El mensaje es obligatorio")).toBeVisible();
    // Verifica que hay 4 errores visibles
    const errorCount = await page.locator(contactSelectors.error).count();
    expect(errorCount).toBe(4);
  });

  test("El formulario envía correctamente y muestra mensaje de éxito", async ({
    page,
  }) => {
    await page.goto("/#contacto");
    await page.fill(contactSelectors.name, "Carlos Correa");
    await page.fill(contactSelectors.email, "carlos@email.com");
    await page.fill("input[name='subject']", "Test Playwright");
    await page.fill(contactSelectors.message, "Este es un mensaje de prueba.");
    await page.click(contactSelectors.submit);
    await expect(
      page.getByText("Mensaje enviado correctamente. ¡Gracias por contactarme!")
    ).toBeVisible();

    // Verifica que el formulario se haya reseteado
    await expect(page.locator(contactSelectors.name)).toHaveValue("");
    await expect(page.locator(contactSelectors.email)).toHaveValue("");
    await expect(page.locator(contactSelectors.subject)).toHaveValue("");
    await expect(page.locator(contactSelectors.message)).toHaveValue("");
  });
});
