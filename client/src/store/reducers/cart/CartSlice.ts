import { createSlice } from "@reduxjs/toolkit";
import { IProductInCart } from "../../../models/IProductInCart";
import {
  addItemToCart,
  addToUserCart,
  getUserCart,
  removeItemFromCart,
} from "./ActionCreators";

interface CartState {
  shoppingCartItems: IProductInCart[];
  isLoading: boolean;
  error: string;
  price: number;
}

const initialState: CartState = {
  shoppingCartItems: [],
  isLoading: false,
  error: "",
  price: 0,
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addUnAuth(state, action) {
      const shoppingCartItem: IProductInCart = {
        quantityInCart: 1,
        productItem: action.payload,
      };
      const item = state.shoppingCartItems.find(
        (item) => item.productItem?.sku === shoppingCartItem.productItem?.sku
      );

      if (item) {
        item.quantityInCart += 1;
      } else {
        state.shoppingCartItems.push(shoppingCartItem);
      }

      localStorage.setItem(
        "shoppingCart",
        JSON.stringify(state.shoppingCartItems)
      );
      console.log("asd");
    },
    removeUnAuth(state, action) {
      const currentItem = state.shoppingCartItems.find(
        (item) => item?.productItem?.id === action.payload
      );

      if (currentItem && currentItem.quantityInCart > 1) {
        currentItem.quantityInCart -= 1;
      } else {
        state.shoppingCartItems = state.shoppingCartItems.filter(
          (item) => item.productItem?.id !== action.payload
        );
      }

      localStorage.setItem(
        "shoppingCart",
        JSON.stringify(state.shoppingCartItems)
      );
    },
    removeAllUnAuth(state, action) {
      state.shoppingCartItems = state.shoppingCartItems.filter(
        (item) => item.productItem?.id !== action.payload
      );

      localStorage.setItem(
        "shoppingCart",
        JSON.stringify(state.shoppingCartItems)
      );
    },
    adddQuantityUnAuth(state, action) {
      const currentItem = state.shoppingCartItems.find(
        (item) => item?.productItem?.id === action.payload
      );
      if (currentItem) {
        currentItem.quantityInCart += 1;
      }

      localStorage.setItem(
        "shoppingCart",
        JSON.stringify(state.shoppingCartItems)
      );
    },

    getLocalCart(state) {
      const cartJson = localStorage.getItem("shoppingCart");
      const cart = cartJson ? JSON.parse(cartJson) : [];
      state.shoppingCartItems = cart;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addToUserCart.pending, (state) => {
        state.isLoading = true;
        state.error = "";
      })
      .addCase(addToUserCart.fulfilled, (state, action: any) => {
        state.isLoading = false;
        state.error = "";
        state.shoppingCartItems = action.payload.shoppingCartItems;
      })
      .addCase(addToUserCart.rejected, (state, action: any) => {
        state.isLoading = false;
        state.shoppingCartItems = [];
        state.error = action.payload;
      })
      .addCase(getUserCart.pending, (state) => {
        state.isLoading = true;
        state.error = "";
      })
      .addCase(getUserCart.fulfilled, (state, action: any) => {
        state.isLoading = false;
        state.error = "";
        state.shoppingCartItems = action.payload.shoppingCartItems;
      })
      .addCase(getUserCart.rejected, (state, action: any) => {
        state.isLoading = false;
        state.shoppingCartItems = [];
        state.error = action.payload;
      })
      .addCase(addItemToCart.pending, (state) => {
        state.isLoading = true;
        state.error = "";
      })
      .addCase(addItemToCart.fulfilled, (state, action: any) => {
        state.isLoading = false;
        state.error = "";
        state.shoppingCartItems = action.payload.shoppingCartItems;
      })
      .addCase(addItemToCart.rejected, (state, action: any) => {
        state.isLoading = false;
        state.shoppingCartItems = [];
        state.error = action.payload;
      })
      .addCase(removeItemFromCart.pending, (state) => {
        state.isLoading = true;
        state.error = "";
      })
      .addCase(removeItemFromCart.fulfilled, (state, action: any) => {
        state.isLoading = false;
        state.error = "";
        state.shoppingCartItems = action.payload.shoppingCartItems;
      })
      .addCase(removeItemFromCart.rejected, (state, action: any) => {
        state.isLoading = false;
        state.shoppingCartItems = [];
        state.error = action.payload;
      });
  },
});

export const {
  addUnAuth,
  getLocalCart,
  removeUnAuth,
  adddQuantityUnAuth,
  removeAllUnAuth,
} = cartSlice.actions;

export default cartSlice.reducer;
