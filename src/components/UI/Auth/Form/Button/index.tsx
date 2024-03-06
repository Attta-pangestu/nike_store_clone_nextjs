import style from "./index.module.scss";

import React, { FormEventHandler } from "react";

type PropTypes = {
  onClick?: FormEventHandler<HTMLButtonElement>;
  children: React.ReactNode;
  type: "submit" | "button";
};

const Button = (props: PropTypes) => {
  const { onClick, children, type } = props;
  return (
    <button type={type} className={style.register_button} onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;
