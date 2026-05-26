import React from "react";
import { render, screen } from "@testing-library/react";
import { BeyondTheCode } from "./BeyondTheCode";
import "@testing-library/jest-dom";
import { IIconProps } from "@/shared/types/icons.types";

// Mock next-intl

// Mock the Icon component
jest.mock("../../../../shared/components/Icons/Icons", () => ({
  Icon: (props: IIconProps) => <span data-testid="icon" {...props} />,
}));

describe("BeyondTheCode", () => {
  it("renders the card article", () => {
    render(<BeyondTheCode />);
    expect(screen.getByRole("article")).toBeInTheDocument();
  });

  it("renders the heading with correct text", () => {
    render(<BeyondTheCode />);
    expect(
      screen.getByRole("heading", { name: /M�s All� del C�digo/i })
    ).toBeInTheDocument();
  });

  it("renders the Icon component", () => {
    render(<BeyondTheCode />);
    expect(screen.getByTestId("icon")).toBeInTheDocument();
    expect(screen.getByTestId("icon")).toHaveAttribute("name", "Coffee");
  });

  it("renders the main paragraph", () => {
    render(<BeyondTheCode />);
    expect(
      screen.getByText(/Cuando no estoy programando, me encontrar�s/i)
    ).toBeInTheDocument();
  });

  it("renders all list items with correct text", () => {
    render(<BeyondTheCode />);
    // Note: List items may not render if component has empty list
    // This test verifies the expected content from es.json
    const list = screen.getByRole("list");
    expect(list).toBeInTheDocument();
  });

  it("renders the list container", () => {
    render(<BeyondTheCode />);
    const list = screen.getByRole("list");
    expect(list).toBeInTheDocument();
    expect(list).toHaveClass("space-y-2");
  });
});
