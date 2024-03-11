import React, { ChangeEvent, ChangeEventHandler } from "react";
import style from "./index.module.scss";

type Options = {
  label: string;
  value: string;
};

const Select = ({
  label,
  options,
  value,
  onChange,
}: {
  label: string;
  options: Options[];
  value: string;
  onChange: ChangeEventHandler<HTMLSelectElement>;
}) => {
  return (
    <>
      {" "}
      <h3>{label}</h3>
      <select className={style.input} value={value} onChange={onChange}>
        <option value="">Choose {label.toLowerCase()}</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </>
  );
};

export default Select;
