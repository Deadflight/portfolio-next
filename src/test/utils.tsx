import React from "react";
import { NextIntlClientProvider } from "next-intl";
import esMessages from "../../messages/es.json";

interface AllTheProvidersProps {
  children: React.ReactNode;
}

export const AllTheProviders = ({ children }: AllTheProvidersProps) => {
  return (
    <NextIntlClientProvider locale="es" messages={esMessages}>
      {children}
    </NextIntlClientProvider>
  );
};

