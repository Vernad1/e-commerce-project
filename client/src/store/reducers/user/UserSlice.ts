import { createSlice } from "@reduxjs/toolkit";
import { IUser } from "../../../models/IUser";
import { checkUser, loginUser, registerUser } from "./ActionCreators";

interface UserState {
  isAuth: boolean;
  user: IUser | null;
  isLoading: boolean;
  error: string;
}

const initialState: UserState = {
  isAuth: false,
  user: null,
  isLoading: false,
  error: "",
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    clearError(state) {
      state.error = "";
    },
    logout() {
      return initialState;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
        state.isAuth = false;
        state.user = null;
        state.error = "";
      })
      .addCase(registerUser.fulfilled, (state, action: any) => {
        state.isLoading = false;
        state.isAuth = true;
        state.user = action.payload;
        state.error = "";
      })
      .addCase(registerUser.rejected, (state, action: any) => {
        state.isLoading = false;
        state.isAuth = false;
        state.user = null;
        state.error = action.payload;
      })
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
        state.isAuth = false;
        state.user = null;
        state.error = "";
      })
      .addCase(loginUser.fulfilled, (state, action: any) => {
        state.isLoading = false;
        state.isAuth = true;
        state.user = action.payload;
        state.error = "";
      })
      .addCase(loginUser.rejected, (state, action: any) => {
        state.isLoading = false;
        state.isAuth = false;
        state.user = null;
        state.error = action.payload;
      })
      .addCase(checkUser.pending, (state) => {
        state.isLoading = true;
        state.isAuth = false;
        state.user = null;
      })
      .addCase(checkUser.fulfilled, (state, action: any) => {
        state.isLoading = false;
        state.isAuth = true;
        state.user = action.payload;
      })
      .addCase(checkUser.rejected, (state) => {
        state.isLoading = false;
        state.isAuth = false;
        state.user = null;
      });
  },
});

export default userSlice.reducer;
