import { Icon } from "@/shared/components/Icons/Icons";
import React from "react";

export const AdditionalInfo = () => {
  return (
    <article className="card bg-white border-2 border-text-main/10">
      <dl className="grid sm:grid-cols-2 gap-4 text-center">
        <div className="flex flex-col items-center justify-center">
          <dt className="flex items-center font-body font-bold text-text-main text-sm">
            <Icon name="Location" size={20} className="text-text-main mr-2" />
            Ubicación
          </dt>
          <dd className="font-body text-primary-brand text-xs">
            Trabajo Remoto
          </dd>
        </div>
        <div className="flex flex-col items-center justify-center">
          <dt className="flex items-center font-body font-bold text-text-main text-sm">
            <Icon name="Calendar" size={20} className="text-text-main mr-2" />
            Experiencia
          </dt>
          <dd className="font-body text-primary-brand text-xs">3+ Años</dd>
        </div>
        <div className="flex flex-col items-center justify-center">
          <dt className="flex items-center font-body font-bold text-text-main text-sm">
            <Icon name="Language" size={20} className="text-text-main mr-2" />
            Idiomas
          </dt>
          <dd className="font-body text-primary-brand text-xs">
            Español (Nativo), Inglés (B1)
          </dd>
        </div>
        <div className="flex flex-col items-center justify-center">
          <dt className="flex items-center font-body font-bold text-text-main text-sm">
            <Icon name="Star" size={20} className="text-text-main mr-2" />
            Filosofía
          </dt>
          <dd className="font-body text-primary-brand text-xs">
            Hacer las cosas bien y con buena actitud, buscando siempre dar ese
            paso extra.
          </dd>
        </div>
      </dl>
    </article>
  );
};
