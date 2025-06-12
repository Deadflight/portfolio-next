import { Icon } from "@/shared/components/Icons/Icons";
import React from "react";

export const RolesAndEvolution = () => {
  return (
    <article className="card">
      <div className="flex items-center mb-4">
        <Icon name="Lightbulb" size={20} className="text-text-main mr-3" />
        <h3 className="text-xl font-heading font-semibold text-text-main">
          Roles y Evolución
        </h3>
      </div>
      <div className="space-y-4">
        <p className="font-body text-text-main leading-relaxed">
          Mi evolución profesional me ha llevado desde el desarrollo frontend
          especializado hasta convertirme en un desarrollador full stack. En
          Contactemos Contact Center, me enfoqué en resolver problemas críticos
          de UX en aplicaciones SaaS, aprendiendo que cada línea de código
          impacta directamente en la experiencia del usuario.
        </p>
        <p className="font-body text-text-main leading-relaxed">
          En Farmaloop, lideré el desarrollo de sistemas complejos como
          plataformas administrativas y puntos de venta, gestionando un alto
          volumen de pedidos por hora. Esta experiencia me enseñó la importancia
          de crear soluciones escalables y eficientes.
        </p>
      </div>
    </article>
  );
};
