"use client";

import { JSX, useState } from "react";
import { Icon } from "../Icons/Icons";
import { navigationConfig } from "@/constants/navigationConfig";

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
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <article className="flex justify-between items-center h-16">
          {/* Professional Brand */}
          <div className="flex-shrink-0">
            <p className="text-xl font-heading font-bold text-primary-brand">
              Carlos Correa Portfolio
            </p>
          </div>

          {/* Desktop Navigation */}
          <article className="hidden lg:block">
            <ul className="ml-10 flex items-baseline space-x-4">
              {navigationConfig.mainNavigation.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    className="text-text-main hover:text-primary-brand px-3 py-2 rounded-small text-sm font-body transition-colors duration-200"
                    title={item.businessPurpose}
                    data-testid={`nav-link-${item.href.replace("#", "")}`}
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </article>

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
        </article>

        {/* Mobile Navigation */}
        {isOpen && (
          <article className="lg:hidden" data-testid="mobile-menu">
            <ul className="px-2 pt-2 pb-3 space-y-1 bg-background-main border-t border-secondary">
              {navigationConfig.mainNavigation.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    className="flex items-center text-text-main hover:text-primary-brand px-3 py-2 rounded-small text-base font-body transition-colors duration-200"
                    onClick={() => setIsOpen(false)}
                    title={item.businessPurpose}
                    data-testid={`nav-link-${item.href.replace("#", "")}`}
                  >
                    <Icon name={item.iconName} size={20} className="mr-3" />
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </article>
        )}
      </section>
    </nav>
  );
};
