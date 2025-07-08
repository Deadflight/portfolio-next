import { Icon } from "@/shared/components/Icons/Icons";
import { JSX } from "react";

const socialProfiles = [
  {
    platform: "github",
    url: "https://github.com/Deadflight",
    ariaLabel: "Perfil de GitHub de Carlos Correa",
    iconName: "GitHub" as const,
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

/**
 * Renders a navigation bar containing links to professional social profiles.
 *
 * Each link displays an icon representing the social platform and opens in a new tab,
 * except for email links which open in the same tab. The navigation is accessible and
 * styled for visual feedback on hover.
 *
 * @returns {JSX.Element} A navigation element with social profile links.
 */
export const SocialProfileLinks = (): JSX.Element => {
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
