export const GA_EVENTS = {
  DOWNLOAD_CV: "file_download",
  NAV_CLICK: "nav_click",
  CONTACT_SUBMIT: "generate_lead",
} as const;

export type GAEventName = (typeof GA_EVENTS)[keyof typeof GA_EVENTS];

export function sendEvent(
  event: GAEventName,
  params?: Record<string, string | number | boolean>
): void {
  // SSR guard — return early if window is undefined
  if (typeof window === "undefined") {
    return;
  }

  const { NODE_ENV } = process.env;

  if (NODE_ENV === "development") {
    console.log("[GA Event]", event, params);
    return;
  }

  if (NODE_ENV === "production" && typeof window.gtag === "function") {
    window.gtag("event", event, params);
  }
}
