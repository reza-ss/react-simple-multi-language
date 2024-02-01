import { languageStore } from "./store";
import { ParamsType } from "./types";

const getPropertyWithKeyIdentifier = (
  ob: {},
  key: string
): string | undefined =>
  key
    .split(".")
    .reduce(
      (prev, current) => prev?.[current as keyof typeof ob],
      ob as string
    );

const generateCacheId = (
  id: string,
  currentLang: string,
  params?: ParamsType
) =>
  params
    ? id +
      Object.values(params)
        .map((e) => (e ? (typeof e === "string" ? e : e[currentLang]) : "null"))
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

  return (id: string, params?: ParamsType) => {
    const cacheId = generateCacheId(
      id,
      translationConfig.currentLanguage,
      params
    );

    if (cache[cacheId]) return cache[cacheId];

    const { currentLanguage, translations } = translationConfig;
    const messages = translations[currentLanguage];

    if (!messages || !Object.keys(messages)?.length) return id;

    const text = getPropertyWithKeyIdentifier(messages, id);

    if (!text) return id;

    if (params) {
      const parsedText = Object.keys(params).reduce((prev, current) => {
        const regex = new RegExp(`{${current}}`, "g");

        if (!params[current]) return prev;

        const translate =
          typeof params[current] === "string"
            ? params[current]
            : (params[current] as unknown as any)[currentLanguage];
        return prev.replace(regex, translate);
      }, text);
      cache[cacheId] = parsedText;

      return parsedText;
    } else {
      return text;
    }
  };
};

export const t = cacheTranslate();

export const createConstantTranslation = (id: string, params?: ParamsType) => {
  const tr = {
    get translation() {
      return t(id, params);
    },
  };

  return tr;
};
