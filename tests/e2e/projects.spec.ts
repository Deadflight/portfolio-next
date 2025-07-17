import { projects } from "@/constants/projects";
import { test, expect } from "@playwright/test";

test.describe("Proyectos destacados", () => {
  test("La sección de proyectos se renderiza correctamente", async ({
    page,
  }) => {
    await page.goto("/#proyectos");
    await expect(
      page.getByRole("heading", { name: /proyectos destacados/i })
    ).toBeVisible();
  });

  test("Cada proyecto muestra título, descripción y tecnologías", async ({
    page,
  }) => {
    await page.goto("/#proyectos");
    for (const project of projects) {
      const projectTitle = page.getByRole("heading", {
        name: project.title,
      });
      await expect(projectTitle).toBeVisible();

      const projectDescription = page.getByText(project.description);
      await expect(projectDescription).toBeVisible();

      const projectCard = page.getByRole("article").filter({
        has: page.getByRole("heading", { name: project.title }),
      });
      for (const tech of project.technologies) {
        const techElement = projectCard.getByText(tech, { exact: true });
        await expect(techElement).toBeVisible();
      }
    }
  });

  test("Los enlaces a demo y código funcionan", async ({ page }) => {
    await page.goto("/#proyectos");
    // Verifica que los enlaces existen y tienen href correcto
    for (const project of projects) {
      if (project.liveUrl) {
        const projectCard = page
          .getByRole("heading", { name: project.title })
          .locator("..")
          .locator("..");
        const demoLink = projectCard.getByRole("link", {
          name: /Ver Proyecto/i,
        });
        await expect(demoLink).toHaveAttribute("href", project.liveUrl);
      }
      if (project.githubUrl) {
        const projectCard = page.getByRole("article").filter({
          has: page.getByRole("heading", { name: project.title }),
        });
        const codeLink = projectCard.getByRole("link", { name: /Código/i });
        await expect(codeLink).toHaveAttribute("href", project.githubUrl);
      }
    }
  });

  test("Las imágenes de los proyectos se muestran", async ({ page }) => {
    await page.goto("/#proyectos");
    // Busca imágenes por alt o por rol
    for (const project of projects) {
      const projectImage = page.getByAltText(project.title);
      await expect(projectImage).toBeVisible();
      // Verifica que la imagen tenga un src válido
      const src = await projectImage.getAttribute("src");
      expect(src).toContain(encodeURIComponent(project.image)); // Busca "%2Fkumbio.png"
    }
  });
});
