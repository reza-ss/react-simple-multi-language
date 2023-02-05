import { ParamsType } from "./types";
export declare const t: (id: string, params?: ParamsType) => string;
export declare const createConstantTranslation: (id: string, params?: ParamsType) => {
    readonly translation: string;
};
