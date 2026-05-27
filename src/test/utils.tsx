import React from "react";
import { NextIntlClientProvider } from "next-intl";
import { render, RenderOptions } from "@testing-library/react";
import enMessages from "../../messages/en.json";
import esMessages from "../../messages/es.json";

interface AllTheProvidersProps {
  children: React.ReactNode;
}

export const AllTheProviders = ({ children }: AllTheProvidersProps) => {
  return (
    <NextIntlClientProvider locale="en" messages={enMessages}>
      {children}
    </NextIntlClientProvider>
  );
};

/**
 * Renders a component wrapped in NextIntlClientProvider with Spanish locale.
 * Use this in component tests that use `useTranslations()` from next-intl
 * and assert against Spanish text.
 */
export const renderWithI18n = (
  ui: React.ReactElement,
  options?: Omit<RenderOptions, "wrapper">
) => {
  const Wrapper = ({ children }: { children: React.ReactNode }) => (
    <NextIntlClientProvider locale="es" messages={esMessages}>
      {children}
    </NextIntlClientProvider>
  );

  return render(ui, { wrapper: Wrapper, ...options });
};

export * from "@testing-library/react";
