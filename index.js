import { useCallback, useMemo } from "react";

const React = require("react");
const { useEffect, useState, useContext, createContext } = React;

const LanguageContext = createContext();
const CurrentLanguageContext = createContext();
const SetLanguageContext = createContext();
let localesTitle = [];
export function InternationalizationProvider({
  initialLang,
  LanguagesSchema,
  children,
}) {
  const [CurrentLanguage, setCurrentLang] = useState(
    initialLang || Object.keys(LanguagesSchema)[0]
  );
  const [content, setContent] = useState(LanguagesSchema[CurrentLanguage]);
  const setLocale = useCallback((locale) => {
    if (localesTitle.includes(locale)) {
      setCurrentLang(locale);
      setContent(LanguagesSchema[locale]);
    } else {
      console.error("this locale is not one of your language");
    }
  }, []);
  console.log("render");
  useEffect(() => {
    localesTitle = Object.keys(LanguagesSchema);
  }, [LanguagesSchema]);
  return (
    <SetLanguageContext.Provider value={setLocale}>
      <LanguageContext.Provider value={content}>
        <CurrentLanguageContext.Provider value={CurrentLanguage}>
          {children}
        </CurrentLanguageContext.Provider>
      </LanguageContext.Provider>
    </SetLanguageContext.Provider>
  );
}
export function I18nText({ id, params, dynamicVal = null }) {
  const messages = useContext(LanguageContext);
  const CurrentLanguage = useContext(CurrentLanguageContext);
  if (!messages[id] || dynamicVal) {
    return typeof dynamicVal === "object"
      ? dynamicVal[CurrentLanguage] || null
      : dynamicVal;
  }
  console.log("text render");
  return params
    ? Object.keys(params).reduce((prev, current) => {
        const regex = new RegExp(`{${current}}`, "g");
        return prev.replace(regex, params[current][CurrentLanguage]);
      }, messages[id])
    : messages[id];
}
export const useSetLocale = () => {
  const setCurrentLang = useContext(SetLanguageContext);
  return setCurrentLang;
};
export const useCurrentLanguage = () => {
  const messages = useContext(LanguageContext);
  const CurrentLanguage = useContext(CurrentLanguageContext);
  return {
    currentLanguage: CurrentLanguage,
    messages: messages,
  };
};
// module.exports = {
//   InternationalizationProvider: InternationalizationProvider,
//   I18nText: I18nText,
//   useCurrentLanguage: useCurrentLanguage,
// };
