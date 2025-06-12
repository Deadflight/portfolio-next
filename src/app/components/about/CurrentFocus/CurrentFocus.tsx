import { Icon } from "@/shared/components/Icons/Icons";
import React, { JSX } from "react";

/**
 * Renders an article card describing the current professional focus.
 *
 * The `CurrentFocus` component displays a summary of the developer's main areas of expertise,
 * including user-centered development, scalable solutions, international collaboration, and measurable impact.
 * It highlights key technologies such as React, Next.js, Node.js, TypeScript, Express, AWS, and MongoDB.
 *
 * @returns {JSX.Element} The rendered article card with current focus details.
 */
export const CurrentFocus = (): JSX.Element => {
  return (
    <article className="card">
      <div className="flex items-center mb-4">
        <Icon name="Heart" size={20} className="text-red-500 mr-3" />
        <h3 className="text-xl font-heading font-semibold text-text-main">
          Mi Enfoque Actual
        </h3>
      </div>
      <div className="space-y-4">
        <p className="font-body text-text-main leading-relaxed">
          Mi enfoque actual se basa en el desarrollo centrado en el usuario y en
          la creación de soluciones robustas, escalables y alineadas a los
          objetivos del negocio. Trabajo principalmente con React, Next.js,
          Node.js, TypeScript, Express, AWS y MongoDB.
        </p>
        <div className="space-y-3">
          <div>
            <h4 className="font-body font-bold text-text-main mb-2">
              Soluciones Escalables
            </h4>
            <p className="font-body text-primary-brand text-sm leading-relaxed">
              Diseño arquitecturas que crecen con el negocio, aplicando buenas
              prácticas y tecnologías modernas para garantizar rendimiento y
              estabilidad.
            </p>
          </div>
          <div>
            <h4 className="font-body font-bold text-text-main mb-2">
              Colaboración Internacional
            </h4>
            <p className="font-body text-primary-brand text-sm leading-relaxed">
              Experiencia trabajando remotamente con equipos y clientes
              internacionales, priorizando la comunicación clara y la
              documentación efectiva.
            </p>
          </div>
          <div>
            <h4 className="font-body font-bold text-text-main mb-2">
              Impacto Medible
            </h4>
            <p className="font-body text-primary-brand text-sm leading-relaxed">
              Cada proyecto busca resultados concretos: desde mejorar la
              experiencia de usuario hasta optimizar procesos y aumentar la
              eficiencia operativa.
            </p>
          </div>
        </div>
      </div>
    </article>
  );
};
