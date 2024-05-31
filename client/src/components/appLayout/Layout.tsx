import React, { ReactNode } from "react";
import style from "./Layout.module.css";
import { Header } from "../header/Header";

interface Props {
  children?: ReactNode;
}

export const Layout: React.FC<Props> = ({ children }) => {
  return (
    <div className={style.appcontainer}>
      <Header></Header>
      <div className={style.maincontaner}>{children}</div>
    </div>
  );
};
