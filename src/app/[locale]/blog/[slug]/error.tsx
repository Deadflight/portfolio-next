"use client";

import Link from "next/link";

export default function BlogError({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="container mx-auto px-4 py-16 text-center">
      <h1 className="text-6xl font-bold text-accent mb-4">500</h1>
      <h2 className="text-2xl font-heading font-bold mb-4">
        Something went wrong
      </h2>
      <p className="text-text-main/80 mb-8">
        An unexpected error occurred while loading this page. Please try again
        later.
      </p>
      <div className="flex gap-4 justify-center">
        <button
          onClick={reset}
          className="inline-block rounded-lg bg-accent px-6 py-3 font-medium text-white transition-colors hover:bg-accent-hover"
          type="button"
        >
          Try again
        </button>
        <Link
          href="/blog"
          className="inline-block rounded-lg bg-accent px-6 py-3 font-medium text-white transition-colors hover:bg-accent-hover"
        >
          Back to blog
        </Link>
      </div>
    </div>
  );
}
