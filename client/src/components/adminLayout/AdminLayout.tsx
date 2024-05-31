import React, { ReactNode } from "react";
import { Header } from "../header/Header";
import style from "./adminLayout.module.css";

interface Props {
  children?: ReactNode;
}

export const AdminLayout: React.FC<Props> = ({ children }) => {
  return (
    <div className={style.appcontainer}>
      <Header></Header>
      <div className={style.maincontaner}>{children}</div>
    </div>
  );
};
