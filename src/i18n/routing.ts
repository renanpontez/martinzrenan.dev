import { defineRouting } from "next-intl/routing";
import { createNavigation } from "next-intl/navigation";

export const routing = defineRouting({
  locales: ["en", "pt-BR"],
  defaultLocale: "en",
  // Never show /en in the URL for the default locale
  localePrefix: "as-needed",
  // Disable automatic locale detection based on browser language
  localeDetection: false,
});

export type Locale = (typeof routing.locales)[number];

export const { Link, redirect, usePathname, useRouter, getPathname } =
  createNavigation(routing);
