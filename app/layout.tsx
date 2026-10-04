import type { Metadata } from "next";
import site from "../content/site.json";
import nl from "../content/locales/nl.json";
import "./globals.css";
import AnalyticsConsent from "../components/AnalyticsConsent";

export const metadata: Metadata = {
  title: nl.seo.title,
  description: nl.seo.description,
  metadataBase: new URL("https://rentready.be"),
  alternates: { canonical: "/", languages: { "nl-BE":"/nl", "fr-BE":"/fr", "en":"/en" } },
  openGraph: { title:nl.seo.openGraphTitle, description:nl.seo.openGraphDescription, url:"https://rentready.be", siteName:site.brand.name, locale:nl.seo.locale, type:"website" }
};

export default function RootLayout({children}:{children:React.ReactNode}) {
  const schema = { "@context":"https://schema.org", "@type":"HomeAndConstructionBusiness", "name":site.brand.name, "url":"https://rentready.be", "telephone":site.contact.phoneDisplay, "email":site.contact.email, "areaServed":["Flemish Brabant","Limburg","Brussels","Namur","Liège"], "description":nl.seo.schemaDescription };
  return <html lang="nl"><body>{children}<AnalyticsConsent/><script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(schema)}}/></body></html>
}