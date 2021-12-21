/// <reference types="react" />
export declare function InternationalizationProvider({ initialLang, LanguagesSchema, children, }: {
    initialLang: any;
    LanguagesSchema: any;
    children: any;
}): JSX.Element;
export declare function I18nText({ id, params, dynamicVal }: {
    id: any;
    params: any;
    dynamicVal?: null | undefined;
}): any;
export declare const useSetLocale: () => unknown;
export declare const useCurrentLanguage: () => {
    currentLanguage: unknown;
    messages: unknown;
};
