"use client";

import { useEffect, useState } from "react";
import Script from "next/script";

const GA_ID = "G-CX8PWENS1L";
const STORAGE_KEY = "rentready-analytics-consent";

declare global {
  interface Window {
    dataLayer: unknown[];
    gtag: (...args: unknown[]) => void;
  }
}

export default function AnalyticsConsent() {
  const [choice, setChoice] = useState<"granted" | "denied" | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved === "granted" || saved === "denied") setChoice(saved);
    setReady(true);
  }, []);

  const decide = (value: "granted" | "denied") => {
    localStorage.setItem(STORAGE_KEY, value);
    setChoice(value);
  };

  return (
    <>
      {choice === "granted" && (
        <>
          <Script src={"https://www.googletagmanager.com/gtag/js?id=" + GA_ID} strategy="afterInteractive" />
          <Script id="google-analytics" strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              window.gtag = gtag;
              gtag('js', new Date());
              gtag('consent', 'default', {
                analytics_storage: 'granted',
                ad_storage: 'denied',
                ad_user_data: 'denied',
                ad_personalization: 'denied'
              });
              gtag('config', 'G-CX8PWENS1L');
            `}
          </Script>
        </>
      )}
      {ready && choice === null && (
        <div className="cookie-banner" role="dialog" aria-label="Cookievoorkeuren">
          <div>
            <strong>Cookies & privacy</strong>
            <p>We gebruiken optionele analytische cookies om te begrijpen hoe onze website wordt gebruikt. Je kunt deze accepteren of weigeren.</p>
          </div>
          <div className="cookie-actions">
            <button type="button" className="cookie-reject" onClick={() => decide("denied")}>Weigeren</button>
            <button type="button" className="cookie-accept" onClick={() => decide("granted")}>Accepteren</button>
          </div>
        </div>
      )}
    </>
  );
}
