import React, { useEffect } from "react";
import style from "./cartTable.module.css";
import { useAppDispatch, useAppSelector } from "../../../hooks/redux";
import {
  addItemToCart,
  getUserCart,
  removeItemFromCart,
} from "../../../store/reducers/cart/ActionCreators";
import {
  adddQuantityUnAuth,
  getLocalCart,
  removeAllUnAuth,
  removeUnAuth,
} from "../../../store/reducers/cart/CartSlice";

export const CartTable = () => {
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

  return (
    <table className={style.table}>
      <thead>
        <tr className={style.tr}>
          <th className={style.th}>Товар</th>
          <th className={style.th}>Цена</th>
          <th className={style.th}>Количество</th>
          <th className={style.th}>Сумма</th>
          <th className={style.th}></th>
        </tr>
      </thead>
      <tbody>
        {products?.map((item) => {
          console.log(item);
          return (
            <tr key={item?.productItem?.sku} className={style.tr}>
              <td className={style.td}>
                <div className={style.productColumn}>
                  <div className={style.image}>
                    <img
                      src={
                        import.meta.env.VITE_API_URL +
                        item?.productItem?.product?.ProductImage[0].image
                      }
                    ></img>
                  </div>
                  <div className={style.productInfo}>
                    <div className={style.productName}>
                      {item?.productItem?.product?.name}
                    </div>
                    <div className={style.productColor}>
                      {
                        item?.productItem?.product?.details?.find(
                          (item) => item.name === "Цвет"
                        )?.value
                      }
                    </div>
                  </div>
                </div>
              </td>
              <td className={style.td}>
                {item?.productItem?.product?.price + " $"}
              </td>
              <td className={style.td}>
                <div className={style.qtyButtons}>
                  <button
                    className={style.button}
                    onClick={() => handleRemove(item!.productItem!.id)}
                  >
                    -
                  </button>
                  <p>{item?.quantityInCart}</p>
                  <button
                    className={style.button}
                    onClick={() => handleAdd(item!.productItem!.id)}
                  >
                    +
                  </button>
                </div>
              </td>
              <td className={style.td}>
                {Number(item?.productItem?.product?.price) *
                  item.quantityInCart +
                  " $"}
              </td>
              <td className={style.td}>
                <button
                  className={style.button}
                  onClick={() => handleRemoveAll(item!.productItem!.id)}
                >
                  x
                </button>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
