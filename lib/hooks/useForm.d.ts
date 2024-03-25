import React from "react";
import { errorTypes, initDataTypes, newElementTypes, optionsTypes, valuesTypes } from "../types";
declare function useForm({ initData, options, onChange, onSubmit, validate, }: {
    initData: initDataTypes;
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
