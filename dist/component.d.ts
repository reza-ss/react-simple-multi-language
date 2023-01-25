import { LanguageContextType } from "./types";
export declare const useUpdateComponentWhenLanguageChange: () => {
    currentLanguage: string;
    translations: LanguageContextType;
};
export declare const I18nText: ({ id, params, }: {
    params?: LanguageContextType | undefined;
    id: string;
}) => string;
