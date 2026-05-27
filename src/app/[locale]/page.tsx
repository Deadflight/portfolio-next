import { ProfessionalIdentityHero } from "../components/hero/ProfessionalIdentityHero/ProfessionalIdentityHero";
import { WorkExperienceShowcase } from "../components/experience/WorkExperience";
import { ProjectsShowCase } from "../components/projects/ProjectsShowCase";
import { AboutMeShowcase } from "../components/about/AboutMeShowCase/AboutMeShowCase";
import { SkillsExperienceShowCase } from "../components/skills/SkillsExperienceShowCase";
import { Contact } from "../components/contact/Contact";
import { getWorkExperience, getProjects, getSkillData } from "@/constants/data";

export default async function Home() {
  const [workExperienceData, projects, { proficiencyLevels, skillCategories }] =
    await Promise.all([
      getWorkExperience(),
      getProjects(),
      getSkillData(),
    ]);

  return (
    <>
      <main className="min-h-screen" role="main" id="main-content">
        <ProfessionalIdentityHero />
        <WorkExperienceShowcase workExperienceData={workExperienceData} />
        <ProjectsShowCase projects={projects} />
        <AboutMeShowcase />
        <SkillsExperienceShowCase
          proficiencyLevels={proficiencyLevels}
          skillCategories={skillCategories}
        />
        <Contact />
      </main>
    </>
  );
}
