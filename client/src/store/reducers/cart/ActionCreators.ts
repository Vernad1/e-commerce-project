import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  addQuantity,
  addToCart,
  getCart,
  removeQuantity,
} from "../../../service/api/cartApi";
import { isErrorWithMessage } from "../../../utils/isErrorWithMessage";

interface IAddToCart {
  userId: number;
  productItemId: number;
}

export const addToUserCart = createAsyncThunk(
  "cart/addToUserCart",
  async (cartItemInfo: IAddToCart, thunkAPI) => {
    try {
      const cartData = await addToCart(
        cartItemInfo.userId,
        cartItemInfo.productItemId
      );

      return cartData;
    } catch (error: any) {
      if (isErrorWithMessage(error.response)) {
        return thunkAPI.rejectWithValue(error.response.data.message);
      } else {
        return thunkAPI.rejectWithValue("Неизвестная ошибка");
      }
    }
  }
);

export const getUserCart = createAsyncThunk(
  "cart/getUserCart",
  async (userId: number, thunkAPI) => {
    try {
      const cartData = await getCart(userId);

      return cartData;
    } catch (error: any) {
      if (isErrorWithMessage(error.response)) {
        return thunkAPI.rejectWithValue(error.response.data.message);
      } else {
        return thunkAPI.rejectWithValue("Неизвестная ошибка");
      }
    }
  }
);

export const addItemToCart = createAsyncThunk(
  "cart/addItemToCart",
  async (cartItemInfo: IAddToCart, thunkAPI) => {
    try {
      const cartData = await addQuantity(
        cartItemInfo.userId,
        cartItemInfo.productItemId
      );

      return cartData;
    } catch (error: any) {
      if (isErrorWithMessage(error.response)) {
        return thunkAPI.rejectWithValue(error.response.data.message);
      } else {
        return thunkAPI.rejectWithValue("Неизвестная ошибка");
      }
    }
  }
);

export const removeItemFromCart = createAsyncThunk(
  "cart/removeItemFromCart",
  async (cartItemInfo: IAddToCart, thunkAPI) => {
    try {
      const cartData = await removeQuantity(
        cartItemInfo.userId,
        cartItemInfo.productItemId
      );

      return cartData;
    } catch (error: any) {
      if (isErrorWithMessage(error.response)) {
        return thunkAPI.rejectWithValue(error.response.data.message);
      } else {
        return thunkAPI.rejectWithValue("Неизвестная ошибка");
      }
    }
  }
);
