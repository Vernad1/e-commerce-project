import React, { ReactNode } from "react";
import styles from "./Layout.module.css";
import { Header } from "../header/Header";

interface Props {
  children?: ReactNode;
}

export const Layout: React.FC<Props> = ({ children }) => {
  return (
    <div className={styles.appcontainer}>
      <Header></Header>
      <div className={styles.maincontaner}>{children}</div>
    </div>
  );
};
