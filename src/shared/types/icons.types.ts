import { SvgIcons } from "../components/icons";

export interface IIconProps {
  name: keyof typeof SvgIcons;
  size?: number;
  className?: string;
}
