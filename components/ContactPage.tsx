import type { CSSProperties } from "react";
import site from "../content/site.json";
import { Brand } from "./Brand";
import type { LocaleCode } from "../lib/content";
import { getContent } from "../lib/content";

const copy = {
  nl: { kicker:"Contact", title:"Vertel ons wat er moet gebeuren.", intro:"Beschrijf kort waarmee we u kunnen helpen. U kunt ons rechtstreeks mailen of foto's en uitleg via WhatsApp sturen.", email:"Stuur ons een e-mail →", whatsapp:"WhatsApp ons →", back:"Terug naar de website" },
  fr: { kicker:"Contact", title:"Dites-nous ce qu’il faut faire.", intro:"Décrivez brièvement comment nous pouvons vous aider. Vous pouvez nous envoyer un e-mail ou partager des photos et des explications via WhatsApp.", email:"Envoyez-nous un e-mail →", whatsapp:"Écrivez-nous sur WhatsApp →", back:"Retour au site" },
  en: { kicker:"Contact", title:"Tell us what needs to be done.", intro:"Briefly describe how we can help. You can email us directly or send photos and details via WhatsApp.", email:"Send us an email →", whatsapp:"WhatsApp us →", back:"Back to the website" }
} as const;

export function ContactPage({lang="nl"}:{lang?:LocaleCode}) {
  const t=getContent(lang); const x=copy[lang]; const c=site.theme.colors;
  const theme={"--green":c.green,"--green2":c.green2,"--green3":c.green3,"--gold":c.gold,"--gold2":c.gold2,"--cream":c.cream,"--ink":c.ink,"--muted":c.muted,"--line":c.line,"--white":c.white} as CSSProperties;
  const home=lang==="nl"?"/nl":`/${lang}`;
  return <div style={theme}>
    <header className="site-header"><div className="wrap header-inner"><Brand alt={t.mediaAlt.logo} href={home}/><div className="header-tools"><div className="language-switcher" aria-label="Language">{site.locales.map(l=><a key={l.code} className={l.code===lang?"active":""} href={`${l.path}/contact`}>{l.label}</a>)}</div></div></div></header>
    <main><section className="contact-band" style={{minHeight:"calc(100vh - 150px)"}}><div className="contact-copy"><p className="kicker">{x.kicker}</p><h1 style={{fontSize:"clamp(2.6rem,5vw,5rem)",margin:"0 0 18px"}}>{x.title}</h1><p>{x.intro}</p><div className="contact-actions"><a className="btn btn-gold" href={`mailto:${site.contact.email}`}>{x.email}</a><a className="btn btn-ghost" href={site.contact.whatsapp}>{x.whatsapp}</a></div><p style={{marginTop:28}}><a className="text-link" href={home}>← {x.back}</a></p></div><div className="contact-photo"><img src={site.media.contact.src} alt={t.mediaAlt.contact}/></div></section></main>
  </div>;
}
