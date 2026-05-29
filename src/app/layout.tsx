import type React from "react";
import { Poppins, Lato } from "next/font/google";
import "./globals.css";
import AxeReporter from "@/lib/ReactAxe/ReactAxe";
import Script from "next/script";
import { Analytics } from "./components/analitycs/Analytics";
import { getClientEnvs } from "@/lib/config/envs";
import { getLocale } from "next-intl/server";
import { ThemeProvider } from "@/lib/theme/ThemeProvider";

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

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { NODE_ENV } = process.env;
  const { NEXT_PUBLIC_GA_ID, NEXT_PUBLIC_GTM_ID } = getClientEnvs();
  const isProduction = NODE_ENV === "production";
  const GA_ID = NEXT_PUBLIC_GA_ID;
  const GTM_ID = NEXT_PUBLIC_GTM_ID;

  const locale = await getLocale();

  return (
    <html
      lang={locale}
      className={`${poppins.variable} ${lato.variable} antialiased`}
    >
      {/* Inline script to prevent flash of wrong theme */}
      <script
        dangerouslySetInnerHTML={{
          __html: `(function(){try{var t=localStorage.getItem('portfolio-theme');if(!t){t=window.matchMedia('(prefers-color-scheme:dark)').matches?'dark':'light'}if(t==='dark')document.documentElement.classList.add('dark')}catch(e){}})();`,
        }}
      />
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
            src={`https://www.googletagmanager.com/gtag/js?id=${NEXT_PUBLIC_GA_ID}`}
            strategy="afterInteractive"
          />
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
          />
        )}
        {NEXT_PUBLIC_GA_ID && isProduction && <Analytics />}
        {!isProduction && <AxeReporter />}
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
