import React from "react";
import style from "./index.module.scss";

type PropTypes = {
  type: string;
  name: string;
};
const InputBox = (props: PropTypes) => {
  const { type, name } = props;
  return (
    <div className={style.register_inputBox}>
      <label className={style.register_label}>{name}</label>
      <input
        className={style.register_input}
        type={type}
        name={name}
        placeholder={`Input Your ${name}`}
      />
    </div>
  );
};

export default InputBox;
