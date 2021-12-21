type LanguageContextType = { [key: string]: string };
type LocalesParamsType = { [key: string]: { [key: string]: string } };

interface InternationalizationProviderProps {
  initialLang?: string;
  LanguagesSchema: LocalesParamsType;
}
type LocaleTitleTypes = string[];

export type {
  InternationalizationProviderProps,
  LocaleTitleTypes,
  LanguageContextType,
  LocalesParamsType,
};
