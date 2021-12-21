import React, {
  useCallback,
  useEffect,
  useState,
  useContext,
  createContext,
  useRef,
  FC,
} from "react";
import {
  InternationalizationProviderProps,
  LanguageContextType,
  LocalesParamsType,
  LocaleTitleTypes,
} from "./types";

const LanguageContext = createContext<LanguageContextType>({});
const CurrentLanguageContext = createContext<string>("");
const SetLanguageContext = createContext<null | React.Dispatch<
  React.SetStateAction<string>
>>(null);

export const InternationalizationProvider: React.FC<InternationalizationProviderProps> =
  ({ initialLang, LanguagesSchema, children }) => {
    const [CurrentLanguage, setCurrentLang] = useState(
      initialLang || Object.keys(LanguagesSchema)[0]
    );
    const [content, setContent] = useState(LanguagesSchema[CurrentLanguage]);

    const localesTitle = useRef<LocaleTitleTypes>([]);

    const setLocale = useCallback(
      (locale) => {
        if (localesTitle.current.includes(locale)) {
          setCurrentLang(locale);
          setContent(LanguagesSchema[locale]);
        } else {
          console.error("this locale is not one of your language");
        }
      },
      [LanguagesSchema]
    );
    useEffect(() => {
      localesTitle.current = Object.keys(LanguagesSchema);
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
  };
export const I18nText: React.FC<{
  params: LocalesParamsType;
  id: string;
}> = ({ id, params }) => {
  const messages = useContext(LanguageContext);
  const CurrentLanguage = useContext(CurrentLanguageContext);
  return (
    <>
      {params
        ? Object.keys(params).reduce((prev, current) => {
            const regex = new RegExp(`{${current}}`, "g");
            return prev.replace(regex, params[current][CurrentLanguage]);
          }, messages[id])
        : messages[id]}
    </>
  );
};
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
