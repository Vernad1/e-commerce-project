import React, { MouseEventHandler } from "react";
import style from "./button.module.css";

interface Props {
  children?: React.ReactNode;
  title?: string;
  onClick?: MouseEventHandler<HTMLButtonElement>;
}

export const Button: React.FC<Props> = ({ children, title, onClick }) => {
  return (
    <button className={style.button} onClick={onClick}>
      {children}
      {title}
    </button>
  );
};
