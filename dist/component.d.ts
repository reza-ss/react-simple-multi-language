import { ParamsType } from "./types";
export declare const useUpdateComponentWhenLanguageChange: () => {
    currentLanguage: string;
    translations: import("./types").LanguageContextType;
};
export declare const I18nText: ({ id, params, }: {
    params?: ParamsType | undefined;
    id: string;
}) => string;
