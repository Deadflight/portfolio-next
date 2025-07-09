"use client";
import { Icon } from "../Icons/Icons";

export const ScrollToTopButton = () => {
  return (
    <button
      type="button"
      className="p-2 bg-background-main rounded-medium hover:bg-background-main/80 transition-colors duration-200 cursor-pointer focus:outline focus:outline-offset-2 focus:outline-primary"
      aria-label="Volver arriba"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
    >
      <Icon name="ChevronUp" size={20} />
    </button>
  );
};
