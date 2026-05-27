import type { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import { getLocale, getMessages } from "next-intl/server";
import { NavigationExperience } from "@/shared/components/Navigation/Navigation";
import { Footer } from "@/shared/components/Footer/Footer";

const SITE_URL = "https://www.carlos-correa.com";

export function generateStaticParams() {
  return [{ locale: "en" }, { locale: "es" }];
}

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const messages = await getMessages();
  const t = (namespace: string, key: string) =>
    (messages as Record<string, Record<string, string>>)?.[namespace]?.[key] ??
    key;

  const title = t("metadata", "title");
  const description = t("metadata", "description");
  const keywords = t("metadata", "keywords");
  const ogLocale = locale === "es" ? "es_ES" : "en_US";
  const ogTitle = t("metadata.openGraph", "title") || title;
  const ogDescription = t("metadata.openGraph", "description") || description;

  return {
    title,
    description,
    keywords: keywords.split(",").map((k: string) => k.trim()),
    authors: [{ name: "Carlos Correa" }],
    creator: "Carlos Correa",
    openGraph: {
      type: "website",
      locale: ogLocale,
      url: SITE_URL,
      title: ogTitle,
      description: ogDescription,
      siteName: "Carlos Correa Portfolio",
      images: [
        {
          url: `${SITE_URL}/og-image.png`,
          width: 1200,
          height: 630,
          alt: "Carlos Correa Portfolio",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: ogTitle,
      description: ogDescription,
    },
    alternates: {
      canonical: SITE_URL,
      languages: {
        en: SITE_URL,
        es: `${SITE_URL}/es`,
      },
    },
  };
}

export default async function LocaleLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const messages = await getMessages();

  return (
    <NextIntlClientProvider messages={messages}>
      <header>
        <NavigationExperience />
      </header>
      {children}
      <Footer />
    </NextIntlClientProvider>
  );
}
