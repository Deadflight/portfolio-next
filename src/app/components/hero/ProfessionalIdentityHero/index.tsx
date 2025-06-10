import { Icon } from "@/shared/components/icons";
import { ProfessionalActions } from "../ProfessionalActions";
import { SocialProfileLinks } from "../SocialProfileLinks";

const professionalProfile = {
  personalInfo: {
    fullName: "Carlos Correa",
    professionalTitle: "Desarrollador Full Stack",
    location: "Trabajo Remoto",
  },
  brandingElements: {
    valueProposition:
      "Más de 3 años de experiencia creando aplicaciones web escalables con React, Node.js y AWS. Especializado en entornos ágiles y desarrollo de soluciones centradas en el usuario.",
  },
};

export default function ProfessionalIdentityHero() {
  const { personalInfo, brandingElements } = professionalProfile;

  return (
    <section
      id="inicio"
      className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 pt-16"
      aria-label="Professional introduction and brand statement"
    >
      <div className="max-w-4xl mx-auto text-center">
        <header className="mb-8">
          <h1 className="text-h1 font-heading font-bold text-text-main mb-4">
            {personalInfo.fullName}
          </h1>
          <h2 className="text-h2 font-heading text-primary-brand mb-6">
            {personalInfo.professionalTitle}
          </h2>
          <p className="text-lg font-body text-text-main max-w-2xl mx-auto leading-body font-medium">
            {brandingElements.valueProposition}
          </p>
        </header>

        <ProfessionalActions />
        <SocialProfileLinks />

        <div className="animate-bounce" aria-hidden="true">
          <Icon name="ChevronDown" size={28} className="text-accent mx-auto" />
        </div>
      </div>
    </section>
  );
}
