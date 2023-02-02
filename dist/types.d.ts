export type StringObject = {
    [key: string]: string;
};
export type LanguageContextType = {
    [key: string]: LanguageContextType | string;
};
export type ParamsType = {
    [key: string]: string | StringObject;
};
