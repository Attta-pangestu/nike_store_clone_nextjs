import React from "react";
import style from "./index.module.scss";
const Background = () => {
  return (
    <div className={style.background}>
      <div className={style.background_shape}></div>
      <div className={style.background_shape}></div>
    </div>
  );
};

export default Background;
