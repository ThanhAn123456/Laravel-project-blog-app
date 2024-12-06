import { api } from "..";
import {
  ForgotPasswordType,
  ResetPasswordType,
  SignInType,
} from "types/auth.type";
import { SignUpType } from "types/auth.type";

const authEndPoint = api.injectEndpoints({
  endpoints: (builder) => ({
    signIn: builder.mutation({
      query: (body: SignInType) => ({
        url: "/auth/login",
        method: "POST",
        body,
      }),
    }),
    signUp: builder.mutation({
      query: (body: SignUpType) => ({
        url: "/auth/register",
        method: "POST",
        body,
      }),
    }),
    forgotPassword: builder.mutation({
      query: (body: ForgotPasswordType) => ({
        url: "/auth/forgot-password",
        method: "POST",
        body,
      }),
    }),
    resetPassword: builder.mutation({
      query: (body: ResetPasswordType) => ({
        url: "/auth/reset-password",
        method: "POST",
        body,
      }),
    }),
  }),
});

export const {
  useSignInMutation,
  useSignUpMutation,
  useResetPasswordMutation,
  useForgotPasswordMutation,
} = authEndPoint;
