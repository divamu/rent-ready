import { Brand } from "./Brand";
import RequestForm from "./RequestForm";
import site from "../content/site.json";
import type { LocaleCode } from "../lib/content";
export default function RequestPage({lang}:{lang:LocaleCode}) {
  return <div className="request-page">
    <header className="request-header"><div className="wrap"><Brand alt="Rent Ready - Your property partner" href={`/${lang}`}/></div></header>
    <main className="request-main"><div className="wrap"><RequestForm lang={lang}/></div></main>
    <footer className="footer"><div className="wrap footer-inner"><Brand alt="Rent Ready - Your property partner" href={`/${lang}`}/><span>© {new Date().getFullYear()} Rent Ready · rentready.be</span><span><a href={`tel:${site.contact.phone}`}>{site.contact.phoneDisplay}</a> · <a href={`mailto:${site.contact.email}`}>{site.contact.email}</a></span></div></footer>
  </div>
}
