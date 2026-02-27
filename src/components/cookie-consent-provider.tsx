"use client";

import * as React from "react";

type CookieConsent = {
  analytics: boolean;
  hasConsented: boolean;
};

type CookieConsentContextValue = {
  consent: CookieConsent;
  bannerOpen: boolean;
  acceptAll: () => void;
  rejectAll: () => void;
  updateConsent: (consent: Partial<Pick<CookieConsent, "analytics">>) => void;
  openBanner: () => void;
};

const STORAGE_KEY = "cookie-consent";

const defaultConsent: CookieConsent = {
  analytics: false,
  hasConsented: false,
};

const CookieConsentContext = React.createContext<
  CookieConsentContextValue | undefined
>(undefined);

export function CookieConsentProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [consent, setConsent] = React.useState<CookieConsent>(defaultConsent);
  const [bannerOpen, setBannerOpen] = React.useState(false);
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        setConsent(JSON.parse(stored));
      } catch {
        // ignore malformed data
      }
    }
    setMounted(true);
  }, []);

  const persist = (next: CookieConsent) => {
    setConsent(next);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    setBannerOpen(false);
  };

  const acceptAll = () => {
    persist({ analytics: true, hasConsented: true });
  };

  const rejectAll = () => {
    persist({ analytics: false, hasConsented: true });
  };

  const updateConsent = (
    partial: Partial<Pick<CookieConsent, "analytics">>
  ) => {
    persist({ ...consent, ...partial, hasConsented: true });
  };

  const openBanner = () => {
    setBannerOpen(true);
  };

  if (!mounted) {
    return (
      <CookieConsentContext.Provider
        value={{
          consent: defaultConsent,
          bannerOpen: false,
          acceptAll,
          rejectAll,
          updateConsent,
          openBanner,
        }}
      >
        {children}
      </CookieConsentContext.Provider>
    );
  }

  return (
    <CookieConsentContext.Provider
      value={{ consent, bannerOpen, acceptAll, rejectAll, updateConsent, openBanner }}
    >
      {children}
    </CookieConsentContext.Provider>
  );
}

export function useCookieConsent() {
  const context = React.useContext(CookieConsentContext);
  if (!context) {
    throw new Error(
      "useCookieConsent must be used within a CookieConsentProvider"
    );
  }
  return context;
}
