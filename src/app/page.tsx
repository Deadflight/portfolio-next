import { NavigationExperience } from "@/shared/components/Navigation/Navigation";
import { ProfessionalIdentityHero } from "./components/hero/ProfessionalIdentityHero/ProfessionalIdentityHero";

export default function Home() {
  return (
    <main className="min-h-screen" role="main" id="main-content">
      <NavigationExperience />
      <ProfessionalIdentityHero />
    </main>
  );
}
