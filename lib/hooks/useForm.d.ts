import React from "react";
import { errorTypes, formSchemaTypes, newElementTypes, optionsTypes, valuesTypes } from "../types";
declare function useForm({ formSchema, options, onChange, onSubmit, validate, }: {
    formSchema: formSchemaTypes;
    options?: optionsTypes;
    onChange?: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => valuesTypes;
    validate?: (values: valuesTypes) => errorTypes;
    onSubmit?: (values: valuesTypes) => void;
}): {
    data: newElementTypes[];
    error: errorTypes;
    values: {
        [x: string]: string | number | boolean;
    };
    touched: valuesTypes;
    onSubmit: (e: React.FormEvent) => void;
};
export default useForm;
