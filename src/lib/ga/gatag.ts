import { getClientEnvs, getServerEnvs } from "../config/envs";

declare global {
  interface Window {
    gtag: (...args: unknown[]) => void;
  }
}

export const pageview = (url: string) => {
  const { NODE_ENV } = getServerEnvs();
  const { NEXT_PUBLIC_GA_ID } = getClientEnvs();
  if (
    typeof window !== "undefined" &&
    NEXT_PUBLIC_GA_ID &&
    NODE_ENV === "production"
  ) {
    window.gtag("config", NEXT_PUBLIC_GA_ID, {
      page_path: url,
    });
  }
};
