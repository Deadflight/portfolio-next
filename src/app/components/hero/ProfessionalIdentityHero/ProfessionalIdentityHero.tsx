import { Icon } from "@/shared/components/Icons/Icons";
import { ProfessionalActions } from "../ProfessionalActions/ProfessionalActions";
import { SocialProfileLinks } from "../SocialProfileLinks/SocialProfileLinks";
import { JSX } from "react";

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

/**
 * Renders the main hero section introducing the professional identity of the user.
 *
 * Displays the user's full name, professional title, and value proposition,
 * along with action buttons and social profile links. Includes a visual cue
 * to scroll down. Uses data from the `professionalProfile` object.
 *
 * @component
 * @returns {JSX.Element} The rendered hero section for the professional identity.
 */
export const ProfessionalIdentityHero = (): JSX.Element => {
  const { personalInfo, brandingElements } = professionalProfile;

  return (
    <section
      id="inicio"
      className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 pt-16"
      aria-label="Professional introduction and brand statement"
    >
      <article
        className="max-w-4xl mx-auto text-center"
        aria-label="Professional identity hero section"
      >
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
      </article>
    </section>
  );
};
