import style from "./shoppingCart.module.css";
import { LuTrash } from "react-icons/lu";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { MouseEventHandler, useEffect } from "react";
import {
  addItemToCart,
  getUserCart,
  removeItemFromCart,
} from "../../store/reducers/cart/ActionCreators";
import {
  addUnAuth,
  adddQuantityUnAuth,
  getLocalCart,
  removeAllUnAuth,
  removeUnAuth,
} from "../../store/reducers/cart/CartSlice";

interface IShoppingCartProps {
  onMouseEnter: Function;
  onMouseLeave: Function;
}

export const ShoppingCart: React.FC<IShoppingCartProps> = ({
  onMouseEnter,
  onMouseLeave,
}) => {
  const products = useAppSelector((state) => state.cart.shoppingCartItems);
  const user = useAppSelector((state) => state.user.user);
  const dispatch = useAppDispatch();

  useEffect(() => {
    user?.id ? dispatch(getUserCart(user.id)) : dispatch(getLocalCart());
  }, []);

  function handleRemove(itemId: number) {
    user?.id
      ? dispatch(removeItemFromCart({ userId: user.id, productItemId: itemId }))
      : dispatch(removeUnAuth(itemId));
  }

  function handleRemoveAll(itemId: number) {
    dispatch(removeAllUnAuth(itemId));
  }

  function handleAdd(itemId: number) {
    user?.id
      ? dispatch(addItemToCart({ userId: user.id, productItemId: itemId }))
      : dispatch(adddQuantityUnAuth(itemId));
  }

  const handleOnMouseEnter: MouseEventHandler<HTMLDivElement> = (event) => {
    onMouseEnter();
    console.log("enter");
  };
  const handleOnMouseLeave: MouseEventHandler<HTMLDivElement> = (event) => {
    onMouseLeave();
    console.log("leave");
  };

  return (
    <div
      className={style.container}
      onMouseEnter={handleOnMouseEnter}
      onMouseLeave={handleOnMouseLeave}
    >
      <h3 className={style.title}>Корзина</h3>
      {products?.map((item) => {
        return (
          <div key={item?.productItem?.sku} className={style.item}>
            <div className={style.image}>
              <img
                src={
                  import.meta.env.VITE_API_URL +
                  item?.productItem?.product?.ProductImage[0].image
                }
              ></img>
            </div>

            <div className={style.itemDetails}>
              <p className={style.itemTitle}>
                {item?.productItem?.product?.name}
              </p>
              <p className={style.itemPrice}>
                {item?.productItem?.product?.price + " $"}
              </p>

              <p className={style.itemPrice}>
                {item?.productItem?.configuration?.find(
                  (item) => item.variation.name === "Размер"
                )?.variation.name +
                  " " +
                  item?.productItem?.configuration?.find(
                    (item) => item.variation.name === "Размер"
                  )?.value}
              </p>

              <p className={style.itemPrice}>
                <button onClick={() => handleAdd(item!.productItem!.id)}>
                  +
                </button>
                <span>{item?.quantityInCart}</span>
                <button onClick={() => handleRemove(item!.productItem!.id)}>
                  -
                </button>
              </p>
            </div>

            <LuTrash
              className={style.delete}
              onClick={() => handleRemoveAll(item!.productItem!.id)}
            ></LuTrash>
          </div>
        );
      })}

      <div className={style.total}>
        <span>$2000</span>
      </div>
      <button className={style.button}>Перейти к оформлению</button>
    </div>
  );
};
