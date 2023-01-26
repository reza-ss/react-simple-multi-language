import { languageStore } from "./store";
import { LanguageContextType } from "./types";

const getPropertyWithKeyIdentifier = (
  ob: {},
  key: string
): string | undefined =>
  key
    .split(".")
    .reduce((prev, current) => prev[current as keyof typeof ob], ob as string);

const generateCacheId = (
  id: string,
  currentLang: string,
  params?: LanguageContextType
) =>
  params
    ? id +
      Object.values(params)
        .map((e) => e[currentLang])
        .join("-")
    : "";

const cacheTranslate = () => {
  let cache: { [key: string]: string } = {};
  let translationConfig = languageStore.getState();
  languageStore.subscribe((newConfig) => {
    if (translationConfig.currentLanguage !== newConfig.currentLanguage)
      cache = {};
    translationConfig = newConfig;
  });

  return (id: string, params?: LanguageContextType) => {
    const cacheId = generateCacheId(
      id,
      translationConfig.currentLanguage,
      params
    );

    if (cache[cacheId]) return cache[cacheId];

    const { currentLanguage, translations } = translationConfig;
    const messages = translations[currentLanguage];

    if (!messages || !Object.keys(messages)?.length) return "";

    const text = getPropertyWithKeyIdentifier(messages, id);

    if (!text) return "";

    if (params) {
      const parsedText = Object.keys(params).reduce((prev, current) => {
        const regex = new RegExp(`{${current}}`, "g");
        return prev.replace(regex, params[current][currentLanguage]);
      }, text);
      cache[cacheId] = parsedText;

      return parsedText;
    } else {
      return text;
    }
  };
};

export const t = cacheTranslate();
