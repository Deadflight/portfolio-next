"use client";

import React, { JSX } from "react";
import { Icon } from "../Icons/Icons";
import { useTranslations } from "next-intl";
import { ScrollToTopButton } from "../ScrollToTopButton/ScrollToTopButton";

/**
 * Footer component for the portfolio website.
 *
 * Renders a responsive footer section containing:
 * - A brief description about the developer.
 * - Quick navigation links to different sections of the site.
 * - Contact information including email and phone.
 * - A copyright notice with the current year.
 * - A "Scroll to Top" button.
 *
 * @component
 * @returns {JSX.Element} The rendered footer section.
 *
 * @remarks
 * - Uses Tailwind CSS utility classes for styling.
 * - Uses useTranslations from next-intl for internationalization.
 * - Includes accessibility features such as `aria-label` and focus outlines.
 */
const footerLinkClass =
  "font-body text-text-main/80 hover:text-text-main transition-colors duration-200";

export const Footer = (): JSX.Element => {
  const t = useTranslations("footer");
  const currentYear = new Date().getFullYear();

  return (
    <footer className="text-text-main bg-background-main py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          <div>
            <h3 className="text-xl font-heading font-bold mb-4">Portfolio</h3>
            <p className="font-body text-text-main/80 leading-body">
              {t("description")}
            </p>
          </div>

          <div>
            <h4 className="font-heading font-semibold mb-4">
              {t("quickLinks")}
            </h4>
            <ul className="space-y-2">
              <li>
                <a
                  href="#inicio"
                  className={footerLinkClass}
                  data-testid="footer-link-inicio"
                >
                  Inicio
                </a>
              </li>
              <li>
                <a
                  href="#experiencia"
                  className={footerLinkClass}
                  data-testid="footer-link-experiencia"
                >
                  Experiencia
                </a>
              </li>
              <li>
                <a
                  href="#proyectos"
                  className={footerLinkClass}
                  data-testid="footer-link-proyectos"
                >
                  Proyectos
                </a>
              </li>
              <li>
                <a
                  href="#sobre-mi"
                  className={footerLinkClass}
                  data-testid="footer-link-sobre-mi"
                >
                  Sobre Mí
                </a>
              </li>
              <li>
                <a
                  href="#habilidades"
                  className={footerLinkClass}
                  data-testid="footer-link-habilidades"
                >
                  Habilidades
                </a>
              </li>
              <li>
                <a
                  href="#contacto"
                  className={footerLinkClass}
                  data-testid="footer-link-contacto"
                >
                  Contacto
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-heading font-semibold mb-4">
              {t("contact.title")}
            </h4>
            <div className="space-y-2 flex flex-col">
              <a
                href="mailto:carlos@correa.dev"
                className="font-body text-text-main/80 hover:underline focus-visible:outline-2 focus-visible:outline-primary-brand rounded-sm transition-colors duration-200"
                aria-label={`${t("contact.email")}: carlos@correa.dev`}
              >
                carlos@correa.dev
              </a>
              <a
                href="tel:+34612345678"
                className="font-body text-text-main/80 hover:underline focus-visible:outline-2 focus-visible:outline-primary-brand rounded-sm transition-colors duration-200"
                aria-label={`${t("contact.phone")}: +34 612 345 678`}
              >
                +34 612 345 678
              </a>
              <p className="font-body text-text-main/80">{t("location")}</p>
            </div>
          </div>
        </div>

        <div className="border-t border-background-main/20 pt-8">
          <div className="flex flex-col sm:flex-row justify-between items-center">
            <p className="font-body text-text-main/80 text-sm mb-4 sm:mb-0 flex items-center">
              {t("copyright", { year: currentYear })}
              <Icon name="Heart" size={16} className="text-red-400 mx-1" /> y
              Next.js
            </p>

            <ScrollToTopButton />
          </div>
        </div>
      </div>
    </footer>
  );
};
