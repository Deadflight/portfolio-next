import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";

export default async function BlogNotFound() {
  let notFound: string;
  let description: string;
  let backToBlog: string;

  try {
    const t = await getTranslations("blog");
    notFound = t("notFound");
    description = t("notFoundDescription");
    backToBlog = t("backToBlog");
  } catch {
    notFound = "Post not found";
    description = "The post you're looking for doesn't exist.";
    backToBlog = "Back to blog";
  }

  return (
    <div
      data-testid="blog-not-found"
      className="container mx-auto px-4 py-16 text-center"
    >
      <h1 className="text-6xl font-bold text-accent mb-4">404</h1>
      <h2 className="text-2xl font-heading font-bold mb-4">{notFound}</h2>
      <p className="text-text-main/80 mb-8">{description}</p>
      <Link
        href="/blog"
        className="inline-block rounded-lg bg-accent px-6 py-3 font-medium text-white transition-colors hover:bg-accent-hover"
      >
        {backToBlog}
      </Link>
    </div>
  );
}
