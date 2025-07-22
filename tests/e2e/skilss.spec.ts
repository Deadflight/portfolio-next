import { proficiencyLevels, skillCategories } from "@/constants/skills";
import { test, expect } from "@playwright/test";

test.describe("Skills (Habilidades)", () => {
  test("La sección de habilidades se renderiza correctamente", async ({
    page,
  }) => {
    await page.goto("/#skills");
    await expect(
      page.getByRole("heading", { name: "Habilidades Técnicas" })
    ).toBeVisible();
  });

  test("Cada skill muestra su nombre y nivel", async ({ page }) => {
    await page.goto("/#skills");
    for (const category of skillCategories) {
      for (const skill of category.skills) {
        const skillElement = page.getByTestId(`skill-card-${skill.name}`);
        await expect(skillElement).toBeVisible();

        // Verifica que el nivel de habilidad esté visible
        if (skill.level) {
          const levelText = proficiencyLevels[skill.level];
          const levelElement = skillElement.getByTestId(
            `proficiency-badge-${levelText.label}`
          );
          await expect(levelElement).toBeVisible();
        }

        // Verifica que el nombre del skill esté visible
        await expect(
          skillElement.getByText(skill.name, { exact: true })
        ).toBeVisible();

        // Verifica que el numero de estrellas coincida con el nivel
        if (skill.level) {
          const level = proficiencyLevels[skill.level];
          const starRating = skillElement.getByTestId(
            `star-rating-${skill.name}`
          );
          await expect(starRating).toBeVisible();
          const filledStars = await starRating
            .locator(`span.${level.color}`)
            .count();
          expect(filledStars).toBe(level.stars);
        }
      }
    }
  });

  test("Las categorías de habilidades se muestran", async ({ page }) => {
    await page.goto("/#skills");
    for (const category of skillCategories) {
      await expect(
        page.getByText(category.title, { exact: true })
      ).toBeVisible();
    }
  });

  test("La sección de habilidades es responsive (mobile y desktop)", async ({
    page,
  }) => {
    // Mobile
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto("/#skills");
    await expect(
      page.getByRole("heading", { name: "Habilidades Técnicas" })
    ).toBeVisible();
    // Desktop
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.goto("/#skills");
    await expect(
      page.getByRole("heading", { name: "Habilidades Técnicas" })
    ).toBeVisible();
  });
});
