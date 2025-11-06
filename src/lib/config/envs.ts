/**
 * Utilities to read environment variables safely in Next.js.
 *
 * Problem this file solves:
 * - Client bundles must never attempt to validate or read server-only env vars.
 * - Server code should fail fast when a critical server-only env var is missing.
 *
 * Usage guidance:
 * - In client components (or any code that runs in browser) only call `getClientEnvs()`
 *   or `getEnvs()` (the latter will return only NEXT_PUBLIC_* vars when called in browser).
 * - In server components, API routes or server-only modules, call `getServerEnvs()`
 *   or `getEnvs()` (the latter will validate server vars when run on server).
 */

type ClientEnvs = {
  NEXT_PUBLIC_BASE_URL: string;
  NEXT_PUBLIC_GA_ID: string;
  NEXT_PUBLIC_GTM_ID: string;
};

type ServerEnvs = {
  EMAIL_SENDER_API_KEY: string;
  EMAIL_SENDER_FROM_EMAIL: string;
  EMAIL_SENDER_TO_EMAIL: string;
  CI: string;
  NODE_ENV: string;
};

function validateServerEnvVar(name: string): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Critical server environment variable ${name} is missing.`);
  }
  return value;
}

export const getClientEnvs = (): ClientEnvs => {
  return {
    NEXT_PUBLIC_BASE_URL: process.env.NEXT_PUBLIC_BASE_URL ?? "",
    NEXT_PUBLIC_GA_ID: process.env.NEXT_PUBLIC_GA_ID ?? "",
    NEXT_PUBLIC_GTM_ID: process.env.NEXT_PUBLIC_GTM_ID ?? "",
  };
};

export const getServerEnvs = (): ServerEnvs => {
  // Validate server-only vars and include client ones as well
  return {
    EMAIL_SENDER_API_KEY: validateServerEnvVar("EMAIL_SENDER_API_KEY"),
    EMAIL_SENDER_FROM_EMAIL: validateServerEnvVar("EMAIL_SENDER_FROM_EMAIL"),
    EMAIL_SENDER_TO_EMAIL: validateServerEnvVar("EMAIL_SENDER_TO_EMAIL"),
    CI: process.env.CI ?? "",
    NODE_ENV: process.env.NODE_ENV ?? "",
  };
};
