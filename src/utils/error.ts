import {
  defaultErrorsTypes,
  errorTypes,
  newElementTypes,
  valuesTypes,
} from "../types";

/**
 * ? make usefull function for submit function
 */

// interface handleErrorPropTypes {
//   defaultErrors: defaultErrorsTypes;
//   values: valuesTypes;
// }

// export const handleError = ({
//   defaultErrors,
//   values,
// }: handleErrorPropTypes) => {
//   let error: errorTypes = {};

//   Object.keys(defaultErrors).forEach((name) => {
//     if (!values[name]) {
//       error[name] = defaultErrors[name].error;
//     }
//   });

//   return error;
// };

interface handleValidationPropTypes {
  name: string;
  values: valuesTypes;
  defaultErrors: defaultErrorsTypes;
}

export const handleValidation = ({
  name,
  values,
  defaultErrors,
}: handleValidationPropTypes) => {
  let error: string | newElementTypes = "";

  if (!values[name]) {
    error = defaultErrors[name].error;
  }

  if (defaultErrors[name].type === "password") {
    if (!values[name]) {
      error = defaultErrors[name].error;
    } else if (values[name].toString().length < 6) {
      error = "Passwords must be at least 6 characters long.";
    } else if (
      !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[^\s]{6,}$/.test(
        values[name].toString()
      )
    ) {
      error =
        "Passwords must contain a mix of uppercase and lowercase letters, numbers, and symbols.";
    }
  }

  if (defaultErrors[name].type === "email") {
    if (!values[name]) {
      error = defaultErrors[name].error;
    } else if (!/^([^\s@]+@[^\s@]+\.[^\s@]+)*$/.test(values[name].toString())) {
      error = "Please enter a valid email address.";
    }
  }

  return error;
};

export const isError = (error: errorTypes) => {
  let isError = false;

  Object.keys(error).forEach((name) => {
    if (error[name]) {
      isError = true;
    }
  });

  return isError;
};
