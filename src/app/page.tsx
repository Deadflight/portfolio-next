import { ProfessionalIdentityHero } from "./components/hero/ProfessionalIdentityHero/ProfessionalIdentityHero";
import { WorkExperienceShowcase } from "./components/experience/WorkExperience";
import { ProjectsShowCase } from "./components/projects/ProjectsShowCase";
import { AboutMeShowcase } from "./components/about/AboutMeShowCase/AboutMeShowCase";
import { SkillsExperienceShowCase } from "./components/skills/SkillsExperienceShowCase";
import { Contact } from "./components/contact/Contact";
import { workExperienceData } from "@/constants/workExperience";

export default function Home() {
  return (
    <>
      <main className="min-h-screen" role="main" id="main-content">
        <ProfessionalIdentityHero />
        <WorkExperienceShowcase workExperienceData={workExperienceData} />
        <ProjectsShowCase />
        <AboutMeShowcase />
        <SkillsExperienceShowCase />
        <Contact />
      </main>
    </>
  );
}
