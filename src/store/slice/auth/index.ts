import { createSlice } from "@reduxjs/toolkit";
import { setCookie, removeCookie } from "typescript-cookie";

export interface InitialStateType {
  access_token: string;
}

const initialState: InitialStateType = {
  access_token: "",
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    saveUserInfo: (state: InitialStateType, action) => {
      const { access_token } = action.payload;
      state.access_token = access_token;
      setCookie("access_token", access_token);
    },
    removeUserInfo: (state: InitialStateType) => {
      state.access_token = "";
      removeCookie("access_token");
    },
  },
});

export const token = (state: InitialStateType) => state.access_token;
export const { saveUserInfo, removeUserInfo } = authSlice.actions;
export default authSlice.reducer;
