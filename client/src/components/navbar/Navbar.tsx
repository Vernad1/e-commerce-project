import { NavbarSearch } from "./navbar-search/NavbarSearch";
import { Button } from "../ui/button/Button";
import style from "./navbar.module.css";
import { NavbarIcons } from "./navbar-icons/NavbarIcons";
import { Link } from "react-router-dom";
import { PRODUCTS_ROUTE } from "../../utils/consts";
import { useState } from "react";

export const Navbar = () => {
  return (
    <div className={style.container}>
      <div className={style.left}>
        <div className={style.item}>
          <Link to={"/"}>Мужчинам</Link>
        </div>

        <div className={style.item}>
          <Link to={"/"}>Женщинам</Link>
        </div>

        <div className={style.item}>
          <Link to={PRODUCTS_ROUTE}>Каталог</Link>
        </div>
      </div>

      <div className={style.logo}>
        <Link to={"/"}>Atomic</Link>
      </div>
      <div className={style.right}>
        <div className={style.item}>
          <Link to={"/"}>О нас</Link>
        </div>
        <div className={style.item}>
          <Link to={"/"}>Контакты</Link>
        </div>
        <div className={style.item}>
          <Link to={"/admin"}>Админ</Link>
        </div>

        <div className={style.item}>
          <NavbarIcons></NavbarIcons>
        </div>
      </div>
    </div>
  );
};

{
  /* <div className={style["logo-wrapper"]}>
<div className={style.logo}>
  <Link to={"/"}>Atomic</Link>
</div>
</div>
<button>Мужчинам</button>
<button>Женщинам</button>
<NavbarSearch></NavbarSearch>
<NavbarIcons></NavbarIcons> */
}
