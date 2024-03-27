import { defaultErrorsTypes, errorTypes, newElementTypes, valuesTypes } from "../types";
/**
 * ? make usefull function for submit function
 */
interface handleValidationPropTypes {
    name: string;
    values: valuesTypes;
    defaultErrors: defaultErrorsTypes;
}
export declare const handleValidation: ({ name, values, defaultErrors, }: handleValidationPropTypes) => string | newElementTypes;
export declare const isError: (error: errorTypes) => boolean;
export {};
