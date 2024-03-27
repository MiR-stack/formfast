import React, { useState } from 'react';

const Field = ({ el, id, className, style, type, btnType, name, value, accept, required, checked, children, alt, autocapitalize, autocomplete, autofocus, capture, dirname, disabled, divLabel = true, formaction, label, max, maxlength, min, minlength, multiple, option, readonly, size, src, step, width, placeholder, htmlFor, onChange, onBlur, onClick, }) => {
    const Tag = el;
    if (el === "icon") {
        if (type === "passwordIcon") {
            return (React.createElement("span", { className: "formfast-input--password-icon", onClick: onClick }, checked ? (React.createElement("svg", { fill: "currentColor", viewBox: "0 0 16 16", height: "1em", width: "1em" },
                React.createElement("path", { d: "M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 011.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0114.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 011.172 8z" }),
                React.createElement("path", { d: "M8 5.5a2.5 2.5 0 100 5 2.5 2.5 0 000-5zM4.5 8a3.5 3.5 0 117 0 3.5 3.5 0 01-7 0z" }))) : (React.createElement("svg", { fill: "currentColor", viewBox: "0 0 16 16", height: "1em", width: "1em" },
                React.createElement("path", { d: "M13.359 11.238C15.06 9.72 16 8 16 8s-3-5.5-8-5.5a7.028 7.028 0 00-2.79.588l.77.771A5.944 5.944 0 018 3.5c2.12 0 3.879 1.168 5.168 2.457A13.134 13.134 0 0114.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755-.165.165-.337.328-.517.486l.708.709z" }),
                React.createElement("path", { d: "M11.297 9.176a3.5 3.5 0 00-4.474-4.474l.823.823a2.5 2.5 0 012.829 2.829l.822.822zm-2.943 1.299l.822.822a3.5 3.5 0 01-4.474-4.474l.823.823a2.5 2.5 0 002.829 2.829z" }),
                React.createElement("path", { d: "M3.35 5.47c-.18.16-.353.322-.518.487A13.134 13.134 0 001.172 8l.195.288c.335.48.83 1.12 1.465 1.755C4.121 11.332 5.881 12.5 8 12.5c.716 0 1.39-.133 2.02-.36l.77.772A7.029 7.029 0 018 13.5C3 13.5 0 8 0 8s.939-1.721 2.641-3.238l.708.709zm10.296 8.884l-12-12 .708-.708 12 12-.708.708z" })))));
        }
    }
    if (el === "input" || el === "textarea") {
        const Tag = el;
        return (React.createElement(Tag, { id: id, className: className, style: style, type: type, name: name, value: value, accept: accept, checked: checked, placeholder: placeholder, alt: alt, autoCapitalize: autocapitalize, autoComplete: autocomplete, capture: capture, dir: dirname, disabled: disabled, formAction: formaction, max: max, min: min, maxLength: maxlength, minLength: minlength, multiple: multiple, readOnly: readonly, src: src, size: size, step: step, width: width, onChange: onChange, onBlur: onBlur }));
    }
    if (el === "select") {
        return (React.createElement("select", { id: id, className: className, style: style, name: name, value: value, autoComplete: autocomplete, autoFocus: autofocus, disabled: disabled, multiple: multiple, required: required, size: size, onChange: onChange, onBlur: onBlur }, option &&
            option.map((item) => (React.createElement("option", { key: item.label, value: item.value },
                item.label,
                " ")))));
    }
    if (el === "button") {
        return (React.createElement("button", { id: id, className: className, style: style, name: name, value: value, autoFocus: autofocus, disabled: disabled, type: btnType }, label));
    }
    return (React.createElement(Tag, { id: id, className: className, style: style, name: name, value: value, htmlFor: htmlFor },
        divLabel && label,
        children &&
            children.map((child, index) => {
                return React.createElement(Field, { ...child, key: index });
            })));
};

const Form = (props) => {
    const attributes = { ...props, schema: undefined };
    return (React.createElement("form", { ...attributes }, props.schema.map((element, index) => (React.createElement(Field, { ...element, key: index })))));
};

