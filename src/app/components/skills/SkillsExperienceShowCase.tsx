import { SkillsLegend } from "./SkillsLegend";
import { SkillsLanguage } from "./SkillsLanguage";
import { SkillsLearning } from "./SkillsLearning";
import { SkillsCategoryList } from "./SkillsCategoryList";
import { proficiencyLevels, skillCategories } from "@/constants/skills";

/**
 * SkillsExperienceShowCase displays categorized technical skills, proficiency levels,
 * language abilities, and ongoing learning topics in a visually organized showcase.
 *
 * Usage: Place this component within a page to present a detailed overview of technical
 * competencies and experience.
 */
export const SkillsExperienceShowCase = () => {
  return (
    <section
      id="habilidades"
      className="py-16 px-4 sm:px-6 lg:px-8 bg-background-main"
      aria-labelledby="skills-title"
    >
      <div className="max-w-6xl mx-auto">
        <header className="text-center mb-12">
          <h2
            id="skills-title"
            className="text-h2 font-heading font-bold text-text-main mb-4"
          >
            Habilidades Técnicas
          </h2>
          <p className="text-lg font-body text-primary-brand max-w-2xl mx-auto font-medium">
            Mi experiencia práctica en tecnologías y herramientas para crear
            soluciones completas
          </p>
        </header>

        {/* Proficiency Legend */}
        <SkillsLegend proficiencyLevels={proficiencyLevels} />

        <section aria-labelledby="skills-categories-title">
          <h2 id="skills-categories-title" className="sr-only">
            Categorías de habilidades
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {skillCategories.map((category) => (
              <SkillsCategoryList
                category={category}
                proficiencyLevels={proficiencyLevels}
                key={category.id}
              />
            ))}
          </div>
        </section>

        {/* Languages Section */}
        <SkillsLanguage />

        {/* Learning Section */}
        <SkillsLearning />
      </div>
    </section>
  );
};
