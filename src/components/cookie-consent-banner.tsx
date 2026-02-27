"use client";

import * as React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useCookieConsent } from "@/components/cookie-consent-provider";

export function CookieConsentBanner() {
  const { consent, bannerOpen, acceptAll, updateConsent } =
    useCookieConsent();
  const [showPreferences, setShowPreferences] = React.useState(false);
  const [analyticsChecked, setAnalyticsChecked] = React.useState(
    consent.hasConsented ? consent.analytics : true
  );

  React.useEffect(() => {
    setAnalyticsChecked(consent.hasConsented ? consent.analytics : true);
  }, [consent.analytics, consent.hasConsented]);

  const visible = !consent.hasConsented || bannerOpen;

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 20, opacity: 0 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="fixed bottom-4 left-4 z-50 w-[calc(100vw-2rem)] max-w-sm rounded-lg border border-border bg-background/95 p-4 shadow-lg backdrop-blur-sm sm:bottom-6 sm:left-6"
        >
          <div className="space-y-3">
            <div className="space-y-1">
              <p className="text-sm font-medium text-foreground">
                Cookie Preferences
              </p>
              <p className="text-xs text-muted-foreground">
                This site uses cookies to understand how you use it.
              </p>
            </div>

            <AnimatePresence>
              {showPreferences && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="overflow-hidden"
                >
                  <div className="space-y-3 border-t border-border/40 pt-3">
                    <label className="flex items-center justify-between gap-3">
                      <div>
                        <p className="text-xs font-medium">Necessary</p>
                        <p className="text-xs text-muted-foreground">
                          Theme and preferences. Always active.
                        </p>
                      </div>
                      <input
                        type="checkbox"
                        checked
                        disabled
                        className="h-4 w-4 accent-primary"
                      />
                    </label>

                    <label className="flex items-center justify-between gap-3">
                      <div>
                        <p className="text-xs font-medium">
                          Analytics & Marketing
                        </p>
                        <p className="text-xs text-muted-foreground">
                          Anonymous usage stats to improve the site.
                        </p>
                      </div>
                      <input
                        type="checkbox"
                        checked={analyticsChecked}
                        onChange={(e) => setAnalyticsChecked(e.target.checked)}
                        className="h-4 w-4 accent-primary"
                      />
                    </label>

                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full"
                      onClick={() =>
                        updateConsent({ analytics: analyticsChecked })
                      }
                    >
                      Save preferences
                    </Button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setShowPreferences((p) => !p)}
                className="text-xs text-muted-foreground underline underline-offset-2 transition-colors hover:text-foreground"
              >
                {showPreferences ? "Hide preferences" : "Manage preferences"}
              </button>
              <Button size="sm" className="ml-auto" onClick={acceptAll}>
                Accept All
              </Button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
