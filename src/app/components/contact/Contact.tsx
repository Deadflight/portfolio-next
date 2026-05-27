
import React from "react";
import { ContactInformation } from "./ContactInformation";
import { ContactForm } from "./ContactForm";
import { contactInformation } from "@/constants/contactInformation";
import { useTranslations } from "next-intl";

export const Contact = () => {
  const t = useTranslations("contact");

  return (
    <section id="contact" className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
      <article className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-h2 font-heading font-bold text-text-main mb-4">
            {t("title")}
          </h2>
          <p className="text-lg font-body text-primary-brand max-w-2xl mx-auto font-medium">
            {t("subtitle")}
          </p>
        </div>
      </article>

      <article className="grid lg:grid-cols-2 gap-12">
        <ContactInformation
          socialLinks={[
            {
              linkUrl: contactInformation.github,
              linkIcon: "GitHub",
              linkLabel: "GitHub",
            },
            {
              linkUrl: contactInformation.linkedin,
              linkIcon: "Linkedin",
              linkLabel: "LinkedIn",
            },
          ]}
        />
        <ContactForm />
      </article>
    </section>
  );
};
