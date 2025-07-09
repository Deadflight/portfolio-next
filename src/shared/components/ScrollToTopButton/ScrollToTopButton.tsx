"use client";
import React from "react";
import { Icon } from "../Icons/Icons";

export const ScrollToTopButton = () => {
  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className="p-2 bg-primary-brand rounded-medium hover:bg-primary-brand/80 transition-colors duration-200"
      aria-label="Volver arriba"
    >
      <Icon name="ChevronUp" size={20} />
    </button>
  );
};
