"use client";

import { JSX, useState } from "react";
import { Icon } from "../Icons/Icons";

// Business-focused navigation configuration
const navigationConfig = {
  mainNavigation: [
    {
      href: "#inicio",
      label: "Inicio",
      iconName: "Home" as const,
      businessPurpose: "Professional introduction and brand statement",
    },
    {
      href: "#experiencia",
      label: "Experiencia",
      iconName: "Briefcase" as const,
      businessPurpose: "Career history and professional achievements",
    },
    {
      href: "#proyectos",
      label: "Proyectos",
      iconName: "Code" as const,
      businessPurpose: "Portfolio of completed work and case studies",
    },
    {
      href: "#sobre-mi",
      label: "Sobre Mí",
      iconName: "User" as const,
      businessPurpose: "Professional narrative and personal brand",
    },
    {
      href: "#habilidades",
      label: "Habilidades",
      iconName: "Laptop" as const,
      businessPurpose: "Technical competencies and proficiency levels",
    },
    {
      href: "#contacto",
      label: "Contacto",
      iconName: "Mail" as const,
      businessPurpose: "Client and recruiter engagement channels",
    },
  ],
};

/**
 * NavigationExperience is a responsive navigation bar component for a professional portfolio.
 *
 * - Displays the portfolio brand and main navigation links.
 * - Adapts layout for desktop and mobile screens.
 * - Shows a hamburger menu on mobile, toggling the navigation links.
 * - Uses `navigationConfig.mainNavigation` for navigation items.
 * - Integrates accessibility features such as ARIA labels and keyboard focus styles.
 *
 * @returns {JSX.Element} The rendered navigation bar component.
 */
export const NavigationExperience = (): JSX.Element => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 bg-background-main/95 backdrop-blur-sm border-b border-secondary"
      aria-label="Main navigation for professional portfolio"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Professional Brand */}
          <div className="flex-shrink-0">
            <h1 className="text-xl font-heading font-bold text-primary-brand">
              Carlos Correa Portfolio
            </h1>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:block">
            <div className="ml-10 flex items-baseline space-x-4">
              {navigationConfig.mainNavigation.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className="text-text-main hover:text-primary-brand px-3 py-2 rounded-small text-sm font-body transition-colors duration-200"
                  title={item.businessPurpose}
                >
                  {item.label}
                </a>
              ))}
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-text-main hover:text-primary-brand p-2 rounded-small focus:outline-none focus:ring-2 focus:ring-primary-brand"
              aria-label="Toggle navigation menu"
              aria-expanded={isOpen}
            >
              <Icon name={isOpen ? "X" : "Menu"} size={24} />
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="lg:hidden" data-testid="mobile-menu">
            <div className="px-2 pt-2 pb-3 space-y-1 bg-background-main border-t border-secondary">
              {navigationConfig.mainNavigation.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className="flex items-center text-text-main hover:text-primary-brand px-3 py-2 rounded-small text-base font-body transition-colors duration-200"
                  onClick={() => setIsOpen(false)}
                  title={item.businessPurpose}
                >
                  <Icon name={item.iconName} size={20} className="mr-3" />
                  {item.label}
                </a>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};
