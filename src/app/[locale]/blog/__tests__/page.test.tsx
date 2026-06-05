jest.mock("@/sanity/lib/client", () => ({
  getClient: jest.fn(),
}));

jest.mock("next-intl/server", () => ({
  getLocale: jest.fn(),
  getTranslations: jest.fn(),
}));

jest.mock("@/i18n/navigation", () => ({
  Link: ({ children, href }: { children: React.ReactNode; href: string }) => (
    <a href={href}>{children}</a>
  ),
}));

jest.mock("next/image", () => {
  const MockImage = (props: React.ImgHTMLAttributes<HTMLImageElement>) => (
    <img {...props} alt={props.alt} />
  );
  MockImage.displayName = "MockImage";
  return MockImage;
});

jest.mock("@/sanity/lib/queries", () => ({
  postsByLocaleQuery: "mock-posts-by-locale-query",
}));

jest.mock("@/sanity/lib/image", () => ({
  urlFor: jest.fn(() => ({
    width: jest.fn(() => ({
      height: jest.fn(() => ({
        auto: jest.fn(() => ({
          quality: jest.fn(() => ({
            url: jest.fn(
              () =>
                "https://cdn.sanity.io/images/project/dataset/mock-image.jpg"
            ),
          })),
        })),
      })),
    })),
  })),
}));

import React from "react";
import { render, screen } from "@testing-library/react";
import { getClient } from "@/sanity/lib/client";
import { getLocale, getTranslations } from "next-intl/server";
import "@testing-library/jest-dom";

const mockPosts = [
  {
    _id: "1",
    title: "Getting Started with Next.js",
    slug: "getting-started-nextjs",
    description: "A comprehensive guide.",
    publishedAt: "2026-05-15T10:00:00Z",
    tags: ["Next.js", "React"],
    coverImage: {
      asset: { url: "https://cdn.sanity.io/images/project/dataset/post1.jpg" },
    },
  },
  {
    _id: "2",
    title: "TypeScript Tips",
    slug: "typescript-tips",
    description: null,
    publishedAt: null,
    tags: null,
    coverImage: null,
  },
];

const mockTranslations = jest.fn((key: string) => {
  const messages: Record<string, string> = {
    title: "Blog",
    emptyState: "No posts yet. Check back soon!",
  };
  return messages[key] ?? key;
});

describe("BlogListingPage", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (getTranslations as jest.Mock).mockResolvedValue(mockTranslations);
  });

  it("renders PostCards grid when posts exist", async () => {
    (getLocale as jest.Mock).mockResolvedValue("en");
    (getClient as jest.Mock).mockResolvedValue({
      fetch: jest.fn().mockResolvedValue(mockPosts),
    });

    const PageModule = await import("../page");
    const element = await PageModule.default();
    render(element);

    expect(screen.getByTestId("blog-listing")).toBeInTheDocument();
    expect(screen.getAllByTestId("post-card")).toHaveLength(2);
  });

  it("renders empty state when no posts", async () => {
    (getLocale as jest.Mock).mockResolvedValue("en");
    (getClient as jest.Mock).mockResolvedValue({
      fetch: jest.fn().mockResolvedValue([]),
    });

    const PageModule = await import("../page");
    const element = await PageModule.default();
    render(element);

    expect(screen.getByTestId("blog-empty-state")).toBeInTheDocument();
    expect(
      screen.getByText("No posts yet. Check back soon!")
    ).toBeInTheDocument();
    expect(screen.queryByTestId("blog-listing")).not.toBeInTheDocument();
  });

  it("renders correct number of PostCards for multiple posts", async () => {
    const threePosts = [
      ...mockPosts,
      {
        _id: "3",
        title: "CSS Grid Layout",
        slug: "css-grid-layout",
        description: "Master CSS Grid.",
        publishedAt: "2026-06-01T00:00:00Z",
        tags: ["CSS"],
        coverImage: null,
      },
    ];

    (getLocale as jest.Mock).mockResolvedValue("en");
    (getClient as jest.Mock).mockResolvedValue({
      fetch: jest.fn().mockResolvedValue(threePosts),
    });

    const PageModule = await import("../page");
    const element = await PageModule.default();
    render(element);

    expect(screen.getByTestId("blog-listing")).toBeInTheDocument();
    expect(screen.getAllByTestId("post-card")).toHaveLength(3);
  });
});
