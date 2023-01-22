import { languageStore } from "./store";
import { LanguageContextType } from "./types";

const cacheTranslate = () => {
  let cache: { [key: string]: string } = {};
  let translationConfig = languageStore.getState();
  languageStore.subscribe((newConfig) => {
    if (translationConfig.currentLanguage !== newConfig.currentLanguage)
      cache = {};
    translationConfig = newConfig;
  });

  return (id: string, params?: LanguageContextType) => {
    const { currentLanguage, translations } = translationConfig;
    const messages = translations[currentLanguage];

    if (!messages || !Object.keys(messages)?.length) return "";

    if (params && cache[id]) return cache[id];

    if (params) {
      cache[id] = Object.keys(params).reduce((prev, current) => {
        const regex = new RegExp(`{${current}}`, "g");
        return prev.replace(regex, params[current][currentLanguage]);
      }, messages[id]);

      return cache[id];
    } else {
      return messages[id];
    }
  };
};

export const t = cacheTranslate();
