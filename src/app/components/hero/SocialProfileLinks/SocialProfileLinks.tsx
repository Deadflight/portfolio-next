import { Icon } from "@/shared/components/Icons/Icons";

const socialProfiles = [
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
];

export const SocialProfileLinks = () => {
  return (
    <nav
      className="flex justify-center space-x-6 mb-12"
      aria-label="Professional social profiles"
    >
      {socialProfiles.map((profile) => (
        <a
          key={profile.platform}
          href={profile.url}
          target={profile.platform !== "email" ? "_blank" : undefined}
          rel={profile.platform !== "email" ? "noopener noreferrer" : undefined}
          className="text-text-main hover:text-primary-brand transition-colors duration-200 p-2 rounded-lg hover:bg-white/50"
          aria-label={profile.ariaLabel}
        >
          <Icon name={profile.iconName} size={28} />
        </a>
      ))}
    </nav>
  );
};
