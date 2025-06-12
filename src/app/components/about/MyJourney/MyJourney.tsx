import { Icon } from "@/shared/components/Icons/Icons";
import React, { JSX } from "react";

/**
 * Renders an article card describing the developer's journey.
 *
 * The `MyJourney` component displays a brief narrative about the author's experience
 * as a freelance developer and their professional growth at CheshTech Digital Agency.
 * It includes a heading with an icon and two descriptive paragraphs.
 *
 * @returns {JSX.Element} The rendered article element containing the journey details.
 */
export const MyJourney = (): JSX.Element => {
  return (
    <article className="card">
      <div className="flex items-center mb-4">
        <Icon name="Code" size={20} className="text-text-main mr-3" />
        <h3 className="text-xl font-heading font-semibold text-text-main">
          Mi Viaje en el Desarrollo
        </h3>
      </div>
      <div className="space-y-4">
        <p className="font-body text-text-main leading-relaxed">
          Inicié como desarrollador freelance en Upwork, colaborando con
          clientes internacionales y aprendiendo la importancia de la
          comunicación y la entrega de valor real.
        </p>
        <p className="font-body text-text-main leading-relaxed">
          Posteriormente, en CheshTech Digital Agency (Seattle), perfeccioné mis
          habilidades en React, Next.js y Gatsby.js, desarrollando sitios B2B de
          alto rendimiento y calidad.
        </p>
      </div>
    </article>
  );
};
