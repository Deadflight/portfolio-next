import { Icon } from "@/shared/components/Icons/Icons";
import { SocialLink } from "@/shared/components/SocialLink/SocialLink";
import { ContactInformationSocialLinks } from "@/shared/types/contact.types";
import React from "react";

export type ContactInformationProps = {
  socialLinks: ContactInformationSocialLinks[];
};
/**
 * Renders the contact information section, including email, phone number, portfolio link, availability,
 * and a list of social media links.
 *
 * @component
 * @param {ContactInformationProps} props - The props for the ContactInformation component.
 * @param {Array<{
 *   linkUrl: string;
 *   linkLabel: string;
 *   linkIcon: string;
 * }>} props.socialLinks - An array of social link objects, each containing a URL, label, and icon name.
 *
 * @example
 * <ContactInformation
 *   socialLinks={[
 *     { linkUrl: "https://twitter.com/username", linkLabel: "Twitter", linkIcon: "Twitter" },
 *     { linkUrl: "https://github.com/username", linkLabel: "GitHub", linkIcon: "GitHub" }
 *   ]}
 * />
 */
export const ContactInformation: React.FC<ContactInformationProps> = ({
  socialLinks,
}) => {
  return (
    <article className="space-y-8">
      <div className="card">
        <h3 className="text-xl font-heading font-semibold text-text-main mb-6">
          Información de Contacto
        </h3>

        <div className="space-y-4">
          <div className="flex items-center">
            <Icon name="Mail" size={20} className="text-text-main mr-4" />
            <div>
              <p className="font-body font-semibold text-text-main">Email</p>
              <a
                href="mailto:correamillancarlos@gmail.com"
                className="link-text"
              >
                correamillancarlos@gmail.com
              </a>
            </div>
          </div>

          <div className="flex items-center">
            <Icon name="Phone" size={20} className="text-text-main mr-4" />
            <div>
              <p className="font-body font-semibold text-text-main">Teléfono</p>
              <a href="tel:+584248599166" className="link-text">
                (+58) 424 859 9166
              </a>
            </div>
          </div>

          <div className="flex items-center">
            <Icon name="Globe" size={20} className="text-text-main mr-4" />
            <div>
              <p className="font-body font-semibold text-text-main">
                Portfolio
              </p>
              <a
                href="https://portfolio-next-lyart-nu.vercel.app"
                target="_blank"
                rel="noopener noreferrer"
                className="link-text"
              >
                portfolio-next-lyart-nu.vercel.app
              </a>
            </div>
          </div>

          <div className="flex items-center">
            <Icon name="MapPin" size={20} className="text-text-main mr-4" />
            <div>
              <p className="font-body font-semibold text-text-main">
                Disponibilidad
              </p>
              <p className="font-body text-primary-brand">Trabajo Remoto</p>
            </div>
          </div>
        </div>
      </div>

      <div className="card">
        <h3 className="text-xl font-heading font-semibold text-text-main mb-6">
          Sígueme
        </h3>

        <div className="flex space-x-4">
          {socialLinks.map((socialLink) => (
            <SocialLink
              key={socialLink.linkUrl}
              href={socialLink.linkUrl}
              ariaLabel={socialLink.linkLabel}
            >
              <Icon
                name={socialLink.linkIcon}
                size={24}
                className="text-text-main"
              />
            </SocialLink>
          ))}
        </div>
      </div>
    </article>
  );
};
