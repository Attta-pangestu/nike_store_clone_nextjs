import React, { Dispatch, useEffect, useRef } from "react";
import style from "./index.module.scss";

const Modal = ({
  children,
  title,
  onCloseModal,
}: {
  children: React.ReactNode;
  title: string;
  onCloseModal: React.Dispatch<any>;
}) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        onCloseModal(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [onCloseModal]);

  return (
    <div className={style.modal}>
      <div className={style.modal_content} ref={ref}>
        <h1>{title}</h1>
        {children}
      </div>
    </div>
  );
};

export default Modal;
