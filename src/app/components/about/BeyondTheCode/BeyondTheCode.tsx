import { Icon } from "@/shared/components/Icons/Icons";
import React from "react";

export const BeyondTheCode = () => {
  return (
    <article className="card">
      <div className="flex items-center mb-4">
        <Icon name="Coffee" size={20} className="text-text-main mr-3" />
        <h3 className="text-xl font-heading font-semibold text-text-main">
          Más Allá del Código
        </h3>
      </div>
      <div className="space-y-4">
        <p className="font-body text-text-main leading-relaxed">
          Más allá del desarrollo, busco crecer tanto en lo profesional como en
          lo personal. Me interesa aprender nuevas tecnologías, mejorar mi nivel
          de inglés conversacional, explorar nuevos desafíos, y disfrutar de
          hobbies como la cocina, juegos de rol, RPG y estrategia.
        </p>
        <ul className="space-y-2">
          <li className="flex items-center font-body text-text-main text-sm">
            <span className="w-2 h-2 bg-text-main rounded-full mr-3 flex-shrink-0" />
            Aprender y experimentar con tecnologías emergentes
          </li>
          <li className="flex items-center font-body text-text-main text-sm">
            <span className="w-2 h-2 bg-text-main rounded-full mr-3 flex-shrink-0" />
            Mejorar mi inglés para comunicarme con fluidez con personas nativas
          </li>
          <li className="flex items-center font-body text-text-main text-sm">
            <span className="w-2 h-2 bg-text-main rounded-full mr-3 flex-shrink-0" />
            Curiosear en nuevos retos y desafíos tecnológicos
          </li>
          <li className="flex items-center font-body text-text-main text-sm">
            <span className="w-2 h-2 bg-text-main rounded-full mr-3 flex-shrink-0" />
            Disfrutar de la cocina, juegos de rol, RPG y estrategia
          </li>
        </ul>
      </div>
    </article>
  );
};
