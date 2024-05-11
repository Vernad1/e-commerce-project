import { $host } from ".";
import { removeUnAuth } from "../../store/reducers/cart/CartSlice";

export const addToCart = async (userId: number, productItemId: number) => {
  const { data } = await $host.post("shopping-cart/add", {
    userId,
    productItemId,
  });
  return data;
};

export const getCart = async (userId: number) => {
  const { data } = await $host.get(`shopping-cart/${userId}`);
  return data;
};

export const addQuantity = async (userId: number, productItemId: number) => {
  const { data } = await $host.put(`shopping-cart-item/add`, {
    userId,
    productItemId,
  });
  return data;
};

export const removeQuantity = async (userId: number, productItemId: number) => {
  const { data } = await $host.put(`shopping-cart-item/remove`, {
    userId,
    productItemId,
  });
  return data;
};
