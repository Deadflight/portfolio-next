import { Icon } from "@/shared/components/Icons/Icons";
import React from "react";

/**
 * Renders a section displaying language proficiency information.
 *
 * This component shows a card with two language entries: Spanish and English.
 * Each entry displays a star rating, language name, proficiency level, and a brief description.
 * The section is accessible with appropriate ARIA labels and headings.
 *
 * @component
 * @example
 * <SkillsLanguage />
 */
export const SkillsLanguage = () => {
  return (
    <section className="mt-12" aria-labelledby="languages-title">
      <div className="card max-w-2xl mx-auto bg-background-main border-2 border-primary-brand/10 shadow-subtle">
        <header className="flex items-center mb-6">
          <Icon
            name="Globe"
            size={20}
            className="mr-3 text-text-main"
            aria-hidden="true"
          />
          <h2
            id="languages-title"
            className="text-xl font-heading font-semibold text-text-main"
          >
            Idiomas
          </h2>
        </header>
        <div className="grid sm:grid-cols-2 gap-6">
          <div
            className="text-center p-4 bg-background-main rounded-medium"
            role="region"
            aria-label="Español"
          >
            <div className="flex justify-center mb-2" aria-hidden="true">
              {[...Array(5)].map((_, index) => (
                <Icon
                  key={index}
                  name="Star"
                  size={14}
                  className="text-success mr-1"
                  aria-hidden="true"
                />
              ))}
            </div>
            <h3 className="font-body font-bold text-text-main mb-1">Español</h3>
            <p className="font-body text-primary-brand text-sm">Nativo</p>
            <p className="font-body text-primary-brand text-xs mt-1">
              Comunicación profesional y técnica fluida
            </p>
          </div>
          <div
            className="text-center p-4 bg-background-main rounded-medium"
            role="region"
            aria-label="Inglés"
          >
            <div className="flex justify-center mb-2" aria-hidden="true">
              {[...Array(5)].map((_, index) => (
                <Icon
                  key={index}
                  name="Star"
                  size={14}
                  className={`mr-1 ${
                    index < 3 ? "text-primary-brand" : "text-secondary"
                  }`}
                  aria-hidden="true"
                />
              ))}
            </div>
            <h3 className="font-body font-bold text-text-main mb-1">Inglés</h3>
            <p className="font-body text-primary-brand text-sm">
              B1 - Intermedio
            </p>
            <p className="font-body text-primary-brand text-xs mt-1">
              Comunicación técnica escrita, reuniones de trabajo
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
