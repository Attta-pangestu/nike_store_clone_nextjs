import React, { ChangeEvent, ChangeEventHandler } from "react";
import style from "./index.module.scss";
const Input = ({
  label,
  type,
  value,
  onChange,
  disabled,
}: {
  label: string;
  type: string;
  value: string;
  onChange: ChangeEventHandler<HTMLInputElement>;
  disabled?: boolean;
}) => {
  return (
    <>
      {" "}
      <h3>{label}</h3>
      <input
        type={type}
        value={value}
        onChange={onChange}
        className={style.input}
        disabled={disabled}
      />
    </>
  );
};

export default Input;
