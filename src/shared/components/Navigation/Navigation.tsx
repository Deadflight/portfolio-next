'use client';
import { JSX, useState } from "react";
import { Icon } from "../Icons/Icons";
import { useTranslations } from "next-intl";

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
  const t = useTranslations("navigation");

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
                  href="#inicio"
                  className="text-text-main hover:text-primary-brand px-3 py-2 rounded-small text-sm font-body transition-colors duration-200"
                  data-testid="nav-link-inicio"
                >
                  {t("links.about")}
                </a>
              </li>
              <li>
                <a
                  href="#experiencia"
                  className="text-text-main hover:text-primary-brand px-3 py-2 rounded-small text-sm font-body transition-colors duration-200"
                  data-testid="nav-link-experiencia"
                >
                  {t("links.experience")}
                </a>
              </li>
              <li>
                <a
                  href="#proyectos"
                  className="text-text-main hover:text-primary-brand px-3 py-2 rounded-small text-sm font-body transition-colors duration-200"
                  data-testid="nav-link-proyectos"
                >
                  {t("links.projects")}
                </a>
              </li>
              <li>
                <a
                  href="#sobre-mi"
                  className="text-text-main hover:text-primary-brand px-3 py-2 rounded-small text-sm font-body transition-colors duration-200"
                  data-testid="nav-link-sobre-mi"
                >
                  {t("links.about")}
                </a>
              </li>
              <li>
                <a
                  href="#habilidades"
                  className="text-text-main hover:text-primary-brand px-3 py-2 rounded-small text-sm font-body transition-colors duration-200"
                  data-testid="nav-link-habilidades"
                >
                  {t("links.skills")}
                </a>
              </li>
              <li>
                <a
                  href="#contacto"
                  className="text-text-main hover:text-primary-brand px-3 py-2 rounded-small text-sm font-body transition-colors duration-200"
                  data-testid="nav-link-contacto"
                >
                  {t("links.contact")}
                </a>
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
                  href="#inicio"
                  className="flex items-center text-text-main hover:text-primary-brand px-3 py-2 rounded-small text-base font-body transition-colors duration-200"
                  onClick={() => setIsOpen(false)}
                  data-testid="nav-link-inicio"
                >
                  <Icon name="Home" size={20} className="mr-3" />
                  {t("links.about")}
                </a>
              </li>
              <li>
                <a
                  href="#experiencia"
                  className="flex items-center text-text-main hover:text-primary-brand px-3 py-2 rounded-small text-base font-body transition-colors duration-200"
                  onClick={() => setIsOpen(false)}
                  data-testid="nav-link-experiencia"
                >
                  <Icon name="Briefcase" size={20} className="mr-3" />
                  {t("links.experience")}
                </a>
              </li>
              <li>
                <a
                  href="#proyectos"
                  className="flex items-center text-text-main hover:text-primary-brand px-3 py-2 rounded-small text-base font-body transition-colors duration-200"
                  onClick={() => setIsOpen(false)}
                  data-testid="nav-link-proyectos"
                >
                  <Icon name="Code" size={20} className="mr-3" />
                  {t("links.projects")}
                </a>
              </li>
              <li>
                <a
                  href="#sobre-mi"
                  className="flex items-center text-text-main hover:text-primary-brand px-3 py-2 rounded-small text-base font-body transition-colors duration-200"
                  onClick={() => setIsOpen(false)}
                  data-testid="nav-link-sobre-mi"
                >
                  <Icon name="User" size={20} className="mr-3" />
                  {t("links.about")}
                </a>
              </li>
              <li>
                <a
                  href="#habilidades"
                  className="flex items-center text-text-main hover:text-primary-brand px-3 py-2 rounded-small text-base font-body transition-colors duration-200"
                  onClick={() => setIsOpen(false)}
                  data-testid="nav-link-habilidades"
                >
                  <Icon name="Laptop" size={20} className="mr-3" />
                  {t("links.skills")}
                </a>
              </li>
              <li>
                <a
                  href="#contacto"
                  className="flex items-center text-text-main hover:text-primary-brand px-3 py-2 rounded-small text-base font-body transition-colors duration-200"
                  onClick={() => setIsOpen(false)}
                  data-testid="nav-link-contacto"
                >
                  <Icon name="Mail" size={20} className="mr-3" />
                  {t("links.contact")}
                </a>
              </li>
            </ul>
          </article>
        )}
      </section>
    </nav>
  );
};
