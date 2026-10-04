import site from "../content/site.json";

export function Brand({ alt, href = "/" }:{alt:string; href?:string}) {
  return <a className="brand" href={href} aria-label={site.brand.name}>
    <img className="brand-logo" src={site.media.logo.src} alt={alt} />
  </a>
}
