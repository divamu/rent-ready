import type { CSSProperties } from "react";
import site from "../content/site.json";
import { Icon } from "./Icon";
import { Brand } from "./Brand";
import { getContent, type LocaleCode } from "../lib/content";

export function HomePage({ lang = "nl" }:{lang?:LocaleCode}) {
  const t = getContent(lang);
  const c = site.theme.colors;
  const theme = {
    "--green": c.green, "--green2": c.green2, "--green3": c.green3,
    "--gold": c.gold, "--gold2": c.gold2, "--cream": c.cream,
    "--ink": c.ink, "--muted": c.muted, "--line": c.line, "--white": c.white
  } as CSSProperties;
  const currentPath = lang === "nl" ? "/nl" : `/${lang}`;

  return <div id="top" style={theme}>
    <header className="site-header">
      <div className="wrap header-inner">
        <Brand alt={t.mediaAlt.logo} href={currentPath}/>
        <nav className="desktop-nav" aria-label={lang === "fr" ? "Navigation principale" : lang === "en" ? "Main navigation" : "Hoofdnavigatie"}>
          {t.navigation.map(item => <a key={item.href} href={item.href}>{item.label}</a>)}
        </nav>
        <div className="header-tools">
          <div className="language-switcher" aria-label="Language">
            {site.locales.map(locale => <a key={locale.code} className={locale.code === lang ? "active" : ""} href={locale.path}>{locale.label}</a>)}
          </div>
          <a className="header-cta" href={`/${lang}/aanvraag`}>{t.header.cta} →</a>
        </div>
      </div>
    </header>

    <main>
      <section className="hero">
        <div className="hero-copy">
          <p className="eyebrow">{t.hero.eyebrow}</p>
          <h1>{t.hero.titlePrefix} <span>{t.hero.titleHighlight}</span></h1>
          <p className="hero-lead">{t.hero.text}</p>
          <div className="actions">
            <a className="btn btn-gold" href={`/${lang}/aanvraag`}><Icon name="wrench"/> {t.hero.primaryCta} →</a>
            <a className="btn btn-ghost" href="#diensten">{t.hero.secondaryCta}</a>
          </div>
          <div className="hero-points">
            {t.hero.points.map(point => <span className="hero-point" key={point.label}><Icon name={point.icon}/>{point.label}</span>)}
          </div>
        </div>
        <div className="hero-media"><img src={site.media.hero.src} alt={t.mediaAlt.hero}/></div>
      </section>

      <section className="section" id="diensten">
        <div className="wrap">
          <div className="section-head">
            <div className="copy"><p className="kicker">{t.servicesSection.kicker}</p><h2>{t.servicesSection.title}</h2><p>{t.servicesSection.intro}</p></div>
            <a className="text-link" href={`/${lang}/aanvraag`}>{t.servicesSection.link}</a>
          </div>
          <div className="services">
            {site.sections.services.map(s => {
              const text = t.services[s.id as keyof typeof t.services];
              const media = site.media.services[s.media as keyof typeof site.media.services];
              const alt = t.mediaAlt.services[s.id as keyof typeof t.mediaAlt.services];
              return <article className="service-card" key={s.id}>
                <div className="service-media"><img src={media.src} alt={alt} loading="lazy"/></div>
                <div className="service-body"><div className="service-icon"><Icon name={s.icon}/></div><h3>{text.title}</h3><p>{text.text}</p></div>
              </article>
            })}
          </div>
          <div className="scope-note"><strong>{t.servicesSection.scopeLabel}</strong> {t.servicesSection.scopeNote}</div>
        </div>
      </section>

      <section className="split" id="waarom">
        <div className="split-copy">
          <p className="kicker">{t.whySection.kicker}</p><h2>{t.whySection.title}</h2><p className="intro">{t.whySection.intro}</p>
          <div className="benefits">
            {site.sections.benefits.map(b => { const text=t.benefits[b.id as keyof typeof t.benefits]; return <div className="benefit" key={b.id}><Icon name={b.icon}/><strong>{text.title}</strong><p>{text.text}</p></div>})}
          </div>
        </div>
        <div className="split-photo"><img src={site.media.why.src} alt={t.mediaAlt.why} loading="lazy"/></div>
      </section>

      <section className="section" id="voor-wie"><div className="wrap">
        <div className="section-head"><div className="copy"><p className="kicker">{t.audienceSection.kicker}</p><h2>{t.audienceSection.title}</h2><p>{t.audienceSection.intro}</p></div></div>
        <div className="audience">{site.sections.audiences.map(a => { const text=t.audiences[a.id as keyof typeof t.audiences]; return <article className="audience-card" key={a.id}><Icon name={a.icon}/><h3>{text.title}</h3><p>{text.text}</p></article>})}</div>
      </div></section>

      <section className="section process" id="werkwijze"><div className="wrap">
        <div className="section-head"><div className="copy"><p className="kicker">{t.processSection.kicker}</p><h2>{t.processSection.title}</h2><p>{t.processSection.intro}</p></div></div>
        <div className="steps">{site.sections.process.map(s => { const text=t.process[s.id as keyof typeof t.process]; return <article className="step" key={s.id}><Icon name={s.icon}/><h3>{text.title}</h3><p>{text.text}</p></article>})}</div>
      </div></section>

      <section className="area" id="werkgebied">
        <div className="area-copy">
          <p className="kicker">{t.areaSection.kicker}</p><h2>{t.areaSection.title}</h2>
          <p className="intro">{t.areaSection.intro}</p>
          <p className="area-extra">{t.areaSection.extended}</p>
          <p className="area-question">{t.areaSection.question}</p>
          <a className="text-link area-link" href="#contact">{t.areaSection.contactCta}</a>
        </div>
        <div className="area-visual"><img src="/media/work-area-approved.png" alt={t.areaSection.ariaLabel} loading="lazy"/></div>
      </section>

      <section className="contact-band" id="contact">
        <div className="contact-copy"><p className="kicker">{t.contactSection.kicker}</p><h2>{t.contactSection.title}</h2><p>{t.contactSection.intro}</p>
          <div className="contact-actions"><a className="btn btn-gold" href={`${currentPath}/contact`}>{lang === "fr" ? "Contactez Rent Ready →" : lang === "en" ? "Contact Rent Ready →" : "Contacteer Rent Ready →"}</a><a className="btn btn-ghost" href={site.contact.whatsapp}>{t.contactSection.whatsappCta}</a></div>
          <div className="trust">{t.contactSection.trust.map(item => <span key={item}><Icon name="check"/>{item}</span>)}</div>
        </div>
        <div className="contact-photo"><img src={site.media.contact.src} alt={t.mediaAlt.contact} loading="lazy"/></div>
      </section>
    </main>

    <footer className="footer"><div className="wrap footer-inner"><Brand alt={t.mediaAlt.logo} href={currentPath}/><span>© {new Date().getFullYear()} {site.brand.name} · {site.brand.domain}</span><span><a href={`tel:${site.contact.phone}`}>{site.contact.phoneDisplay}</a> · <a href={`mailto:${site.contact.email}`}>{site.contact.email}</a></span></div></footer>
  </div>
}