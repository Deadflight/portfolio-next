'use client';
import { JSX, useState, useTransition } from "react";
import { Icon } from "../Icons/Icons";
import { ThemeToggle } from "@/lib/theme/ThemeToggle";
import { useTranslations, useLocale } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import { sendEvent, GA_EVENTS } from "@/lib/ga/events";

/**
 * NavigationExperience is a responsive navigation bar component for a professional portfolio.
 *
 * - Displays the portfolio brand and main navigation links.
 * - Adapts layout for desktop and mobile screens.
 * - Shows a hamburger menu on mobile, toggling the navigation links.
 * - Uses `useTranslations` from next-intl for internationalization.
 * - Integrates accessibility features such as ARIA labels and keyboard focus styles.
 *
 * @returns {JSX.Element} The rendered navigation bar component.
 */
export const NavigationExperience = (): JSX.Element => {
  const [isOpen, setIsOpen] = useState(false);
  const [isPending, startTransition] = useTransition();
  const t = useTranslations("navigation");
  const common = useTranslations("common");
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();
  const nextLocale = locale === "en" ? "es" : "en";

  const trackNavClick = (href: string) => {
    sendEvent(GA_EVENTS.NAV_CLICK, { href });
  };

  const handleLocaleSwitch = () => {
    const hash = typeof window !== "undefined" ? window.location.hash : "";
    startTransition(() => {
      router.replace(`${pathname}${hash}`, { locale: nextLocale });
    });
  };

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 bg-background-main/95 backdrop-blur-sm border-b border-secondary"
      aria-label={t("mainNavigation")}
    >
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <article className="flex justify-between items-center h-16">
          {/* Professional Brand */}
          <div className="flex-shrink-0">
            <p className="text-xl font-heading font-bold text-primary-brand">
              {t("brandName")}
            </p>
          </div>

          {/* Desktop Navigation */}
          <article className="hidden lg:block">
            <ul className="ml-10 flex items-baseline space-x-4">
              <li>
                <a
                  href="#home"
                  className="text-text-main hover:text-primary-brand px-3 py-2 rounded-small text-sm font-body transition-colors duration-200"
                  data-testid="nav-link-home"
                  onClick={() => trackNavClick("#home")}
                >
                  {t("links.home")}
                </a>
              </li>
              <li>
                <a
                  href="#experience"
                  className="text-text-main hover:text-primary-brand px-3 py-2 rounded-small text-sm font-body transition-colors duration-200"
                  data-testid="nav-link-experience"
                  onClick={() => trackNavClick("#experience")}
                >
                  {t("links.experience")}
                </a>
              </li>
              <li>
                <a
                  href="#projects"
                  className="text-text-main hover:text-primary-brand px-3 py-2 rounded-small text-sm font-body transition-colors duration-200"
                  data-testid="nav-link-projects"
                  onClick={() => trackNavClick("#projects")}
                >
                  {t("links.projects")}
                </a>
              </li>
              <li>
                <a
                  href="#about"
                  className="text-text-main hover:text-primary-brand px-3 py-2 rounded-small text-sm font-body transition-colors duration-200"
                  data-testid="nav-link-about"
                  onClick={() => trackNavClick("#about")}
                >
                  {t("links.about")}
                </a>
              </li>
              <li>
                <a
                  href="#skills"
                  className="text-text-main hover:text-primary-brand px-3 py-2 rounded-small text-sm font-body transition-colors duration-200"
                  data-testid="nav-link-skills"
                  onClick={() => trackNavClick("#skills")}
                >
                  {t("links.skills")}
                </a>
              </li>
              <li>
                <a
                  href="#contact"
                  className="text-text-main hover:text-primary-brand px-3 py-2 rounded-small text-sm font-body transition-colors duration-200"
                  data-testid="nav-link-contact"
                  onClick={() => trackNavClick("#contact")}
                >
                  {t("links.contact")}
                </a>
              </li>
              <li>
                <ThemeToggle />
              </li>
              <li>
                <button
                  onClick={handleLocaleSwitch}
                  disabled={isPending}
                  className="text-text-main hover:text-primary-brand px-3 py-2 rounded-small text-sm font-body transition-colors duration-200 font-semibold"
                  aria-label={common("toggleLanguage")}
                  data-testid="locale-switcher"
                >
                  {locale === "en" ? "ES" : "EN"}
                </button>
              </li>
            </ul>
          </article>

          {/* Mobile menu button */}
          <div className="lg:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-text-main hover:text-primary-brand p-2 rounded-small focus:outline-none focus:ring-2 focus:ring-primary-brand"
              aria-label={t("toggleMenu")}
              aria-expanded={isOpen}
            >
              <Icon name={isOpen ? "X" : "Menu"} size={24} />
            </button>
          </div>
        </article>

        {/* Mobile Navigation */}
        {isOpen && (
          <article className="lg:hidden" data-testid="mobile-menu">
            <ul className="px-2 pt-2 pb-3 space-y-1 bg-background-main border-t border-secondary">
              <li>
                <a
                  href="#home"
                  className="flex items-center text-text-main hover:text-primary-brand px-3 py-2 rounded-small text-base font-body transition-colors duration-200"
                  onClick={() => { setIsOpen(false); trackNavClick("#home"); }}
                  data-testid="nav-link-home"
                >
                  <Icon name="Home" size={20} className="mr-3" />
                  {t("links.home")}
                </a>
              </li>
              <li>
                <a
                  href="#experience"
                  className="flex items-center text-text-main hover:text-primary-brand px-3 py-2 rounded-small text-base font-body transition-colors duration-200"
                  onClick={() => { setIsOpen(false); trackNavClick("#experience"); }}
                  data-testid="nav-link-experience"
                >
                  <Icon name="Briefcase" size={20} className="mr-3" />
                  {t("links.experience")}
                </a>
              </li>
              <li>
                <a
                  href="#projects"
                  className="flex items-center text-text-main hover:text-primary-brand px-3 py-2 rounded-small text-base font-body transition-colors duration-200"
                  onClick={() => { setIsOpen(false); trackNavClick("#projects"); }}
                  data-testid="nav-link-projects"
                >
                  <Icon name="Code" size={20} className="mr-3" />
                  {t("links.projects")}
                </a>
              </li>
              <li>
                <a
                  href="#about"
                  className="flex items-center text-text-main hover:text-primary-brand px-3 py-2 rounded-small text-base font-body transition-colors duration-200"
                  onClick={() => { setIsOpen(false); trackNavClick("#about"); }}
                  data-testid="nav-link-about"
                >
                  <Icon name="User" size={20} className="mr-3" />
                  {t("links.about")}
                </a>
              </li>
              <li>
                <a
                  href="#skills"
                  className="flex items-center text-text-main hover:text-primary-brand px-3 py-2 rounded-small text-base font-body transition-colors duration-200"
                  onClick={() => { setIsOpen(false); trackNavClick("#skills"); }}
                  data-testid="nav-link-skills"
                >
                  <Icon name="Laptop" size={20} className="mr-3" />
                  {t("links.skills")}
                </a>
              </li>
              <li>
                <a
                  href="#contact"
                  className="flex items-center text-text-main hover:text-primary-brand px-3 py-2 rounded-small text-base font-body transition-colors duration-200"
                  onClick={() => { setIsOpen(false); trackNavClick("#contact"); }}
                  data-testid="nav-link-contact"
                >
                  <Icon name="Mail" size={20} className="mr-3" />
                  {t("links.contact")}
                </a>
              </li>
              <li>
                <button
                  onClick={() => { handleLocaleSwitch(); setIsOpen(false); }}
                  disabled={isPending}
                  className="flex items-center text-text-main hover:text-primary-brand px-3 py-2 rounded-small text-base font-body transition-colors duration-200 w-full text-left"
                  aria-label={common("toggleLanguage")}
                  data-testid="locale-switcher-mobile"
                >
                  <Icon name="Globe" size={20} className="mr-3" />
                  {locale === "en" ? "ES" : "EN"}
                </button>
              </li>
              <li>
                <ThemeToggle />
              </li>
            </ul>
          </article>
        )}
      </section>
    </nav>
  );
};
