

import React from "react";
import { render, renderWithI18n, AllTheProviders, screen } from "@/test/utils";
import BlogNotFound from "../not-found";
import "@testing-library/jest-dom";
jest.mock("@/i18n/navigation", () => ({
  Link: ({ children, href }: { children: React.ReactNode; href: string }) => (
    <a href={href}>{children}</a>
  ),
}));


describe("BlogNotFound", () => {
  it("renders the section with data-testid", () => {
    renderWithI18n(<BlogNotFound />);

    expect(screen.getByTestId("blog-not-found")).toBeInTheDocument();
  });

  it("renders translated notFound title in English", () => {
    render(<BlogNotFound />, { wrapper: AllTheProviders });

    expect(screen.getByText("Post not found")).toBeInTheDocument();
  });

  it("renders translated notFoundDescription in English", () => {
    render(<BlogNotFound />, { wrapper: AllTheProviders });

    expect(
      screen.getByText("The post you're looking for doesn't exist.")
    ).toBeInTheDocument();
  });

  it("renders back to blog link with correct href", () => {
    render(<BlogNotFound />, { wrapper: AllTheProviders });

    const link = screen.getByRole("link", { name: "Back to blog" });
    expect(link).toHaveAttribute("href", "/blog");
  });

  it("renders Spanish translations when locale is Spanish", () => {
    renderWithI18n(<BlogNotFound />);

    expect(screen.getByText("Artículo no encontrado")).toBeInTheDocument();
    expect(
      screen.getByText("El artículo que buscas no existe.")
    ).toBeInTheDocument();

    const link = screen.getByRole("link", { name: "Volver al blog" });
    expect(link).toHaveAttribute("href", "/blog");
  });
});
