import React from "react";
export interface elementTypes {
    el?: string;
    id?: string;
    className?: string;
    style?: React.CSSProperties;
    type?: React.HTMLInputTypeAttribute | "radioGroup";
    btnType?: "submit" | "reset" | "button" | undefined;
    name?: string;
    value?: string | number;
    htmlFor?: string;
    error?: string | newElementTypes;
    errorClass?: string;
    placeholder?: string;
    required?: boolean;
    checked?: boolean;
    accept?: string;
    alt?: string;
    autocapitalize?: string;
    autocomplete?: string;
    autofocus?: boolean;
    capture?: boolean;
    dirname?: string;
    disabled?: boolean;
    divLabel?: boolean;
    formaction?: string;
    labelClass?: string;
    max?: number;
    maxlength?: number;
    min?: number;
    minlength?: number;
    multiple?: boolean;
    passIcon?: boolean;
    readonly?: boolean;
    size?: number;
    src?: string;
    step?: number;
    width?: number;
    wraperClass?: string;
    options?: {
        [key: string]: {
            label?: string;
            value?: string;
        };
    };
    childrens?: childrensTypes;
    handleChange?: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => valuesTypes;
}
export interface childrensTypes {
    [key: string]: elementTypes;
}
export interface formPropsType {
    initData: newElementTypes[];
    onSubmit: (e: React.FormEvent) => void;
}
export interface valuesTypes {
    [key: string]: string | number | boolean;
}
export interface initDataTypes {
    [key: string]: elementTypes;
}
export interface optionsTypes {
    error?: boolean;
    label?: boolean;
}
export interface newElementTypes extends elementTypes {
    children?: newElementTypes[];
    option?: {
        label: string;
        value?: string | number;
    }[];
    label?: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
    onBlur?: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
    onClick?: () => void;
}
export interface defaultErrorsTypes {
    [key: string]: {
        type: string;
        error: string | newElementTypes;
    };
}
export interface errorTypes {
    [key: string]: string | newElementTypes;
}
