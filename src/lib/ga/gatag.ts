import { getEnvs } from "../config/envs";

declare global {
  interface Window {
    gtag: (...args: unknown[]) => void;
  }
}

export const pageview = (url: string) => {
  const envs = getEnvs();
  if (typeof window !== "undefined" && envs.NEXT_PUBLIC_GA_ID) {
    window.gtag("config", envs.NEXT_PUBLIC_GA_ID, {
      page_path: url,
    });
  }
};
