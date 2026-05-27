"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

export default function NotFound() {
  const t = useTranslations("common");

  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center px-4 text-center">
      <h1 className="text-6xl font-bold text-accent">404</h1>
      <h2 className="mt-4 text-2xl font-semibold">{t("notFoundTitle")}</h2>
      <p className="mt-2 max-w-md text-text-secondary">{t("notFound")}</p>
      <Link
        href="/"
        className="mt-6 rounded-lg bg-accent px-6 py-3 font-medium text-white transition-colors hover:bg-accent-hover"
      >
        {t("backToHome")}
      </Link>
    </div>
  );
}
