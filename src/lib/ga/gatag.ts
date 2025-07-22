declare global {
  interface Window {
    gtag: (...args: unknown[]) => void;
  }
}

export const pageview = (url: string) => {
  if (
    typeof window !== "undefined" &&
    process.env.NEXT_PUBLIC_GA_ID &&
    process.env.NODE_ENV === "production"
  ) {
    window.gtag("config", process.env.NEXT_PUBLIC_GA_ID, {
      page_path: url,
    });
  }
};
