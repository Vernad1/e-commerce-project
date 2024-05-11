import { createAsyncThunk } from "@reduxjs/toolkit";
import { check, login, registration } from "../../../service/api/userApi";
import { isErrorWithMessage } from "../../../utils/isErrorWithMessage";

interface UserData {
  email: string;
  password: string;
}

export const registerUser = createAsyncThunk(
  "user/register",
  async (user: UserData, thunkAPI) => {
    try {
      const userData = await registration(user.email, user.password);

      return userData;
    } catch (error: any) {
      if (isErrorWithMessage(error.response)) {
        return thunkAPI.rejectWithValue(error.response.data.message);
      } else {
        return thunkAPI.rejectWithValue("Неизвестная ошибка");
      }
    }
  }
);

export const loginUser = createAsyncThunk(
  "user/login",
  async (user: UserData, thunkAPI) => {
    try {
      const userData = await login(user.email, user.password);
      return userData;
    } catch (error: any) {
      if (isErrorWithMessage(error.response)) {
        return thunkAPI.rejectWithValue(error.response.data.message);
      } else {
        return thunkAPI.rejectWithValue("Неизвестная ошибка");
      }
    }
  }
);

export const checkUser = createAsyncThunk("user/check", async (_, thunkAPI) => {
  try {
    const userData: any = await check();
    return userData;
  } catch (error: any) {
    localStorage.removeItem("token");
    return thunkAPI.rejectWithValue(error);
  }
});
