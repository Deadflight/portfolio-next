import type React from "react";
import type { Metadata } from "next";
import { Poppins, Lato } from "next/font/google";
import "./globals.css";
import AxeReporter from "@/lib/ReactAxe/ReactAxe";
import { NavigationExperience } from "@/shared/components/Navigation/Navigation";
import { Footer } from "@/shared/components/Footer/Footer";
import Script from "next/script";
import { Analytics } from "./components/analitycs/Analytics";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: "--font-poppins",
  display: "swap",
  fallback: ["sans-serif"],
  preload: true,
});

const lato = Lato({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-lato",
  display: "swap",
  fallback: ["sans-serif"],
  preload: true,
});

const SITE_TITLE =
  "Carlos Correa | Full Stack Developer | React, Node.js, TypeScript, Next.js, Remote, Freelance, Web Apps";

const KEYWORDS = [
  "desarrollador web",
  "full stack developer",
  "React",
  "Next.js",
  "Node.js",
  "TypeScript",
  "JavaScript",
  "desarrollo web",
  "aplicaciones web",
  "APIs",
  "UI/UX",
  "testing",
  "DevOps",
  "trabajo remoto",
  "freelance",
  "portafolio",
  "proyectos",
  "habilidades",
  "experiencia",
  "Carlos Correa",
  "programador",
  "frontend",
  "backend",
  "consultor",
  "software engineer",
  "desarrollo ágil",
  "cloud",
  "AWS",
  "MongoDB",
  "PostgreSQL",
  "HTML",
  "CSS",
  "Tailwind CSS",
  "accesibilidad web",
  "SEO",
  "open to work",
  "español",
  "inglés",
];

const SITE_DESCRIPTION =
  "Portfolio de Carlos Correa, Full Stack Developer con experiencia en React, Next.js, Node.js, TypeScript, JavaScript, desarrollo web, APIs, UI/UX, testing, DevOps, trabajo remoto y freelance. Descubre proyectos, habilidades, experiencia y contacto profesional.";

const SITE_URL = "https://www.carlos-correa.com";

const OG_DESCRIPTION =
  "Portfolio de Carlos Correa, Full Stack Developer con experiencia en React, Next.js, Node.js, TypeScript, JavaScript, desarrollo web, APIs, UI/UX, testing, DevOps, trabajo remoto y freelance.";

export const metadata: Metadata = {
  title: SITE_TITLE,
  description: SITE_DESCRIPTION,
  keywords: KEYWORDS,
  authors: [{ name: "Carlos Correa" }],
  creator: "Carlos Correa",
  openGraph: {
    type: "website",
    locale: "es_ES",
    url: SITE_URL,
    title: SITE_TITLE,
    description: OG_DESCRIPTION,
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
    title: SITE_TITLE,
    description: OG_DESCRIPTION,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: SITE_URL,
    languages: {
      es: SITE_URL,
      en: `${SITE_URL}/en`,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const isProduction = process.env.NODE_ENV === "production";
  const GA_ID = process.env.NEXT_PUBLIC_GA_ID;
  return (
    <html
      lang="es"
      className={`${poppins.variable} ${lato.variable} antialiased`}
    >
      {GA_ID && isProduction && (
        <>
          <Script
            async
            src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`}
            strategy="afterInteractive"
          ></Script>
          <Script id="google-analytics" strategy="afterInteractive">
            {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${process.env.NEXT_PUBLIC_GA_ID}');
          `}
          </Script>
        </>
      )}
      <body className="min-h-screen bg-background-main text-text-main font-body">
        <header>
          <NavigationExperience />
        </header>
        {process.env.NEXT_PUBLIC_GA_ID && isProduction && <Analytics />}

        {!isProduction && <AxeReporter />}
        {children}
        <Footer />
      </body>
    </html>
  );
}