const handleValidation = ({ name, values, defaultErrors, }) => {
    let error = "";
    if (!values[name]) {
        error = defaultErrors[name].error;
    }
    if (defaultErrors[name].type === "password") {
        if (!values[name]) {
            error = defaultErrors[name].error;
        }
        else if (values[name].toString().length < 6) {
            error = "Passwords must be at least 6 characters long.";
        }
        else if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[^\s]{6,}$/.test(values[name].toString())) {
            error =
                "Passwords must contain a mix of uppercase and lowercase letters, numbers, and symbols.";
        }
    }
    if (defaultErrors[name].type === "email") {
        if (!values[name]) {
            error = defaultErrors[name].error;
        }
        else if (!/^([^\s@]+@[^\s@]+\.[^\s@]+)*$/.test(values[name].toString())) {
            error = "Please enter a valid email address.";
        }
    }
    return error;
};
const isError = (error) => {
    let isError = false;
    Object.keys(error).forEach((name) => {
        if (error[name]) {
            isError = true;
        }
    });
    return isError;
};

const initOptions = { error: true, label: true };
function useForm({ formSchema, options = initOptions, onChange, onSubmit, validate, }) {
    options = { ...initOptions, ...options };
    // handle password show or hide
    const [password, setPassword] = useState(false);
    const handlePassword = () => {
        setPassword(!password);
    };
    //create initial values
    let { initValues, initTouched, initError, defaultErrors } = initObjCreator(formSchema);
    const [init, setInit] = useState(false);
    const [error, setError] = useState({ ...initError });
    // handle values
    const [values, setValues] = useState({ ...initValues });
    const handleChange = (e, cb) => {
        const { value, name } = e.target;
        const fieldChange = cb && cb(e);
        const fieldsChange = onChange && onChange(e);
        let newValues = {};
        if (typeof values[name] === "boolean") {
            newValues = { ...values, [name]: !values[name] };
        }
        else {
            newValues = { ...values, [name]: value };
        }
        if (fieldChange) {
            newValues = { ...newValues, ...fieldChange };
        }
        else if (fieldsChange) {
            newValues = { ...newValues, ...fieldsChange };
        }
        setValues(newValues);
        //update errors
        if (options.error && defaultErrors[name] && (init || touched[name])) {
            const userValidation = validate ? validate(newValues) : {};
            setError({
                ...error,
                [name]: handleValidation({ name, values: newValues, defaultErrors }),
                ...userValidation,
            });
        }
    };
    // handle touched fields
    const [touched, setTouched] = useState({ ...initTouched });
    const handleTouched = (e) => {
        setTouched({ ...touched, [e.target.name]: true });
    };
    // handle form validation
    const handleSubmit = (e) => {
        e.preventDefault();
        // errors check
        let newErrors = error;
        if (options.error && !init) {
            const userValidation = validate ? validate(values) : {};
            Object.keys(error).forEach((name) => {
                newErrors = {
                    ...newErrors,
                    [name]: handleValidation({ name, defaultErrors, values }),
                    ...userValidation,
                };
            });
            setError({ ...newErrors });
        }
        setInit(true);
        if (!isError(newErrors) && onSubmit) {
            onSubmit(values);
        }
    };
    const data = elementsModifier({
        data: formSchema,
        options,
        error: error,
        touched,
        values,
        password,
        handleChange,
        handleTouched,
        handlePassword,
    });
    return { schema: data, error, values, touched, onSubmit: handleSubmit };
}
// utils
const elementsModifier = ({ data, options, error, values, touched, password, handleChange, handleTouched, handlePassword, }) => {
    return Object.keys(data).map((label) => {
        const { el, id, type, required, name, className, error: fieldError, errorClass, inputErrorClass, labelClass, childrens, value, passIcon = true, options: selectOptions, wraperClass, } = data[label];
        if (!el) {
            data[label].el = "input";
        }
        let newElement = { ...data[label] };
        if (type === "radioGroup") {
            newElement.className = `formfast-input--radio ${className ? className : ""}`;
            newElement.childrens = {
                "": {
                    el: "div",
                    className: "formfast-input--radio-wraper",
                    childrens: childrens,
                },
            };
        }
        // create customize input
        if (data[label].el === "input" || el === "textarea" || el === "select") {
            let mainEl = {
                ...data[label],
                className: `formfast-input ${className ? className : ""}`,
                id: id || label,
                type: type || "text",
                name: name || label,
                value: values[name || label],
                onChange: (e) => {
                    handleChange(e, data[label].handleChange);
                },
                onBlur: handleTouched,
            };
            // handle input types
            if (type === "radio") {
                mainEl.value = value;
                mainEl.checked = value === values[name || ""];
            }
            if (type === "password" && passIcon) {
                if (password) {
                    mainEl.type = "text";
                }
                else {
                    mainEl.type = "password";
                }
                mainEl = {
                    el: "div",
                    className: "formfast-input--password",
                    children: [
                        {
                            ...mainEl,
                            className: `formfast-input--password-input ${className ? className : ""}`,
                        },
                        {
                            el: "icon",
                            type: "passwordIcon",
                            checked: password,
                            onClick: handlePassword,
                        },
                    ],
                };
            }
            // handle select options
            if (selectOptions) {
                const option = Object.keys(selectOptions).map((optionLabel) => ({
                    label: optionLabel,
                    value: selectOptions[optionLabel].value,
                }));
                mainEl.option = option;
                mainEl.className = `formfast-select ${className ? className : ""}`;
            }
            if ((options.error && (required || fieldError)) ||
                options.label ||
                type === "checkbox" ||
                type === "radio") {
                if (type === "checkbox") {
                    mainEl.checked = values[name];
                }
                if (error[name || label]) {
                    mainEl.className = `  ${mainEl.className ? mainEl.className : ""} formfast-error--input ${inputErrorClass ? inputErrorClass : ""}`;
                }
                newElement = {
                    el: "div",
                    className: `formfast-input--wraper ${wraperClass ? wraperClass : ""}`,
                    children: [mainEl],
                };
                if (type === "radio") {
                    newElement.className = "formfast-input--radio";
                }
                // handle label
                const labelEl = {
                    el: "label",
                    className: `${labelClass ? labelClass : ""}`,
                    htmlFor: id || label,
                    label,
                };
                if (type === "checkbox") {
                    newElement.children = [{ el: "div", children: [mainEl, labelEl] }];
                }
                else if (type === "radio") {
                    newElement.children = [mainEl, labelEl];
                }
                else if (options.label) {
                    newElement.children?.unshift(labelEl);
                }
                // handle error
                if (error[name || label] && newElement.children && options.error) {
                    if (typeof error[name || label] === "object") {
                        newElement.children[newElement.children.length] = {
                            ...error[name || label],
                            className: `formfast-error--text ${className ? className : ""}`,
                        };
                    }
                    else {
                        newElement.children[newElement.children.length] = {
                            el: "p",
                            label: error[name || label],
                            className: `formfast-error--text ${errorClass ? errorClass : ""}`,
                        };
                    }
                }
            }
            else {
                newElement = mainEl;
            }
        }
        else {
            newElement.label = label;
        }
        if (newElement.childrens) {
            newElement.children = elementsModifier({
                data: newElement.childrens,
                options,
                error,
                handleChange,
                values,
                handleTouched,
                touched,
                handlePassword,
                password,
            });
        }
        delete newElement.childrens;
        return newElement;
    });
};
// init values creator
const initObjCreator = (formSchema) => {
    let initValues = {};
    let initTouched = {};
    let initError = {};
    let defaultErrors = {};
    Object.keys(formSchema).forEach((label) => {
        const { childrens, el, type, name, checked, value, required, error } = formSchema[label];
        if ((!el ||
            el === "input" ||
            el === "textarea" ||
            el === "select" ||
            type === "radioGroup") &&
            type !== "radio") {
            switch (type) {
                case "checkbox":
                    initValues[name || label] = checked || false;
                    break;
                case "color":
                    initValues[name || label] = value || "#ffffff";
                    break;
                default:
                    initValues[name || label] = value || "";
            }
            initTouched[name || label] = false;
            if (required || error) {
                initError[name || label] = "";
                defaultErrors[name || label] = {
                    type: type || "text",
                    error: error || "Please fill out this field",
                };
            }
        }
        if (childrens) {
            const { initValues: childInitValues, initTouched: childInitTouched, initError: childInitError, defaultErrors: childDefaultErrors, } = initObjCreator(childrens);
            initValues = { ...initValues, ...childInitValues };
            initTouched = { ...initTouched, ...childInitTouched };
            initError = { ...initError, ...childInitError };
            defaultErrors = { ...defaultErrors, ...childDefaultErrors };
        }
    });
    return { initValues, initTouched, initError, defaultErrors };
};

export { Form, useForm };
//# sourceMappingURL=index.es.js.map
