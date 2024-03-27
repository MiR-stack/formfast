import React from "react";
import { newElementTypes } from "../types";

const Field: React.FC<newElementTypes> = ({
  el,
  id,
  className,
  style,
  type,
  btnType,
  name,
  value,
  accept,
  required,
  checked,
  children,
  alt,
  autocapitalize,
  autocomplete,
  autofocus,
  capture,
  dirname,
  disabled,
  divLabel = true,
  formaction,
  label,
  max,
  maxlength,
  min,
  minlength,
  multiple,
  option,
  readonly,
  size,
  src,
  step,
  width,
  placeholder,
  htmlFor,
  onChange,
  onBlur,
  onClick,
}) => {
  const Tag = el as keyof JSX.IntrinsicElements;

  if (el === "icon") {
    if (type === "passwordIcon") {
      return (
        <span className="formfast-input--password-icon" onClick={onClick}>
          {checked ? (
            <svg
              fill="currentColor"
              viewBox="0 0 16 16"
              height="1em"
              width="1em"
            >
              <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 011.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0114.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 011.172 8z" />
              <path d="M8 5.5a2.5 2.5 0 100 5 2.5 2.5 0 000-5zM4.5 8a3.5 3.5 0 117 0 3.5 3.5 0 01-7 0z" />
            </svg>
          ) : (
            <svg
              fill="currentColor"
              viewBox="0 0 16 16"
              height="1em"
              width="1em"
            >
              <path d="M13.359 11.238C15.06 9.72 16 8 16 8s-3-5.5-8-5.5a7.028 7.028 0 00-2.79.588l.77.771A5.944 5.944 0 018 3.5c2.12 0 3.879 1.168 5.168 2.457A13.134 13.134 0 0114.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755-.165.165-.337.328-.517.486l.708.709z" />
              <path d="M11.297 9.176a3.5 3.5 0 00-4.474-4.474l.823.823a2.5 2.5 0 012.829 2.829l.822.822zm-2.943 1.299l.822.822a3.5 3.5 0 01-4.474-4.474l.823.823a2.5 2.5 0 002.829 2.829z" />
              <path d="M3.35 5.47c-.18.16-.353.322-.518.487A13.134 13.134 0 001.172 8l.195.288c.335.48.83 1.12 1.465 1.755C4.121 11.332 5.881 12.5 8 12.5c.716 0 1.39-.133 2.02-.36l.77.772A7.029 7.029 0 018 13.5C3 13.5 0 8 0 8s.939-1.721 2.641-3.238l.708.709zm10.296 8.884l-12-12 .708-.708 12 12-.708.708z" />
            </svg>
          )}
        </span>
      );
    }
  }

  if (el === "input" || el === "textarea") {
    const Tag = el;
    return (
      <Tag
        id={id}
        className={className}
        style={style}
        type={type}
        name={name}
        value={value}
        accept={accept}
        checked={checked}
        placeholder={placeholder}
        alt={alt}
        autoCapitalize={autocapitalize}
        autoComplete={autocomplete}
        capture={capture}
        dir={dirname}
        disabled={disabled}
        formAction={formaction}
        max={max}
        min={min}
        maxLength={maxlength}
        minLength={minlength}
        multiple={multiple}
        readOnly={readonly}
        src={src}
        size={size}
        step={step}
        width={width}
        onChange={onChange}
        onBlur={onBlur}
      />
    );
  }

  if (el === "select") {
    return (
      <select
        id={id}
        className={className}
        style={style}
        name={name}
        value={value}
        autoComplete={autocomplete}
        autoFocus={autofocus}
        disabled={disabled}
        multiple={multiple}
        required={required}
        size={size}
        onChange={onChange}
        onBlur={onBlur}
      >
        {option &&
          option.map((item) => (
            <option key={item.label} value={item.value}>
              {item.label}{" "}
            </option>
          ))}
      </select>
    );
  }

  if (el === "button") {
    return (
      <button
        id={id}
        className={className}
        style={style}
        name={name}
        value={value}
        autoFocus={autofocus}
        disabled={disabled}
        type={btnType}
      >
        {label}
      </button>
    );
  }

  return (
    <Tag
      id={id}
      className={className}
      style={style}
      name={name}
      value={value}
      htmlFor={htmlFor}
    >
      {divLabel && label}
      {children &&
        children.map((child, index) => {
          return <Field {...child} key={index} />;
        })}
    </Tag>
  );
};

export default Field;
