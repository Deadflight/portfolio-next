export interface SocialLinkProps {
  href: string;
  ariaLabel: string;
  children: React.ReactNode;
}

export const SocialLink: React.FC<SocialLinkProps> = ({
  href,
  ariaLabel,
  children,
}) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="p-3 bg-white rounded-lg border border-accent/30 hover:bg-background-main transition-colors duration-200"
    aria-label={ariaLabel}
  >
    {children}
  </a>
);
