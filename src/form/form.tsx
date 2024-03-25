import React from "react";
import { formPropsType } from "../types";
import Field from "./field";

const Form: React.FC<formPropsType> = ({ schema, onSubmit }) => {
  return (
    <form aria-label="formfast" onSubmit={onSubmit}>
      {schema.map((element, index) => (
        <Field {...element} key={index} />
      ))}
    </form>
  );
};

export default Form;
