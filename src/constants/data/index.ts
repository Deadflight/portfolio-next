import "server-only";

import { getLocale } from "next-intl/server";
import type { IProject } from "@/shared/types/project.types";
import type { IWorkExperience } from "@/shared/types/workExperience.types";
import type {
  ISkillExperience,
  ISkillProficiencyLevels,
} from "@/shared/types/skills.types";

export async function getProjects(): Promise<IProject[]> {
  const locale = await getLocale();
  if (locale === "es") {
    return (await import("@/constants/data/es/projects.data")).projects;
  }
  return (await import("@/constants/data/en/projects.data")).projects;
}

export async function getWorkExperience(): Promise<IWorkExperience[]> {
  const locale = await getLocale();
  if (locale === "es") {
    return (await import("@/constants/data/es/workExperience.data"))
      .workExperienceData;
  }
  return (await import("@/constants/data/en/workExperience.data"))
    .workExperienceData;
}

export async function getSkillData(): Promise<{
  proficiencyLevels: ISkillProficiencyLevels;
  skillCategories: ISkillExperience[];
}> {
  const locale = await getLocale();
  if (locale === "es") {
    const mod = await import("@/constants/data/es/skills.data");
    return {
      proficiencyLevels: mod.proficiencyLevels,
      skillCategories: mod.skillCategories,
    };
  }
  const mod = await import("@/constants/data/en/skills.data");
  return {
    proficiencyLevels: mod.proficiencyLevels,
    skillCategories: mod.skillCategories,
  };
}
