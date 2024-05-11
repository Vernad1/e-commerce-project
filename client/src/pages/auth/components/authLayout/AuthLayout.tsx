import { ReactNode } from "react";
import style from "./authLayout.module.css";
import { Link } from "react-router-dom";

interface AuthLayoutProps {
  children?: ReactNode;
}

export const AuthLayout: React.FC<AuthLayoutProps> = ({ children }) => {
  return (
    <div className={style.content}>
      <div className={style.titleWrapper}>
        <h1 className={style.title}>
          <Link to={"/"}>ATOMIC</Link>
        </h1>
      </div>
      {children}
    </div>
  );
};
