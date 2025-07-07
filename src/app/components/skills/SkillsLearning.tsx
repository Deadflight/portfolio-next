import { Icon } from "@/shared/components/Icons/Icons";
import React, { JSX } from "react";
/**
 * Renders a section highlighting the user's ongoing learning topics and commitment to continuous improvement.
 *
 * Displays a card with a trophy icon, a heading, a descriptive paragraph, and a list of current learning subjects,
 * each accompanied by a rocket icon. The section is styled for visual emphasis and accessibility.
 *
 * @returns {JSX.Element} The SkillsLearning section component.
 *
 * @example
 * <SkillsLearning />
 */
export const SkillsLearning = (): JSX.Element => {
  return (
    <section className="mt-12 text-center" aria-labelledby="learning-title">
      <div className="card max-w-3xl mx-auto bg-background-main border-2 border-primary-brand/10 shadow-subtle">
        <header className="flex items-center justify-center mb-4">
          <Icon
            name="Trophy"
            size={20}
            className="mr-3 text-text-main"
            aria-hidden="true"
          />
          <h2
            id="learning-title"
            className="text-xl font-heading font-semibold text-text-main"
          >
            Aprendizaje Continuo
          </h2>
        </header>
        <p className="font-body text-primary-brand leading-relaxed mb-6 font-medium">
          La tecnología evoluciona constantemente, y yo también. Actualmente
          estoy profundizando en arquitecturas de microservicios, explorando
          tecnologías emergentes como Web3, y mejorando mis habilidades en
          DevOps y testing automatizado.
        </p>
        <ul
          className="flex flex-wrap justify-center gap-2"
          aria-label="Temas de aprendizaje actual"
        >
          {["Microservicios", "Testing Avanzado", "Angular", "MCP"].map(
            (tech) => (
              <li
                key={tech}
                className="px-3 py-1 bg-background-main border border-accent/30 text-text-main text-sm font-body rounded-full flex items-center"
              >
                <Icon
                  name="Rocket"
                  size={12}
                  className="mr-1 text-primary-brand"
                  aria-hidden="true"
                />
                {tech}
              </li>
            )
          )}
        </ul>
      </div>
    </section>
  );
};
