import { Navbar } from "../navbar/Navbar";
import style from "./header.module.css";

export const Header = () => {
  return (
    <div className={style.container}>
      <Navbar></Navbar>
    </div>
  );
};
