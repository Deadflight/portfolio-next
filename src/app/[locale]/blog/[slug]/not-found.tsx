import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";

export default async function BlogNotFound() {
  const t = await getTranslations("blog");

  return (
    <div
      data-testid="blog-not-found"
      className="container mx-auto px-4 py-16 text-center"
    >
      <h1 className="text-6xl font-bold text-accent mb-4">404</h1>
      <h2 className="text-2xl font-heading font-bold mb-4">{t("notFound")}</h2>
      <p className="text-text-main/80 mb-8">{t("notFoundDescription")}</p>
      <Link
        href="/blog"
        className="inline-block rounded-lg bg-accent px-6 py-3 font-medium text-white transition-colors hover:bg-accent-hover"
      >
        {t("backToBlog")}
      </Link>
    </div>
  );
}
