import { SvgIcons } from "../components/Icons/Icons";

export type ContactInformationSocialLinks = {
  linkUrl: string;
  linkLabel: string;
  linkIcon: keyof typeof SvgIcons;
};
