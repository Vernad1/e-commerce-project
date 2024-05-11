import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { checkUser } from "../../store/reducers/user/ActionCreators";
import {
  getLocalCart,
  removeUnAuth,
} from "../../store/reducers/cart/CartSlice";
import {
  addToUserCart,
  getUserCart,
} from "../../store/reducers/cart/ActionCreators";

export const Auth = ({ children }: { children: JSX.Element }) => {
  const isLoading = useAppSelector((state) => state.user.isLoading);
  const user = useAppSelector((state) => state.user.user);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(checkUser());
  }, []);

  //TODO Переделать логику обновления корзины после авторизации
  useEffect(() => {
    dispatch(getLocalCart());
    if (user?.id) {
      const cartJson = localStorage.getItem("shoppingCart");
      const cart = cartJson ? JSON.parse(cartJson) : [];
      cart.forEach((item: any) => {
        if (user?.id && item?.productItem?.id) {
          dispatch(
            addToUserCart({
              userId: user?.id,
              productItemId: item?.productItem?.id,
            })
          );
          dispatch(removeUnAuth(item?.productItem?.id));
        }
      });
      dispatch(getUserCart(user?.id));
    }
  }, [isLoading]);

  if (isLoading) {
    return <h1>Загрузка...</h1>;
  }

  return children;
};
