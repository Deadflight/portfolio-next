import { NavigationExperience } from "@/shared/components/Navigation/Navigation";
import { ProfessionalIdentityHero } from "./components/hero/ProfessionalIdentityHero/ProfessionalIdentityHero";
import { WorkExperienceShowcase } from "./components/experience/WorkExperience";
import { ProjectsShowCase } from "./components/projects/ProjectsShowCase";
import { AboutMeShowcase } from "./components/about/AboutMeShowCase/AboutMeShowCase";
import { SkillsExperienceShowCase } from "./components/skills/SkillsExperienceShowCase";
import { Contact } from "./components/contact/Contact";
import { Footer } from "@/shared/components/Footer/Footer";

export default function Home() {
  return (
    <>
      <main className="min-h-screen" role="main" id="main-content">
        <NavigationExperience />
        <ProfessionalIdentityHero />
        <WorkExperienceShowcase />
        <ProjectsShowCase />
        <AboutMeShowcase />
        <SkillsExperienceShowCase />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
