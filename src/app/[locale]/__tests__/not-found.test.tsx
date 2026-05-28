jest.mock("next-intl", () => ({
  useTranslations: jest.fn().mockReturnValue((key: string) => {
    const messages: Record<string, string> = {
      notFoundTitle: "Page Not Found",
      notFound: "The page you are looking for does not exist.",
      backToHome: "Back to Home",
    };
    return messages[key] ?? key;
  }),
}));

jest.mock("@/i18n/navigation", () => ({
  Link: ({ href, children }: { href: string; children: React.ReactNode }) => (
    <a href={href}>{children}</a>
  ),
}));

import React from "react";
import { render, screen } from "@testing-library/react";
import NotFound from "../not-found";

describe("NotFound page", () => {
  it("renders 404 heading", () => {
    render(<NotFound />);
    expect(screen.getByText("404")).toBeInTheDocument();
  });

  it("renders translated notFoundTitle", () => {
    render(<NotFound />);
    expect(screen.getByText("Page Not Found")).toBeInTheDocument();
  });

  it("renders translated notFound message", () => {
    render(<NotFound />);
    expect(
      screen.getByText("The page you are looking for does not exist.")
    ).toBeInTheDocument();
  });

  it("renders a link back to home", () => {
    render(<NotFound />);
    const link = screen.getByRole("link", { name: "Back to Home" });
    expect(link).toHaveAttribute("href", "/");
  });
});
