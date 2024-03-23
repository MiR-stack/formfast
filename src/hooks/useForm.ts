import React, { useState } from "react";
import {
  defaultErrorsTypes,
  elementTypes,
  errorTypes,
  initDataTypes,
  newElementTypes,
  optionsTypes,
  valuesTypes,
} from "../types";
import { handleValidation, isError } from "../utils";

const initOptions = { error: true, label: true };

function useForm({
  initData,
  options = initOptions,
  onChange,
  onSubmit,
  validate,
}: {
  initData: initDataTypes;
  options?: optionsTypes;
  onChange?: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => valuesTypes;
  validate?: (values: valuesTypes) => errorTypes;
  onSubmit?: (values: valuesTypes) => void;
}) {
  options = { ...initOptions, ...options };

  // handle password show or hide
  const [password, setPassword] = useState<boolean>(false);

  const handlePassword = () => {
    setPassword(!password);
  };

  //create initial values
  let { initValues, initTouched, initError, defaultErrors } =
    initObjCreator(initData);

  const [init, setInit] = useState<boolean>(false);
  const [error, setError] = useState<errorTypes>({ ...initError });

  // handle values
  const [values, setValues] = useState({ ...initValues });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
    cb?: (
      e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => valuesTypes
  ) => {
    const { value, name } = e.target;

    const fieldChange = cb && cb(e);
    const fieldsChange = onChange && onChange(e);

    let newValues: valuesTypes = {};

    if (typeof values[name] === "boolean") {
      newValues = { ...values, [name]: !values[name] };
    } else {
      newValues = { ...values, [name]: value };
    }

    if (fieldChange) {
      newValues = { ...newValues, ...fieldChange };
    } else if (fieldsChange) {
      newValues = { ...newValues, ...fieldsChange };
    }

    setValues(newValues);

    //update errors

    if (init || touched[name]) {
      const userValidation = validate ? validate(newValues) : {};
      setError({
        ...error,
        [name]: handleValidation({ name, values: newValues, defaultErrors }),
        ...userValidation,
      });
    }
  };

  // handle touched fields

  const [touched, setTouched] = useState<valuesTypes>({ ...initTouched });

  const handleTouched = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setTouched({ ...touched, [e.target.name]: true });
  };

  // handle form validation

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // errors check
    let newErrors: errorTypes = error;

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
    data: initData,
    options,
    error: error,
    touched,
    values,
    password,
    handleChange,
    handleTouched,
    handlePassword,
  });

  return { data, error, values, touched, onSubmit: handleSubmit };
}

export default useForm;

// utils

const elementsModifier = ({
  data,
  options,
  error,
  values,
  touched,
  password,
  handleChange,
  handleTouched,
  handlePassword,
}: {
  data: initDataTypes;
  options: optionsTypes;
  error: errorTypes;
  values: valuesTypes;
  touched: valuesTypes;
  password: boolean;
  handleChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
    cb?: (
      e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => valuesTypes
  ) => void;
  handleTouched: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void;
  handlePassword: () => void;
}) => {
  return Object.keys(data).map((label) => {
    const {
      el,
      id,
      type,
      required,
      name,
      className,
      error: fieldError,
      errorClass,
      labelClass,
      childrens,
      value,
      passIcon = true,
      options: selectOptions,
      wraperClass,
    } = data[label];

    let newElement: newElementTypes = { ...data[label] };

    if (type === "radioGroup") {
      newElement.className = `formfast-input--radio ${
        className ? className : ""
      }`;
      newElement.childrens = {
        "": {
          el: "div",
          className: "formfast-input--radio-wraper",
          childrens: childrens,
        },
      };
    }

    // create customize input
    if (el === "input" || el === "select") {
      let mainEl: newElementTypes = {
        ...data[label],
        className: `formfast-input ${className ? className : ""}`,
        value: values[name || ""] as string | number,
        onChange: (
          e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
        ) => {
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
        } else {
          mainEl.type = "password";
        }

        mainEl = {
          el: "div",
          className: "formfast-input--password",
          children: [
            {
              ...mainEl,
              className: `formfast-input--password-input ${
                className ? className : ""
              }`,
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

      if (
        (options.error && (required || fieldError)) ||
        options.label ||
        type === "checkbox" ||
        type === "radio"
      ) {
        if (type === "checkbox") {
          mainEl.checked = values[name!] as boolean;
        }

        if (error[name || label]) {
          mainEl.className = `  ${
            mainEl.className ? mainEl.className : ""
          } formfast-error--input`;
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
          htmlFor: id,
          label,
        };

        if (type === "checkbox") {
          newElement.children = [{ el: "div", children: [mainEl, labelEl] }];
        } else if (type === "radio") {
          newElement.children = [mainEl, labelEl];
        } else if (options.label) {
          newElement.children?.unshift(labelEl);
        }

        // handle error
        if (error[name || label] && newElement.children && options.error) {
          if (typeof error[name || label] === "object") {
            newElement.children[newElement.children.length] = {
              ...(error[name || label] as elementTypes),
              className: `formfast-error--text ${className ? className : ""}`,
            };
          } else {
            newElement.children[newElement.children.length] = {
              el: "p",
              label: error[name || label] as string,
              className: `formfast-error--text ${errorClass ? errorClass : ""}`,
            };
          }
        }
      } else {
        newElement = mainEl;
      }
    } else {
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
const initObjCreator = (initData: initDataTypes) => {
  let initValues: valuesTypes = {};
  let initTouched: valuesTypes = {};
  let initError: errorTypes = {};
  let defaultErrors: defaultErrorsTypes = {};

  Object.keys(initData).forEach((label) => {
    const { childrens, el, type, name, checked, value, required, error } =
      initData[label];

    if (
      (el === "input" || el === "select" || type === "radioGroup") &&
      type !== "radio"
    ) {
      if (type === "checkbox") {
        initValues[name || label] = checked || false;
      } else {
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
      const {
        initValues: childInitValues,
        initTouched: childInitTouched,
        initError: childInitError,
        defaultErrors: childDefaultErrors,
      } = initObjCreator(childrens);

      initValues = { ...initValues, ...childInitValues };
      initTouched = { ...initTouched, ...childInitTouched };
      initError = { ...initError, ...childInitError };
      defaultErrors = { ...defaultErrors, ...childDefaultErrors };
    }
  });

  return { initValues, initTouched, initError, defaultErrors };
};
