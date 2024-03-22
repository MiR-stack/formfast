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
