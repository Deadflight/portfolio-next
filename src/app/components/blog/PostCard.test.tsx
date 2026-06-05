import React from "react";
import { render, screen } from "@/test/utils";
import { PostCard } from "./PostCard";
import "@testing-library/jest-dom";

// Mock next/image
jest.mock("next/image", () => {
  const MockNextImage = (props: React.ImgHTMLAttributes<HTMLImageElement>) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img {...props} alt={props.alt} />
  );
  MockNextImage.displayName = "MockNextImage";
  return MockNextImage;
});

// Mock @/i18n/navigation Link
jest.mock("@/i18n/navigation", () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const MockLink = ({ children, ...props }: any) => <a {...props}>{children}</a>;
  return { Link: MockLink };
});

// Mock @/sanity/lib/image urlFor
const createUrlForChain = () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const chain: any = {
    width: jest.fn(() => chain),
    height: jest.fn(() => chain),
    auto: jest.fn(() => chain),
    quality: jest.fn(() => chain),
    url: jest.fn(() => "https://cdn.sanity.io/images/project/dataset/mock-image.jpg"),
  };
  return chain;
};

jest.mock("@/sanity/lib/image", () => ({
  urlFor: jest.fn(() => createUrlForChain()),
}));

const mockPost = {
  title: "Getting Started with Next.js",
  slug: "getting-started-nextjs",
  description: "A comprehensive guide to building modern web applications with Next.js.",
  publishedAt: "2026-05-15T10:00:00Z",
  tags: ["Next.js", "React", "TypeScript"],
  coverImage: {
    asset: { _ref: "image-abc123" },
    alt: "Next.js thumbnail",
  },
  locale: "en" as const,
};

describe("PostCard", () => {
  it("renders title as link with correct href", () => {
    render(<PostCard {...mockPost} />);
    const link = screen.getByRole("link", { name: mockPost.title });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute("href", `/blog/${mockPost.slug}`);
  });

  it("renders formatted date for the given locale", () => {
    render(<PostCard {...mockPost} />);
    const expectedDate = new Intl.DateTimeFormat("en", {
      year: "numeric",
      month: "long",
      day: "numeric",
    }).format(new Date("2026-05-15T10:00:00Z"));
    expect(screen.getByText(expectedDate)).toBeInTheDocument();
  });

  it("renders tags as pills", () => {
    render(<PostCard {...mockPost} />);
    for (const tag of mockPost.tags!) {
      expect(screen.getByText(tag)).toBeInTheDocument();
    }
  });

  it("renders cover image with urlFor source and alt text", () => {
    render(<PostCard {...mockPost} />);
    const img = screen.getByRole("img");
    expect(img).toHaveAttribute("src", "https://cdn.sanity.io/images/project/dataset/mock-image.jpg");
    expect(img).toHaveAttribute("alt", "Next.js thumbnail");
  });

  it("does not render an img element when coverImage is missing", () => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { coverImage: _, ...postWithoutImage } = mockPost;
    render(<PostCard {...postWithoutImage} coverImage={null} />);
    expect(screen.queryByRole("img")).not.toBeInTheDocument();
  });

  it("does not render tag container when tags are null", () => {
    render(<PostCard {...mockPost} tags={null} />);
    for (const tag of mockPost.tags!) {
      expect(screen.queryByText(tag)).not.toBeInTheDocument();
    }
  });

  it("does not render description when description is null", () => {
    render(<PostCard {...mockPost} description={null} />);
    expect(
      screen.queryByText("A comprehensive guide to building modern web applications with Next.js.")
    ).not.toBeInTheDocument();
  });

  it("renders testid attributes on container", () => {
    render(<PostCard {...mockPost} />);
    const container = screen.getByTestId("post-card");
    expect(container).toBeInTheDocument();
    const specific = screen.getByTestId(`post-card-${mockPost.slug}`);
    expect(specific).toBeInTheDocument();
  });
});
