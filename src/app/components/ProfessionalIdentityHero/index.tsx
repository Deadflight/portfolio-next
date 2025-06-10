import { Icon } from "@/shared/components/icons";

// Business domain data - Professional Identity
const professionalProfile = {
  personalInfo: {
    fullName: "Carlos Correa",
    professionalTitle: "Desarrollador Full Stack",
    location: "Trabajo Remoto",
  },
  brandingElements: {
    valueProposition:
      "Más de 3 años de experiencia creando aplicaciones web escalables con React, Node.js y AWS. Especializado en entornos ágiles y desarrollo de soluciones centradas en el usuario.",
    socialProfiles: [
      {
        platform: "github",
        url: "https://github.com/Deadflight",
        ariaLabel: "Perfil de GitHub de Carlos Correa",
        iconName: "Github" as const,
      },
      {
        platform: "linkedin",
        url: "https://linkedin.com/in/carloscorreamillan",
        ariaLabel: "Perfil de LinkedIn de Carlos Correa",
        iconName: "Linkedin" as const,
      },
      {
        platform: "email",
        url: "mailto:correamillancarlos@gmail.com",
        ariaLabel: "Enviar email a Carlos Correa",
        iconName: "Mail" as const,
      },
    ],
  },
};

function ProfessionalActions() {
  return (
    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
      <a
        href="#proyectos"
        className="btn-primary"
        aria-label="View my completed projects and case studies"
      >
        Ver Proyectos
      </a>
      <a
        href="/cv-carlos-correa.pdf"
        download
        className="btn-secondary flex items-center"
        aria-label="Download my complete professional resume"
      >
        <Icon name="Download" size={16} className="mr-2" />
        Descargar CV
      </a>
    </div>
  );
}

function SocialProfileLinks() {
  return (
    <nav
      className="flex justify-center space-x-6 mb-12"
      aria-label="Professional social profiles"
    >
      {professionalProfile.brandingElements.socialProfiles.map((profile) => (
        <a
          key={profile.platform}
          href={profile.url}
          target={profile.platform !== "email" ? "_blank" : undefined}
          rel={profile.platform !== "email" ? "noopener noreferrer" : undefined}
          className="text-[#22223B] hover:text-[#4A4E69] transition-colors duration-200 p-2 rounded-lg hover:bg-white/50"
          aria-label={profile.ariaLabel}
        >
          <Icon name={profile.iconName} size={28} />
        </a>
      ))}
    </nav>
  );
}

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
          <h1 className="text-h1 font-heading font-bold text-[#22223B] mb-4">
            {personalInfo.fullName}
          </h1>
          <h2 className="text-h2 font-heading text-[#4A4E69] mb-6">
            {personalInfo.professionalTitle}
          </h2>
          <p className="text-lg font-body text-[#22223B] max-w-2xl mx-auto leading-body font-medium">
            {brandingElements.valueProposition}
          </p>
        </header>

        <ProfessionalActions />
        <SocialProfileLinks />

        <div className="animate-bounce" aria-hidden="true">
          <Icon
            name="ChevronDown"
            size={28}
            className="text-[#6B7280] mx-auto"
          />
        </div>
      </div>
    </section>
  );
}
