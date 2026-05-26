import { getRequestConfig } from "next-intl/server";

export const locales = ["es", "en"] as const;
export type Locale = (typeof locales)[number];

export default getRequestConfig(async () => {
    // This will typically be based on the URL pathname or user preference
    // For now, default to English
    const locale: Locale = "en";

    return {
        locale,
        messages: (await import(`../../messages/${locale}.json`)).default,
    };
});
