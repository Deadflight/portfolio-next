"use client";

import React, { Component, ErrorInfo, ReactNode } from "react";

interface ErrorBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode;
  onError?: (error: Error, errorInfo: ErrorInfo) => void;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

const DefaultFallback = ({
  errorMessage = "Something went wrong",
  retryLabel = "Try again",
  onRetry,
}: {
  errorMessage?: string;
  retryLabel?: string;
  onRetry: () => void;
}) => (
  <div
    role="alert"
    className="p-6 rounded-small bg-error-bg border border-error text-center"
  >
    <p className="text-error font-semibold mb-4">{errorMessage}</p>
    <button
      onClick={onRetry}
      className="btn-primary"
      type="button"
    >
      {retryLabel}
    </button>
  </div>
);

export class ErrorBoundary extends Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    this.props.onError?.(error, errorInfo);
  }

  handleRetry = (): void => {
    this.setState({ hasError: false, error: null });
  };

  render(): ReactNode {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <DefaultFallback
          onRetry={this.handleRetry}
        />
      );
    }

    return this.props.children;
  }
}
