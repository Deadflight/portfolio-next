import { ISkillProficiency } from "../../types/skills.types";
export const ProficiencyBadge = ({ level }: { level: ISkillProficiency }) => {
  // Contraste: Si el fondo es claro, usa texto oscuro; si es oscuro, usa texto blanco
  // Asumimos que los nombres de clase siguen el patrón bg-* y text-*
  // Puedes ajustar la lógica según tus colores reales
  // bg-accent (#9A8C98) no tiene suficiente contraste con blanco, así que forzamos texto oscuro para ese caso
  // Mapping of bgColor to text color for better contrast
  const bgToTextColor: Record<string, string> = {
    "bg-accent": "text-text-main",
    "bg-success": "text-white",
    "bg-text-main": "text-white",
    "bg-primary-brand": "text-white",
  };
  const textColor = bgToTextColor[level.bgColor] || "text-text-main";
  return (
    <span
      className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${textColor} ${level.bgColor}`}
      title={level.description}
      data-testid={`proficiency-badge-${level.label}`}
    >
      {level.label}
    </span>
  );
};
