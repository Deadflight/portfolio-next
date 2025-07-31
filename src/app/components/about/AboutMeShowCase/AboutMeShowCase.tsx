import { MyJourney } from "../MyJourney/MyJourney";
import { RolesAndEvolution } from "../RolesAndEvolution/RolesAndEvolution";
import { AdditionalInfo } from "../AdditionalInfo/AdditionalInfo";
import { CurrentFocus } from "../CurrentFocus/CurrentFocus";
import { BeyondTheCode } from "../BeyondTheCode/BeyondTheCode";
import { JSX } from "react";

/**
 * Renders the "Sobre Mí" (About Me) showcase section, presenting personal and professional information.
 *
 * This component displays a two-column layout:
 * - The left column includes the user's journey, roles and evolution, and additional personal information.
 * - The right column highlights current focus and philosophy beyond coding.
 *
 * At the bottom, it features a call-to-action card inviting users to collaborate or view projects.
 *
 * @component
 * @returns {JSX.Element} The rendered AboutMeShowcase section.
 */
export const AboutMeShowcase = (): JSX.Element => {
  return (
    <section id="sobre-mi" className="py-16 px-4 sm:px-6 lg:px-8">
      <article className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-h2 font-heading font-bold text-text-main mb-4">
            Sobre Mí
          </h2>
          <p className="text-lg font-body text-primary-brand max-w-2xl mx-auto font-medium">
            Desarrollador de software enfocado en soluciones alineadas a las
            reglas de negocio, con pasión por crear experiencias digitales que
            realmente aporten valor.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Columna izquierda - Historia personal */}
          <div className="space-y-6">
            <MyJourney />

            <RolesAndEvolution />

            {/* Información personal adicional */}
            <AdditionalInfo />
          </div>

          {/* Columna derecha - Enfoque y filosofía */}
          <div className="space-y-6">
            <CurrentFocus />

            <BeyondTheCode />
          </div>
        </div>

        <div className="mt-12 text-center">
          <article className="card max-w-3xl mx-auto bg-white border-2 border-text-main/10">
            <h3 className="text-xl font-heading font-semibold text-text-main mb-4">
              ¿Te gustaría trabajar conmigo?
            </h3>
            <p className="font-body text-primary-brand leading-relaxed mb-6 font-medium">
              Estoy siempre abierto a nuevos desafíos y oportunidades de
              colaboración. Si tienes un proyecto interesante o simplemente
              quieres charlar sobre tecnología, no dudes en contactarme.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="#contacto" className="btn-primary">
                Hablemos
              </a>
              <a href="#proyectos" className="btn-secondary">
                Ver Mi Trabajo
              </a>
            </div>
          </article>
        </div>
      </article>
    </section>
  );
};
