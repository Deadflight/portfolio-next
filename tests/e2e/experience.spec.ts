import { workExperienceData } from "@/constants/workExperience";
import { test, expect } from "@playwright/test";

// Ajusta los selectores y textos según tu UI real

test.describe("Experiencia laboral", () => {
  test("La sección de experiencia se renderiza correctamente", async ({
    page,
  }) => {
    await page.goto("/#experiencia");
    await expect(
      page.getByRole("heading", { name: /experiencia laboral/i })
    ).toBeVisible();
  });

  test("Cada experiencia muestra título, empresa, periodo y logros", async ({
    page,
  }) => {
    await page.goto("/#experiencia");
    for (const experience of workExperienceData) {
      const experienceCard = page.getByTestId(
        `work-experience-card-${experience.id}`
      );

      // Verifica que el título y empresa estén visibles
      await expect(
        experienceCard.getByRole("heading", { name: experience.position })
      ).toBeVisible();
      await expect(
        experienceCard.getByText(experience.company.name, { exact: true })
      ).toBeVisible();

      // Periodo (ejemplo: "Agosto 2023 - Marzo 2025")
      const periodText = `${experience.businessPeriod.start} - ${experience.businessPeriod.end}`;
      await expect(experienceCard.getByText(periodText)).toBeVisible();

      // Duración (ejemplo: "1 año, 7 meses")
      if (experience.businessPeriod.duration) {
        await expect(
          experienceCard.getByText(experience.businessPeriod.duration)
        ).toBeVisible();
      }

      // Logros y responsabilidades (businessImpact)
      for (const impact of experience.businessImpact) {
        await expect(experienceCard.getByText(impact)).toBeVisible();
      }
    }
  });

  test("Las tecnologías utilizadas se muestran", async ({ page }) => {
    await page.goto("/#experiencia");
    const experienciaSection = page.locator("#experiencia");
    for (const experience of workExperienceData) {
      // Busca el card por el data-testid
      const card = experienciaSection.getByTestId(
        `work-experience-card-${experience.id}`
      );

      for (const tech of experience.technologyStack) {
        await expect(card.getByText(tech, { exact: true })).toBeVisible();
      }
    }
  });

  test("Las referencias y periodos son visibles", async ({ page }) => {
    await page.goto("/#experiencia");
    for (const experience of workExperienceData) {
      if (experience.professionalReference) {
        await expect(page.getByText("Referencia")).toBeVisible();
        await expect(
          page.getByText(experience.professionalReference.name)
        ).toBeVisible();
        if (experience.professionalReference.email) {
          await expect(
            page.getByText(experience.professionalReference.email)
          ).toBeVisible();
        }
      }
      // Periodo y duración ya validados en el test anterior, pero puedes duplicar si quieres mayor granularidad
    }
  });
});
