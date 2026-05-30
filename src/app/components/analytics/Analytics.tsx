"use client";
import { pageview } from "@/lib/ga/gatag";
import { usePathname, useSearchParams } from "next/navigation";
import { Suspense, useEffect } from "react";

export const Analytics = () => (
  <Suspense fallback={null}>
    <AnalyticsInner />
  </Suspense>
);

const AnalyticsInner = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    const url = `${pathname}${searchParams ? `?${searchParams.toString()}` : ""}`;
    pageview(url);
  }, [pathname, searchParams]);

  return null;
};
