import { LanguageContextType } from "./types";
export declare const languageStore: {
    setState: (partial: {
        currentLanguage: string;
        translations: LanguageContextType;
    }) => void;
    getState: () => {
        currentLanguage: string;
        translations: LanguageContextType;
    };
    subscribe: (listener: (state: {
        currentLanguage: string;
        translations: LanguageContextType;
    }, prevState: {
        currentLanguage: string;
        translations: LanguageContextType;
    }) => void) => () => boolean;
};
