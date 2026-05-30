import { render, screen, fireEvent } from "@testing-library/react";
import { ErrorBoundary } from "./ErrorBoundary";
import React from "react";

// Suppress console.error from React error logging in tests
beforeEach(() => {
  jest.spyOn(console, "error").mockImplementation(() => {});
});

afterEach(() => {
  jest.restoreAllMocks();
});

const GoodChild = () => <p>Working component</p>;

const ThrowChild = () => {
  throw new Error("Boom!");
};

describe("ErrorBoundary", () => {
  it("renders children when there is no error", () => {
    render(
      <ErrorBoundary>
        <GoodChild />
      </ErrorBoundary>
    );

    expect(screen.getByText("Working component")).toBeInTheDocument();
  });

  it("renders fallback UI with role='alert' when a child throws", () => {
    render(
      <ErrorBoundary>
        <ThrowChild />
      </ErrorBoundary>
    );

    const alert = screen.getByRole("alert");
    expect(alert).toBeInTheDocument();
    expect(alert).toHaveTextContent("Something went wrong");
  });

  it("renders a retry button in the fallback UI", () => {
    render(
      <ErrorBoundary>
        <ThrowChild />
      </ErrorBoundary>
    );

    expect(
      screen.getByRole("button", { name: /try again/i })
    ).toBeInTheDocument();
  });

  it("resets error state and re-renders children when retry is clicked", () => {
    const { rerender } = render(
      <ErrorBoundary>
        <ThrowChild />
      </ErrorBoundary>
    );

    // Fallback is visible
    expect(screen.getByRole("alert")).toBeInTheDocument();

    // Rerender with a good child to simulate retry working
    rerender(
      <ErrorBoundary>
        <GoodChild />
      </ErrorBoundary>
    );

    fireEvent.click(screen.getByRole("button", { name: /try again/i }));

    expect(screen.getByText("Working component")).toBeInTheDocument();
    expect(screen.queryByRole("alert")).not.toBeInTheDocument();
  });

  it("calls onError callback when a child throws", () => {
    const onError = jest.fn();

    render(
      <ErrorBoundary onError={onError}>
        <ThrowChild />
      </ErrorBoundary>
    );

    expect(onError).toHaveBeenCalledTimes(1);
    expect(onError).toHaveBeenCalledWith(expect.any(Error), expect.any(Object));
  });

  it("uses custom fallback when provided", () => {
    render(
      <ErrorBoundary fallback={<div data-testid="custom-fallback">Custom error UI</div>}>
        <ThrowChild />
      </ErrorBoundary>
    );

    expect(screen.getByTestId("custom-fallback")).toBeInTheDocument();
    expect(screen.getByText("Custom error UI")).toBeInTheDocument();
  });
});
