import { createSlice } from "@reduxjs/toolkit";
import { setCookie, removeCookie } from "typescript-cookie";

export interface InitialStateType {
  access_token: string;
  token_type: string;
}

const initialState: InitialStateType = {
  access_token: "",
  token_type: "",
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    saveUserInfo: (state: InitialStateType, action) => {
      const { access_token, token_type } = action.payload;
      state.access_token = access_token;
      state.token_type = token_type;
      setCookie("access_token", access_token);
    },
    removeUserInfo: (state: InitialStateType) => {
      state.access_token = "";
      state.token_type = "";
      removeCookie("access_token");
    },
  },
});

export const token = (state: InitialStateType) => state.access_token;
export const { saveUserInfo, removeUserInfo } = authSlice.actions;
export default authSlice.reducer;
