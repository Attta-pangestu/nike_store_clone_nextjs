import React from "react";
import style from "./index.module.scss";

const Button = ({
  children,
  onClick,
  type,
  theme,
}: {
  children: React.ReactNode;
  onClick?: () => void;
  type?: "primary" | "secondary" | "tertiary";
  theme?: "light" | "semi" | "dark";
}) => {
  return (
    <button
      onClick={onClick}
      type="button"
      className={`${style.button} ${type && style[type]}  ${
        theme && style[theme]
      }`}
    >
      {children}
    </button>
  );
};

export default Button;
