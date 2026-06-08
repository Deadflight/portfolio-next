import { notFound } from "next/navigation";
import { getClient } from "@/sanity/lib/client";
import {
  postBySlugQuery,
  postsByLocaleQuery,
} from "@/sanity/lib/queries";
import { PostBody } from "@/app/components/blog/PostBody";
import { routing } from "@/i18n/routing";
import { urlFor } from "@/sanity/lib/image";

/* ── Static Generation ── */
export async function generateStaticParams() {
  try {
    const locales = routing.locales;
    const allParams = await Promise.all(
      locales.map(async (locale: string) => {
        const posts = await (
          await getClient()
        ).fetch<{ slug: string }[]>(postsByLocaleQuery, { locale });
        return posts.map((post) => ({
          locale,
          slug: post.slug,
        }));
      })
    );
    return allParams.flat();
  } catch {
    // Gracefully degrade during build when draftMode() is unavailable.
    return [];
  }
}

/* ── Metadata ── */
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { slug, locale } = await params;
  let post: { title: string; description?: string | null; coverImage?: { asset?: { _ref?: string } } } | null = null;
  try {
    post = await (
      await getClient()
    ).fetch<{
      title: string;
      description?: string | null;
      coverImage?: { asset?: { _ref?: string } };
    } | null>(postBySlugQuery, { slug, locale });
  } catch {
    // Sanity unavailable — return minimal metadata
    return {};
  }

  if (!post) return {};

  const ogImage = post.coverImage?.asset?._ref
    ? [{ url: urlFor(post.coverImage).width(1200).url() }]
    : [];

  return {
    title: post.title,
    description: post.description ?? undefined,
    openGraph: {
      title: post.title,
      description: post.description ?? undefined,
      images: ogImage,
    },
  };
}

/* ── Cache ── */
export const revalidate = 60;

/* ── Page ── */
export default async function BlogDetailPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { slug, locale } = await params;
  let post: {
    title: string;
    description?: string | null;
    publishedAt?: string | null;
    locale: string;
    tags?: string[] | null;
    coverImage?: unknown;
    body: unknown[];
  } | null = null;
  try {
    post = await (
      await getClient()
    ).fetch<{
      title: string;
      description?: string | null;
      publishedAt?: string | null;
      locale: string;
      tags?: string[] | null;
      coverImage?: unknown;
      body: unknown[];
    } | null>(postBySlugQuery, { slug, locale });
  } catch {
    // Sanity unavailable — show 404
  }

  if (!post) {
    notFound();
  }

  return (
    <article
      data-testid="blog-detail"
      className="container mx-auto px-4 py-8 max-w-3xl"
    >
      <h1
        data-testid="blog-detail-title"
        className="text-4xl font-heading font-bold mb-4"
      >
        {post.title}
      </h1>

      {post.publishedAt && (
        <p
          data-testid="blog-detail-date"
          className="text-sm font-body text-text-main/60 mb-6"
        >
          {new Intl.DateTimeFormat(locale, {
            year: "numeric",
            month: "long",
            day: "numeric",
          }).format(new Date(post.publishedAt))}
        </p>
      )}

      {post.tags && post.tags.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-6">
          {post.tags.map((tag: string) => (
            <span
              key={tag}
              className="px-3 py-1 bg-background-main border border-accent/30 text-text-main text-xs font-body font-medium rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>
      )}

      <PostBody body={post.body} />
    </article>
  );
}
