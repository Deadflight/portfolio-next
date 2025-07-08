import React from "react";
import { ContactInformation } from "./ContactInformation";

export const Contact = () => {
  return (
    <section id="contacto" className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-h2 font-heading font-bold text-[#22223B] mb-4">
            Contacto
          </h2>
          <p className="text-lg font-body text-[#4A4E69] max-w-2xl mx-auto font-medium">
            ¿Tienes un proyecto en mente? Me encantaría escuchar sobre él
          </p>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-12">
        <ContactInformation
          socialLinks={[
            {
              linkUrl: "https://github.com/Deadflight",
              linkIcon: "GitHub",
              linkLabel: "GitHub",
            },
            {
              linkUrl: "https://linkedin.com/in/carloscorreamillan",
              linkIcon: "Linkedin",
              linkLabel: "LinkedIn",
            },
          ]}
        />
      </div>
    </section>
  );
};
