import { test, expect } from "@playwright/test";

test.describe("Blog — Navegación y contenido", () => {
  test("E50: Nav → listing — navegar desde homepage al blog", async ({ page }) => {
    await page.goto("/es");
    const blogLink = page.getByTestId("nav-link-blog");
    await expect(blogLink).toBeVisible();

    await blogLink.click();
    await page.waitForURL("/es/blog");

    // Si hay artículos, se renderiza el grid; si no, el estado vacío
    const listing = page.getByTestId("blog-listing");
    const emptyState = page.getByTestId("blog-empty-state");
    await expect(listing.or(emptyState)).toBeVisible();
  });

  test("E51: Listing → detail — navegar desde listado a detalle", async ({ page }) => {
    await page.goto("/es/blog");

    // Solo corre si hay artículos publicados
    const listing = page.getByTestId("blog-listing");
    const emptyState = page.getByTestId("blog-empty-state");
    await expect(listing.or(emptyState)).toBeVisible();

    const isVisible = await emptyState.isVisible();
    if (isVisible) {
      test.skip();
      return;
    }

    // Click en el primer PostCard
    const firstCard = listing.locator("[data-testid^='post-card-']").first();
    await expect(firstCard).toBeVisible();
    const titleLink = firstCard.getByRole("link").first();
    await titleLink.click();

    // Verifica que navegó al detalle
    await expect(page.getByTestId("blog-detail")).toBeVisible({ timeout: 15000 });
  });

  test("E52: Unknown slug 404 — ruta inexistente muestra not-found específico", async ({ page }) => {
    await page.goto("/en/blog/xyz");
    await expect(page.getByTestId("blog-not-found")).toBeVisible();
  });

  test("E53: EN locale flow — texto en inglés en la página 404", async ({ page }) => {
    await page.goto("/en/blog/xyz");
    await expect(page.getByTestId("blog-not-found")).toBeVisible();

    // Verifica texto en inglés
    await expect(page.getByText("Post not found")).toBeVisible();
    await expect(page.getByText("The post you're looking for doesn't exist.")).toBeVisible();

    // Verifica que el back link tenga href correcto
    const backLink = page.getByRole("link", { name: "Back to blog" });
    await expect(backLink).toBeVisible();
    await expect(backLink).toHaveAttribute("href", "/blog");
  });

  test("E54: ES locale flow — texto en español en la página 404", async ({ page }) => {
    await page.goto("/es/blog/xyz");
    await expect(page.getByTestId("blog-not-found")).toBeVisible();

    // Verifica texto en español
    await expect(page.getByText("Artículo no encontrado")).toBeVisible();
    await expect(page.getByText("El artículo que buscas no existe.")).toBeVisible();

    // Verifica que el back link tenga href correcto
    const backLink = page.getByRole("link", { name: "Volver al blog" });
    await expect(backLink).toBeVisible();
    await expect(backLink).toHaveAttribute("href", "/blog");
  });
});
