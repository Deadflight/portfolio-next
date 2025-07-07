import { Icon } from "../Icons/Icons";
import { ISkillProficiency } from "../../types/skills.types";

const STAR_COUNT = 5;
export const UNFILLED_STAR_COLOR = "text-gray-300"; // Default color for unfilled stars

export const StarRating = ({
  level,
  skillName,
}: {
  level: ISkillProficiency;
  skillName: string;
}) => {
  return (
    <span
      className="flex items-center"
      role="img"
      aria-label={`${skillName}: ${level.label}`}
    >
      {[...Array(STAR_COUNT)].map((_, index) => (
        <Icon
          key={index}
          name="Star"
          size={14}
          className={`mr-1 ${
            index < level.stars ? level.color : UNFILLED_STAR_COLOR
          }`}
          aria-hidden="true"
        />
      ))}
    </span>
  );
};
