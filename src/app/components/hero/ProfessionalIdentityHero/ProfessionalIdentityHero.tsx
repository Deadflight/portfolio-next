

import { Icon } from "@/shared/components/Icons/Icons";
import { ProfessionalActions } from "../ProfessionalActions/ProfessionalActions";
import { SocialProfileLinks } from "../SocialProfileLinks/SocialProfileLinks";
import { JSX } from "react";
import { useTranslations } from "next-intl";

/**
 * Renders the main hero section introducing the professional identity of the user.
 *
 * Displays the user's full name, professional title, and value proposition,
 * along with action buttons and social profile links. Includes a visual cue
 * to scroll down. Uses translations from next-intl.
 *
 * @component
 * @returns {JSX.Element} The rendered hero section for the professional identity.
 */
export const ProfessionalIdentityHero = (): JSX.Element => {
  const t = useTranslations("hero");

  return (
    <section
      id="home"
      className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 pt-16"
      aria-label={t("ariaLabel")}
    >
      <article
        className="max-w-4xl mx-auto text-center"
        aria-label={t("ariaLabel")}
      >
        <header className="mb-8">
          <h1 className="text-h1 font-heading font-bold text-text-main mb-4">
            {t("name")}
          </h1>
          <h2 className="text-h2 font-heading text-primary-brand mb-6">
            {t("subtitle")}
          </h2>
          <p className="text-lg font-body text-text-main max-w-2xl mx-auto leading-body font-medium">
            {t("valueProposition")}
          </p>
        </header>

        <ProfessionalActions />
        <SocialProfileLinks />

        <div className="animate-bounce">
          <a href="#experience" aria-label={t("scrollDown")}>
            <Icon
              name="ChevronDown"
              size={28}
              className="text-accent mx-auto"
              aria-hidden="true"
            />
          </a>
        </div>
      </article>
    </section>
  );
};
