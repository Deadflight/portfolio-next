import { SvgIcons } from "../components/Icons/Icons";

export interface IIconProps {
  name: keyof typeof SvgIcons;
  size?: number;
  className?: string;
}
