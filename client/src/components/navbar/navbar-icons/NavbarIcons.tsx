import style from "./navbarIcons.module.css";
import { LuSearch, LuShoppingCart, LuUser2 } from "react-icons/lu";
import { Link } from "react-router-dom";
import { useState } from "react";
import { ShoppingCart } from "../../shoppingCart/ShoppingCart";

export const NavbarIcons = () => {
  const [cartOpen, setCartOpen] = useState(false);

  const iconSize = 22;
  return (
    <div className={style.container}>
      <div className={style["icon-wrapper"]}>
        <Link className={style.link} to={"/"}>
          <LuSearch size={iconSize}></LuSearch>
        </Link>
      </div>

      <div className={style["icon-wrapper"]}>
        <Link className={style.link} to={"/login"}>
          <LuUser2 size={iconSize}></LuUser2>
        </Link>
      </div>

      <div
        className={style["icon-wrapper"]}
        onClick={() => setCartOpen((prev) => !prev)}
      >
        <div className={style.link}>
          <LuShoppingCart size={iconSize}></LuShoppingCart>
        </div>
      </div>
      {cartOpen && <ShoppingCart></ShoppingCart>}
    </div>
  );
};
