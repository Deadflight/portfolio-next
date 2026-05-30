import { ProfessionalIdentityHero } from "../components/hero/ProfessionalIdentityHero/ProfessionalIdentityHero";
import { WorkExperienceShowcase } from "../components/experience/WorkExperience";
import { ProjectsShowCase } from "../components/projects/ProjectsShowCase";
import { AboutMeShowcase } from "../components/about/AboutMeShowCase/AboutMeShowCase";
import { SkillsExperienceShowCase } from "../components/skills/SkillsExperienceShowCase";
import { Contact } from "../components/contact/Contact";
import { ErrorBoundary } from "@/shared/components/ErrorBoundary/ErrorBoundary";
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
        <ErrorBoundary>
          <ProfessionalIdentityHero />
        </ErrorBoundary>
        <ErrorBoundary>
          <WorkExperienceShowcase workExperienceData={workExperienceData} />
        </ErrorBoundary>
        <ErrorBoundary>
          <ProjectsShowCase projects={projects} />
        </ErrorBoundary>
        <ErrorBoundary>
          <AboutMeShowcase />
        </ErrorBoundary>
        <ErrorBoundary>
          <SkillsExperienceShowCase
            proficiencyLevels={proficiencyLevels}
            skillCategories={skillCategories}
          />
        </ErrorBoundary>
        <ErrorBoundary>
          <Contact />
        </ErrorBoundary>
      </main>
    </>
  );
}
