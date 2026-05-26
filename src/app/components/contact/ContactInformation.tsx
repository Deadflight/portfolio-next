"use client";
import { contactInformation } from "@/constants/contactInformation";
import { Icon } from "@/shared/components/Icons/Icons";
import { SocialLink } from "@/shared/components/SocialLink/SocialLink";
import { ContactInformationSocialLinks } from "@/shared/types/contact.types";
import React from "react";
import { useTranslations } from "next-intl";

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
  const t = useTranslations("contact");

  return (
    <article className="space-y-8">
      <div className="card">
        <h3 className="text-xl font-heading font-semibold text-text-main mb-6">
          {t("contactInfoTitle")}
        </h3>

        <div className="space-y-4">
          <div className="flex items-center">
            <Icon name="Mail" size={20} className="text-text-main mr-4" />
            <div>
              <p className="font-body font-semibold text-text-main">
                {t("email")}
              </p>
              <a
                href="mailto:correamillancarlos@gmail.com"
                className="link-text"
              >
                {contactInformation.email}
              </a>
            </div>
          </div>

          <div className="flex items-center">
            <Icon name="Phone" size={20} className="text-text-main mr-4" />
            <div>
              <p className="font-body font-semibold text-text-main">
                {t("phone")}
              </p>
              <a href={`tel:${contactInformation.phone}`} className="link-text">
                {contactInformation.phone}
              </a>
            </div>
          </div>

          <div className="flex items-center">
            <Icon name="Globe" size={20} className="text-text-main mr-4" />
            <div>
              <p className="font-body font-semibold text-text-main">
                {t("portfolio")}
              </p>
              <a
                href={contactInformation.portfolio}
                target="_blank"
                rel="noopener noreferrer"
                className="link-text"
              >
                {new URL(contactInformation.portfolio).hostname}
              </a>
            </div>
          </div>

          <div className="flex items-center">
            <Icon name="MapPin" size={20} className="text-text-main mr-4" />
            <div>
              <p className="font-body font-semibold text-text-main">
                {t("availability")}
              </p>
              <p className="font-body text-primary-brand">{t("availability")}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="card">
        <h3 className="text-xl font-heading font-semibold text-text-main mb-6">
          {t("followMeTitle")}
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
