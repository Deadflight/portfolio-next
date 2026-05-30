"use client";

import { useTranslations } from "next-intl";
import Link from "next/link";

interface ErrorPageProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function ErrorPage({ reset }: ErrorPageProps) {
  const t = useTranslations("common");

  return (
    <div className="min-h-screen flex items-center justify-center bg-background-main">
      <div className="text-center p-8 max-w-md">
        <h1 className="text-4xl font-heading font-bold text-error mb-4">
          {t("errorTitle")}
        </h1>
        <p className="text-text-secondary mb-8">
          {t("sectionError")}
        </p>
        <div className="flex gap-4 justify-center">
          <button
            onClick={reset}
            className="btn-primary"
            type="button"
          >
            {t("retry")}
          </button>
          <Link
            href="/"
            className="btn-secondary"
          >
            {t("backToHome")}
          </Link>
        </div>
      </div>
    </div>
  );
}
