
import React from "react";
import { render, screen } from "@testing-library/react";
import { getClient } from "@/sanity/lib/client";
import "@testing-library/jest-dom";

const mockPost = {
  _id: "1",
  title: "Getting Started with Next.js",
  slug: "getting-started-nextjs",
  description:
    "A comprehensive guide to building modern web applications with Next.js.",
  publishedAt: "2026-05-15T10:00:00Z",
  locale: "en",
  tags: ["Next.js", "React", "TypeScript"],
  coverImage: {
    asset: {
      url: "https://cdn.sanity.io/images/project/dataset/post1.jpg",
    },
  },
  body: [
    {
      _type: "block",
      style: "h2",
      children: [{ _type: "span", text: "Introduction" }],
    },
  ],
};

jest.mock("@/sanity/lib/client", () => ({
  getClient: jest.fn(),
}));

jest.mock("@/sanity/lib/queries", () => ({
  postsByLocaleQuery: "mock-posts-by-locale-query",
  postBySlugQuery: "mock-post-by-slug-query",
}));

jest.mock("next/navigation", () => ({
  notFound: jest.fn(() => {
    throw new Error("NEXT_NOT_FOUND");
  }),
}));

jest.mock("next-intl/server", () => ({
  getLocale: jest.fn(),
}));

jest.mock("@/i18n/navigation", () => ({
  Link: ({ children, href }: { children: React.ReactNode; href: string }) => (
    <a href={href}>{children}</a>
  ),
}));

jest.mock("@/app/components/blog/PostBody", () => ({
  PostBody: ({ body }: { body: unknown[] }) => (
    <div data-testid="post-body">Mock PostBody: {JSON.stringify(body)}</div>
  ),
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

// Mock next/image
jest.mock("next/image", () => {
  const MockNextImage = (props: React.ImgHTMLAttributes<HTMLImageElement>) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img {...props} alt={props.alt} />
  );
  MockNextImage.displayName = "MockNextImage";
  return MockNextImage;
});


describe("BlogDetailPage", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders post content for known slug", async () => {
    (getClient as jest.Mock).mockResolvedValue({
      fetch: jest.fn().mockResolvedValue(mockPost),
    });

    const PageModule = await import("../page");
    const element = await PageModule.default({
      params: Promise.resolve({ slug: "getting-started-nextjs", locale: "en" }),
    });
    render(element);

    expect(screen.getByTestId("blog-detail")).toBeInTheDocument();
    expect(screen.getByTestId("blog-detail-title")).toHaveTextContent(
      "Getting Started with Next.js"
    );
    expect(screen.getByTestId("blog-detail-date")).toBeInTheDocument();
    expect(screen.getByTestId("post-body")).toBeInTheDocument();
  });

  it("calls notFound for unknown slug", async () => {
    (getClient as jest.Mock).mockResolvedValue({
      fetch: jest.fn().mockResolvedValue(null),
    });

    const PageModule = await import("../page");

    await expect(
      PageModule.default({ params: Promise.resolve({ slug: "unknown", locale: "en" }) })
    ).rejects.toThrow("NEXT_NOT_FOUND");
  });

  it("renders post with tags when present", async () => {
    (getClient as jest.Mock).mockResolvedValue({
      fetch: jest.fn().mockResolvedValue(mockPost),
    });

    const PageModule = await import("../page");
    const element = await PageModule.default({
      params: Promise.resolve({ slug: "getting-started-nextjs", locale: "en" }),
    });
    render(element);

    expect(screen.getByText("Next.js")).toBeInTheDocument();
    expect(screen.getByText("React")).toBeInTheDocument();
    expect(screen.getByText("TypeScript")).toBeInTheDocument();
  });

  it("renders publishedAt date formatted in locale", async () => {
    (getClient as jest.Mock).mockResolvedValue({
      fetch: jest.fn().mockResolvedValue(mockPost),
    });

    const PageModule = await import("../page");
    const element = await PageModule.default({
      params: Promise.resolve({ slug: "getting-started-nextjs", locale: "en" }),
    });
    render(element);

    const expectedDate = new Intl.DateTimeFormat("en", {
      year: "numeric",
      month: "long",
      day: "numeric",
    }).format(new Date("2026-05-15T10:00:00Z"));

    expect(screen.getByTestId("blog-detail-date")).toHaveTextContent(
      expectedDate
    );
  });
});
