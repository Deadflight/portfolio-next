import { Icon } from "../Icons/Icons";
import { ISkillProficiency } from "../../types/skills.types";

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
      {[...Array(5)].map((_, index) => (
        <Icon
          key={index}
          name="Star"
          size={14}
          className={`mr-1 ${
            index < level.stars ? level.color : "text-gray-300"
          }`}
          aria-hidden="true"
        />
      ))}
    </span>
  );
};
