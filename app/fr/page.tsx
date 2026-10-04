import type { Metadata } from "next";
import { HomePage } from "../../components/HomePage";
import t from "../../content/locales/fr.json";
export const metadata: Metadata = { title:t.seo.title, description:t.seo.description, alternates:{canonical:t.seo.canonical}, openGraph:{title:t.seo.openGraphTitle,description:t.seo.openGraphDescription,url:t.seo.canonical,locale:t.seo.locale,type:"website"} };
export default function Page(){ return <HomePage lang="fr"/>; }