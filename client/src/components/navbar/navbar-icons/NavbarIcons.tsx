import style from "./navbarIcons.module.css";
import { LuSearch, LuShoppingCart, LuUser2 } from "react-icons/lu";
import { Link, useLocation, useParams } from "react-router-dom";
import { useRef, useState } from "react";
import { ShoppingCart } from "../../shoppingCart/ShoppingCart";

export const NavbarIcons = () => {
  const [isCartHover, setIsCartHover] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setInterval>>();

  const pathName = useLocation().pathname;

  const handleMouseEnter = () => {
    clearTimeout(timeoutRef.current);
    setIsCartHover(true);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setIsCartHover(false);
    }, 1000);

    console.log(timeoutRef.current);
  };

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
        onMouseEnter={() => handleMouseEnter()}
        onMouseLeave={() => handleMouseLeave()}
      >
        <div className={style.link}>
          <Link className={style.link} to={"/cart"}>
            <LuShoppingCart size={iconSize}></LuShoppingCart>
          </Link>
        </div>
      </div>
      {pathName != "/cart" && isCartHover && (
        <ShoppingCart
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        ></ShoppingCart>
      )}
    </div>
  );
};
