import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { urlFor } from "@/sanity/lib/image";

interface PostCardProps {
  title: string;
  slug: string;
  description?: string | null;
  publishedAt?: string | null;
  tags?: string[] | null;
  coverImage?: { asset?: { _ref?: string }; alt?: string } | null;
  locale: string;
}

export function PostCard({
  title,
  slug,
  description,
  publishedAt,
  tags,
  coverImage,
  locale,
}: PostCardProps) {
  return (
    <article
      data-testid={`post-card`}
      className="card post-card"
    >
      <div data-testid={`post-card-${slug}`}>
        {coverImage?.asset?._ref && (
          <div className="relative overflow-hidden rounded-lg mb-4">
            <Image
              src={urlFor(coverImage).width(600).height(400).auto("format").quality(80).url()}
              alt={coverImage.alt ?? title}
              width={600}
              height={400}
              className="w-full object-cover"
            />
          </div>
        )}

        <Link href={`/blog/${slug}`}>
          <h3 className="text-xl font-heading font-bold text-text-main hover:text-primary-brand transition-colors">
            {title}
          </h3>
        </Link>

        {description && (
          <p className="mt-2 font-body text-text-main/80 leading-relaxed">
            {description}
          </p>
        )}

        {publishedAt && (
          <p className="mt-2 text-sm font-body text-text-main/60">
            {new Intl.DateTimeFormat(locale, {
              year: "numeric",
              month: "long",
              day: "numeric",
            }).format(new Date(publishedAt))}
          </p>
        )}

        {tags && tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-3">
            {tags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 bg-background-main border border-accent/30 text-text-main text-xs font-body font-medium rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </article>
  );
}
