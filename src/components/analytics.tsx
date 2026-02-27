"use client";

import Script from "next/script";
import { useCookieConsent } from "@/components/cookie-consent-provider";

export function Analytics() {
  const { consent } = useCookieConsent();

  if (!consent.analytics) return null;

  return (
    <Script
      src="https://cloud.umami.is/script.js"
      data-website-id="5d43f1d6-3657-454f-bef2-6c238c805c58"
      strategy="afterInteractive"
    />
  );
}
