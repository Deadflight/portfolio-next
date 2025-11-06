import type React from "react";
import type { Metadata } from "next";
import { Poppins, Lato } from "next/font/google";
import "./globals.css";
import AxeReporter from "@/lib/ReactAxe/ReactAxe";
import { NavigationExperience } from "@/shared/components/Navigation/Navigation";
import { Footer } from "@/shared/components/Footer/Footer";
import Script from "next/script";
import { Analytics } from "./components/analitycs/Analytics";
import { getClientEnvs } from "@/lib/config/envs";

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
  const { NODE_ENV } = process.env;
  const { NEXT_PUBLIC_GA_ID, NEXT_PUBLIC_GTM_ID } = getClientEnvs();

  const isProduction = NODE_ENV === "production";
  const GA_ID = NEXT_PUBLIC_GA_ID;
  const GTM_ID = NEXT_PUBLIC_GTM_ID;
  return (
    <html
      lang="es"
      className={`${poppins.variable} ${lato.variable} antialiased`}
    >
      {GTM_ID && isProduction && (
        <Script
          id="gtm-init"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start': new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0], j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','${NEXT_PUBLIC_GTM_ID}');`,
          }}
        />
      )}
      {GA_ID && isProduction && (
        <>
          <Script
            async
            src={`https://www.googletagmanager.com/gtag/js?id=${
              NEXT_PUBLIC_GA_ID
            }`}
            strategy="afterInteractive"
          ></Script>
          <Script id="google-analytics" strategy="afterInteractive">
            {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${NEXT_PUBLIC_GA_ID}');
          `}
          </Script>
        </>
      )}
      <body className="min-h-screen bg-background-main text-text-main font-body">
        {GTM_ID && isProduction && (
          <noscript
            dangerouslySetInnerHTML={{
              __html: `
          <iframe src="https://www.googletagmanager.com/ns.html?id=${GTM_ID}"
          height="0" width="0" style="display:none;visibility:hidden"></iframe>
        `,
            }}
          ></noscript>
        )}
        <header>
          <NavigationExperience />
        </header>
        {NEXT_PUBLIC_GA_ID && isProduction && <Analytics />}

        {!isProduction && <AxeReporter />}
        {children}
        <Footer />
      </body>
    </html>
  );
}
