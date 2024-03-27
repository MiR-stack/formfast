import React from "react";
import { formPropsType } from "../types";
import Field from "./field";

const Form: React.FC<formPropsType> = (props) => {
  const attributes = { ...props, schema: undefined };

  return (
    <form {...attributes}>
      {props.schema.map((element, index) => (
        <Field {...element} key={index} />
      ))}
    </form>
  );
};

export default Form;
