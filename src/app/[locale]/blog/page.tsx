import { getLocale, getTranslations } from "next-intl/server";
import { getClient } from "@/sanity/lib/client";
import { postsByLocaleQuery } from "@/sanity/lib/queries";
import { PostCard } from "@/app/components/blog/PostCard";

export const revalidate = 60;

export async function generateMetadata() {
  return {
    title: "Blog | Carlos Correa",
  };
}

export default async function BlogListingPage() {
  const locale = await getLocale();
  const t = await getTranslations("blog");

  let posts: { _id: string; title: string; slug: string; description?: string | null; publishedAt?: string | null; tags?: string[] | null; coverImage?: unknown }[] = [];
  try {
    posts = await (await getClient()).fetch(postsByLocaleQuery, { locale });
  } catch {
    // Sanity unavailable (CI build, missing credentials, etc.) — show empty state
  }

  if (posts.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 pt-16">
        <h1 className="text-3xl font-heading font-bold mb-8">{t("title")}</h1>
        <p data-testid="blog-empty-state">{t("emptyState")}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen px-4 sm:px-6 lg:px-8 pt-16 ">
      <h1 className="text-3xl font-heading font-bold mb-8">{t("title")}</h1>
      <div
        data-testid="blog-listing"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {posts.map(
          (post: {
            _id: string;
            title: string;
            slug: string;
            description?: string | null;
            publishedAt?: string | null;
            tags?: string[] | null;
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            coverImage?: any;
          }) => (
            <PostCard
              key={post.slug}
              title={post.title}
              slug={post.slug}
              description={post.description}
              publishedAt={post.publishedAt}
              tags={post.tags}
              coverImage={post.coverImage}
              locale={locale}
            />
          )
        )}
      </div>
    </div>
  );
}
