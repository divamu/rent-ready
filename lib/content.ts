import nl from "../content/locales/nl.json";
import fr from "../content/locales/fr.json";
import en from "../content/locales/en.json";

export type LocaleCode = "nl" | "fr" | "en";
export const localeContent = { nl, fr, en } as const;
export function getContent(lang: string) {
  return localeContent[(lang in localeContent ? lang : "nl") as LocaleCode];
}
