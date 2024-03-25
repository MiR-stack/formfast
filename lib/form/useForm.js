import { useState, useEffect } from 'react';

const initOptions = { error: true, label: true };
function useForm({ initData, options = initOptions, onChange, onSubmit, validate, }) {
    options = { ...initOptions, ...options };
    // handle password show or hide
    const [password, setPassword] = useState(false);
    const handlePassword = () => {
        setPassword(!password);
    };
    let { initValues, initTouched, initError, errorTexts } = initObjCreator(initData);
    const [init, setInit] = useState(false);
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
        // update error
        if ((init || touched[name]) && !newValues[name]) {
            setError({ ...error, [name]: errorTexts[name] });
            isError = true;
        }
        else {
            setError({ ...error, [name]: "" });
            isError = false;
        }
    };
    // handle touched fields
    const [touched, setTouched] = useState({ ...initTouched });
    const handleTouched = (e) => {
        setTouched({ ...touched, [e.target.name]: true });
    };
    // handle form validation
    const [error, setError] = useState({ ...initError });
    let isError = false;
    const handleError = () => {
        if (validate) {
            errorTexts = { ...errorTexts, ...validate(values) };
            setError({ ...error, ...validate(values) });
        }
    };
    useEffect(() => {
        if (init) {
            handleError();
        }
    }, [values, init]);
    // handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        setInit(true);
        if (options.error) {
            Object.keys(error).forEach((name) => {
                if (!values[name]) {
                    setError((prev) => ({ ...prev, [name]: errorTexts[name] }));
                    isError = true;
                }
            });
        }
        if (!isError && onSubmit) {
            onSubmit(values);
        }
    };
    const data = elementsModifier({
        data: initData,
        options,
        error,
        touched,
        values,
        password,
        handleChange,
        handleTouched,
        handlePassword,
    });
    return { data, error, values, touched, onSubmit: handleSubmit };
}
// utils
const elementsModifier = ({ data, options, error, values, touched, password, handleChange, handleTouched, handlePassword, }) => {
    return Object.keys(data).map((label) => {
        const { el, id, type, required, name, className, error: fieldError, childrens, value, passIcon = true, options: selectOptions, } = data[label];
        let newElement = { ...data[label] };
        // create customize input
        if (el === "input" || el === "select") {
            let mainEl = {
                ...data[label],
                value: values[name || ""],
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
                    className: "formfast-input--password-input",
                    children: [
                        mainEl,
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
            }
            if ((options.error && (required || fieldError)) ||
                options.label ||
                type === "checkbox" ||
                type === "radio") {
                if (type === "checkbox") {
                    mainEl.checked = values[name];
                }
                if (error[name || label]) {
                    mainEl.className = `formfast-error--input ${className ? className : ""}`;
                }
                newElement = {
                    el: "div",
                    children: [mainEl],
                };
                // handle label
                const labelEl = { el: "label", htmlFor: id, label };
                if (type === "checkbox" || type === "radio") {
                    newElement.children = [{ el: "div", children: [mainEl, labelEl] }];
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
                            className: "formfast-error--text",
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
        if (childrens) {
            newElement.children = elementsModifier({
                data: childrens,
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
const initObjCreator = (initData) => {
    let initValues = {};
    let initTouched = {};
    let initError = {};
    let errorTexts = {};
    Object.keys(initData).forEach((label) => {
        const { childrens, el, type, name, checked, value, required, error } = initData[label];
        if ((el === "input" || el === "select" || type === "radioGroup") &&
            type !== "radio") {
            if (type === "checkbox") {
                initValues[name || label] = checked || false;
            }
            else {
                initValues[name || label] = value || "";
            }
            initTouched[name || label] = false;
            if (required || error) {
                initError[name || label] = "";
                errorTexts[name || label] = error || "this is required fields";
            }
        }
        if (childrens) {
            const { initValues: childInitValues, initTouched: childInitTouched, initError: childInitError, errorTexts: childErrorTexts, } = initObjCreator(childrens);
            initValues = { ...initValues, ...childInitValues };
            initTouched = { ...initTouched, ...childInitTouched };
            initError = { ...initError, ...childInitError };
            errorTexts = { ...errorTexts, ...childErrorTexts };
        }
    });
    return { initValues, initTouched, initError, errorTexts };
};

export { useForm as default };
//# sourceMappingURL=useForm.js.map
