import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin();

const nextConfig: NextConfig = {
  transpilePackages: [
    "next-intl",
    "use-intl",
    "intl-messageformat",
    "@formatjs/fast-memoize",
    "@formatjs/icu-messageformat-parser",
    "@formatjs/icu-skeleton-parser",
  ],
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
        port: "",
        pathname: "/images/**",
      },
    ],
  },
};

export default withNextIntl(nextConfig);
