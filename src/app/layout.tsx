import type React from "react";
import type { Metadata } from "next";
import { Poppins, Lato } from "next/font/google";
import "./globals.css";
import AxeReporter from "@/lib/ReactAxe/ReactAxe";

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

export const metadata: Metadata = {
  title: "Carlos Correa - Desarrollador Full Stack",
  description:
    "Portfolio profesional de Carlos Correa. Más de 3 años de experiencia creando aplicaciones web escalables con React, Node.js y AWS. Especializado en entornos ágiles y desarrollo de soluciones centradas en el usuario.",
  keywords:
    "Carlos Correa, desarrollador full stack, React, Node.js, AWS, portfolio, desarrollo web, JavaScript, TypeScript",
  authors: [{ name: "Carlos Correa" }],
  creator: "Carlos Correa",
  openGraph: {
    type: "website",
    locale: "es_ES",
    url: "https://carloscorreaportfolio.netlify.app",
    title: "Carlos Correa - Desarrollador Full Stack",
    description:
      "Portfolio profesional de Carlos Correa. Especializado en desarrollo web con React, Node.js y AWS.",
    siteName: "Carlos Correa Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Carlos Correa - Desarrollador Full Stack",
    description:
      "Portfolio profesional de Carlos Correa. Especializado en desarrollo web con React, Node.js y AWS.",
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
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="es"
      className={`${poppins.variable} ${lato.variable} antialiased`}
    >
      <body className="min-h-screen bg-background-main text-text-main font-body">
        {process.env.NODE_ENV !== "production" && <AxeReporter />}
        {children}
      </body>
    </html>
  );
}
