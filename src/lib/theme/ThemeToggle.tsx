"use client";

import { useTheme } from "@/lib/theme/ThemeProvider";
import { SvgIcons } from "@/shared/components/Icons/Icons";
import { useTranslations } from "next-intl";

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const t = useTranslations("common");

  const isDark = theme === "dark";

  return (
    <button
      role="switch"
      aria-checked={isDark}
      aria-label={t("toggleDarkMode")}
      title={isDark ? t("lightMode") : t("darkMode")}
      onClick={toggleTheme}
      className="text-text-main hover:text-primary-brand px-3 py-2 rounded-small text-sm font-body transition-colors duration-200"
      data-testid="theme-toggle"
    >
      <span className="inline-block transition-transform duration-300 ease-in-out hover:scale-110 active:scale-95">
        {isDark ? <SvgIcons.Sun /> : <SvgIcons.Moon />}
      </span>
    </button>
  );
}
