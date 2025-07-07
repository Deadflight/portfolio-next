export interface ISkillExperience {
  id: string;
  title: string;
  iconName: SkillIconName;
  skills: ISkill[];
}

export enum SkillIconName {
  Globe = "Globe",
  Server = "Server",
  Database = "Database",
  Cloud = "Cloud",
  Code = "Code",
  Settings = "Settings",
}

export interface ISkill {
  name: string;
  level: SkillProficiencyLevel; // e.g., "beginner", "intermediate", "advanced", "expert"
  experience: string; // e.g., "2+ años"
  context?: string; // e.g., "Sprints, retrospectivas, estimaciones, trabajo en equipo distribuido"
}

export interface ISkillProficiency {
  label: string;
  stars: number;
  color: string; // e.g., "text-green-500"
  description: string; // e.g., "Dominio completo, capaz de enseñar y liderar"
  bgColor: string; // e.g., "bg-green-500"
}

export enum SkillProficiencyLevel {
  Beginner = "beginner",
  Intermediate = "intermediate",
  Advanced = "advanced",
  Expert = "expert",
}
export type ISkillProficiencyLevels = {
  [K in SkillProficiencyLevel]: ISkillProficiency;
};
