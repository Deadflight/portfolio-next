jest.mock("next-intl/server", () => ({
  getTranslations: jest.fn(),
}));

jest.mock("@/i18n/navigation", () => ({
  Link: ({ children, href }: { children: React.ReactNode; href: string }) => (
    <a href={href}>{children}</a>
  ),
}));

import React from "react";
import { render, screen } from "@testing-library/react";
import { getTranslations } from "next-intl/server";
import "@testing-library/jest-dom";

function createTranslationsMock(messages: Record<string, string>) {
  return jest.fn((key: string) => messages[key] ?? key);
}

describe("BlogNotFound", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders translated notFound title in English", async () => {
    (getTranslations as jest.Mock).mockResolvedValue(
      createTranslationsMock({
        notFound: "Post not found",
        notFoundDescription:
          "The post you're looking for doesn't exist.",
        backToBlog: "Back to blog",
      })
    );

    const NotFoundModule = await import("../not-found");
    const element = await NotFoundModule.default();
    render(element);

    expect(screen.getByText("Post not found")).toBeInTheDocument();
  });

  it("renders translated notFoundDescription", async () => {
    (getTranslations as jest.Mock).mockResolvedValue(
      createTranslationsMock({
        notFound: "Post not found",
        notFoundDescription:
          "The post you're looking for doesn't exist.",
        backToBlog: "Back to blog",
      })
    );

    const NotFoundModule = await import("../not-found");
    const element = await NotFoundModule.default();
    render(element);

    expect(
      screen.getByText("The post you're looking for doesn't exist.")
    ).toBeInTheDocument();
  });

  it("renders back to blog link with correct href", async () => {
    (getTranslations as jest.Mock).mockResolvedValue(
      createTranslationsMock({
        notFound: "Post not found",
        notFoundDescription:
          "The post you're looking for doesn't exist.",
        backToBlog: "Back to blog",
      })
    );

    const NotFoundModule = await import("../not-found");
    const element = await NotFoundModule.default();
    render(element);

    const link = screen.getByRole("link", { name: "Back to blog" });
    expect(link).toHaveAttribute("href", "/blog");
  });

  it("renders data-testid attribute", async () => {
    (getTranslations as jest.Mock).mockResolvedValue(
      createTranslationsMock({
        notFound: "Post not found",
        notFoundDescription:
          "The post you're looking for doesn't exist.",
        backToBlog: "Back to blog",
      })
    );

    const NotFoundModule = await import("../not-found");
    const element = await NotFoundModule.default();
    render(element);

    expect(screen.getByTestId("blog-not-found")).toBeInTheDocument();
  });

  it("renders Spanish translations when messages are in Spanish", async () => {
    (getTranslations as jest.Mock).mockResolvedValue(
      createTranslationsMock({
        notFound: "Artículo no encontrado",
        notFoundDescription:
          "El artículo que buscas no existe.",
        backToBlog: "Volver al blog",
      })
    );

    const NotFoundModule = await import("../not-found");
    const element = await NotFoundModule.default();
    render(element);

    expect(screen.getByText("Artículo no encontrado")).toBeInTheDocument();
    expect(
      screen.getByText("El artículo que buscas no existe.")
    ).toBeInTheDocument();

    const link = screen.getByRole("link", { name: "Volver al blog" });
    expect(link).toHaveAttribute("href", "/blog");
  });
});
