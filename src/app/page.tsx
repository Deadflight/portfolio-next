import { NavigationExperience } from "@/shared/components/Navigation/Navigation";
import { ProfessionalIdentityHero } from "./components/hero/ProfessionalIdentityHero/ProfessionalIdentityHero";
import { WorkExperienceShowcase } from "./components/experience/WorkExperience";
import { ProjectsShowCase } from "./components/projects/ProjectsShowCase";
import { AboutMeShowcase } from "./components/about/AboutMeShowCase/AboutMeShowCase";

export default function Home() {
  return (
    <main className="min-h-screen" role="main" id="main-content">
      <NavigationExperience />
      <ProfessionalIdentityHero />
      <WorkExperienceShowcase />
      <ProjectsShowCase />
      <AboutMeShowcase />
    </main>
  );
}
